'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';

const ITEMS_PER_PAGE = 8;
const KRISHNA_SLUG = 'krishna-vasudevaya-mantra';

export default function HomePageClient() {
  const [currentPage, setCurrentPage] = useState(1);

  // Featured section:
  // 1) only featured items
  // 2) keep original order
  // 3) move Krishna to the top so it is always visible
  const featuredStotrams = useMemo(() => {
    const featured = STOTRAMS_INDEX.filter((item) => item.featured);

    return [...featured].sort((a, b) => {
      if (a.slug === KRISHNA_SLUG) return -1;
      if (b.slug === KRISHNA_SLUG) return 1;
      return 0;
    });
  }, []);

  // All prayers section with pagination
  const allStotrams = useMemo(() => {
    return [...STOTRAMS_INDEX];
  }, []);

  const totalPages = Math.ceil(allStotrams.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedStotrams = allStotrams.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const goToPrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      {/* Hero */}
      <section className="border-b border-white/10 bg-gradient-to-b from-[#0b1023] via-[#090d1a] to-[#050816]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-1 text-sm text-amber-200">
              Divine Stotrams in 4 Languages
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Divya Stotram
            </h1>

            <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg">
              Chant powerful Hindu prayers, mantras and stotrams in English,
              Hindi, Odia and Telugu with meaning, transliteration and audio.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="#all-prayers"
                className="rounded-xl bg-amber-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-300"
              >
                Explore All Prayers
              </Link>

              <Link
                href="#featured-prayers"
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Featured
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Prayers */}
      <section id="featured-prayers" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Featured Prayers</h2>
            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Handpicked powerful stotrams and mantras.
            </p>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            {featuredStotrams.length} featured
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {featuredStotrams.map((item) => (
            <StotramCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

      {/* All Prayers */}
      <section
        id="all-prayers"
        className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8"
      >
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">All Prayers</h2>
            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Browse all available stotrams and mantras.
            </p>
          </div>

          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            {allStotrams.length} total
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {paginatedStotrams.map((item) => (
            <StotramCard key={item.slug} item={item} compact />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={goToPrevious}
              disabled={currentPage === 1}
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
              Page {currentPage} of {totalPages}
            </div>

            <button
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

function StotramCard({ item, compact = false }) {
  const title = item?.title?.en || 'Untitled Prayer';
  const description = item?.description?.en || '';
  const verseCount = item?.verseCount ?? 0;
  const language = item?.language || 'Sanskrit';
  const deity = item?.deity || 'Divine';
  const emoji = item?.deityEmoji || '🪔';
  const gradient = item?.color || 'from-slate-900 to-slate-800';

  return (
    <Link href={`/${item.slug}`} className="group block">
      <article
        className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${gradient} p-5 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl`}
      >
        <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/10" />

        <div className="relative z-10">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="text-3xl">{emoji}</div>

            <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-slate-100">
              {deity}
            </div>
          </div>

          <h3 className={`font-bold text-white ${compact ? 'text-lg' : 'text-xl'}`}>
            {title}
          </h3>

          <p className="mt-2 text-sm text-slate-200">
            {verseCount} {verseCount === 1 ? 'verse' : 'verses'} • {language}
          </p>

          <p className={`mt-4 text-sm leading-6 text-slate-100/90 ${compact ? 'line-clamp-3' : 'line-clamp-4'}`}>
            {description}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-200">
            Read now
            <span className="transition group-hover:translate-x-1">→</span>
          </div>
        </div>
      </article>
    </Link>
  );
}