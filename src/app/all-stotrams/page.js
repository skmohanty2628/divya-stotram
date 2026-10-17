'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { LangProvider, useLang } from '@/components/LanguageSwitcher';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';
import { SubscribeInline } from '@/components/SubscribeWidget';
import { stotramPath } from '@/lib/site';

function matches(s, q) {
  if (!q) return true;
  const hay = [s.deity, s.language, ...Object.values(s.title || {}), ...Object.values(s.description || {})]
    .join(' ')
    .toLowerCase();
  return hay.includes(q.toLowerCase());
}

function Content() {
  const { lang } = useLang();
  const [q, setQ] = useState('');
  const visible = STOTRAMS_INDEX.filter((s) => matches(s, q));
  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <header className="pb-8 pt-14 text-center">
        <p className="font-cinzel-reg text-[11px] uppercase tracking-[5px] text-[#e8760a]">The collection</p>
        <h1 className="mt-3 font-cinzel text-4xl font-bold text-[#8b1a00] md:text-5xl">All Stotrams and Mantras</h1>
        <p className="mx-auto mt-4 max-w-2xl font-garamond text-xl leading-relaxed text-[#3d1a00]/75">
          {STOTRAMS_INDEX.length} sacred prayers with text, transliteration and meaning in English, Hindi, Odia and
          Telugu. Choose a language in the top bar.
        </p>
      </header>

      <div className="relative mx-auto mb-10 max-w-2xl">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c9922a]" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search stotrams"
          placeholder="Search by name or deity..."
          className="w-full rounded-full border border-[#c9922a]/30 bg-white py-4 pl-12 pr-5 font-garamond text-base text-[#3d1a00] shadow-sm outline-none focus:border-[#c9922a] focus:ring-2 focus:ring-[#c9922a]/20"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STOTRAMS_INDEX.map((s) => (
          <Link
            key={s.slug}
            href={stotramPath(s.slug, lang)}
            hidden={!matches(s, q)}
            className="group flex flex-col rounded-2xl border border-[#c9922a]/25 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-[#c9922a] hover:shadow-lg"
          >
            <p className="font-cinzel-reg text-[10px] uppercase tracking-[3px] text-[#e8760a]">{s.deity}</p>
            <h2 className="mt-2 font-cinzel text-lg font-bold leading-snug text-[#8b1a00]">{s.title?.[lang] || s.title.en}</h2>
            <p className="mt-2 line-clamp-4 flex-1 font-garamond text-base leading-snug text-[#3d1a00]/70">
              {s.description?.[lang] || s.description.en}
            </p>
            <div className="mt-4 flex items-center justify-between font-cinzel-reg text-[10px] uppercase tracking-[2px] text-[#c9922a]">
              <span>{s.verseCount} verses</span>
              <span className="transition-transform group-hover:translate-x-1">Read →</span>
            </div>
          </Link>
        ))}
      </div>
      {visible.length === 0 && (
        <p className="mt-10 text-center font-garamond text-lg text-[#3d1a00]/70">
          No stotram matches “{q}”. Try a deity name such as Shiva or Hanuman.
        </p>
      )}

      <div className="mx-auto mt-16 max-w-3xl">
        <SubscribeInline />
      </div>
    </div>
  );
}

export default function AllStotramsPage() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-[#fdf6e3]">
        <Navbar />
        <Content />
      </div>
    </LangProvider>
  );
}
