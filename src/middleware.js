import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, verifySessionToken } from '@/lib/adminAuth';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';

const SLUGS = new Set(STOTRAMS_INDEX.map((s) => s.slug));
const LANG_PATH = { hi: 'hindi', od: 'odia', te: 'telugu' };

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api/admin/')) {
    // Login/session endpoint is public; every other admin API requires a valid signed cookie.
    if (pathname === '/api/admin/login') return NextResponse.next();
    const ok = await verifySessionToken(request.cookies.get(ADMIN_COOKIE)?.value);
    if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.next();
  }

  // Old links carried ?lang= and ?from= . Send them to the clean URL with one permanent redirect,
  // so Google keeps a single address per page.
  const url = request.nextUrl.clone();
  const lang = url.searchParams.get('lang');
  const parts = pathname.split('/').filter(Boolean);
  if (lang && parts.length === 1 && SLUGS.has(parts[0]) && LANG_PATH[lang]) {
    url.pathname = `/${parts[0]}/${LANG_PATH[lang]}`;
  }
  url.searchParams.delete('lang');
  url.searchParams.delete('from');
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: [
    '/api/admin/:path*',
    { source: '/((?!api|_next|.*\\..*).*)', has: [{ type: 'query', key: 'lang' }] },
    { source: '/((?!api|_next|.*\\..*).*)', has: [{ type: 'query', key: 'from' }] },
  ],
};
