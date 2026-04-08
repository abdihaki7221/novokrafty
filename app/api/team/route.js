import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try { return NextResponse.json(await prisma.teamMember.findMany({ orderBy: { sortOrder: 'asc' } })); } catch { return NextResponse.json([], { status: 500 }); }
}
export async function POST(req) {
  if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try { const b = await req.json(); return NextResponse.json(await prisma.teamMember.create({ data: { name: b.name, role: b.role, bio: b.bio || null, image: b.image || null, linkedin: b.linkedin || null, twitter: b.twitter || null, github: b.github || null, sortOrder: b.sortOrder || 0, published: b.published !== false } })); } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}
export async function PUT(req) {
  if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try { const b = await req.json(); return NextResponse.json(await prisma.teamMember.update({ where: { id: b.id }, data: { name: b.name, role: b.role, bio: b.bio, image: b.image, linkedin: b.linkedin, twitter: b.twitter, github: b.github, sortOrder: b.sortOrder, published: b.published } })); } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}
export async function DELETE(req) {
  if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try { const { searchParams } = new URL(req.url); await prisma.teamMember.delete({ where: { id: searchParams.get('id') } }); return NextResponse.json({ success: true }); } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}
