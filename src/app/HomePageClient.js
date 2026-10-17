'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import { LangProvider, useLang } from '@/components/LanguageSwitcher';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';
import { GUIDES, getGuideBySlug } from '@/data/guides';
import { SubscribeInline } from '@/components/SubscribeWidget';
import { stotramPath, LANGS } from '@/lib/site';

// Traditional weekday associations (shown as tradition, not as a promise of results).
const WEEKDAY = [
  { day: 'Sunday', deity: 'Surya', slug: 'aditya-hridayam', note: 'Sunday is traditionally associated with Surya, the sun.' },
  { day: 'Monday', deity: 'Shiva', slug: 'shiva-tandav', note: 'Monday is traditionally associated with Lord Shiva.' },
  { day: 'Tuesday', deity: 'Hanuman', slug: 'hanuman-chalisa', note: 'Tuesday is traditionally associated with Hanuman.' },
  { day: 'Wednesday', deity: 'Ganesha', slug: 'ganesh-aarti', note: 'Wednesday is traditionally associated with Ganesha.' },
  { day: 'Thursday', deity: 'Vishnu', slug: 'vishnu-sahasranamam', note: 'Thursday is traditionally associated with Vishnu.' },
  { day: 'Friday', deity: 'Lakshmi', slug: 'mahalakshmi-ashtakam', note: 'Friday is traditionally associated with Lakshmi and Devi.' },
  { day: 'Saturday', deity: 'Hanuman and Shani', slug: 'navagraha-stotram', note: 'Saturday is traditionally associated with Shani and Hanuman.' },
];

const FEATURED_GUIDES = [
  'how-to-chant-hanuman-chalisa',
  'how-to-chant-gayatri-mantra',
  'best-mantra-for-anxiety',
  'morning-prayer-routine',
  'durga-mantra-during-navratri',
  'spiritual-routine-for-beginners',
];

