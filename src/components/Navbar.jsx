'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X } from 'lucide-react';
import LiveCounter from './LiveCounter';
import LanguageSwitcher from './LanguageSwitcher';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';
import { logSearch } from '@/lib/firebase';

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery]           = useState('');
  const [results, setResults]       = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setSearchOpen(false); }, [pathname]);

  const handleSearch = (q) => {
    setQuery(q);
    if (!q.trim()) { setResults([]); return; }
    const matches = STOTRAMS_INDEX.filter(s =>
      s.title.en.toLowerCase().includes(q.toLowerCase()) ||
      s.deity.toLowerCase().includes(q.toLowerCase()) ||
      s.title.hi.includes(q) ||
      s.title.od.includes(q)
    );
    setResults(matches);
    if (q.length > 2) logSearch(q);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0d0202]/95 backdrop-blur-md border-b border-[#c9922a]/20 shadow-lg shadow-black/50'
                 : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl">🕉️</span>
              <span className="font-cinzel text-lg font-bold tracking-widest text-[#f0c040] group-hover:text-[#fde8a0] transition-colors">
                DIVYA STOTRAM
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-6">
              {STOTRAMS_INDEX.slice(0, 4).map(s => (
                <Link
                  key={s.slug}
                  href={`/${s.slug}`}
                  className={`font-cinzel-reg text-xs tracking-widest uppercase transition-colors ${
                    pathname === `/${s.slug}`
                      ? 'text-[#f0c040]'
                      : 'text-[#e8d5b5]/70 hover:text-[#f0c040]'
                  }`}
                >
                  {s.deity}
                </Link>
              ))}
              <Link href="/" className="font-cinzel-reg text-xs tracking-widest uppercase text-[#e8d5b5]/70 hover:text-[#f0c040] transition-colors">
                All Stotrams
              </Link>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <LiveCounter />
              <LanguageSwitcher />

              {/* Search */}
              <button
                onClick={() => setSearchOpen(o => !o)}
                className="text-[#c9922a] hover:text-[#f0c040] transition-colors p-1"
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              {/* About */}
              <Link href="/about" className="hidden md:block font-cinzel-reg text-xs tracking-widest uppercase text-[#e8d5b5]/50 hover:text-[#f0c040] transition-colors">
                About
              </Link>

              {/* Mobile menu */}
              <button
                className="md:hidden text-[#c9922a] p-1"
                onClick={() => setMobileOpen(o => !o)}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-[#c9922a]/20 bg-[#0d0202]/98 px-4 py-3">
            <div className="max-w-xl mx-auto relative">
              <input
                autoFocus
                type="text"
                value={query}
                onChange={e => handleSearch(e.target.value)}
                placeholder="Search stotrams, deities..."
                className="w-full bg-[#1a0505] border border-[#c9922a]/30 rounded-lg px-4 py-2.5 text-[#fdf3e3] font-garamond text-base placeholder-[#e8d5b5]/30 outline-none focus:border-[#c9922a]/70"
              />
              {results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a0505] border border-[#c9922a]/30 rounded-lg overflow-hidden z-50">
                  {results.map(s => (
                    <Link
                      key={s.slug}
                      href={`/${s.slug}`}
                      onClick={() => { setSearchOpen(false); setQuery(''); setResults([]); }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-[#c9922a]/10 transition-colors border-b border-[#c9922a]/10 last:border-0"
                    >
                      <span className="text-xl">{s.deityEmoji}</span>
                      <div>
                        <p className="font-cinzel-reg text-sm text-[#f0c040]">{s.title.en}</p>
                        <p className="font-garamond text-xs text-[#e8d5b5]/60">{s.deity} · {s.verseCount} verses</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              {query && results.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a0505] border border-[#c9922a]/30 rounded-lg px-4 py-3">
                  <p className="text-[#e8d5b5]/50 font-garamond text-sm">No stotrams found for "{query}"</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile menu — full screen overlay */}
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 top-16 z-50 bg-[#0d0202]">
            <div className="px-6 py-6 space-y-1 overflow-y-auto h-full">
              <p className="font-cinzel-reg text-[10px] tracking-[4px] uppercase text-[#e8760a]/60 mb-4">All Stotrams</p>
              {STOTRAMS_INDEX.map(s => (
                <Link
                  key={s.slug}
                  href={`/${s.slug}`}
                  className="flex items-center gap-4 py-3.5 border-b border-[#c9922a]/10 hover:bg-[#c9922a]/5 rounded-lg px-2 transition-colors"
                >
                  <span className="text-2xl">{s.deityEmoji}</span>
                  <div>
                    <p className="font-cinzel-reg text-sm text-[#f0c040]">{s.title.en}</p>
                    <p className="font-garamond text-xs text-[#e8d5b5]/40">{s.deity}</p>
                  </div>
                </Link>
              ))}
              <div className="pt-4 border-t border-[#c9922a]/15 mt-4">
                <Link href="/about" className="block py-3 font-cinzel-reg text-sm text-[#e8d5b5]/50">About</Link>
                <Link href="/contact" className="block py-3 font-cinzel-reg text-sm text-[#e8d5b5]/50">Contact</Link>
                <Link href="/privacy-policy" className="block py-3 font-cinzel-reg text-sm text-[#e8d5b5]/50">Privacy Policy</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}