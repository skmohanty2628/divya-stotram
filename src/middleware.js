import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, verifySessionToken } from '@/lib/adminAuth';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  // Login/session endpoint is public; every other admin API requires a valid signed cookie.
  if (pathname === '/api/admin/login') return NextResponse.next();
  const ok = await verifySessionToken(request.cookies.get(ADMIN_COOKIE)?.value);
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.next();
}

export const config = { matcher: ['/api/admin/:path*'] };
