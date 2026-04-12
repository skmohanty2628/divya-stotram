import { BetaAnalyticsDataClient } from '@google-analytics/data';

export const dynamic = 'force-dynamic';

function getAnalyticsClient() {
  const clientEmail = process.env.GA_CLIENT_EMAIL;
  const privateKey = process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    throw new Error('Missing GA service account credentials.');
  }

  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
  });
}

function getPropertyName() {
  const propertyId = process.env.GA4_PROPERTY_ID;

  if (!propertyId) {
    throw new Error('Missing GA4_PROPERTY_ID.');
  }

  return `properties/${propertyId}`;
}

function normalizePath(pathname) {
  if (!pathname || pathname === '/') {
    return {
      slug: 'home',
      label: 'Home',
      path: '/',
    };
  }

  const cleanPath = pathname.split('?')[0].replace(/\/+$/, '');
  const slug = cleanPath.replace(/^\/+/, '');

  return {
    slug,
    label: slug
      .split('/')
      .filter(Boolean)
      .join(' / '),
    path: cleanPath || '/',
  };
}

export async function GET() {
  try {
    const client = getAnalyticsClient();
    const property = getPropertyName();

    const [realtimeReport] = await client.runRealtimeReport({
      property,
      metrics: [{ name: 'activeUsers' }],
    });

    const [summaryReport] = await client.runReport({
      property,
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'screenPageViews' },
        { name: 'sessions' },
        { name: 'averageSessionDuration' },
      ],
    });

    const [topPagesReport] = await client.runReport({
      property,
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      orderBys: [
        {
          metric: { metricName: 'screenPageViews' },
          desc: true,
        },
      ],
      limit: 20,
    });

    const [trafficSourcesReport] = await client.runReport({
      property,
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'sessionDefaultChannelGroup' }],
      metrics: [{ name: 'sessions' }],
      orderBys: [
        {
          metric: { metricName: 'sessions' },
          desc: true,
        },
      ],
      limit: 10,
    });

    const [countriesReport] = await client.runReport({
      property,
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'country' }],
      metrics: [{ name: 'activeUsers' }],
      orderBys: [
        {
          metric: { metricName: 'activeUsers' },
          desc: true,
        },
      ],
      limit: 10,
    });

    const liveUsers = Number(
      realtimeReport?.rows?.[0]?.metricValues?.[0]?.value || 0
    );

    const summaryMetrics = summaryReport?.rows?.[0]?.metricValues || [];
    const users7d = Number(summaryMetrics?.[0]?.value || 0);
    const pageViews7d = Number(summaryMetrics?.[1]?.value || 0);
    const sessions7d = Number(summaryMetrics?.[2]?.value || 0);
    const avgSessionDurationSec = Number(summaryMetrics?.[3]?.value || 0);

    const topPages = (topPagesReport?.rows || []).map((row) => {
      const rawPath = row.dimensionValues?.[0]?.value || '/';
      const normalized = normalizePath(rawPath);

      return {
        slug: normalized.slug,
        path: normalized.path,
        label: normalized.label,
        views: Number(row.metricValues?.[0]?.value || 0),
      };
    });

    const trafficSources = (trafficSourcesReport?.rows || []).map((row) => ({
      source: row.dimensionValues?.[0]?.value || 'Unknown',
      sessions: Number(row.metricValues?.[0]?.value || 0),
    }));

    const countries = (countriesReport?.rows || []).map((row) => ({
      country: row.dimensionValues?.[0]?.value || 'Unknown',
      users: Number(row.metricValues?.[0]?.value || 0),
    }));

    return Response.json({
      ok: true,
      liveUsers,
      users7d,
      pageViews7d,
      sessions7d,
      avgSessionDurationSec,
      topPages,
      trafficSources,
      countries,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('GA admin analytics route error:', error);

    return Response.json(
      {
        ok: false,
        error: error.message || 'Failed to fetch GA4 analytics.',
      },
      { status: 500 }
    );
  }
}