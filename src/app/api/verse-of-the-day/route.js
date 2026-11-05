import { verseOfTheDay } from '@/lib/verseOfDay';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const LANGS = new Set(['en', 'hi', 'od', 'te']);

export async function GET(request) {
  const l = new URL(request.url).searchParams.get('lang') || 'en';
  const lang = LANGS.has(l) ? l : 'en';
  const verse = verseOfTheDay(lang);
  if (!verse) return Response.json({ ok: false }, { status: 404 });
  return Response.json(
    { ok: true, ...verse },
    { headers: { 'Cache-Control': 'public, max-age=300, s-maxage=1800, stale-while-revalidate=3600' } }
  );
}
