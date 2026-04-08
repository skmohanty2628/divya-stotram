'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Eye,
  Users,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  BookOpen,
  Star,
} from 'lucide-react';
import { getDatabase, onValue, ref } from 'firebase/database';
import { getApps, initializeApp } from 'firebase/app';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';

/* ─── sub-components ─────────────────────────────────────────────────────── */

function StatCard({ icon: Icon, title, value, subtitle, accent = '#f0c040' }) {
  return (
    <div className="bg-[#1a0505] border border-[#c9922a]/20 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <Icon size={18} style={{ color: accent }} />
        <span className="font-cinzel-reg text-[9px] tracking-[2px] uppercase text-[#e8d5b5]/40">
          {title}
        </span>
      </div>
      <p className="font-cinzel text-2xl font-bold break-words" style={{ color: accent }}>
        {value}
      </p>
      <p className="font-garamond text-sm text-[#e8d5b5]/60 mt-1">{subtitle}</p>
    </div>
  );
}

function ChecklistItem({ ok, text }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-[#c9922a]/15 bg-[#140404] p-4">
      {ok ? (
        <CheckCircle2 className="text-green-400 mt-0.5 flex-shrink-0" size={18} />
      ) : (
        <AlertTriangle className="text-yellow-400 mt-0.5 flex-shrink-0" size={18} />
      )}
      <p className="font-garamond text-base text-[#e8d5b5]/80">{text}</p>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="font-cinzel text-lg font-bold text-[#f0c040] mt-8 mb-3 tracking-wide border-b border-[#c9922a]/20 pb-2">
      {children}
    </h2>
  );
}

