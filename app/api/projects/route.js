import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({ orderBy: { sortOrder: 'asc' }, include: { _count: { select: { demoClicks: true } } } });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const slug = slugify(body.title);
    const project = await prisma.project.create({
      data: { title: body.title, slug, category: body.category, description: body.description, longDesc: body.longDesc || null, image: body.image || null, demoUrl: body.demoUrl || null, videoUrl: body.videoUrl || null, techStack: body.techStack || [], featured: body.featured || false, published: body.published !== false, sortOrder: body.sortOrder || 0 },
    });
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function PUT(req) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const project = await prisma.project.update({
      where: { id: body.id },
      data: { title: body.title, category: body.category, description: body.description, longDesc: body.longDesc, image: body.image, demoUrl: body.demoUrl, videoUrl: body.videoUrl, techStack: body.techStack || [], featured: body.featured, published: body.published, sortOrder: body.sortOrder },
    });
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(req) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
