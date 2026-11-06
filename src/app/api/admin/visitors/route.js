import { DATE_RE, KEEP_DAYS, deleteDay, getDay, istDate, listDates } from '@/lib/visitStore';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const wanted = searchParams.get('date') || '';
    const date = DATE_RE.test(wanted) ? wanted : istDate(0);

    let dates = [];
    try {
      dates = await listDates();
    } catch {
      dates = [];
    }
    // Tidy up: drop records older than the retention window, a few per request.
    const cutoff = istDate(-KEEP_DAYS);
    const old = dates.filter((d) => d < cutoff).slice(0, 3);
    for (const d of old) {
      try { await deleteDay(d); } catch { /* ignore */ }
    }
    dates = dates.filter((d) => d >= cutoff);

    const raw = await getDay(date);
    const visitors = Object.entries(raw)
      .filter(([, r]) => r && typeof r === 'object')
      .map(([id, r]) => ({
        id: id.slice(0, 6),
        first: r.f || 0,
        last: r.l || r.f || 0,
        country: r.c || '',
        device: r.d || 'd',
        ref: r.r || '',
        views: r.n || 0,
        secs: r.s || 0,
        pages: Object.values(r.p || {})
          .map((p) => ({ path: p.p, views: p.n || 0, secs: p.s || 0 }))
          .sort((a, b) => b.secs - a.secs || b.views - a.views),
      }))
      .sort((a, b) => b.secs - a.secs);

    const totalViews = visitors.reduce((a, v) => a + v.views, 0);
    const totalSecs = visitors.reduce((a, v) => a + v.secs, 0);
    const pageMap = new Map();
    for (const v of visitors) {
      for (const p of v.pages) {
        const m = pageMap.get(p.path) || { path: p.path, views: 0, secs: 0, visitors: 0 };
        m.views += p.views;
        m.secs += p.secs;
        m.visitors += 1;
        pageMap.set(p.path, m);
      }
    }
    const topPages = [...pageMap.values()]
      .map((p) => ({ ...p, avgSecs: p.visitors ? Math.round(p.secs / p.visitors) : 0 }))
      .sort((a, b) => b.secs - a.secs)
      .slice(0, 15);

    return Response.json({
      ok: true,
      date,
      dates: dates.slice(0, 14),
      totals: {
        visitors: visitors.length,
        views: totalViews,
        secs: totalSecs,
        avgSecsPerVisitor: visitors.length ? Math.round(totalSecs / visitors.length) : 0,
        avgPagesPerVisitor: visitors.length ? Math.round((totalViews / visitors.length) * 10) / 10 : 0,
        singlePage: visitors.filter((v) => v.views <= 1).length,
      },
      topPages,
      visitors: visitors.slice(0, 300),
    });
  } catch (e) {
    return Response.json({ ok: false, error: e?.message || 'Could not load visits.' }, { status: 500 });
  }
}
