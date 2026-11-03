import { cleanText, dbDelete, dbGet, dbPatch, ID_RE } from '@/lib/feedbackStore';

// Every /api/admin/* route is protected by the signed admin cookie in middleware.js.
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const raw = (await dbGet('feedback')) || {};
    const items = Object.entries(raw)
      .filter(([, f]) => f && f.message)
      .map(([id, f]) => ({
        id,
        name: f.name || 'Devotee',
        message: f.message,
        rating: Number(f.rating) || 0,
        email: f.email || '',
        page: f.page || '',
        createdAt: f.createdAt || '',
        status: f.status === 'hidden' ? 'hidden' : 'visible',
        highlighted: !!f.highlighted,
        reply: f.reply && f.reply.text ? f.reply : null,
      }))
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    return Response.json({ ok: true, items });
  } catch (e) {
    return Response.json({ ok: false, items: [], error: e?.message || 'Failed to load feedback.' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const id = String(body?.id || '');
    if (!ID_RE.test(id)) return Response.json({ ok: false, error: 'Bad id.' }, { status: 400 });
    const patches = {
      hide: { status: 'hidden' },
      show: { status: 'visible' },
      highlight: { highlighted: true },
      unhighlight: { highlighted: false },
      clearReply: { reply: null },
    };
    let data = patches[body.action];
    if (body.action === 'reply') {
      const text = cleanText(body.reply, 1000);
      if (!text) return Response.json({ ok: false, error: 'Reply is empty.' }, { status: 400 });
      data = { reply: { text, at: new Date().toISOString() } };
    }
    if (!data) return Response.json({ ok: false, error: 'Unknown action.' }, { status: 400 });
    await dbPatch(`feedback/${id}`, data);
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ ok: false, error: e?.message || 'Update failed.' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const id = new URL(request.url).searchParams.get('id') || '';
    if (!ID_RE.test(id)) return Response.json({ ok: false, error: 'Bad id.' }, { status: 400 });
    await dbDelete(`feedback/${id}`);
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ ok: false, error: e?.message || 'Delete failed.' }, { status: 500 });
  }
}
