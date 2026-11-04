import { countSubscribers, emailConfigStatus, sendDailyEmails } from '@/lib/dailyEmail';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60;

// Admin only: the middleware requires a valid admin cookie for every /api/admin route.
export async function GET() {
  return Response.json({ ok: true, subscribers: await countSubscribers(), ...emailConfigStatus() });
}

export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {}
  if (body.mode === 'test') {
    const result = await sendDailyEmails({ onlyEmail: body.email });
    return Response.json(result, { status: result.status || 200 });
  }
  if (body.mode === 'all') {
    const result = await sendDailyEmails();
    return Response.json(result, { status: result.status || 200 });
  }
  return Response.json({ ok: false, error: 'Unknown mode' }, { status: 400 });
}
