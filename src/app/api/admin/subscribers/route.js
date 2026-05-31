export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function getFirebaseUrl(path) {
  const base =
    process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ||
    process.env.FIREBASE_DATABASE_URL;
  if (!base) return null;
  return `${base.replace(/\/$/, '')}/${path}.json`;
}

async function firebaseGet(path) {
  const url = getFirebaseUrl(path);
  if (!url) return null;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const text = await res.text();
    if (!text || text === 'null') return null;
    return JSON.parse(text);
  } catch (e) {
    console.error(`Firebase GET error for "${path}":`, e);
    return null;
  }
}

export async function GET() {
  try {
    const [subscribersRaw, statsRaw] = await Promise.all([
      firebaseGet('subscribers'),
      firebaseGet('subscriberStats'),
    ]);

    const today = new Date().toISOString().split('T')[0];

    // Build subscriber list from Firebase subscribers node
    let subscribers = [];
    if (subscribersRaw && typeof subscribersRaw === 'object') {
      subscribers = Object.values(subscribersRaw)
        .filter(Boolean)
        .sort((a, b) => new Date(b.subscribedAt) - new Date(a.subscribedAt));
    }

    // Use statsRaw.total if available, else fall back to subscribers count
    const totalCount =
      statsRaw && typeof statsRaw.total === 'number'
        ? statsRaw.total
        : subscribers.length;

    const todayCount =
      statsRaw?.daily?.[today] ?? 0;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const last7dCount = subscribers.filter(
      (s) => s.subscribedAt && new Date(s.subscribedAt) >= sevenDaysAgo
    ).length;

    const returningCount = subscribers.filter(
      (s) => (s.visitCount || 1) > 1
    ).length;

    const dailyStats = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      dailyStats.push({
        date: dateStr,
        label: d.toLocaleDateString('en-IN', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        }),
        count: statsRaw?.daily?.[dateStr] ?? 0,
      });
    }

    return Response.json({
      ok: true,
      totalCount,
      todayCount,
      last7dCount,
      returningCount,
      dailyStats,
      recentSubscribers: subscribers.slice(0, 20).map((s) => ({
        email: s.email,
        subscribedAt: s.subscribedAt,
        visitCount: s.visitCount || 1,
      })),
    });
  } catch (error) {
    console.error('Subscribers admin route error:', error);
    return Response.json(
      { ok: false, error: error?.message || 'Failed to fetch.' },
      { status: 500 }
    );
  }
}