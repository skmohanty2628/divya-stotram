import { clientIp, rateLimit } from '@/lib/rateLimit';
import { VID_RE, cleanPath, recordVisit } from '@/lib/visitStore';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const BOT_RE = /bot|crawl|spider|slurp|headless|lighthouse|preview|monitor|curl|wget|python|axios|node-fetch/i;

// Receives small beacons from the browser: a page view and the seconds of active reading time on that page.
export async function POST(request) {
  const ua = request.headers.get('user-agent') || '';
  if (!ua || BOT_RE.test(ua)) return new Response(null, { status: 204 });
  if (!rateLimit(`track:${clientIp(request)}`, { limit: 150, windowMs: 10 * 60_000 })) {
    return new Response(null, { status: 429 });
  }
  let body = {};
  try {
    body = JSON.parse(await request.text());
  } catch {
    return new Response(null, { status: 400 });
  }
  const vid = String(body.v || '');
  const path = cleanPath(body.p);
  if (!VID_RE.test(vid) || !path) return new Response(null, { status: 400 });
  const country = String(request.headers.get('x-vercel-ip-country') || '').slice(0, 2).toUpperCase();
  const device = body.d === 'm' ? 'm' : body.d === 't' ? 't' : 'd';
  const ref = String(body.r || '').replace(/[^a-zA-Z0-9.-]/g, '').slice(0, 60);
  try {
    await recordVisit({ vid, path, secs: body.s, isView: body.n === 1, country, device, ref });
  } catch (e) {
    console.error('track error', e?.message);
    return new Response(null, { status: 202 });
  }
  return new Response(null, { status: 204 });
}
