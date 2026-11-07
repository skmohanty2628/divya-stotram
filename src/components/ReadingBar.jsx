'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// Thin reading-progress line under the navbar. With sections it also shows a sticky strip with the current
// section, a contents menu and a back-to-top button once the reader has scrolled past the header.
export default function ReadingBar({ sections = [] }) {
  const [pct, setPct] = useState(0);
  const [shown, setShown] = useState(false);
  const [cur, setCur] = useState(0);
  const [open, setOpen] = useState(false);
  const raf = useRef(0);
  const wrap = useRef(null);

  const update = useCallback(() => {
    raf.current = 0;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const y = window.scrollY || doc.scrollTop || 0;
    setPct(max > 0 ? Math.min(100, Math.max(0, (y / max) * 100)) : 0);
    setShown(y > 420);
    let idx = 0;
    for (let i = 0; i < sections.length; i++) {
      const el = document.getElementById(sections[i].id);
      if (el && el.getBoundingClientRect().top <= 140) idx = i;
    }
    setCur(idx);
  }, [sections]);

  useEffect(() => {
    const on = () => {
      if (!raf.current) raf.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [update]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onDoc = (e) => wrap.current && !wrap.current.contains(e.target) && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDoc);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDoc);
    };
  }, [open]);

  const top = () => {
    let smooth = true;
    try {
      smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {}
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  };

  return (
    <div ref={wrap} className="pointer-events-none fixed left-0 right-0 top-16 z-[999] print:hidden">
      <div className="h-[3px] w-full bg-[#c9922a]/15" role="progressbar" aria-label="Reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct)}>
        <div className="h-full bg-gradient-to-r from-[#8b1a00] to-[#e8760a]" style={{ width: `${pct}%` }} />
      </div>
      {sections.length > 0 && (
        <div
          className={`pointer-events-auto border-b border-[#c9922a]/25 bg-[#fdf6e3]/95 backdrop-blur transition-all duration-200 ${
            shown ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 invisible'
          }`}
        >
          <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-2 sm:px-6">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              className="flex-none rounded-full border border-[#c9922a]/40 bg-white px-3 py-1 font-cinzel-reg text-[10px] uppercase tracking-[2px] text-[#8b1a00] transition hover:border-[#8b1a00]"
            >
              Contents
            </button>
            <p className="min-w-0 flex-1 truncate font-garamond text-base text-[#3d1a00]/80">
              <span className="mr-2 text-[#8a5f00]">{cur + 1}/{sections.length}</span>
              {sections[cur] && sections[cur].h}
            </p>
            <span className="flex-none font-cinzel-reg text-[10px] tracking-[2px] text-[#3d1a00]/50">{Math.round(pct)}%</span>
            <button
              type="button"
              onClick={top}
              aria-label="Back to top"
              className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-[#c9922a]/40 bg-white text-[#8b1a00] transition hover:border-[#8b1a00]"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
          {open && (
            <div className="mx-auto max-w-4xl px-4 pb-3 sm:px-6">
              <ol className="max-h-[60vh] overflow-auto rounded-2xl border border-[#c9922a]/30 bg-white p-3 shadow-lg">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      onClick={() => setOpen(false)}
                      className={`block rounded-lg px-3 py-2 font-garamond text-lg transition hover:bg-[#fff7e8] ${i === cur ? 'font-bold text-[#8b1a00]' : 'text-[#3d1a00]/85'}`}
                    >
                      <span className="mr-2 text-[#8a5f00]">{i + 1}.</span>
                      {s.h}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
