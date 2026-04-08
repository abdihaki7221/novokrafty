import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try { return NextResponse.json(await prisma.career.findMany({ orderBy: { createdAt: 'desc' } })); } catch { return NextResponse.json([], { status: 500 }); }
}
export async function POST(req) {
  if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const b = await req.json();
    return NextResponse.json(await prisma.career.create({ data: { title: b.title, department: b.department || '', type: b.type || 'Full-time', location: b.location || '', description: b.description || '', requirements: b.requirements || [], salary: b.salary || null, published: b.published !== false } }));
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}
export async function PUT(req) {
  if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const b = await req.json();
    return NextResponse.json(await prisma.career.update({ where: { id: b.id }, data: { title: b.title, department: b.department, type: b.type, location: b.location, description: b.description, requirements: b.requirements || [], salary: b.salary, published: b.published } }));
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}
export async function DELETE(req) {
  if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try { const { searchParams } = new URL(req.url); await prisma.career.delete({ where: { id: searchParams.get('id') } }); return NextResponse.json({ success: true }); } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}
