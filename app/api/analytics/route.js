import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(req) {
  try {
    const body = await req.json();

    if (body.type === 'demo_click' && body.projectId) {
      await prisma.demoClick.create({
        data: { projectId: body.projectId, referrer: body.referrer || null },
      });
      return NextResponse.json({ success: true });
    }

    // Page visit
    await prisma.siteVisit.create({
      data: {
        page: body.page || '/',
        referrer: body.referrer || null,
        userAgent: body.userAgent || null,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
  }
}

// GET analytics data (admin only)
export async function GET(req) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const [totalVisits, last30, last7, todayVisits, topPages, demoClicks, recentVisits] = await Promise.all([
      prisma.siteVisit.count(),
      prisma.siteVisit.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
      prisma.siteVisit.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
      prisma.siteVisit.count({ where: { createdAt: { gte: today } } }),
      prisma.siteVisit.groupBy({ by: ['page'], _count: { page: true }, orderBy: { _count: { page: 'desc' } }, take: 10 }),
      prisma.demoClick.groupBy({ by: ['projectId'], _count: { projectId: true }, orderBy: { _count: { projectId: 'desc' } } }),
      prisma.siteVisit.findMany({ orderBy: { createdAt: 'desc' }, take: 50 }),
    ]);

    // Get project names for demo clicks
    let demoClicksWithNames = [];
    if (demoClicks.length > 0) {
      const projectIds = demoClicks.map(d => d.projectId);
      const projects = await prisma.project.findMany({ where: { id: { in: projectIds } }, select: { id: true, title: true } });
      const projectMap = Object.fromEntries(projects.map(p => [p.id, p.title]));
      demoClicksWithNames = demoClicks.map(d => ({
        projectId: d.projectId,
        projectTitle: projectMap[d.projectId] || 'Unknown',
        clicks: d._count.projectId,
      }));
    }

    return NextResponse.json({
      totalVisits,
      last30Days: last30,
      last7Days: last7,
      today: todayVisits,
      topPages: topPages.map(p => ({ page: p.page, count: p._count.page })),
      demoClicks: demoClicksWithNames,
      recentVisits: recentVisits.map(v => ({ page: v.page, createdAt: v.createdAt, referrer: v.referrer })),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
