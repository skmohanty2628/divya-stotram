'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import { LangProvider, useLang } from '@/components/LanguageSwitcher';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';
import { FESTIVAL_DATES } from '@/data/festival-dates';
import { SubscribeInline } from '@/components/SubscribeWidget';
import VerseOfTheDay from '@/components/VerseOfTheDay';
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


function PrayerOfTheDay() {
  const { lang } = useLang();
  const [idx, setIdx] = useState(2);
  useEffect(() => setIdx(new Date().getDay()), []);
  const w = WEEKDAY[idx];
  const s = STOTRAMS_INDEX.find((x) => x.slug === w.slug) || STOTRAMS_INDEX[0];
  return (
    <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-[#c9922a]/40 bg-white/90 p-6 text-left shadow-xl backdrop-blur">
      <p className="font-cinzel-reg text-[10px] uppercase tracking-[4px] text-[#a85200]">Prayer for {w.day}</p>
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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fff3d6] via-[#fdf6e3] to-[#fdf6e3] px-4 pb-10 pt-12 text-center sm:px-6 sm:pb-14 sm:pt-16">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#e8760a]/15 blur-3xl" />
      <div className="relative mx-auto max-w-3xl">
        <p className="font-cinzel-reg text-[11px] uppercase tracking-[6px] text-[#a85200]">॥ ॐ ॥</p>
        <h1 className="mt-4 font-cinzel text-4xl font-bold leading-tight text-[#8b1a00] md:text-6xl">
          Hindu Prayers and Mantras, With Meaning
        </h1>
        <p className="mx-auto mt-5 max-w-2xl font-garamond text-xl leading-relaxed text-[#3d1a00]/80">
          Read, understand and chant {STOTRAMS_INDEX.length} sacred stotrams in English, Hindi, Odia and Telugu, with
          transliteration, plain-language meaning, background articles and audio.
        </p>
        <form action="/search" method="get" role="search" className="mx-auto mt-7 flex max-w-xl gap-2">
          <label htmlFor="home-q" className="sr-only">Search stotrams and guides</label>
          <input
            id="home-q"
            name="q"
            type="search"
            placeholder="Search a prayer or topic"
            className="min-w-0 flex-1 rounded-full border border-[#c9922a]/50 bg-white px-5 py-3 font-garamond text-lg text-[#1a0a00] shadow-sm outline-none focus:border-[#8b1a00]"
          />
          <button type="submit" className="rounded-full bg-[#8b1a00] px-6 font-cinzel-reg text-xs uppercase tracking-[2px] text-white transition-colors hover:bg-[#a82300]">Search</button>
        </form>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
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

const POPULAR = [
  'hanuman-chalisa',
  'shiva-tandav',
  'durga-stotram',
  'gayatri-mantra',
  'vishnu-sahasranamam',
  'mahalakshmi-ashtakam',
  'aigiri-nandini',
  'ganesh-aarti',
];

function StotramGrid() {
  const { lang } = useLang();
  const list = POPULAR.map((slug) => STOTRAMS_INDEX.find((x) => x.slug === slug)).filter(Boolean);
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <p className="font-cinzel-reg text-[11px] uppercase tracking-[5px] text-[#a85200]">Most read</p>
        <h2 className="mt-2 font-cinzel text-3xl font-bold text-[#8b1a00]">Popular Stotrams</h2>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((s, i) => (
          <Link
            key={s.slug}
            href={stotramPath(s.slug, lang)}
            className={`group flex-col rounded-2xl border border-[#c9922a]/25 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-[#c9922a] hover:shadow-lg ${i >= 6 ? 'hidden sm:flex' : 'flex'}`}
          >
            <p className="font-cinzel-reg text-[10px] uppercase tracking-[3px] text-[#a85200]">{s.deity}</p>
            <h3 className="mt-2 font-cinzel text-lg font-bold leading-snug text-[#8b1a00]">{s.title?.[lang] || s.title.en}</h3>
            <p className="mt-2 line-clamp-2 flex-1 font-garamond text-base leading-snug text-[#3d1a00]/70">
              {s.description?.[lang] || s.description.en}
            </p>
            <span className="mt-3 font-cinzel-reg text-[10px] uppercase tracking-[2px] text-[#8a5f00] transition-transform group-hover:translate-x-1">
              Read →
            </span>
          </Link>
        ))}
      </div>
      <p className="mt-8 text-center">
        <Link href="/all-stotrams" className="inline-flex rounded-full border border-[#8b1a00]/40 bg-white px-7 py-3 font-cinzel-reg text-xs uppercase tracking-[3px] text-[#8b1a00] transition-colors hover:bg-[#fff3d6]">
          See all {STOTRAMS_INDEX.length} stotrams
        </Link>
      </p>
    </section>
  );
}

function UpcomingFestivals() {
  const [list, setList] = useState([]);
  useEffect(() => {
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    setList(FESTIVAL_DATES.filter((f) => f.date >= today).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3));
  }, []);
  if (!list.length) return null;
  const fmt = (d) => new Date(`${d}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
  return (
    <section aria-label="Upcoming festivals" className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
      <div className="rounded-3xl border border-[#c9922a]/30 bg-[#fffaf1] p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-cinzel text-xl font-bold text-[#8b1a00]">Coming up</h2>
          <Link href="/festivals" className="font-cinzel-reg text-[11px] uppercase tracking-[2px] text-[#8b1a00] underline decoration-[#c9922a] underline-offset-4">Full festival calendar</Link>
        </div>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          {list.map((f) => (
            <li key={f.name + f.date}>
              <Link href={`/${f.slug}`} className="block rounded-2xl border border-[#c9922a]/25 bg-white p-4 transition hover:border-[#c9922a] hover:shadow-md">
                <span className="block font-cinzel-reg text-[10px] uppercase tracking-[2px] text-[#a85200]">{fmt(f.date)}</span>
                <span className="mt-1 block font-cinzel text-base font-bold leading-snug text-[#8b1a00]">{f.name}</span>
                <span className="mt-1 block font-garamond text-base text-[#3d1a00]/70">{f.note}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function GuidesSection({ guides, count }) {
  return (
    <section className="bg-[#fff3d6]/60 px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="font-cinzel-reg text-[11px] uppercase tracking-[5px] text-[#a85200]">Learn</p>
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
            All {count} guides
          </Link>
        </p>
      </div>
    </section>
  );
}

const HUBS = { od: '/odia-stotras', hi: '/hindi-stotras', te: '/telugu-stotras', en: '/all-stotrams' };

function Languages() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10 text-center sm:px-6">
      <h2 className="font-cinzel text-3xl font-bold text-[#8b1a00]">In the Language of Your Heart</h2>
      <p className="mx-auto mt-3 max-w-2xl font-garamond text-lg text-[#3d1a00]/75">
        Every stotram is available in four languages, each on its own page you can bookmark and share.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {LANGS.map((l) => (
          <Link
            key={l.code}
            href={HUBS[l.code] || '/all-stotrams'}
            className="rounded-full border border-[#c9922a]/40 bg-white px-5 py-2 font-garamond text-lg text-[#3d1a00] transition-colors hover:border-[#c9922a] hover:bg-[#fff3d6]"
          >
            {l.native}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function HomePageClient({ featuredGuides = [], guideCount = 0 }) {
  return (
    <LangProvider>
      <div className="min-h-screen bg-[#fdf6e3]">
        <Navbar />
        <Hero />
        <VerseOfTheDay />
        <StotramGrid />
        <Languages />
        <UpcomingFestivals />
        <GuidesSection guides={featuredGuides} count={guideCount} />
        <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
          <SubscribeInline />
        </section>
      </div>
    </LangProvider>
  );
}
