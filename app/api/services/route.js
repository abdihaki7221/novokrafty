import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function GET() {
  try {
    const services = await prisma.service.findMany({ orderBy: { sortOrder: 'asc' } });
    return NextResponse.json(services);
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}

export async function POST(req) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const service = await prisma.service.create({ data: { title: body.title, slug: slugify(body.title), icon: body.icon || 'Code2', description: body.description, features: body.features || [], published: body.published !== false, sortOrder: body.sortOrder || 0 } });
    return NextResponse.json(service);
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}

export async function PUT(req) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const service = await prisma.service.update({ where: { id: body.id }, data: { title: body.title, icon: body.icon, description: body.description, features: body.features || [], published: body.published, sortOrder: body.sortOrder } });
    return NextResponse.json(service);
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}

export async function DELETE(req) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { searchParams } = new URL(req.url);
    await prisma.service.delete({ where: { id: searchParams.get('id') } });
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}