function PrayerOfTheDay() {
  const { lang } = useLang();
  const [idx, setIdx] = useState(2);
  useEffect(() => setIdx(new Date().getDay()), []);
  const w = WEEKDAY[idx];
  const s = STOTRAMS_INDEX.find((x) => x.slug === w.slug) || STOTRAMS_INDEX[0];
  return (
    <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-[#c9922a]/40 bg-white/90 p-6 text-left shadow-xl backdrop-blur">
      <p className="font-cinzel-reg text-[10px] uppercase tracking-[4px] text-[#e8760a]">Prayer for {w.day}</p>
      <h2 className="mt-2 font-cinzel text-2xl font-bold text-[#8b1a00]">{s.title?.[lang] || s.title.en}</h2>
      <p className="mt-2 font-garamond text-base leading-snug text-[#3d1a00]/75">{w.note}</p>
      <Link
        href={stotramPath(s.slug, lang)}
        className="mt-4 inline-flex rounded-full bg-[#8b1a00] px-6 py-2.5 font-cinzel-reg text-xs uppercase tracking-[3px] text-white transition-colors hover:bg-[#a82300]"
      >
        Read and listen
      </Link>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fff3d6] via-[#fdf6e3] to-[#fdf6e3] px-4 pb-16 pt-16 text-center sm:px-6">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#e8760a]/15 blur-3xl" />
      <div className="relative mx-auto max-w-3xl">
        <p className="font-cinzel-reg text-[11px] uppercase tracking-[6px] text-[#e8760a]">॥ ॐ ॥</p>
        <h1 className="mt-4 font-cinzel text-4xl font-bold leading-tight text-[#8b1a00] md:text-6xl">
          Hindu Prayers and Mantras, With Meaning
        </h1>
        <p className="mx-auto mt-5 max-w-2xl font-garamond text-xl leading-relaxed text-[#3d1a00]/80">
          Read, understand and chant {STOTRAMS_INDEX.length} sacred stotrams in English, Hindi, Odia and Telugu, with
          transliteration, plain-language meaning, background articles and audio.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link href="/all-stotrams" className="rounded-full bg-[#8b1a00] px-7 py-3 font-cinzel-reg text-xs uppercase tracking-[3px] text-white shadow-md transition-colors hover:bg-[#a82300]">
            Browse all stotrams
          </Link>
          <Link href="/guides" className="rounded-full border border-[#8b1a00]/40 bg-white px-7 py-3 font-cinzel-reg text-xs uppercase tracking-[3px] text-[#8b1a00] transition-colors hover:bg-[#fff3d6]">
            How to chant
          </Link>
        </div>
        <PrayerOfTheDay />
      </div>
    </section>
  );
}

function StotramGrid() {
  const { lang } = useLang();
  const deities = useMemo(() => ['All', ...Array.from(new Set(STOTRAMS_INDEX.map((s) => s.deity.split(' / ')[0])))], []);
  const [filter, setFilter] = useState('All');
  const list = STOTRAMS_INDEX.filter((s) => filter === 'All' || s.deity.split(' / ')[0] === filter);
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="text-center">
        <p className="font-cinzel-reg text-[11px] uppercase tracking-[5px] text-[#e8760a]">The collection</p>
        <h2 className="mt-2 font-cinzel text-3xl font-bold text-[#8b1a00]">Sacred Stotrams</h2>
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by deity">
        {deities.map((d) => (
          <button
            key={d}
            onClick={() => setFilter(d)}
            aria-pressed={filter === d}
            className={`rounded-full border px-4 py-1.5 font-garamond text-base transition-colors ${
              filter === d ? 'border-[#8b1a00] bg-[#8b1a00] text-white' : 'border-[#c9922a]/40 bg-white text-[#3d1a00] hover:border-[#c9922a]'
            }`}
          >
            {d}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((s) => (
          <Link
            key={s.slug}
            href={stotramPath(s.slug, lang)}
            className="group flex flex-col rounded-2xl border border-[#c9922a]/25 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-[#c9922a] hover:shadow-lg"
          >
            <p className="font-cinzel-reg text-[10px] uppercase tracking-[3px] text-[#e8760a]">{s.deity}</p>
            <h3 className="mt-2 font-cinzel text-lg font-bold leading-snug text-[#8b1a00]">{s.title?.[lang] || s.title.en}</h3>
            <p className="mt-2 line-clamp-4 flex-1 font-garamond text-base leading-snug text-[#3d1a00]/70">
              {s.description?.[lang] || s.description.en}
            </p>
            <span className="mt-4 font-cinzel-reg text-[10px] uppercase tracking-[2px] text-[#c9922a] transition-transform group-hover:translate-x-1">
              Read →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function GuidesSection() {
  const guides = FEATURED_GUIDES.map(getGuideBySlug).filter(Boolean);
  return (
    <section className="bg-[#fff3d6]/60 px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="font-cinzel-reg text-[11px] uppercase tracking-[5px] text-[#e8760a]">Learn</p>
          <h2 className="mt-2 font-cinzel text-3xl font-bold text-[#8b1a00]">Guides for Your Practice</h2>
          <p className="mx-auto mt-3 max-w-2xl font-garamond text-lg text-[#3d1a00]/75">
            How to chant, when to chant and what it means, written plainly and honestly.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <Link key={g.slug} href={`/${g.slug}`} className="rounded-2xl border border-[#c9922a]/25 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
              <h3 className="font-cinzel text-base font-bold leading-snug text-[#8b1a00]">{g.h1}</h3>
              <p className="mt-2 line-clamp-3 font-garamond text-base leading-snug text-[#3d1a00]/70">{g.description}</p>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link href="/guides" className="font-cinzel-reg text-xs uppercase tracking-[3px] text-[#8b1a00] underline decoration-[#c9922a] underline-offset-4">
            All {GUIDES.length} guides
          </Link>
        </p>
      </div>
    </section>
  );
}

function Languages() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6">
      <h2 className="font-cinzel text-3xl font-bold text-[#8b1a00]">In the Language of Your Heart</h2>
      <p className="mx-auto mt-3 max-w-2xl font-garamond text-lg text-[#3d1a00]/75">
        Every stotram is available in four languages, each on its own page you can bookmark and share.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {LANGS.map((l) => (
          <span key={l.code} className="rounded-full border border-[#c9922a]/40 bg-white px-5 py-2 font-garamond text-lg text-[#3d1a00]">
            {l.native}
          </span>
        ))}
      </div>
    </section>
  );
}

export default function HomePageClient() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-[#fdf6e3]">
        <Navbar />
        <Hero />
        <StotramGrid />
        <GuidesSection />
        <Languages />
        <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
          <SubscribeInline />
        </section>
      </div>
    </LangProvider>
  );
}
