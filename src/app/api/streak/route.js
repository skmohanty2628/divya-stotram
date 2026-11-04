import { clientIp, rateLimit } from '@/lib/rateLimit';
import { recordReading } from '@/lib/streakStore';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request) {
  if (!rateLimit(`streak:${clientIp(request)}`, { limit: 30, windowMs: 10 * 60_000 })) {
    return Response.json({ ok: false }, { status: 429 });
  }
  let body = {};
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const result = await recordReading(body?.sid);
  return Response.json(result, { status: result.ok ? 200 : 404 });
}
