'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Activity,
  Users,
  Eye,
  RefreshCw,
  BookOpen,
  Star,
  Globe2,
  Radio,
  TimerReset,
  ShieldCheck,
  TrendingUp,
  ExternalLink,
  BarChart3,
  Search,
  Sparkles,
  Crown,
  ChevronRight,
  Flame,
  MonitorSmartphone,
  Clock3,
  CheckCircle2,
} from 'lucide-react';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';

const AUTO_REFRESH_MS = 10_000;

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function StatCard({
  icon: Icon,
  title,
  value,
  subtitle,
  accent = '#f0c040',
  glow = false,
}) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-[#c9922a]/20 bg-[#1a0505]/95 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c9922a]/35',
        glow && 'shadow-[0_0_0_1px_rgba(201,146,42,0.18),0_14px_40px_rgba(201,146,42,0.08)]'
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/5 bg-white/[0.03]"
          style={{ color: accent }}
        >
          <Icon size={18} />
        </div>
        <span className="font-cinzel-reg text-[9px] uppercase tracking-[2px] text-[#e8d5b5]/40">
          {title}
        </span>
      </div>

      <div
        className="font-cinzel break-words text-2xl font-bold"
        style={{ color: accent }}
      >
        {value}
      </div>

      <p className="mt-1 font-garamond text-sm text-[#e8d5b5]/60">
        {subtitle}
      </p>
    </div>
  );
}

function SectionTitle({ icon: Icon, children, right }) {
  return (
    <div className="mt-8 mb-3 flex items-center justify-between gap-3 border-b border-[#c9922a]/20 pb-2">
      <h2 className="flex items-center gap-2 font-cinzel text-lg font-bold tracking-wide text-[#f0c040]">
        {Icon ? <Icon size={18} /> : null}
        <span>{children}</span>
      </h2>
      {right ? <div>{right}</div> : null}
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="rounded-3xl border border-[#c9922a]/15 bg-[#1a0505]/95 p-5">
      <p className="font-garamond text-sm italic text-[#e8d5b5]/45">{text}</p>
    </div>
  );
}

function Pill({ children, tone = 'default' }) {
  const tones = {
    default: 'border-[#c9922a]/20 text-[#e8d5b5]/70 bg-[#1a0505]',
    green: 'border-emerald-500/20 text-emerald-300 bg-emerald-950/20',
    red: 'border-red-500/20 text-red-300 bg-red-950/20',
    yellow: 'border-yellow-500/20 text-yellow-300 bg-yellow-950/20',
    blue: 'border-sky-500/20 text-sky-300 bg-sky-950/20',
    purple: 'border-violet-500/20 text-violet-300 bg-violet-950/20',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-cinzel-reg text-[9px] uppercase tracking-[1.8px]',
        tones[tone] || tones.default
      )}
    >
      {children}
    </span>
  );
}

function formatDuration(seconds) {
  const total = Math.max(0, Math.round(Number(seconds || 0)));
  const mins = Math.floor(total / 60);
  const secs = total % 60;

  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}

function formatLargeNumber(value) {
  const num = Number(value || 0);
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return `${num}`;
}

function prettifyLabel(raw) {
  if (!raw) return 'Unknown';

  return raw
    .split('/')
    .filter(Boolean)
    .map((part) =>
      part.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    )
    .join(' / ');
}

function normalizePageTitle(page) {
  if (!page) return 'Unknown';

  if (page.slug === 'home') return 'Home';

  const stotramMeta = STOTRAMS_INDEX.find((s) => s.slug === page.slug);
  return stotramMeta?.title?.en || prettifyLabel(page.slug) || page.path || 'Unknown';
}

