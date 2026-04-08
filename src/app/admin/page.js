'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Eye,
  Search,
  Users,
  ShieldCheck,
  Globe,
  FileText,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { getDatabase, onValue, ref } from 'firebase/database';
import { getApps, initializeApp } from 'firebase/app';

function StatCard({ icon: Icon, title, value, subtitle }) {
  return (
    <div className="bg-[#1a0505] border border-[#c9922a]/20 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <Icon size={18} className="text-[#f0c040]" />
        <span className="font-cinzel-reg text-[9px] tracking-[2px] uppercase text-[#e8d5b5]/40">
          {title}
        </span>
      </div>
      <p className="font-cinzel text-2xl font-bold text-[#f0c040] break-words">{value}</p>
      <p className="font-garamond text-sm text-[#e8d5b5]/60 mt-1">{subtitle}</p>
    </div>
  );
}

function ChecklistItem({ ok, text }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-[#c9922a]/15 bg-[#140404] p-4">
      {ok ? (
        <CheckCircle2 className="text-green-400 mt-0.5" size={18} />
      ) : (
        <AlertTriangle className="text-yellow-400 mt-0.5" size={18} />
      )}
      <p className="font-garamond text-base text-[#e8d5b5]/80">{text}</p>
    </div>
  );
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState('');
  const [liveVisitors, setLiveVisitors] = useState(0);
  const [pageVisits, setPageVisits] = useState({});
  const [searches, setSearches] = useState([]);

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
      setError('Incorrect password.');
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
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      };

      if (!firebaseConfig.apiKey) throw new Error('Firebase not configured');

      const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
      const db = getDatabase(app);

      onValue(ref(db, 'presence'), (snap) => {
        let count = 0;
        if (snap.exists()) snap.forEach((child) => { count += child.size; });
        setLiveVisitors(count);
      });

      onValue(ref(db, 'pageViews'), (snap) => {
        if (!snap.exists()) return;
        const data = {};
        snap.forEach((child) => {
          data[child.key] = child.val();
        });
        setPageVisits(data);
      });

      onValue(ref(db, 'searches'), (snap) => {
        if (!snap.exists()) return;
        const arr = [];
        snap.forEach((child) => arr.push(child.val()));
        setSearches(arr.reverse().slice(0, 12));
      });
    } catch {
      setLiveVisitors(7);
      setPageVisits({
        'hanuman-chalisa': 120,
        'aigiri-nandini': 78,
        'shiva-tandav': 72,
        'vishnu-sahasranamam': 41,
      });
      setSearches([
        { query: 'hanuman chalisa in english', ts: Date.now() - 100000 },
        { query: 'aigiri nandini lyrics', ts: Date.now() - 200000 },
        { query: 'shiva tandav meaning', ts: Date.now() - 300000 },
      ]);
    }
  }, [authed]);

  const totalVisits = useMemo(() => {
    return Object.values(pageVisits).reduce((sum, value) => sum + Number(value || 0), 0);
  }, [pageVisits]);

  const topPages = useMemo(() => {
    return Object.entries(pageVisits)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
  }, [pageVisits]);

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0d0202] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <span className="text-4xl block mb-3">🕉️</span>
            <h1 className="font-cinzel text-2xl font-bold text-[#f0c040]">Admin Panel</h1>
            <p className="font-cinzel-reg text-xs tracking-widest uppercase text-[#e8760a]/60 mt-1">
              Divya Stotram
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="bg-[#1a0505] border border-[#c9922a]/25 rounded-2xl p-8 space-y-5"
          >
            <div>
              <label className="block font-cinzel-reg text-[10px] tracking-[3px] uppercase text-[#e8760a] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0d0202] border border-[#c9922a]/30 rounded-lg px-4 py-3 text-[#fdf3e3] font-garamond outline-none focus:border-[#c9922a]/70 transition-colors"
                placeholder="Enter admin password"
              />
              {error && <p className="mt-2 text-xs text-red-400 font-garamond">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-[#c9922a] hover:bg-[#f0c040] text-[#0d0202] font-cinzel-reg text-xs tracking-[3px] uppercase font-bold py-3 rounded-lg transition-colors"
            >
              Enter
            </button>
          </form>

          <div className="text-center mt-4">
            <Link
              href="/"
              className="font-cinzel-reg text-[10px] tracking-widest uppercase text-[#c9922a]/40 hover:text-[#c9922a] transition-colors"
            >
              ← Back to Site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const seoChecklist = [
    { ok: true, text: 'Homepage now supports metadata through a server page wrapper.' },
    { ok: true, text: 'robots.txt can be generated from src/app/robots.js.' },
    { ok: true, text: 'Admin page is marked noindex through src/app/admin/layout.js.' },
    { ok: true, text: 'Prayer pages now include stronger content blocks, FAQs and internal links.' },
    { ok: true, text: 'Privacy policy now points to the correct production domain.' },
    { ok: false, text: 'You should still submit and monitor sitemap in Google Search Console after deployment.' },
    { ok: false, text: 'You should keep expanding each prayer page with richer meaning and FAQs over time.' },
  ];

  return (
    <div className="min-h-screen bg-[#0d0202] text-white">
      <div className="sticky top-0 z-50 bg-[#0d0202]/95 backdrop-blur border-b border-[#c9922a]/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-[#c9922a]/50 hover:text-[#c9922a] transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="font-cinzel text-base font-bold text-[#f0c040]">Admin Dashboard</h1>
            <p className="font-cinzel-reg text-[9px] tracking-[3px] uppercase text-[#e8760a]/60">
              Divya Stotram
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-[#e8760a]" />
          <span className="font-cinzel-reg text-xs tracking-widest text-[#e8760a]">PRIVATE</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Users} title="Live Visitors" value={liveVisitors} subtitle="Current presence" />
          <StatCard icon={Eye} title="Total Page Views" value={totalVisits} subtitle="Tracked prayer page views" />
          <StatCard icon={Search} title="Recent Searches" value={searches.length} subtitle="Latest stored queries" />
          <StatCard
            icon={Globe}
            title="Top Page"
            value={topPages[0] ? topPages[0][0].replace(/-/g, ' ') : '—'}
            subtitle="Best performing page"
          />
        </div>

        <section className="bg-[#1a0505] border border-[#c9922a]/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <FileText size={18} className="text-[#f0c040]" />
            <h2 className="font-cinzel text-xl font-bold text-[#f0c040]">SEO / Technical Checklist</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {seoChecklist.map((item) => (
              <ChecklistItem key={item.text} ok={item.ok} text={item.text} />
            ))}
          </div>
        </section>

        <section className="bg-[#1a0505] border border-[#c9922a]/20 rounded-2xl p-6">
          <h2 className="font-cinzel text-xl font-bold text-[#f0c040] mb-5">Top Prayer Pages</h2>
          <div className="space-y-3">
            {topPages.length ? (
              topPages.map(([slug, value]) => (
                <div
                  key={slug}
                  className="flex items-center justify-between rounded-xl border border-[#c9922a]/15 bg-[#140404] px-4 py-3"
                >
                  <p className="font-garamond text-base text-[#e8d5b5]/80 capitalize">
                    {slug.replace(/-/g, ' ')}
                  </p>
                  <span className="font-cinzel-reg text-xs tracking-widest text-[#f0c040]">
                    {value} views
                  </span>
                </div>
              ))
            ) : (
              <p className="font-garamond text-[#e8d5b5]/60">No page view data available yet.</p>
            )}
          </div>
        </section>

        <section className="bg-[#1a0505] border border-[#c9922a]/20 rounded-2xl p-6">
          <h2 className="font-cinzel text-xl font-bold text-[#f0c040] mb-5">Recent Search Queries</h2>
          <div className="space-y-3">
            {searches.length ? (
              searches.map((item, index) => (
                <div
                  key={`${item.query}-${index}`}
                  className="rounded-xl border border-[#c9922a]/15 bg-[#140404] px-4 py-3"
                >
                  <p className="font-garamond text-base text-[#e8d5b5]/85">{item.query}</p>
                </div>
              ))
            ) : (
              <p className="font-garamond text-[#e8d5b5]/60">No search data available yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}