/* ─── main component ─────────────────────────────────────────────────────── */

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState('');

  const [liveVisitors, setLiveVisitors] = useState(0);
  const [pageVisits, setPageVisits] = useState({});
  const [totalVisits, setTotalVisits] = useState(0);
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

  useEffect(() => {
    if (!authed) return;

    try {
      const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      };

      if (
        !firebaseConfig.apiKey ||
        !firebaseConfig.databaseURL ||
        !firebaseConfig.projectId ||
        !firebaseConfig.appId
      ) {
        console.error('Firebase config missing');
        return;
      }

      const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
      const db = getDatabase(app);

      const unsubscribers = [];

      // 1) Live presence from /presence
      const unsubPresence = onValue(ref(db, 'presence'), (snap) => {
        const data = snap.val() || {};
        let total = 0;

        Object.values(data).forEach((pageValue) => {
          if (pageValue && typeof pageValue === 'object') {
            total += Object.keys(pageValue).length;
          }
        });

        setLiveVisitors(total);
        setLastRefresh(new Date());
      });

      unsubscribers.push(unsubPresence);

      // 2) Per-page visits from /pageViews
      const unsubPageViews = onValue(ref(db, 'pageViews'), (snap) => {
        setPageVisits(snap.val() || {});
        setLastRefresh(new Date());
      });

      unsubscribers.push(unsubPageViews);

      // 3) Total visits from /stats/totalVisits
      const unsubTotal = onValue(ref(db, 'stats/totalVisits'), (snap) => {
        setTotalVisits(snap.val() || 0);
        setLastRefresh(new Date());
      });

      unsubscribers.push(unsubTotal);

      return () => {
        unsubscribers.forEach((unsub) => {
          if (typeof unsub === 'function') unsub();
        });
      };
    } catch (err) {
      console.error('Firebase error:', err);
    }
  }, [authed]);

  const totalPageViews = useMemo(
    () => Object.values(pageVisits).reduce((a, b) => a + b, 0),
    [pageVisits]
  );

  const topPages = useMemo(
    () =>
      Object.entries(pageVisits)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10),
    [pageVisits]
  );

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

  const seoChecklist = [
    { ok: true, text: `${totalStotrams} stotrams indexed in STOTRAMS_INDEX` },
    { ok: pagesWithData >= 13, text: `${pagesWithData}/13 stotrams have verse data files` },
    { ok: true, text: 'Google Analytics 4 configured on all pages' },
    { ok: true, text: 'Google Search Console connected & sitemap submitted' },
    { ok: true, text: 'generateMetadata() used on all stotram pages (SSR SEO)' },
    { ok: true, text: 'Odia-language content — unique SEO advantage (low competition)' },
    { ok: true, text: 'FAQ schema (JSON-LD) injected on every stotram page' },
    { ok: true, text: 'robots.js configured, sitemap.js auto-generates all slugs' },
    { ok: true, text: 'Breadcrumb navigation added on stotram pages' },
    { ok: true, text: 'Canonical URLs set via generateMetadata alternates' },
    { ok: pagesWithData >= 25, text: `${pagesWithData >= 25 ? '✅' : '⏳'} 25+ pages required for AdSense (currently ${pagesWithData})` },
    { ok: false, text: 'AdSense application — pending (apply after 25+ pages indexed)' },
  ];

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0d0000' }}>
        <div className="w-full max-w-sm px-6">
          <div className="text-center mb-8">
            <p className="text-4xl mb-3">🕉️</p>
            <h1 className="font-cinzel text-2xl font-bold text-[#f0c040]">Divya Stotram</h1>
            <p className="font-cinzel-reg text-[10px] tracking-[3px] uppercase text-[#c9922a]/60 mt-1">
              Admin Dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full bg-[#1a0505] border border-[#c9922a]/30 rounded-xl px-4 py-3 text-[#e8d5b5] font-garamond text-base placeholder-[#e8d5b5]/30 focus:outline-none focus:border-[#f0c040]/60"
            />

            {error && (
              <p className="font-garamond text-sm text-red-400 text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#c9922a] hover:bg-[#f0c040] text-[#0d0000] font-cinzel font-bold text-sm tracking-widest py-3 rounded-xl transition-colors"
            >
              Enter Dashboard
            </button>
          </form>

          <p className="text-center mt-6">
            <Link
              href="/"
              className="font-cinzel-reg text-[10px] tracking-widest text-[#c9922a]/50 hover:text-[#c9922a] transition-colors"
            >
              ← Back to Site
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 max-w-5xl mx-auto" style={{ background: '#0d0000' }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-cinzel text-2xl font-bold text-[#f0c040]">Admin Dashboard</h1>
          <p className="font-cinzel-reg text-[9px] tracking-[2px] uppercase text-[#c9922a]/50 mt-1">
            Divya Stotram · Last updated {lastRefresh.toLocaleTimeString()}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLastRefresh(new Date())}
            className="flex items-center gap-1.5 text-[#c9922a]/60 hover:text-[#c9922a] transition-colors"
            title="Refresh"
            type="button"
          >
            <RefreshCw size={14} />
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 font-cinzel-reg text-[10px] tracking-widest text-[#c9922a]/60 hover:text-[#c9922a] transition-colors border border-[#c9922a]/20 rounded-full px-3 py-1.5"
          >
            <ArrowLeft size={12} /> View Site
          </Link>
        </div>
      </div>

      <SectionTitle>📊 Live Statistics</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-2">
        <StatCard icon={Users} title="Live Now" value={liveVisitors} subtitle="Active visitors" accent="#4ade80" />
        <StatCard icon={Eye} title="Total Visits" value={totalVisits || 0} subtitle="All visits" />
        <StatCard icon={BookOpen} title="Page Views Sum" value={totalPageViews || 0} subtitle="From pageViews" accent="#60a5fa" />
        <StatCard icon={Star} title="With Data" value={pagesWithData} subtitle="Need 25 for AdSense" accent="#f472b6" />
      </div>

      <SectionTitle>🏆 Top Pages by Views</SectionTitle>
      {topPages.length === 0 ? (
        <p className="font-garamond text-[#e8d5b5]/40 text-sm italic">
          No page visit data yet. Visit some stotram pages to start tracking.
        </p>
      ) : (
        <div className="space-y-2">
          {topPages.map(([slug, count], i) => {
            const meta = STOTRAMS_INDEX.find((s) => s.slug === slug);
            const pct = topPages[0]?.[1] ? Math.round((count / topPages[0][1]) * 100) : 0;

            return (
              <div key={slug} className="bg-[#1a0505] border border-[#c9922a]/15 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-cinzel text-[10px] text-[#c9922a]/50 w-5">#{i + 1}</span>
                    <span className="font-garamond text-base text-[#e8d5b5]">
                      {meta?.deityEmoji} {meta?.title?.en || slug}
                    </span>
                  </div>
                  <span className="font-cinzel text-sm font-bold text-[#f0c040]">{count}</span>
                </div>

                <div className="h-1.5 bg-[#c9922a]/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#c9922a] to-[#f0c040] rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <SectionTitle>📚 Stotrams Content Status</SectionTitle>
      <div className="grid sm:grid-cols-2 gap-3">
        {STOTRAMS_INDEX.map((s) => {
          const visits = pageVisits[s.slug] || (s.slug === 'home' ? pageVisits.home || 0 : 0);

          return (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              target="_blank"
              className="bg-[#1a0505] border border-[#c9922a]/15 hover:border-[#c9922a]/40 rounded-xl p-4 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xl flex-shrink-0">{s.deityEmoji}</span>
                  <div className="min-w-0">
                    <p className="font-cinzel text-sm font-bold text-[#f0c040] truncate group-hover:text-[#e8d5b5] transition-colors">
                      {s.title.en}
                    </p>
                    <p className="font-cinzel-reg text-[9px] tracking-[1.5px] uppercase text-[#c9922a]/50">
                      {s.language} · {s.verseCount} verses
                    </p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 ml-2">
                  <p className="font-cinzel text-sm font-bold text-[#e8d5b5]">{visits}</p>
                  <p className="font-cinzel-reg text-[9px] text-[#c9922a]/40">views</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <SectionTitle>🔍 SEO & AdSense Checklist</SectionTitle>
      <div className="space-y-2">
        {seoChecklist.map((item, i) => (
          <ChecklistItem key={i} ok={item.ok} text={item.text} />
        ))}
      </div>

      <SectionTitle>💰 AdSense Roadmap</SectionTitle>
      <div className="bg-[#1a0505] border border-[#c9922a]/20 rounded-xl p-5 space-y-4">
        {[
          {
            phase: '✅ Phase 1',
            title: 'Foundation Complete',
            items: [
              'Site live on divyastotram.com',
              'GA4 + Search Console active',
              '13 stotrams with multilingual content',
              'SEO meta + FAQ schema on all pages',
            ],
          },
          {
            phase: '🔄 Phase 2',
            title: `Content Threshold (${pagesWithData}/25 pages)`,
            items: [
              'Add 12+ more stotrams to reach 25+ pages',
              'Share in WhatsApp/Facebook Odia groups',
              'Leverage Odia-language SEO advantage',
              'Get pages indexed in Google Search Console',
            ],
          },
          {
            phase: '⏳ Phase 3',
            title: 'Apply for AdSense',
            items: [
              'Apply once 25+ pages are live and indexed',
              'Ensure all pages have original content',
              'Privacy Policy, About, Contact pages present',
              'Expected approval: 2-4 weeks after apply',
            ],
          },
        ].map((step) => (
          <div key={step.phase} className="border-l-2 border-[#c9922a]/30 pl-4">
            <p className="font-cinzel text-sm font-bold text-[#f0c040]">
              {step.phase} — {step.title}
            </p>
            <ul className="mt-2 space-y-1">
              {step.items.map((item) => (
                <li key={item} className="font-garamond text-sm text-[#e8d5b5]/70">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <SectionTitle>🔗 Quick Links</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Google Analytics', href: 'https://analytics.google.com', icon: '📈' },
          { label: 'Search Console', href: 'https://search.google.com/search-console', icon: '🔍' },
          { label: 'Firebase', href: 'https://console.firebase.google.com', icon: '🔥' },
          { label: 'Vercel', href: 'https://vercel.com/dashboard', icon: '▲' },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1a0505] border border-[#c9922a]/15 hover:border-[#c9922a]/40 rounded-xl p-4 text-center transition-all"
          >
            <p className="text-2xl mb-1">{link.icon}</p>
            <p className="font-cinzel-reg text-[10px] tracking-widest text-[#c9922a]/70">
              {link.label}
            </p>
          </a>
        ))}
      </div>

      <div className="mt-12 pt-6 border-t border-[#c9922a]/10 flex items-center justify-between">
        <p className="font-cinzel-reg text-[9px] tracking-[2px] uppercase text-[#c9922a]/30">
          Divya Stotram Admin · {new Date().getFullYear()}
        </p>
        <button
          onClick={() => {
            sessionStorage.removeItem('divya_admin');
            setAuthed(false);
          }}
          className="font-cinzel-reg text-[9px] tracking-widest text-red-900/60 hover:text-red-500/80 transition-colors"
          type="button"
        >
          Logout
        </button>
      </div>
    </div>
  );
}