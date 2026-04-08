import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try { return NextResponse.json(await prisma.siteSettings.findUnique({ where: { id: 'main' } })); } catch { return NextResponse.json(null, { status: 500 }); }
}

export async function PUT(req) {
  if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const b = await req.json();
    const settings = await prisma.siteSettings.upsert({
      where: { id: 'main' },
      update: { companyName: b.companyName, tagline: b.tagline, email: b.email, phone: b.phone, address: b.address, mission: b.mission, vision: b.vision, values: b.values || [], linkedin: b.linkedin, twitter: b.twitter, github: b.github, youtube: b.youtube },
      create: { id: 'main', companyName: b.companyName || 'Novokraft', tagline: b.tagline || '', email: b.email || '', phone: b.phone || '', address: b.address || '', mission: b.mission || '', vision: b.vision || '', values: b.values || [] },
    });
    return NextResponse.json(settings);
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}
