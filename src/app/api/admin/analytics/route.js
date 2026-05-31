import { BetaAnalyticsDataClient } from '@google-analytics/data';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function getServiceAccount() {
  const raw = process.env.GA_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error('Missing GA_SERVICE_ACCOUNT_JSON.');
  let parsed;
  try { parsed = JSON.parse(raw); } catch { throw new Error('GA_SERVICE_ACCOUNT_JSON is not valid JSON.'); }
  if (!parsed.client_email) throw new Error('GA_SERVICE_ACCOUNT_JSON missing client_email.');
  if (!parsed.private_key) throw new Error('GA_SERVICE_ACCOUNT_JSON missing private_key.');
  return parsed;
}

function getAnalyticsClient() {
  const sa = getServiceAccount();
  return new BetaAnalyticsDataClient({
    credentials: { client_email: sa.client_email, private_key: sa.private_key },
  });
}

function getPropertyName() {
  const propertyId = String(process.env.GA4_PROPERTY_ID || '').trim();
  if (!propertyId) throw new Error('Missing GA4_PROPERTY_ID.');
  return `properties/${propertyId}`;
}

function normalizePath(pathname) {
  if (!pathname || pathname === '/') return { slug: 'home', label: 'Home', path: '/' };
  const cleanPath = pathname.split('?')[0].replace(/\/+$/, '');
  const slug = cleanPath.replace(/^\/+/, '');
  return { slug, label: slug.split('/').filter(Boolean).join(' / '), path: cleanPath || '/' };
}

export async function GET() {
  try {
    const client = getAnalyticsClient();
    const property = getPropertyName();

    const [
      realtimeReport,
      summary7dReport,
      summary1dReport,
      userTypeReport,
      topPagesReport,
      trafficSourcesReport,
      countriesReport,
    ] = await Promise.all([
      // 1. Realtime
      client.runRealtimeReport({
        property,
        metrics: [{ name: 'activeUsers' }],
      }),

      // 2. 7-day summary
      client.runReport({
        property,
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'screenPageViews' },
          { name: 'sessions' },
          { name: 'averageSessionDuration' },
        ],
      }),

      // 3. 1-day summary
      client.runReport({
        property,
        dateRanges: [{ startDate: '1daysAgo', endDate: 'today' }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'screenPageViews' },
          { name: 'sessions' },
        ],
      }),

      // 4. New vs Returning users (7d)
      client.runReport({
        property,
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'newVsReturning' }],
        metrics: [{ name: 'activeUsers' }, { name: 'sessions' }],
      }),

      // 5. Top pages
      client.runReport({
        property,
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 20,
      }),

      // 6. Traffic sources
      client.runReport({
        property,
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 10,
      }),

      // 7. Countries
      client.runReport({
        property,
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'country' }],
        metrics: [{ name: 'activeUsers' }],
        orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
        limit: 10,
      }),
    ]);

    // Realtime
    const liveUsers = Number(realtimeReport[0]?.rows?.[0]?.metricValues?.[0]?.value || 0);

    // 7d summary
    const m7d = summary7dReport[0]?.rows?.[0]?.metricValues || [];
    const users7d = Number(m7d[0]?.value || 0);
    const pageViews7d = Number(m7d[1]?.value || 0);
    const sessions7d = Number(m7d[2]?.value || 0);
    const avgSessionDurationSec = Number(m7d[3]?.value || 0);

    // 1d summary
    const m1d = summary1dReport[0]?.rows?.[0]?.metricValues || [];
    const users1d = Number(m1d[0]?.value || 0);
    const pageViews1d = Number(m1d[1]?.value || 0);
    const sessions1d = Number(m1d[2]?.value || 0);

    // New vs Returning
    let newUsers7d = 0;
    let returningUsers7d = 0;
    for (const row of (userTypeReport[0]?.rows || [])) {
      const type = row.dimensionValues?.[0]?.value?.toLowerCase() || '';
      const count = Number(row.metricValues?.[0]?.value || 0);
      if (type === 'new') newUsers7d = count;
      else if (type === 'returning') returningUsers7d = count;
    }

    const topPages = (topPagesReport[0]?.rows || []).map((row) => {
      const rawPath = row.dimensionValues?.[0]?.value || '/';
      const normalized = normalizePath(rawPath);
      return { slug: normalized.slug, path: normalized.path, label: normalized.label, views: Number(row.metricValues?.[0]?.value || 0) };
    });

    const trafficSources = (trafficSourcesReport[0]?.rows || []).map((row) => ({
      source: row.dimensionValues?.[0]?.value || 'Unknown',
      sessions: Number(row.metricValues?.[0]?.value || 0),
    }));

    const countries = (countriesReport[0]?.rows || []).map((row) => ({
      country: row.dimensionValues?.[0]?.value || 'Unknown',
      users: Number(row.metricValues?.[0]?.value || 0),
    }));

    return Response.json({
      ok: true,
      liveUsers,
      // 7d
      users7d, pageViews7d, sessions7d, avgSessionDurationSec,
      // 1d
      users1d, pageViews1d, sessions1d,
      // new vs returning
      newUsers7d, returningUsers7d,
      topPages, trafficSources, countries,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('GA admin analytics route error:', error);
    return Response.json({ ok: false, error: error?.message || 'Failed to fetch GA4 analytics.' }, { status: 500 });
  }
}