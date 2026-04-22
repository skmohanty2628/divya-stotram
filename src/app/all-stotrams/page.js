'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { LangProvider, useLang } from '@/components/LanguageSwitcher';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';

function SearchBox({ value, onChange }) {
  return (
    <div className="max-w-2xl mx-auto mb-10">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c9922a]"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search all stotrams..."
          className="w-full rounded-full border border-[#c9922a]/30 bg-white pl-12 pr-5 py-4 font-garamond text-base text-[#3d1a00] shadow-sm outline-none focus:border-[#c9922a] focus:ring-2 focus:ring-[#c9922a]/20"
        />
      </div>
    </div>
  );
}

function getIconStyles(iconText = '') {
  const len = Array.from(iconText).length;

  if (len <= 2) return { fontSize: '30px', lineHeight: '1', letterSpacing: '0' };
  if (len <= 5) return { fontSize: '20px', lineHeight: '1.05', letterSpacing: '0.5px' };
  if (len <= 8) return { fontSize: '16px', lineHeight: '1.05', letterSpacing: '0.3px' };

  return { fontSize: '13px', lineHeight: '1.05', letterSpacing: '0' };
}

function StotramIcon({ s, className = 'h-[66px] w-[66px] mb-4' }) {
  if (s.deityIcon) {
    return (
      <img
        src={s.deityIcon}
        alt={s.deity}
        className={`${className} object-contain drop-shadow-sm`}
      />
    );
  }

  const iconStyles = getIconStyles(s.deityEmoji || '');

  return (
    <div
      className={`${className} rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#fff7e8] to-[#fff1d1] border border-[#c9922a]/20 shadow-sm overflow-hidden`}
    >
      <span
        className="flex items-center justify-center w-full h-full text-center px-1 break-words select-none"
        style={{
          ...iconStyles,
          whiteSpace: 'normal',
          overflowWrap: 'anywhere',
          wordBreak: 'break-word',
        }}
      >
        {s.deityEmoji}
      </span>
    </div>
  );
}

