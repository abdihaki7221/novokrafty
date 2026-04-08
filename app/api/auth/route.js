import { NextResponse } from 'next/server';
import { authenticateAdmin, COOKIE_NAME } from '@/lib/auth';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password required' }, { status: 400 });
    }

    const result = await authenticateAdmin(email, password);
    if (!result) {
      return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, admin: result.admin });
    response.cookies.set(COOKIE_NAME, result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ success: false, error: 'Authentication failed: ' + error.message }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(COOKIE_NAME);
  return response;
}
