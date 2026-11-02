'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { commonsUrl, commonsPage } from '@/data/festival-photos';

const INTERVAL = 10000;

export default function PhotoCarousel({ eyebrow, title, items }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [tick, setTick] = useState(0);
  const railRef = useRef(null);
  const n = items.length;

  const go = useCallback(
    (next) => {
      setI(((next % n) + n) % n);
      setTick((t) => t + 1);
    },
    [n]
  );

  useEffect(() => {
    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReduced(mq.matches);
    } catch (e) {}
    const onVis = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const running = !paused && !hidden && !reduced;

  useEffect(() => {
    if (!running) return undefined;
    const id = setTimeout(() => go(i + 1), INTERVAL);
    return () => clearTimeout(id);
  }, [running, i, tick, go]);

  useEffect(() => {
    const rail = railRef.current;
    const el = rail && rail.children[i];
    if (!el || !rail) return;
    const horizontal = rail.scrollWidth > rail.clientHeight * 2 && rail.scrollHeight <= rail.clientHeight + 4;
    if (horizontal || rail.scrollWidth > rail.clientWidth) {
      rail.scrollTo({ left: el.offsetLeft - rail.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' });
    } else {
      rail.scrollTo({ top: el.offsetTop - rail.clientHeight / 2 + el.clientHeight / 2, behavior: 'smooth' });
    }
  }, [i]);

  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
  };

  const cur = items[i];
  const next = items[(i + 1) % n];

  return (
    <section
      className="mt-6 rounded-3xl border border-[#c9922a]/30 bg-gradient-to-br from-[#fff8ec] to-white p-3 shadow-sm sm:p-5"
      aria-roledescription="carousel"
      aria-label={title}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKey}
    >
      <div className="mb-3 flex items-end justify-between gap-3 px-1">
        <div>
          <p className="font-cinzel-reg text-[10px] uppercase tracking-[4px] text-[#e8760a]">{eyebrow}</p>
          <p className="font-cinzel text-lg font-bold text-[#8b1a00] sm:text-xl">{title}</p>
        </div>
        <p className="font-cinzel-reg text-xs tracking-[2px] text-[#8b1a00]/70" aria-live="off">
          {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
        </p>
      </div>

      <div className="flex flex-col gap-3 md:flex-row">
        <div
          ref={railRef}
          className="relative order-2 flex gap-2 overflow-x-auto pb-1 md:order-1 md:max-h-[520px] md:w-24 md:flex-none md:flex-col md:overflow-y-auto md:overflow-x-hidden md:pb-0 md:pr-1"
          role="tablist"
          aria-label="Photo thumbnails"
        >
          {items.map((p, k) => (
            <button
              key={p.file}
              type="button"
              role="tab"
              aria-selected={k === i}
              aria-label={`Show photo ${k + 1}: ${p.caption}`}
              onClick={() => go(k)}
              className={`relative h-16 w-20 flex-none overflow-hidden rounded-xl border-2 transition md:h-20 md:w-full ${
                k === i ? 'border-[#8b1a00] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={commonsUrl(p.file, 240)}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>

        <figure className="relative order-1 aspect-[4/3] flex-1 overflow-hidden rounded-2xl bg-[#f3e6cf] md:order-2 md:aspect-auto md:h-[520px]">
          <img
            key={cur.file}
            src={commonsUrl(cur.file, 2000)}
            srcSet={`${commonsUrl(cur.file, 1200)} 1200w, ${commonsUrl(cur.file, 2000)} 2000w`}
            sizes="(min-width: 1024px) 800px, 100vw"
            alt={cur.alt}
            decoding="async"
            className="absolute inset-0 h-full w-full animate-[pcFade_0.6s_ease] object-cover"
          />
          <link rel="preload" as="image" href={commonsUrl(next.file, 2000)} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent p-4 pb-5 pr-28 sm:p-6 sm:pr-32">
            <figcaption className="font-cinzel text-sm font-bold text-white sm:text-lg">{cur.caption}</figcaption>
            <p className="pointer-events-auto mt-1 text-[11px] text-white/80">
              Photo: {cur.credit},{' '}
              <a href={commonsPage(cur.file)} target="_blank" rel="noopener noreferrer" className="underline">
                {cur.license}, via Wikimedia Commons
              </a>
            </p>
          </div>

          <div className="absolute bottom-4 right-4 flex gap-2 sm:bottom-5 sm:right-5">
            <button
              type="button"
              onClick={() => go(i - 1)}
              aria-label="Previous photo"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-bold text-[#3d1a00] shadow-lg transition hover:scale-105 hover:bg-[#fff3d6] sm:h-11 sm:w-11"
            >
              <span aria-hidden="true">&lsaquo;</span>
            </button>
            <button
              type="button"
              onClick={() => go(i + 1)}
              aria-label="Next photo"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-bold text-[#3d1a00] shadow-lg transition hover:scale-105 hover:bg-[#fff3d6] sm:h-11 sm:w-11"
            >
              <span aria-hidden="true">&rsaquo;</span>
            </button>
          </div>

          {running && (
            <div className="absolute inset-x-0 top-0 h-1 bg-white/20">
              <div key={`${i}-${tick}`} className="h-full origin-left bg-[#e8760a]" style={{ animation: `pcBar ${INTERVAL}ms linear forwards` }} />
            </div>
          )}
        </figure>
      </div>

      <style>{`
        @keyframes pcBar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes pcFade { from { opacity: 0; } to { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { [class*="pcFade"] { animation: none !important; } }
      `}</style>
    </section>
  );
}
