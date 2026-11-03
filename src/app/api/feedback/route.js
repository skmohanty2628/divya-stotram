import { clientIp, rateLimit } from '@/lib/rateLimit';
import { cleanText, dbGet, dbPush, hasLinkOrEmail, publicShape, sortFeedback } from '@/lib/feedbackStore';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Public: list visible feedback (hidden messages, emails and IP data are never returned).
export async function GET() {
  try {
    const raw = (await dbGet('feedback')) || {};
    const visible = Object.entries(raw)
      .filter(([, f]) => f && f.status !== 'hidden' && f.message)
      .map(([id, f]) => publicShape(id, f));
    sortFeedback(visible);
    const rated = visible.filter((f) => f.rating > 0);
    const average = rated.length ? Math.round((rated.reduce((s, f) => s + f.rating, 0) / rated.length) * 10) / 10 : 0;
    return Response.json(
      { ok: true, total: visible.length, average, ratingCount: rated.length, items: visible.slice(0, 100) },
      { headers: { 'Cache-Control': 'public, s-maxage=20, stale-while-revalidate=60' } }
    );
  } catch (e) {
    return Response.json({ ok: false, items: [], total: 0, average: 0, ratingCount: 0, error: 'Feedback is unavailable right now.' }, { status: 200 });
  }
}

// Public: submit feedback. Published right away; the admin can hide, highlight, reply or delete.
export async function POST(request) {
  try {
    if (!rateLimit(`feedback:${clientIp(request)}`, { limit: 4, windowMs: 10 * 60_000 })) {
      return Response.json({ ok: false, error: 'Too many messages. Please try again in a few minutes.' }, { status: 429 });
    }
    let body = {};
    try {
      body = await request.json();
    } catch {}

    // Spam traps: a hidden field real visitors never fill, and a form that is submitted too fast.
    if (body.website) return Response.json({ ok: true });
    if (Number(body.elapsed) < 2500) {
      return Response.json({ ok: false, error: 'Please take a moment to write your message.' }, { status: 400 });
    }

    const message = cleanText(body.message, 800);
    const name = cleanText(body.name, 40) || 'Devotee';
    const email = cleanText(body.email, 120).toLowerCase();
    const rating = Math.max(0, Math.min(5, Math.round(Number(body.rating) || 0)));
    let page = cleanText(body.page, 200);
    if (!page.startsWith('/')) page = '';

    if (message.length < 10) {
      return Response.json({ ok: false, error: 'Please write at least 10 characters.' }, { status: 400 });
    }
    if (hasLinkOrEmail(message) || hasLinkOrEmail(name)) {
      return Response.json({ ok: false, error: 'Please leave out links and email addresses. You can add an email in the private field.' }, { status: 400 });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ ok: false, error: 'That email address does not look right.' }, { status: 400 });
    }

    const id = await dbPush('feedback', {
      name,
      message,
      rating,
      email,
      page,
      createdAt: new Date().toISOString(),
      status: 'visible',
      highlighted: false,
      reply: null,
    });
    return Response.json({ ok: true, id });
  } catch (e) {
    return Response.json({ ok: false, error: 'Sorry, we could not save your message. Please try again later.' }, { status: 500 });
  }
}
