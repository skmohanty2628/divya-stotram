'use client';

import { useEffect, useMemo, useState } from 'react';
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
} from 'lucide-react';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';

function StatCard({ icon: Icon, title, value, subtitle, accent = '#f0c040' }) {
  return (
    <div className="rounded-2xl border border-[#c9922a]/20 bg-[#1a0505] p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <Icon size={18} style={{ color: accent }} />
        <span className="font-cinzel-reg text-[9px] uppercase tracking-[2px] text-[#e8d5b5]/40">
          {title}
        </span>
      </div>

      <div
        className="font-cinzel text-2xl font-bold break-words"
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

function SectionTitle({ icon: Icon, children }) {
  return (
    <h2 className="mt-8 mb-3 flex items-center gap-2 border-b border-[#c9922a]/20 pb-2 font-cinzel text-lg font-bold tracking-wide text-[#f0c040]">
      {Icon ? <Icon size={18} /> : null}
      <span>{children}</span>
    </h2>
  );
}

function EmptyState({ text }) {
  return (
    <div className="rounded-2xl border border-[#c9922a]/15 bg-[#1a0505] p-5">
      <p className="font-garamond text-sm italic text-[#e8d5b5]/45">{text}</p>
    </div>
  );
}

function formatDuration(seconds) {
  const total = Math.max(0, Math.round(Number(seconds || 0)));
  const mins = Math.floor(total / 60);
  const secs = total % 60;

  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}

function prettifyLabel(raw) {
  if (!raw) return 'Unknown';

  return raw
    .split('/')
    .filter(Boolean)
    .map((part) =>
      part
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())
    )
    .join(' / ');
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

  const fetchAnalytics = async ({ silent = false } = {}) => {
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

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Failed to load analytics.');
      }

      setLiveUsers(data.liveUsers || 0);
      setUsers7d(data.users7d || 0);
      setSessions7d(data.sessions7d || 0);
      setPageViews7d(data.pageViews7d || 0);
      setAvgSessionDurationSec(data.avgSessionDurationSec || 0);
      setTopPages(Array.isArray(data.topPages) ? data.topPages : []);
      setTrafficSources(Array.isArray(data.trafficSources) ? data.trafficSources : []);
      setCountries(Array.isArray(data.countries) ? data.countries : []);
      setLastRefresh(new Date(data.updatedAt || Date.now()));
    } catch (err) {
      console.error('Admin analytics fetch error:', err);
      setStatsError(err.message || 'Unable to fetch analytics.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!authed) return;

    fetchAnalytics();

    const interval = setInterval(() => {
      fetchAnalytics({ silent: true });
    }, 60 * 1000);

    return () => clearInterval(interval);
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

  const visitsMap = useMemo(() => {
    const map = {};

    for (const page of topPages) {
      if (page?.slug) {
        map[page.slug] = page.views || 0;
      }
    }

    return map;
  }, [topPages]);

  const displayTopPages = useMemo(() => {
    return topPages.slice(0, 10);
  }, [topPages]);

  const seoChecklist = [
    { ok: true, text: `${totalStotrams} stotrams indexed in STOTRAMS_INDEX` },
    { ok: pagesWithData >= 13, text: `${pagesWithData}/13 stotrams have verse data files` },
    { ok: true, text: 'Google Analytics 4 connected on public pages' },
    { ok: true, text: 'Google Search Console connected & sitemap submitted' },
    { ok: true, text: 'generateMetadata() used on stotram pages' },
    { ok: true, text: 'Canonical URLs set and indexable public pages enabled' },
    { ok: true, text: 'FAQ schema and JSON-LD present on content pages' },
    { ok: pagesWithData >= 25, text: `25+ pages target for AdSense (currently ${pagesWithData})` },
  ];

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0000]">
        <div className="w-full max-w-sm px-6">
          <div className="mb-8 text-center">
            <p className="mb-3 text-4xl">🕉️</p>
            <h1 className="font-cinzel text-2xl font-bold text-[#f0c040]">
              Divya Stotram
            </h1>
            <p className="mt-1 font-cinzel-reg text-[10px] uppercase tracking-[3px] text-[#c9922a]/60">
              Professional Admin Dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full rounded-xl border border-[#c9922a]/30 bg-[#1a0505] px-4 py-3 font-garamond text-base text-[#e8d5b5] placeholder-[#e8d5b5]/30 focus:border-[#f0c040]/60 focus:outline-none"
            />

            {error && (
              <p className="text-center font-garamond text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-[#c9922a] py-3 font-cinzel text-sm font-bold tracking-widest text-[#0d0000] transition-colors hover:bg-[#f0c040]"
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
    <div className="min-h-screen bg-[#0d0000] px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-[#f0c040]" />
              <h1 className="font-cinzel text-2xl font-bold text-[#f0c040]">
                Admin Dashboard
              </h1>
            </div>

            <p className="mt-1 font-cinzel-reg text-[9px] uppercase tracking-[2px] text-[#c9922a]/50">
              Divya Stotram · Last updated {lastRefresh.toLocaleTimeString()}
            </p>

            {statsError && (
              <p className="mt-3 rounded-lg border border-red-500/20 bg-red-950/30 px-3 py-2 font-garamond text-sm text-red-300">
                {statsError}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchAnalytics({ silent: true })}
              disabled={refreshing || loading}
              className="flex items-center gap-2 rounded-full border border-[#c9922a]/20 px-3 py-1.5 font-cinzel-reg text-[10px] tracking-widest text-[#c9922a]/70 transition-colors hover:text-[#c9922a] disabled:opacity-50"
              type="button"
            >
              <RefreshCw
                size={13}
                className={refreshing || loading ? 'animate-spin' : ''}
              />
              Refresh
            </button>

            <Link
              href="/"
              className="flex items-center gap-2 rounded-full border border-[#c9922a]/20 px-3 py-1.5 font-cinzel-reg text-[10px] tracking-widest text-[#c9922a]/70 transition-colors hover:text-[#c9922a]"
            >
              <ArrowLeft size={12} />
              View Site
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-[#c9922a]/15 bg-[#1a0505] p-8 text-center">
            <p className="font-garamond text-lg text-[#e8d5b5]/70">
              Loading real Google Analytics data...
            </p>
          </div>
        ) : (
          <>
            <SectionTitle icon={Activity}>Live Performance Overview</SectionTitle>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
              <StatCard
                icon={Radio}
                title="Live Now"
                value={liveUsers}
                subtitle="Realtime active users"
                accent="#4ade80"
              />
              <StatCard
                icon={Users}
                title="Users (7d)"
                value={users7d}
                subtitle="Active users"
                accent="#f0c040"
              />
              <StatCard
                icon={TrendingUp}
                title="Sessions (7d)"
                value={sessions7d}
                subtitle="Traffic sessions"
                accent="#fb7185"
              />
              <StatCard
                icon={Eye}
                title="Page Views (7d)"
                value={pageViews7d}
                subtitle="Content views"
                accent="#60a5fa"
              />
              <StatCard
                icon={TimerReset}
                title="Avg Session"
                value={formatDuration(avgSessionDurationSec)}
                subtitle="Engagement time"
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

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div>
                <SectionTitle icon={BookOpen}>Top Pages by Views</SectionTitle>
                {displayTopPages.length === 0 ? (
                  <EmptyState text="No page view rows returned from GA4 yet." />
                ) : (
                  <div className="space-y-2">
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
                        <div
                          key={`${page.path}-${index}`}
                          className="rounded-2xl border border-[#c9922a]/15 bg-[#1a0505] p-4"
                        >
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="w-5 font-cinzel text-[10px] text-[#c9922a]/50">
                                  #{index + 1}
                                </span>
                                <span className="truncate font-garamond text-base text-[#e8d5b5]">
                                  {stotramMeta?.deityEmoji} {title}
                                </span>
                              </div>
                              <p className="mt-1 truncate pl-7 font-cinzel-reg text-[9px] uppercase tracking-[1.5px] text-[#c9922a]/40">
                                {page.path || '/'}
                              </p>
                            </div>

                            <span className="font-cinzel text-sm font-bold text-[#f0c040]">
                              {page.views}
                            </span>
                          </div>

                          <div className="h-1.5 overflow-hidden rounded-full bg-[#c9922a]/10">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[#c9922a] to-[#f0c040]"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div>
                <SectionTitle icon={BarChart3}>Traffic Sources</SectionTitle>
                {trafficSources.length === 0 ? (
                  <EmptyState text="No traffic source data returned yet." />
                ) : (
                  <div className="space-y-2">
                    {trafficSources.map((item, index) => {
                      const topValue = trafficSources[0]?.sessions || 1;
                      const pct = Math.max(
                        8,
                        Math.round(((item.sessions || 0) / topValue) * 100)
                      );

                      return (
                        <div
                          key={`${item.source}-${index}`}
                          className="rounded-2xl border border-[#c9922a]/15 bg-[#1a0505] p-4"
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <span className="font-garamond text-base text-[#e8d5b5]">
                              {item.source}
                            </span>
                            <span className="font-cinzel text-sm font-bold text-[#f0c040]">
                              {item.sessions}
                            </span>
                          </div>

                          <div className="h-1.5 overflow-hidden rounded-full bg-[#c9922a]/10">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[#7c3aed] to-[#c084fc]"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div>
                <SectionTitle icon={Globe2}>Top Countries</SectionTitle>
                {countries.length === 0 ? (
                  <EmptyState text="No country-level data returned yet." />
                ) : (
                  <div className="space-y-2">
                    {countries.map((item, index) => {
                      const topValue = countries[0]?.users || 1;
                      const pct = Math.max(
                        8,
                        Math.round(((item.users || 0) / topValue) * 100)
                      );

                      return (
                        <div
                          key={`${item.country}-${index}`}
                          className="rounded-2xl border border-[#c9922a]/15 bg-[#1a0505] p-4"
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <span className="font-garamond text-base text-[#e8d5b5]">
                              {item.country}
                            </span>
                            <span className="font-cinzel text-sm font-bold text-[#f0c040]">
                              {item.users}
                            </span>
                          </div>

                          <div className="h-1.5 overflow-hidden rounded-full bg-[#c9922a]/10">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8]"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div>
                <SectionTitle icon={BookOpen}>Stotram Content Status</SectionTitle>
                <div className="grid gap-2">
                  {STOTRAMS_INDEX.map((s) => {
                    const visits = visitsMap[s.slug] || 0;

                    return (
                      <Link
                        key={s.slug}
                        href={`/${s.slug}`}
                        target="_blank"
                        className="group rounded-2xl border border-[#c9922a]/15 bg-[#1a0505] p-4 transition-all hover:border-[#c9922a]/35"
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
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            <SectionTitle icon={ShieldCheck}>SEO & AdSense Readiness</SectionTitle>
            <div className="grid gap-2">
              {seoChecklist.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-2xl border border-[#c9922a]/15 bg-[#1a0505] p-4"
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
                { label: 'Google Analytics', href: 'https://analytics.google.com', icon: '📈' },
                { label: 'Search Console', href: 'https://search.google.com/search-console', icon: '🔍' },
                { label: 'Vercel', href: 'https://vercel.com/dashboard', icon: '▲' },
                { label: 'Homepage', href: '/', icon: '🏠' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-[#c9922a]/15 bg-[#1a0505] p-4 text-center transition-all hover:border-[#c9922a]/35"
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