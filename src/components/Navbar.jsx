'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, X, Menu } from 'lucide-react';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';
import LanguageSwitcher from './LanguageSwitcher';
import LiveCounter from './LiveCounter';
import { logSearch } from '@/lib/firebase';

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const closeMobileMenu = () => setMobileOpen(false);
  const closeSearch = () => {
    setSearchOpen(false);
    setQuery('');
    setResults([]);
  };

  const handleSearch = (q) => {
    setQuery(q);

    if (!q.trim()) {
      setResults([]);
      return;
    }

    const lowerQ = q.toLowerCase();

    const matched = STOTRAMS_INDEX.filter((s) =>
      s.title.en.toLowerCase().includes(lowerQ) ||
      s.deity.toLowerCase().includes(lowerQ) ||
      s.description.en.toLowerCase().includes(lowerQ)
    );

    setResults(matched);

    if (q.trim().length > 2) {
      logSearch(q);
    }
  };

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = previousOverflow || '';
      document.body.style.touchAction = previousTouchAction || '';
    }

    return () => {
      document.body.style.overflow = previousOverflow || '';
      document.body.style.touchAction = previousTouchAction || '';
    };
  }, [mobileOpen]);

  // Close overlays when route changes
  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setQuery('');
    setResults([]);
  }, [pathname]);

  // Close mobile drawer with Escape
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setSearchOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[1000] border-b border-[#c9922a]/20"
        style={{
          background: 'rgba(253,246,227,0.96)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 flex-shrink-0"
            onClick={closeMobileMenu}
          >
            <img
              src="/logo.svg"
              alt="Divya Stotram"
              width="36"
              height="36"
              style={{ borderRadius: '8px' }}
            />
            <span className="font-cinzel text-base font-bold text-[#8b1a00] hidden sm:block tracking-wider">
              DIVYA STOTRAM
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {[
              { href: '/hanuman-chalisa', label: 'Hanuman' },
              { href: '/durga-stotram', label: 'Durga' },
              { href: '/shiva-tandav', label: 'Shiva' },
              { href: '/gayatri-mantra', label: 'Surya / Brahma' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-cinzel-reg text-xs tracking-[2px] uppercase text-[#3d1a00]/70 hover:text-[#8b1a00] transition-colors"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/#all-stotrams"
              className="font-cinzel-reg text-xs tracking-[2px] uppercase text-[#3d1a00]/70 hover:text-[#8b1a00] transition-colors"
            >
              All Stotrams
            </Link>

            <Link
              href="/chanting-room"
              className="font-cinzel-reg text-xs tracking-[2px] uppercase flex items-center gap-1.5 bg-[#c9922a]/10 hover:bg-[#c9922a]/20 border border-[#c9922a]/30 text-[#8b1a00] px-3 py-1.5 rounded-full transition-all"
            >
              🎙️ Chanting Room
            </Link>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 sm:gap-3">
            <LiveCounter />
            <LanguageSwitcher />

            {/* Search */}
            <div className="relative">
              <button
                onClick={() => {
                  setSearchOpen((prev) => !prev);
                  setMobileOpen(false);
                }}
                aria-label={searchOpen ? 'Close search' : 'Open search'}
                className="text-[#8b1a00]/60 hover:text-[#8b1a00] transition-colors p-1"
              >
                {searchOpen ? <X size={18} /> : <Search size={18} />}
              </button>

              <div
                className={`absolute right-0 top-full mt-2 w-[82vw] max-w-72 origin-top-right transition-all duration-300 ease-out ${
                  searchOpen
                    ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
                }`}
              >
                <div className="bg-white/95 backdrop-blur-xl border border-[#c9922a]/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] overflow-hidden">
                  <input
                    autoFocus={searchOpen}
                    type="text"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search stotrams..."
                    className="w-full px-4 py-3 font-garamond text-sm text-[#1a0a00] bg-white/80 outline-none border-b border-[#c9922a]/20 placeholder-[#c9922a]/40"
                  />

                  <div className="max-h-80 overflow-y-auto">
                    {results.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/${s.slug}`}
                        onClick={closeSearch}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-[#fdf6e3] transition-colors border-b border-[#c9922a]/10 last:border-0"
                      >
                        <span className="text-xl">{s.deityEmoji}</span>
                        <div>
                          <p className="font-cinzel-reg text-sm text-[#8b1a00] font-bold">
                            {s.title.en}
                          </p>
                          <p className="font-garamond text-xs text-[#c9922a]/70">
                            {s.deity} · {s.verseCount} verses
                          </p>
                        </div>
                      </Link>
                    ))}

                    {query && results.length === 0 && (
                      <div className="px-4 py-3">
                        <p className="text-[#3d1a00]/50 font-garamond text-sm">
                          No stotrams found
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <Link
              href="/about"
              className="hidden md:block font-cinzel-reg text-xs tracking-widest uppercase text-[#8b1a00]/50 hover:text-[#8b1a00] transition-colors"
            >
              About
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => {
                setMobileOpen((prev) => !prev);
                setSearchOpen(false);
              }}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="md:hidden text-[#8b1a00]/70 hover:text-[#8b1a00] transition-colors p-1"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay + smooth drawer */}
      <div
        className={`md:hidden fixed inset-0 z-[9999] transition-all duration-300 ease-out ${
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <button
          aria-label="Close mobile menu backdrop"
          onClick={closeMobileMenu}
          className={`absolute inset-0 w-full h-full transition-all duration-300 ${
            mobileOpen
              ? 'bg-black/35 backdrop-blur-md opacity-100'
              : 'bg-black/0 backdrop-blur-0 opacity-0'
          }`}
        />

        {/* Drawer */}
        <aside
          className={`absolute top-0 right-0 h-full w-[88%] max-w-[360px] bg-[#fffaf0]/95 backdrop-blur-2xl border-l border-[#c9922a]/20 shadow-[-10px_0_40px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="h-full flex flex-col">
            {/* Drawer header */}
            <div className="h-16 px-5 flex items-center justify-between border-b border-[#c9922a]/15">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.svg"
                  alt="Divya Stotram"
                  width="34"
                  height="34"
                  style={{ borderRadius: '8px' }}
                />
                <div>
                  <p className="font-cinzel text-sm tracking-wide text-[#8b1a00]">
                    DIVYA STOTRAM
                  </p>
                  <p className="font-garamond text-xs text-[#c9922a]/70">
                    Sacred prayers in 4 languages
                  </p>
                </div>
              </div>

              <button
                onClick={closeMobileMenu}
                aria-label="Close mobile menu"
                className="text-[#8b1a00]/70 hover:text-[#8b1a00] transition-colors p-1"
              >
                <X size={22} />
              </button>
            </div>

            {/* Drawer body */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <Link
                href="/chanting-room"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 p-4 mb-5 bg-[#c9922a]/10 border border-[#c9922a]/25 rounded-2xl hover:bg-[#c9922a]/15 transition-all"
              >
                <span className="text-2xl">🎙️</span>
                <div>
                  <p className="font-cinzel-reg text-sm text-[#8b1a00] font-bold">
                    Chanting Room
                  </p>
                  <p className="font-garamond text-xs text-[#c9922a]/70">
                    Voice japa mala counter
                  </p>
                </div>
              </Link>

              <div className="mb-4">
                <p className="font-cinzel-reg text-[10px] tracking-[4px] uppercase text-[#e8760a]/60 mb-3">
                  All Stotrams
                </p>
              </div>

              <div className="space-y-1">
                {STOTRAMS_INDEX.map((s, index) => (
                  <Link
                    key={s.slug}
                    href={`/${s.slug}`}
                    onClick={closeMobileMenu}
                    className="group flex items-center gap-4 py-3.5 px-3 rounded-xl border border-transparent hover:border-[#c9922a]/15 hover:bg-white/70 transition-all"
                    style={{
                      transitionDelay: mobileOpen ? `${index * 18}ms` : '0ms',
                      opacity: mobileOpen ? 1 : 0,
                      transform: mobileOpen
                        ? 'translateX(0px)'
                        : 'translateX(18px)',
                    }}
                  >
                    <span className="text-2xl">{s.deityEmoji}</span>
                    <div>
                      <p className="font-cinzel-reg text-sm text-[#8b1a00] font-bold">
                        {s.title.en}
                      </p>
                      <p className="font-garamond text-xs text-[#c9922a]/60">
                        {s.deity}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="pt-5 mt-5 border-t border-[#c9922a]/15 space-y-1">
                <Link
                  href="/about"
                  onClick={closeMobileMenu}
                  className="block py-3 px-3 rounded-xl font-cinzel-reg text-sm text-[#3d1a00]/70 hover:bg-white/70 transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="block py-3 px-3 rounded-xl font-cinzel-reg text-sm text-[#3d1a00]/70 hover:bg-white/70 transition-colors"
                >
                  Contact
                </Link>
                <Link
                  href="/privacy-policy"
                  onClick={closeMobileMenu}
                  className="block py-3 px-3 rounded-xl font-cinzel-reg text-sm text-[#3d1a00]/70 hover:bg-white/70 transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="h-16" />
    </>
  );
}