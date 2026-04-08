import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try { return NextResponse.json(await prisma.partner.findMany({ orderBy: { sortOrder: 'asc' } })); } catch { return NextResponse.json([], { status: 500 }); }
}
export async function POST(req) {
  if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try { const b = await req.json(); return NextResponse.json(await prisma.partner.create({ data: { name: b.name, logo: b.logo || null, website: b.website || null, tier: b.tier || 'partner', published: b.published !== false, sortOrder: b.sortOrder || 0 } })); } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}
export async function PUT(req) {
  if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try { const b = await req.json(); return NextResponse.json(await prisma.partner.update({ where: { id: b.id }, data: { name: b.name, logo: b.logo, website: b.website, tier: b.tier, published: b.published, sortOrder: b.sortOrder } })); } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}
export async function DELETE(req) {
  if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try { const { searchParams } = new URL(req.url); await prisma.partner.delete({ where: { id: searchParams.get('id') } }); return NextResponse.json({ success: true }); } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}
