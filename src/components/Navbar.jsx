'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search, X, Menu } from 'lucide-react';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';
import LanguageSwitcher from './LanguageSwitcher';
import LiveCounter from './LiveCounter';
import { useLang } from './LanguageSwitcher';
import { logSearch } from '@/lib/firebase';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery]           = useState('');
  const [results, setResults]       = useState([]);

  const handleSearch = (q) => {
    setQuery(q);
    if (!q.trim()) { setResults([]); return; }
    const r = STOTRAMS_INDEX.filter(s =>
      s.title.en.toLowerCase().includes(q.toLowerCase()) ||
      s.deity.toLowerCase().includes(q.toLowerCase()) ||
      s.description.en.toLowerCase().includes(q.toLowerCase())
    );
    setResults(r);
    if (q.length > 2) logSearch(q);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#c9922a]/20"
           style={{ background: 'rgba(253,246,227,0.96)', backdropFilter: 'blur(10px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <img src="/logo.svg" alt="Divya Stotram" width="36" height="36" style={{ borderRadius: '8px' }} />
            <span className="font-cinzel text-base font-bold text-[#8b1a00] hidden sm:block tracking-wider">
              DIVYA STOTRAM
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {[
              { href: '/hanuman-chalisa', label: 'Hanuman' },
              { href: '/durga-stotram',   label: 'Durga'   },
              { href: '/shiva-tandav',    label: 'Shiva'   },
              { href: '/gayatri-mantra',  label: 'Surya / Brahma' },
            ].map(item => (
              <Link key={item.href} href={item.href}
                className="font-cinzel-reg text-xs tracking-[2px] uppercase text-[#3d1a00]/70 hover:text-[#8b1a00] transition-colors">
                {item.label}
              </Link>
            ))}
            <Link href="/#all-stotrams"
              className="font-cinzel-reg text-xs tracking-[2px] uppercase text-[#3d1a00]/70 hover:text-[#8b1a00] transition-colors">
              All Stotrams
            </Link>

            {/* Chanting Room — highlighted */}
            <Link href="/chanting-room"
              className="font-cinzel-reg text-xs tracking-[2px] uppercase flex items-center gap-1.5 bg-[#c9922a]/10 hover:bg-[#c9922a]/20 border border-[#c9922a]/30 text-[#8b1a00] px-3 py-1.5 rounded-full transition-all">
              🎙️ Chanting Room
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LiveCounter />
            <LanguageSwitcher />

            {/* Search */}
            <div className="relative">
              <button onClick={() => setSearchOpen(o => !o)}
                className="text-[#8b1a00]/60 hover:text-[#8b1a00] transition-colors p-1">
                {searchOpen ? <X size={18} /> : <Search size={18} />}
              </button>
              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-[#c9922a]/30 rounded-xl shadow-lg overflow-hidden z-50">
                  <input
                    autoFocus
                    type="text"
                    value={query}
                    onChange={e => handleSearch(e.target.value)}
                    placeholder="Search stotrams..."
                    className="w-full px-4 py-3 font-garamond text-sm text-[#1a0a00] bg-white outline-none border-b border-[#c9922a]/20 placeholder-[#c9922a]/40"
                  />
                  {results.map(s => (
                    <Link key={s.slug} href={`/${s.slug}`}
                      onClick={() => { setSearchOpen(false); setQuery(''); setResults([]); }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-[#fdf6e3] transition-colors border-b border-[#c9922a]/10 last:border-0">
                      <span className="text-xl">{s.deityEmoji}</span>
                      <div>
                        <p className="font-cinzel-reg text-sm text-[#8b1a00] font-bold">{s.title.en}</p>
                        <p className="font-garamond text-xs text-[#c9922a]/70">{s.deity} · {s.verseCount} verses</p>
                      </div>
                    </Link>
                  ))}
                  {query && results.length === 0 && (
                    <div className="px-4 py-3">
                      <p className="text-[#3d1a00]/50 font-garamond text-sm">No stotrams found</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* About */}
            <Link href="/about" className="hidden md:block font-cinzel-reg text-xs tracking-widest uppercase text-[#8b1a00]/50 hover:text-[#8b1a00] transition-colors">
              About
            </Link>

            {/* Mobile hamburger */}
            <button onClick={() => setMobileOpen(o => !o)}
              className="md:hidden text-[#8b1a00]/70 hover:text-[#8b1a00] transition-colors p-1">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu — full screen */}
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 top-16 z-50" style={{ background: '#fdf6e3' }}>
            <div className="px-6 py-6 space-y-1 overflow-y-auto h-full">

              {/* Chanting Room — top of mobile menu */}
              <Link href="/chanting-room"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 py-3 px-4 mb-4 bg-[#c9922a]/10 border border-[#c9922a]/30 rounded-xl">
                <span className="text-2xl">🎙️</span>
                <div>
                  <p className="font-cinzel-reg text-sm text-[#8b1a00] font-bold">Chanting Room</p>
                  <p className="font-garamond text-xs text-[#c9922a]/70">Voice japa mala counter</p>
                </div>
              </Link>

              <p className="font-cinzel-reg text-[10px] tracking-[4px] uppercase text-[#e8760a]/60 mb-4">All Stotrams</p>
              {STOTRAMS_INDEX.map(s => (
                <Link key={s.slug} href={`/${s.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-4 py-3.5 border-b border-[#c9922a]/10 hover:bg-white rounded-lg px-2 transition-colors">
                  <span className="text-2xl">{s.deityEmoji}</span>
                  <div>
                    <p className="font-cinzel-reg text-sm text-[#8b1a00] font-bold">{s.title.en}</p>
                    <p className="font-garamond text-xs text-[#c9922a]/60">{s.deity}</p>
                  </div>
                </Link>
              ))}

              <div className="pt-4 border-t border-[#c9922a]/15 mt-4">
                <Link href="/about" onClick={() => setMobileOpen(false)} className="block py-3 font-cinzel-reg text-sm text-[#3d1a00]/60">About</Link>
                <Link href="/contact" onClick={() => setMobileOpen(false)} className="block py-3 font-cinzel-reg text-sm text-[#3d1a00]/60">Contact</Link>
                <Link href="/privacy-policy" onClick={() => setMobileOpen(false)} className="block py-3 font-cinzel-reg text-sm text-[#3d1a00]/60">Privacy Policy</Link>
              </div>
            </div>
          </div>
        )}
      </nav>
      <div className="h-16" />
    </>
  );
}