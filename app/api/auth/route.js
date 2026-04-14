import { NextResponse } from 'next/server';
import { COOKIE_NAME } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'novokraft-secret-key-change-in-production-2024'
);

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password required' }, { status: 400 });
    }

    // Step 1: Find admin by email
    let admin;
    try {
      admin = await prisma.admin.findUnique({ where: { email } });
    } catch (dbError) {
      console.error('Database error finding admin:', dbError);
      return NextResponse.json({
        success: false,
        error: 'Database connection failed. Check DATABASE_URL env variable on Vercel.',
        detail: dbError.message,
      }, { status: 500 });
    }

    if (!admin) {
      return NextResponse.json({ success: false, error: 'No admin found with email: ' + email }, { status: 401 });
    }

    // Step 2: Verify password
    let valid;
    try {
      valid = await bcrypt.compare(password, admin.password);
    } catch (bcryptError) {
      console.error('Bcrypt error:', bcryptError);
      return NextResponse.json({
        success: false,
        error: 'Password verification failed',
        detail: bcryptError.message,
      }, { status: 500 });
    }

    if (!valid) {
      return NextResponse.json({ success: false, error: 'Incorrect password' }, { status: 401 });
    }

    // Step 3: Generate JWT
    const token = await new SignJWT({ id: admin.id, email: admin.email, name: admin.name })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .setIssuedAt()
      .sign(JWT_SECRET);

    const response = NextResponse.json({
      success: true,
      admin: { id: admin.id, email: admin.email, name: admin.name },
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({
      success: false,
      error: 'Authentication failed: ' + error.message,
    }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(COOKIE_NAME);
  return response;
}
