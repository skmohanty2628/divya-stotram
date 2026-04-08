'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { LangProvider } from '@/components/LanguageSwitcher';
import { useLang } from '@/components/LanguageSwitcher';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';

/* ================= STAR BACKGROUND ================= */
function StarCanvas() {
  useEffect(() => {
    const canvas = document.getElementById('home-stars');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let raf;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.2 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.008 + 0.003,
    }));

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.01;

      stars.forEach((s) => {
        const a = 0.25 + 0.5 * Math.sin(s.phase + t * s.speed * 10);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,230,170,${a})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas id="home-stars" className="fixed inset-0 z-0 pointer-events-none" />;
}

/* ================= SEARCH ================= */
function SearchBox({ value, onChange }) {
  return (
    <div className="max-w-2xl mx-auto mb-10">
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c9922a]" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search Hanuman Chalisa, Shiva Tandav, Vishnu Sahasranamam..."
          className="w-full rounded-full border border-[#c9922a]/30 bg-white pl-12 pr-5 py-4 font-garamond text-base text-[#3d1a00] shadow-sm outline-none focus:border-[#c9922a] focus:ring-2 focus:ring-[#c9922a]/20"
        />
      </div>
    </div>
  );
}

/* ================= CARD ================= */
function StotramCard({ s, index }) {
  const { lang } = useLang();

  return (
    <Link
      href={`/${s.slug}`}
      className="group relative bg-white border border-[#c9922a]/30 rounded-2xl p-6 hover:border-[#c9922a] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      <span className="text-4xl block mb-4">{s.deityEmoji}</span>

      <h2 className="font-cinzel text-base font-bold text-[#8b1a00] mb-1">
        {s.title[lang] || s.title.en}
      </h2>

      <p className="font-cinzel-reg text-xs text-[#e8760a] tracking-widest mb-3 uppercase">
        {s.deity}
      </p>

      <p className="font-garamond text-sm text-[#3d1a00]/70 mb-4 line-clamp-2">
        {s.description[lang] || s.description.en}
      </p>

      <div className="flex justify-between text-xs text-[#c9922a]/70 uppercase font-bold">
        <span>{s.verseCount} Verses</span>
        <span>{s.language}</span>
      </div>
    </Link>
  );
}

/* ================= MAIN CONTENT ================= */
function HomeContent() {
  const [query, setQuery] = useState('');

  const featured = STOTRAMS_INDEX.filter((s) => s.featured);

  const filteredOthers = useMemo(() => {
    const q = query.toLowerCase();
    return STOTRAMS_INDEX.filter(
      (s) =>
        !s.featured &&
        (!q ||
          `${s.slug} ${s.deity} ${s.title?.en} ${s.description?.en}`
            .toLowerCase()
            .includes(q))
    );
  }, [query]);

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
      <div className="text-center py-20">
        <img src="/logo.svg" width="100" className="mx-auto mb-6 rounded-xl" />

        <h1 className="font-cinzel text-5xl font-bold text-[#8b1a00] mb-3">
          दिव्य स्तोत्रम्
        </h1>

        <p className="font-cinzel text-xl text-[#c9922a] mb-6 tracking-widest">
          DIVYA STOTRAM
        </p>

        <p className="font-garamond text-lg text-[#3d1a00]/70 mb-8 italic">
          Read sacred Hindu prayers in 4 languages with meaning
        </p>

        <SearchBox value={query} onChange={setQuery} />

        {/* ✅ FIXED BUTTONS (NO EMOJIS) */}
        <div className="flex justify-center gap-4 mt-6">
          <Link
            href="/hanuman-chalisa"
            className="border-2 border-[#c9922a] px-6 py-3 rounded-full font-bold hover:bg-[#c9922a] hover:text-white transition"
          >
            Hanuman Chalisa
          </Link>

          <Link
            href="/shiva-tandav"
            className="border-2 border-[#c9922a] px-6 py-3 rounded-full font-bold hover:bg-[#c9922a] hover:text-white transition"
          >
            Shiva Tandav
          </Link>
        </div>
      </div>

      {/* FEATURED */}
      <h2 className="text-center font-bold text-[#8b1a00] mb-6">Featured</h2>
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {featured.map((s, i) => (
          <StotramCard key={s.slug} s={s} index={i} />
        ))}
      </div>

      {/* ALL */}
      <h2 className="text-center font-bold text-[#8b1a00] mb-6">All Prayers</h2>
      <div className="grid md:grid-cols-4 gap-5">
        {filteredOthers.map((s, i) => (
          <StotramCard key={s.slug} s={s} index={i} />
        ))}
      </div>
    </div>
  );
}

/* ================= ROOT ================= */
export default function HomePageClient() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-[#fdf6e3]">
        <StarCanvas />
        <Navbar />
        <HomeContent />
      </div>
    </LangProvider>
  );
}