import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { getSession } from '@/lib/auth';

// Reset password (authenticated admin changes own password)
export async function PUT(req) {
  try {
    const body = await req.json();
    const { email, currentPassword, newPassword } = body;

    // If admin is logged in, verify current password
    const session = await getSession().catch(() => null);

    if (session) {
      // Logged-in admin changing password
      const admin = await prisma.admin.findUnique({ where: { id: session.id } });
      if (!admin) return NextResponse.json({ error: 'Admin not found' }, { status: 404 });

      if (currentPassword) {
        const valid = await bcrypt.compare(currentPassword, admin.password);
        if (!valid) return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 });
      }

      const hashed = await bcrypt.hash(newPassword, 12);
      await prisma.admin.update({ where: { id: session.id }, data: { password: hashed } });
      return NextResponse.json({ success: true, message: 'Password updated' });
    }

    // Not logged in - forgot password flow (verify by email)
    if (!email || !newPassword) {
      return NextResponse.json({ error: 'Email and new password required' }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) return NextResponse.json({ error: 'No admin with that email' }, { status: 404 });

    const hashed = await bcrypt.hash(newPassword, 12);
    await prisma.admin.update({ where: { email }, data: { password: hashed } });
    return NextResponse.json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 });
  }
}
