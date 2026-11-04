import { sendDailyEmails } from '@/lib/dailyEmail';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60;

// Called once a day by the Vercel cron in vercel.json. Vercel sends "Authorization: Bearer <CRON_SECRET>".
export async function GET(request) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return Response.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const result = await sendDailyEmails();
  return Response.json(result, { status: result.status || 200 });
}
