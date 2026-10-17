import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, SESSION_MAX_AGE, checkPassword, createSessionToken, verifySessionToken } from '@/lib/adminAuth';
import { clientIp, rateLimit } from '@/lib/rateLimit';

export const dynamic = 'force-dynamic';

// GET: is the current cookie a valid admin session?
export async function GET(request) {
  const ok = await verifySessionToken(request.cookies.get(ADMIN_COOKIE)?.value);
  return NextResponse.json({ ok });
}

// POST: exchange the admin password for an httpOnly signed cookie.
export async function POST(request) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Admin login is not configured.' }, { status: 503 });
  }
  if (!rateLimit(`admin-login:${clientIp(request)}`, { limit: 5, windowMs: 15 * 60_000 })) {
    return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 });
  }
  let body = {};
  try {
    body = await request.json();
  } catch {}
  if (!(await checkPassword(body.password))) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}

// DELETE: log out.
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, '', { httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: 0 });
  return res;
}
