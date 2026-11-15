import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const admins = await prisma.admin.findMany({
      select: { id: true, email: true, name: true, avatar: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(admins);
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}

export async function POST(req) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { email, password, name, avatar } = await req.json();
    if (!email || !password) return NextResponse.json({ error: 'Email and password required' }, { status: 400 });

    const existing = await prisma.admin.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: 'An admin with this email already exists' }, { status: 409 });

    const hashed = await bcrypt.hash(password, 12);
    const admin = await prisma.admin.create({
      data: { email, password: hashed, name: name || 'Admin', avatar: avatar || null },
      select: { id: true, email: true, name: true, avatar: true, createdAt: true },
    });
    return NextResponse.json(admin);
  } catch (error) {
    console.error('Create admin error:', error);
    return NextResponse.json({ error: 'Failed to create admin' }, { status: 500 });
  }
}

export async function PUT(req) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id, name, avatar, email } = await req.json();
    const data = {};
    if (name !== undefined) data.name = name;
    if (avatar !== undefined) data.avatar = avatar;
    if (email !== undefined) data.email = email;
    const admin = await prisma.admin.update({
      where: { id },
      data,
      select: { id: true, email: true, name: true, avatar: true, createdAt: true },
    });
    return NextResponse.json(admin);
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}

export async function DELETE(req) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    // Prevent deleting yourself
    if (id === session.id) return NextResponse.json({ error: 'Cannot delete yourself' }, { status: 400 });
    await prisma.admin.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}