function StotramCard({ s, index }) {
  const { lang } = useLang();

  return (
    <Link
      href={`/${s.slug}`}
      className="group relative bg-white border border-[#c9922a]/30 rounded-2xl p-6 hover:border-[#c9922a] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden min-h-[360px] flex flex-col"
      style={{ animationDelay: `${index * 0.08}s` }}
      scroll={true}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#c9922a]/0 to-transparent group-hover:via-[#c9922a] transition-all duration-300" />

      {s.featured && (
        <span className="absolute top-3 right-3 font-cinzel-reg text-[9px] tracking-[2px] uppercase bg-[#e8760a]/10 text-[#e8760a] border border-[#e8760a]/30 rounded-full px-2 py-0.5">
          Featured
        </span>
      )}

      <StotramIcon s={s} />

      <h2 className="font-cinzel text-base font-bold text-[#8b1a00] mb-1 leading-tight min-h-[52px]">
        {s.title?.[lang] || s.title?.en}
      </h2>

      <p className="font-cinzel-reg text-xs text-[#e8760a] tracking-widest mb-3 uppercase min-h-[20px]">
        {s.deity}
      </p>

      <p className="font-garamond text-sm text-[#3d1a00]/70 leading-relaxed mb-4 line-clamp-3 min-h-[72px]">
        {s.description?.[lang] || s.description?.en}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <span className="font-cinzel-reg text-[10px] tracking-widest text-[#c9922a]/70 uppercase">
          {s.verseCount} {s.verseCount === 1 ? 'Verse' : 'Verses'}
        </span>
        <span className="font-cinzel-reg text-[10px] tracking-widest text-[#c9922a]/70 uppercase text-right">
          {s.language}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-[#c9922a] group-hover:gap-3 transition-all">
        <span className="font-cinzel-reg text-xs tracking-widest uppercase font-bold">
          Read Now
        </span>
        <span className="text-sm">→</span>
      </div>
    </Link>
  );
}

function AllStotramsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const ITEMS_PER_PAGE = 8;

  const initialQuery = searchParams.get('q') || '';
  const initialPage = Math.max(1, Number(searchParams.get('page') || '1') || 1);

  const [query, setQuery] = useState(initialQuery);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const krishnaSlug = 'krishna-vasudevaya-mantra';
  const krishnaItem = STOTRAMS_INDEX.find((s) => s.slug === krishnaSlug);

  const allPrayers = useMemo(() => {
    const seen = new Set();
    const items = [];

    if (krishnaItem) {
      items.push(krishnaItem);
      seen.add(krishnaItem.slug);
    }

    for (const s of STOTRAMS_INDEX) {
      if (!seen.has(s.slug)) {
        items.push(s);
        seen.add(s.slug);
      }
    }

    return items;
  }, [krishnaItem]);

  const matchesQuery = (s, q) => {
    const fields = [
      s.slug,
      s.deity,
      s.language,
      s.title?.en,
      s.title?.hi,
      s.title?.od,
      s.title?.or,
      s.title?.te,
      s.description?.en,
      s.description?.hi,
      s.description?.od,
      s.description?.or,
      s.description?.te,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return fields.includes(q);
  };

  const filteredAll = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allPrayers;
    return allPrayers.filter((s) => matchesQuery(s, q));
  }, [query, allPrayers]);

  const totalPages = Math.max(1, Math.ceil(filteredAll.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAll = filteredAll.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    const urlPage = Math.max(1, Number(searchParams.get('page') || '1') || 1);

    if (urlQuery !== query) {
      setQuery(urlQuery);
    }

    if (urlPage !== currentPage) {
      setCurrentPage(urlPage);
    }
  }, [searchParams]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (query.trim()) {
      params.set('q', query.trim());
    }

    if (safeCurrentPage > 1) {
      params.set('page', String(safeCurrentPage));
    }

    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    const currentUrl = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

    if (newUrl !== currentUrl) {
      router.replace(newUrl, { scroll: false });
    }
  }, [query, safeCurrentPage, pathname, router, searchParams]);

  const handleSearchChange = (value) => {
    setQuery(value);
    setCurrentPage(1);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24">
      <div className="text-center mb-14">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#c9922a]" />
          <span className="font-cinzel-reg text-[12px] tracking-[5px] uppercase text-[#e8760a]">
            All Stotrams
          </span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#c9922a]" />
        </div>

        <h1 className="font-cinzel text-4xl sm:text-5xl font-bold text-[#8b1a00] mb-4">
          Browse All Sacred Prayers
        </h1>

        <p className="font-garamond text-lg text-[#3d1a00]/70 max-w-2xl mx-auto mb-8">
          Explore all stotrams, mantras and devotional prayers in one place.
        </p>

        <SearchBox value={query} onChange={handleSearchChange} />
      </div>

      {!!filteredAll.length ? (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedAll.map((s, index) => (
              <StotramCard key={s.slug} s={s} index={index} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
              <button
                onClick={handlePrevious}
                disabled={safeCurrentPage === 1}
                className="min-w-[132px] rounded-full border border-[#c9922a]/25 bg-white px-5 py-2.5 font-cinzel-reg text-xs tracking-[2px] uppercase text-[#8b1a00] disabled:opacity-35 disabled:cursor-not-allowed hover:border-[#c9922a]/50 transition-all"
              >
                ← Previous
              </button>

              <p className="font-cinzel-reg text-[11px] tracking-[2px] uppercase text-[#8b1a00]/75">
                Page {safeCurrentPage} of {totalPages}
                <span className="block mt-1 text-[#c9922a]/80 normal-case tracking-normal font-garamond text-base">
                  ({filteredAll.length} total stotrams)
                </span>
              </p>

              <button
                onClick={handleNext}
                disabled={safeCurrentPage === totalPages}
                className="min-w-[132px] rounded-full border border-[#c9922a]/25 bg-white px-5 py-2.5 font-cinzel-reg text-xs tracking-[2px] uppercase text-[#8b1a00] disabled:opacity-35 disabled:cursor-not-allowed hover:border-[#c9922a]/50 transition-all"
              >
                Next →
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-2xl border border-[#c9922a]/20 bg-white p-10 text-center">
          <p className="font-garamond text-lg text-[#3d1a00]/70">
            No stotrams found for your search.
          </p>
        </div>
      )}
    </div>
  );
}

export default function AllStotramsPage() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-[#fdf6e3]">
        <Navbar />
        <AllStotramsContent />
      </div>
    </LangProvider>
  );
}