function ProgressRow({
  label,
  value,
  pct,
  accentClass = 'from-[#c9922a] to-[#f0c040]',
  sublabel,
  leftIcon,
}) {
  return (
    <div className="rounded-3xl border border-[#c9922a]/15 bg-[#1a0505]/95 p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {leftIcon ? <span className="text-sm">{leftIcon}</span> : null}
            <span className="truncate font-garamond text-base text-[#e8d5b5]">
              {label}
            </span>
          </div>
          {sublabel ? (
            <p className="mt-1 truncate font-cinzel-reg text-[9px] uppercase tracking-[1.5px] text-[#c9922a]/40">
              {sublabel}
            </p>
          ) : null}
        </div>

        <span className="font-cinzel text-sm font-bold text-[#f0c040]">
          {value}
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-[#c9922a]/10">
        <div
          className={cn('h-full rounded-full bg-gradient-to-r', accentClass)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [statsError, setStatsError] = useState('');

  const [liveUsers, setLiveUsers] = useState(0);
  const [users7d, setUsers7d] = useState(0);
  const [sessions7d, setSessions7d] = useState(0);
  const [pageViews7d, setPageViews7d] = useState(0);
  const [avgSessionDurationSec, setAvgSessionDurationSec] = useState(0);
  const [topPages, setTopPages] = useState([]);
  const [trafficSources, setTrafficSources] = useState([]);
  const [countries, setCountries] = useState([]);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const [secondsUntilRefresh, setSecondsUntilRefresh] = useState(
    AUTO_REFRESH_MS / 1000
  );
  const [stotramSearch, setStotramSearch] = useState('');
  const [hideInternalPages, setHideInternalPages] = useState(true);

  const fetchInFlightRef = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem('divya_admin') === 'true') {
      setAuthed(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASS || 'om108';

    if (password === correctPassword) {
      setAuthed(true);
      sessionStorage.setItem('divya_admin', 'true');
      setError('');
    } else {
      setError('Incorrect password. Try again.');
    }
  };

  const fetchAnalytics = async ({ silent = false, resetCountdown = true } = {}) => {
    if (fetchInFlightRef.current) return;

    fetchInFlightRef.current = true;

    try {
      if (silent) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setStatsError('');

      const res = await fetch('/api/admin/analytics', {
        method: 'GET',
        cache: 'no-store',
      });

      const contentType = res.headers.get('content-type') || '';
      const rawText = await res.text();

      let data = null;

      if (contentType.includes('application/json')) {
        try {
          data = JSON.parse(rawText);
        } catch {
          throw new Error('API returned invalid JSON.');
        }
      } else {
        throw new Error(
          `API returned non-JSON response (${res.status}). Check /api/admin/analytics route.`
        );
      }

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || 'Failed to load analytics.');
      }

      setLiveUsers(data.liveUsers || 0);
      setUsers7d(data.users7d || 0);
      setSessions7d(data.sessions7d || 0);
      setPageViews7d(data.pageViews7d || 0);
      setAvgSessionDurationSec(data.avgSessionDurationSec || 0);
      setTopPages(Array.isArray(data.topPages) ? data.topPages : []);
      setTrafficSources(
        Array.isArray(data.trafficSources) ? data.trafficSources : []
      );
      setCountries(Array.isArray(data.countries) ? data.countries : []);
      setLastRefresh(new Date(data.updatedAt || Date.now()));

      if (resetCountdown) {
        setSecondsUntilRefresh(AUTO_REFRESH_MS / 1000);
      }
    } catch (err) {
      console.error('Admin analytics fetch error:', err);
      setStatsError(err.message || 'Unable to fetch analytics.');
    } finally {
      fetchInFlightRef.current = false;
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!authed) return;

    fetchAnalytics();

    const interval = setInterval(() => {
      fetchAnalytics({ silent: true });
    }, AUTO_REFRESH_MS);

    return () => clearInterval(interval);
  }, [authed]);

  useEffect(() => {
    if (!authed) return;

    const countdown = setInterval(() => {
      setSecondsUntilRefresh((prev) => (prev <= 1 ? AUTO_REFRESH_MS / 1000 : prev - 1));
    }, 1000);

    return () => clearInterval(countdown);
  }, [authed]);

  useEffect(() => {
    if (!authed) return;

    const handleFocus = () => {
      fetchAnalytics({ silent: true, resetCountdown: true });
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        fetchAnalytics({ silent: true, resetCountdown: true });
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [authed]);

  const totalStotrams = STOTRAMS_INDEX.length;

  const availableDataSlugs = [
    'hanuman-chalisa',
    'durga-stotram',
    'shiva-tandav',
    'gayatri-mantra',
    'vishnu-sahasranamam',
    'mahalakshmi-ashtakam',
    'saraswati-vandana',
    'ganesh-aarti',
    'ram-raksha-stotram',
    'aditya-hridayam',
    'navagraha-stotram',
    'aigiri-nandini',
    'shiv-chalisa',
  ];

  const pagesWithData = STOTRAMS_INDEX.filter((s) =>
    availableDataSlugs.includes(s.slug)
  ).length;

  const filteredTopPages = useMemo(() => {
    let pages = Array.isArray(topPages) ? [...topPages] : [];

    if (hideInternalPages) {
      pages = pages.filter((page) => {
        const path = page?.path || '';
        const slug = page?.slug || '';

        return !(
          path.startsWith('/admin') ||
          slug === 'admin' ||
          path.startsWith('/api')
        );
      });
    }

    return pages;
  }, [topPages, hideInternalPages]);

  const visitsMap = useMemo(() => {
    const map = {};

    for (const page of filteredTopPages) {
      if (page?.slug) {
        map[page.slug] = page.views || 0;
      }
    }

    return map;
  }, [filteredTopPages]);

  const displayTopPages = useMemo(() => {
    return filteredTopPages.slice(0, 10);
  }, [filteredTopPages]);

  const filteredStotrams = useMemo(() => {
    const q = stotramSearch.trim().toLowerCase();

    return STOTRAMS_INDEX.filter((s) => {
      if (!q) return true;

      return (
        s.slug.toLowerCase().includes(q) ||
        s.title?.en?.toLowerCase().includes(q) ||
        s.language?.toLowerCase().includes(q)
      );
    });
  }, [stotramSearch]);

  const topCountry = countries?.[0];
  const topSource = trafficSources?.[0];
  const topPage = displayTopPages?.[0];
  const totalTrackedSessions = trafficSources.reduce(
    (sum, item) => sum + Number(item.sessions || 0),
    0
  );

  const organicShare = totalTrackedSessions
    ? Math.round(
        ((trafficSources.find((x) => x.source === 'Organic Search')?.sessions || 0) /
          totalTrackedSessions) *
          100
      )
    : 0;

  const engagementLabel =
    avgSessionDurationSec >= 240
      ? 'Strong'
      : avgSessionDurationSec >= 120
      ? 'Healthy'
      : 'Needs work';

  const seoChecklist = [
    { ok: true, text: `${totalStotrams} stotrams indexed in STOTRAMS_INDEX` },
    {
      ok: pagesWithData >= 13,
      text: `${pagesWithData}/13 stotrams have verse data files`,
    },
    { ok: true, text: 'Google Analytics 4 connected on public pages' },
    { ok: true, text: 'Google Search Console connected & sitemap submitted' },
    { ok: true, text: 'generateMetadata() used on stotram pages' },
    { ok: true, text: 'Canonical URLs set and indexable public pages enabled' },
    { ok: true, text: 'FAQ schema and JSON-LD present on content pages' },
    {
      ok: pagesWithData >= 25,
      text: `25+ pages target for AdSense (currently ${pagesWithData})`,
    },
  ];

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0d0000] bg-[radial-gradient(circle_at_top,rgba(201,146,42,0.10),transparent_28%),linear-gradient(to_bottom,#110101,#0d0000)]">
        <div className="w-full max-w-sm px-6">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl border border-[#c9922a]/20 bg-[#1a0505] shadow-[0_0_0_1px_rgba(201,146,42,0.08)]">
              <span className="text-3xl">🕉️</span>
            </div>

            <h1 className="font-cinzel text-3xl font-bold text-[#f0c040]">
              Divya Stotram
            </h1>
            <p className="mt-2 font-cinzel-reg text-[10px] uppercase tracking-[3px] text-[#c9922a]/60">
              Premium Admin Dashboard
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="rounded-3xl border border-[#c9922a]/20 bg-[#1a0505]/95 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
          >
            <div className="mb-4">
              <label className="mb-2 block font-cinzel-reg text-[10px] uppercase tracking-[2px] text-[#c9922a]/60">
                Enter Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full rounded-2xl border border-[#c9922a]/30 bg-[#120303] px-4 py-3 font-garamond text-base text-[#e8d5b5] placeholder-[#e8d5b5]/30 focus:border-[#f0c040]/60 focus:outline-none"
              />
            </div>

            {error && (
              <p className="mb-4 text-center font-garamond text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-[#c9922a] to-[#f0c040] py-3 font-cinzel text-sm font-bold tracking-widest text-[#0d0000] transition-transform hover:scale-[1.01]"
            >
              Enter Dashboard
            </button>
          </form>

          <p className="mt-6 text-center">
            <Link
              href="/"
              className="font-cinzel-reg text-[10px] tracking-widest text-[#c9922a]/50 transition-colors hover:text-[#c9922a]"
            >
              ← Back to Site
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0000] bg-[radial-gradient(circle_at_top,rgba(201,146,42,0.10),transparent_22%),linear-gradient(to_bottom,#110101,#0d0000)] px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 overflow-hidden rounded-[28px] border border-[#c9922a]/20 bg-[#140404]/95 shadow-[0_18px_60px_rgba(0,0,0,0.38)]">
          <div className="border-b border-[#c9922a]/10 bg-[linear-gradient(135deg,rgba(201,146,42,0.08),transparent_45%)] p-5 md:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#c9922a]/20 bg-[#1d0808]">
                    <ShieldCheck size={20} className="text-[#f0c040]" />
                  </div>

                  <div>
                    <h1 className="font-cinzel text-2xl font-bold text-[#f0c040] md:text-3xl">
                      Admin Dashboard
                    </h1>
                    <p className="mt-1 font-cinzel-reg text-[10px] uppercase tracking-[2.5px] text-[#c9922a]/55">
                      Divya Stotram · Last updated {lastRefresh.toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Pill tone={liveUsers > 0 ? 'green' : 'yellow'}>
                    <Radio
                      size={10}
                      className={liveUsers > 0 ? 'animate-pulse' : ''}
                    />
                    {liveUsers > 0 ? 'Live traffic detected' : 'No live traffic now'}
                  </Pill>

                  <Pill tone="blue">
                    <Clock3 size={10} />
                    Auto refresh in {secondsUntilRefresh}s
                  </Pill>

                  <Pill tone="purple">
                    <Sparkles size={10} />
                    Premium analytics mode
                  </Pill>
                </div>

                {statsError && (
                  <p className="mt-4 rounded-2xl border border-red-500/20 bg-red-950/30 px-4 py-3 font-garamond text-sm text-red-300">
                    {statsError}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => fetchAnalytics({ silent: true, resetCountdown: true })}
                  disabled={refreshing || loading}
                  className="flex items-center gap-2 rounded-full border border-[#c9922a]/20 bg-[#1a0505] px-4 py-2 font-cinzel-reg text-[10px] tracking-widest text-[#c9922a]/80 transition-colors hover:text-[#c9922a] disabled:opacity-50"
                  type="button"
                >
                  <RefreshCw
                    size={13}
                    className={refreshing || loading ? 'animate-spin' : ''}
                  />
                  Refresh
                </button>

                <button
                  onClick={() => setHideInternalPages((prev) => !prev)}
                  className="rounded-full border border-[#c9922a]/20 bg-[#1a0505] px-4 py-2 font-cinzel-reg text-[10px] tracking-widest text-[#c9922a]/80 transition-colors hover:text-[#c9922a]"
                  type="button"
                >
                  {hideInternalPages ? 'Showing Public Pages' : 'Showing All Pages'}
                </button>

                <Link
                  href="/"
                  className="flex items-center gap-2 rounded-full border border-[#c9922a]/20 bg-[#1a0505] px-4 py-2 font-cinzel-reg text-[10px] tracking-widest text-[#c9922a]/80 transition-colors hover:text-[#c9922a]"
                >
                  <ArrowLeft size={12} />
                  View Site
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-[#c9922a]/15 bg-[#1a0505]/95 p-4">
              <div className="mb-2 flex items-center gap-2 text-[#f0c040]">
                <Crown size={16} />
                <span className="font-cinzel text-sm">Top Page</span>
              </div>
              <p className="truncate font-garamond text-lg text-[#e8d5b5]">
                {topPage ? normalizePageTitle(topPage) : 'No data yet'}
              </p>
              <p className="mt-1 font-cinzel-reg text-[10px] uppercase tracking-[1.6px] text-[#c9922a]/45">
                {topPage ? `${topPage.views} views` : 'waiting for traffic'}
              </p>
            </div>

            <div className="rounded-3xl border border-[#c9922a]/15 bg-[#1a0505]/95 p-4">
              <div className="mb-2 flex items-center gap-2 text-[#60a5fa]">
                <Globe2 size={16} />
                <span className="font-cinzel text-sm">Top Country</span>
              </div>
              <p className="truncate font-garamond text-lg text-[#e8d5b5]">
                {topCountry?.country || 'No data yet'}
              </p>
              <p className="mt-1 font-cinzel-reg text-[10px] uppercase tracking-[1.6px] text-[#c9922a]/45">
                {topCountry ? `${topCountry.users} active users` : 'waiting for data'}
              </p>
            </div>

            <div className="rounded-3xl border border-[#c9922a]/15 bg-[#1a0505]/95 p-4">
              <div className="mb-2 flex items-center gap-2 text-[#c084fc]">
                <TrendingUp size={16} />
                <span className="font-cinzel text-sm">Best Channel</span>
              </div>
              <p className="truncate font-garamond text-lg text-[#e8d5b5]">
                {topSource?.source || 'No data yet'}
              </p>
              <p className="mt-1 font-cinzel-reg text-[10px] uppercase tracking-[1.6px] text-[#c9922a]/45">
                {topSource ? `${topSource.sessions} sessions` : 'waiting for data'}
              </p>
            </div>

            <div className="rounded-3xl border border-[#c9922a]/15 bg-[#1a0505]/95 p-4">
              <div className="mb-2 flex items-center gap-2 text-[#4ade80]">
                <Flame size={16} />
                <span className="font-cinzel text-sm">Organic Share</span>
              </div>
              <p className="truncate font-garamond text-lg text-[#e8d5b5]">
                {organicShare}%
              </p>
              <p className="mt-1 font-cinzel-reg text-[10px] uppercase tracking-[1.6px] text-[#c9922a]/45">
                Search-driven traffic mix
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-[#c9922a]/15 bg-[#1a0505]/95 p-8 text-center">
            <p className="font-garamond text-lg text-[#e8d5b5]/70">
              Loading real Google Analytics data...
            </p>
          </div>
        ) : (
          <>
            <SectionTitle
              icon={Activity}
              right={
                <Pill tone={liveUsers > 0 ? 'green' : 'yellow'}>
                  <MonitorSmartphone size={10} />
                  Realtime updates every 10s
                </Pill>
              }
            >
              Live Performance Overview
            </SectionTitle>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
              <StatCard
                icon={Radio}
                title="Live Now"
                value={liveUsers}
                subtitle="Realtime active users"
                accent="#4ade80"
                glow={liveUsers > 0}
              />
              <StatCard
                icon={Users}
                title="Users (7d)"
                value={formatLargeNumber(users7d)}
                subtitle="Active users"
                accent="#f0c040"
              />
              <StatCard
                icon={TrendingUp}
                title="Sessions (7d)"
                value={formatLargeNumber(sessions7d)}
                subtitle="Traffic sessions"
                accent="#fb7185"
              />
              <StatCard
                icon={Eye}
                title="Page Views (7d)"
                value={formatLargeNumber(pageViews7d)}
                subtitle="Content views"
                accent="#60a5fa"
              />
              <StatCard
                icon={TimerReset}
                title="Avg Session"
                value={formatDuration(avgSessionDurationSec)}
                subtitle={`${engagementLabel} engagement`}
                accent="#a78bfa"
              />
              <StatCard
                icon={Star}
                title="Pages Ready"
                value={pagesWithData}
                subtitle="Content count"
                accent="#f472b6"
              />
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-3">
              <div className="xl:col-span-2">
                <SectionTitle icon={BookOpen}>Top Pages by Views</SectionTitle>
                {displayTopPages.length === 0 ? (
                  <EmptyState text="No page view rows returned from GA4 yet." />
                ) : (
                  <div className="grid gap-3 md:grid-cols-2">
                    {displayTopPages.map((page, index) => {
                      const topValue = displayTopPages[0]?.views || 1;
                      const pct = Math.max(
                        8,
                        Math.round(((page.views || 0) / topValue) * 100)
                      );

                      const stotramMeta =
                        page.slug === 'home'
                          ? { deityEmoji: '🏠', title: { en: 'Home' } }
                          : STOTRAMS_INDEX.find((s) => s.slug === page.slug);

                      const title =
                        stotramMeta?.title?.en ||
                        prettifyLabel(page.slug) ||
                        page.path ||
                        'Unknown';

                      return (
                        <ProgressRow
                          key={`${page.path}-${index}`}
                          label={`#${index + 1} ${title}`}
                          value={page.views}
                          pct={pct}
                          sublabel={page.path || '/'}
                          leftIcon={stotramMeta?.deityEmoji || '📄'}
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              <div>
                <SectionTitle icon={Sparkles}>Quick Insights</SectionTitle>
                <div className="space-y-3">
                  <div className="rounded-3xl border border-[#c9922a]/15 bg-[#1a0505]/95 p-4">
                    <div className="mb-2 flex items-center gap-2 text-[#f0c040]">
                      <CheckCircle2 size={16} />
                      <span className="font-cinzel text-sm">What looks strong</span>
                    </div>
                    <p className="font-garamond text-base leading-6 text-[#e8d5b5]/85">
                      Organic traffic is leading, engagement time is{' '}
                      <span className="text-[#f0c040]">
                        {formatDuration(avgSessionDurationSec)}
                      </span>
                      , and your top devotional pages are already getting traction.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-[#c9922a]/15 bg-[#1a0505]/95 p-4">
                    <div className="mb-2 flex items-center gap-2 text-[#60a5fa]">
                      <Globe2 size={16} />
                      <span className="font-cinzel text-sm">Audience spread</span>
                    </div>
                    <p className="font-garamond text-base leading-6 text-[#e8d5b5]/85">
                      Top audience is from{' '}
                      <span className="text-[#f0c040]">
                        {topCountry?.country || 'N/A'}
                      </span>
                      . Keep expanding SEO pages around high-intent devotional searches.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-[#c9922a]/15 bg-[#1a0505]/95 p-4">
                    <div className="mb-2 flex items-center gap-2 text-[#c084fc]">
                      <BookOpen size={16} />
                      <span className="font-cinzel text-sm">Best next move</span>
                    </div>
                    <p className="font-garamond text-base leading-6 text-[#e8d5b5]/85">
                      Add more intent pages like mantra for job, marriage, health,
                      money, exam, travel, protection, and daily prayer routines.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div>
                <SectionTitle icon={BarChart3}>Traffic Sources</SectionTitle>
                {trafficSources.length === 0 ? (
                  <EmptyState text="No traffic source data returned yet." />
                ) : (
                  <div className="space-y-3">
                    {trafficSources.map((item, index) => {
                      const topValue = trafficSources[0]?.sessions || 1;
                      const pct = Math.max(
                        8,
                        Math.round(((item.sessions || 0) / topValue) * 100)
                      );

                      return (
                        <ProgressRow
                          key={`${item.source}-${index}`}
                          label={item.source}
                          value={item.sessions}
                          pct={pct}
                          accentClass="from-[#7c3aed] to-[#c084fc]"
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              <div>
                <SectionTitle icon={Globe2}>Top Countries</SectionTitle>
                {countries.length === 0 ? (
                  <EmptyState text="No country-level data returned yet." />
                ) : (
                  <div className="space-y-3">
                    {countries.map((item, index) => {
                      const topValue = countries[0]?.users || 1;
                      const pct = Math.max(
                        8,
                        Math.round(((item.users || 0) / topValue) * 100)
                      );

                      return (
                        <ProgressRow
                          key={`${item.country}-${index}`}
                          label={item.country}
                          value={item.users}
                          pct={pct}
                          accentClass="from-[#0ea5e9] to-[#38bdf8]"
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <SectionTitle
              icon={BookOpen}
              right={
                <div className="flex items-center gap-2 rounded-full border border-[#c9922a]/15 bg-[#1a0505] px-3 py-1.5">
                  <Search size={13} className="text-[#c9922a]/60" />
                  <input
                    value={stotramSearch}
                    onChange={(e) => setStotramSearch(e.target.value)}
                    placeholder="Search stotram..."
                    className="w-32 bg-transparent font-garamond text-sm text-[#e8d5b5] placeholder:text-[#e8d5b5]/30 focus:outline-none md:w-44"
                  />
                </div>
              }
            >
              Stotram Content Status
            </SectionTitle>

            <div className="grid gap-3 md:grid-cols-2">
              {filteredStotrams.map((s) => {
                const visits = visitsMap[s.slug] || 0;

                return (
                  <Link
                    key={s.slug}
                    href={`/${s.slug}`}
                    target="_blank"
                    className="group rounded-3xl border border-[#c9922a]/15 bg-[#1a0505]/95 p-4 transition-all hover:-translate-y-0.5 hover:border-[#c9922a]/35"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{s.deityEmoji}</span>
                          <p className="truncate font-cinzel text-sm font-bold text-[#f0c040] group-hover:text-[#e8d5b5]">
                            {s.title.en}
                          </p>
                        </div>
                        <p className="mt-1 pl-8 font-cinzel-reg text-[9px] uppercase tracking-[1.5px] text-[#c9922a]/50">
                          {s.language} · {s.verseCount} verses
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-cinzel text-sm font-bold text-[#e8d5b5]">
                          {visits}
                        </p>
                        <p className="font-cinzel-reg text-[9px] text-[#c9922a]/40">
                          views
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[#c9922a]/45">
                      <span className="font-cinzel-reg text-[9px] uppercase tracking-[1.5px]">
                        Open page
                      </span>
                      <ChevronRight size={14} />
                    </div>
                  </Link>
                );
              })}
            </div>

            <SectionTitle icon={ShieldCheck}>SEO & AdSense Readiness</SectionTitle>
            <div className="grid gap-3">
              {seoChecklist.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-3xl border border-[#c9922a]/15 bg-[#1a0505]/95 p-4"
                >
                  <div className="mt-0.5">
                    {item.ok ? (
                      <ShieldCheck size={18} className="text-green-400" />
                    ) : (
                      <Activity size={18} className="text-yellow-400" />
                    )}
                  </div>
                  <p className="font-garamond text-base text-[#e8d5b5]/80">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <SectionTitle icon={ExternalLink}>Quick Links</SectionTitle>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                {
                  label: 'Google Analytics',
                  href: 'https://analytics.google.com',
                  icon: '📈',
                },
                {
                  label: 'Search Console',
                  href: 'https://search.google.com/search-console',
                  icon: '🔍',
                },
                {
                  label: 'Vercel',
                  href: 'https://vercel.com/dashboard',
                  icon: '▲',
                },
                { label: 'Homepage', href: '/', icon: '🏠' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="rounded-3xl border border-[#c9922a]/15 bg-[#1a0505]/95 p-4 text-center transition-all hover:-translate-y-0.5 hover:border-[#c9922a]/35"
                >
                  <div className="mb-1 text-2xl">{item.icon}</div>
                  <p className="font-cinzel-reg text-[10px] tracking-widest text-[#c9922a]/70">
                    {item.label}
                  </p>
                </a>
              ))}
            </div>

            <div className="mt-12 flex items-center justify-between border-t border-[#c9922a]/10 pt-6">
              <p className="font-cinzel-reg text-[9px] uppercase tracking-[2px] text-[#c9922a]/30">
                Divya Stotram Admin · {new Date().getFullYear()}
              </p>

              <button
                onClick={() => {
                  sessionStorage.removeItem('divya_admin');
                  setAuthed(false);
                }}
                className="font-cinzel-reg text-[9px] tracking-widest text-red-900/60 transition-colors hover:text-red-500/80"
                type="button"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}