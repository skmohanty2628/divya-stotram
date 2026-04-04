'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AdSlot from '@/components/AdSlot';
import { LangProvider } from '@/components/LanguageSwitcher';
import { useLang } from '@/components/LanguageSwitcher';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';

function StarCanvas() {
  useEffect(() => {
    const canvas = document.getElementById('home-stars');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
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
      stars.forEach(s => {
        const a = 0.25 + 0.5 * Math.sin(s.phase + t * s.speed * 10);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,230,170,${a})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas id="home-stars" className="fixed inset-0 z-0 pointer-events-none" />;
}

function StotramCard({ s, index }) {
  const { lang } = useLang();
  return (
    <Link
      href={`/${s.slug}`}
      className="group relative bg-white border border-[#c9922a]/30 rounded-2xl p-6 hover:border-[#c9922a] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#c9922a]/0 to-transparent group-hover:via-[#c9922a] transition-all duration-300" />

      {s.featured && (
        <span className="absolute top-3 right-3 font-cinzel-reg text-[9px] tracking-[2px] uppercase bg-[#e8760a]/10 text-[#e8760a] border border-[#e8760a]/30 rounded-full px-2 py-0.5">
          Featured
        </span>
      )}

      <span className="text-4xl block mb-4">{s.deityEmoji}</span>
      <h3 className="font-cinzel text-base font-bold text-[#8b1a00] mb-1 leading-tight">
        {s.title[lang] || s.title.en}
      </h3>
      <p className="font-cinzel-reg text-xs text-[#e8760a] tracking-widest mb-3 uppercase">{s.deity}</p>
      <p className="font-garamond text-sm text-[#3d1a00]/70 leading-relaxed mb-4 line-clamp-2">
        {s.description[lang] || s.description.en}
      </p>
      <div className="flex items-center justify-between">
        <span className="font-cinzel-reg text-[10px] tracking-widest text-[#c9922a]/70 uppercase">
          {s.verseCount} {s.verseCount === 1 ? 'Verse' : 'Verses'}
        </span>
        <span className="font-cinzel-reg text-[10px] tracking-widest text-[#c9922a]/70 uppercase">
          {s.language}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-[#c9922a] group-hover:gap-3 transition-all">
        <span className="font-cinzel-reg text-xs tracking-widest uppercase font-bold">Read Now</span>
        <span className="text-sm">→</span>
      </div>
    </Link>
  );
}

function HomeContent() {
  const featured = STOTRAMS_INDEX.filter(s => s.featured);
  const others   = STOTRAMS_INDEX.filter(s => !s.featured);

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

      {/* Hero */}
      <div className="text-center py-20 sm:py-28">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9922a]" />
          <span className="font-cinzel-reg text-[11px] tracking-[5px] uppercase text-[#e8760a]">Welcome to</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9922a]" />
        </div>
        <h1 className="font-cinzel text-4xl sm:text-6xl lg:text-7xl font-bold text-[#8b1a00] mb-4 leading-tight"
            style={{ textShadow: '0 2px 8px rgba(139,26,0,0.15)' }}>
          दिव्य स्तोत्रम्
        </h1>
        <p className="font-cinzel text-xl sm:text-2xl text-[#c9922a] tracking-widest mb-6">DIVYA STOTRAM</p>
        <p className="font-garamond text-lg sm:text-xl text-[#3d1a00]/70 max-w-2xl mx-auto mb-10 leading-relaxed italic">
          A sanctuary of sacred Hindu prayers, stotrams, and mantras in multiple languages — for devotees worldwide.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/hanuman-chalisa"
            className="font-cinzel-reg text-xs tracking-widest uppercase bg-[#c9922a] hover:bg-[#8b1a00] text-white font-bold px-8 py-3 rounded-full transition-all shadow-md"
          >
            🚩 Hanuman Chalisa
          </Link>
          <Link
            href="/shiva-tandav"
            className="font-cinzel-reg text-xs tracking-widest uppercase border-2 border-[#c9922a] hover:bg-[#c9922a] text-[#8b1a00] hover:text-white font-bold px-8 py-3 rounded-full transition-all"
          >
            🔱 Shiva Tandav
          </Link>
        </div>
      </div>

      {/* Featured stotrams */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-[#c9922a]/30 to-transparent" />
          <p className="font-cinzel-reg text-[11px] tracking-[5px] uppercase text-[#e8760a] font-bold">Featured Prayers</p>
          <div className="h-px flex-1 bg-gradient-to-l from-[#c9922a]/30 to-transparent" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((s, i) => <StotramCard key={s.slug} s={s} index={i} />)}
        </div>
      </section>

      {/* All stotrams */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-[#c9922a]/30 to-transparent" />
          <p className="font-cinzel-reg text-[11px] tracking-[5px] uppercase text-[#e8760a] font-bold">All Prayers</p>
          <div className="h-px flex-1 bg-gradient-to-l from-[#c9922a]/30 to-transparent" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {others.map((s, i) => <StotramCard key={s.slug} s={s} index={i} />)}
        </div>
      </section>

      {/* Footer stats */}
      <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        {[
          { num: '8+', label: 'Sacred Stotrams' },
          { num: '4',  label: 'Languages' },
          { num: '200+', label: 'Verses' },
          { num: '∞',  label: 'Blessings' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-[#c9922a]/20 rounded-xl py-5 px-3 shadow-sm">
            <p className="font-cinzel text-3xl font-bold text-[#8b1a00] mb-1">{stat.num}</p>
            <p className="font-cinzel-reg text-[10px] tracking-[2px] uppercase text-[#c9922a]/70">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-[#c9922a]/20 text-center">
        <p className="font-cinzel text-lg text-[#8b1a00] font-bold mb-4">🕉️ OM NAMAH SHIVAYA 🕉️</p>
        <div className="flex items-center justify-center gap-6 mb-4">
          <Link href="/about" className="font-cinzel-reg text-[10px] tracking-[2px] uppercase text-[#c9922a]/60 hover:text-[#c9922a] transition-colors">About</Link>
          <Link href="/contact" className="font-cinzel-reg text-[10px] tracking-[2px] uppercase text-[#c9922a]/60 hover:text-[#c9922a] transition-colors">Contact</Link>
          <Link href="/privacy-policy" className="font-cinzel-reg text-[10px] tracking-[2px] uppercase text-[#c9922a]/60 hover:text-[#c9922a] transition-colors">Privacy Policy</Link>
        </div>
        <p className="font-cinzel-reg text-[10px] tracking-[3px] uppercase text-[#c9922a]/40">
          Divya Stotram · All content for devotional purposes · No copyright on sacred texts
        </p>
      </footer>
    </div>
  );
}

export default function HomePage() {
  return (
    <LangProvider>
      <div className="min-h-screen" style={{ background: '#fdf6e3' }}>
        <StarCanvas />

        {/* Mandala bg */}
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.03]">
          <div className="w-[700px] h-[700px] border border-[#c9922a] rounded-full" style={{ animation: 'spin 120s linear infinite' }} />
          <div className="absolute w-[500px] h-[500px] border border-[#c9922a] rounded-full" style={{ animation: 'spin 80s linear infinite reverse' }} />
          <div className="absolute w-[300px] h-[300px] border border-[#c9922a] rounded-full" />
        </div>

        <Navbar />
        <HomeContent />
      </div>
    </LangProvider>
  );
}