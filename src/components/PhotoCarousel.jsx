'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { commonsUrl, commonsPage } from '@/data/festival-photos';

const INTERVAL = 10000;

// Commons can briefly refuse a request when many thumbnails load at once, so retry a failed image a couple of times.
function retry(e) {
  const img = e.currentTarget;
  const n = Number(img.dataset.retry || 0);
  if (n >= 2) return;
  img.dataset.retry = String(n + 1);
  const base = img.dataset.base || img.src.replace(/[&?]r=\d+$/, '');
  img.dataset.base = base;
  setTimeout(() => {
    img.src = `${base}${base.includes('?') ? '&' : '?'}r=${n + 1}`;
  }, 1200 * (n + 1));
}


function srcSetFor(file, widths) {
  return widths.map((w) => `${commonsUrl(file, w)} ${w}w`).join(', ');
}

// Full-screen viewer: Esc closes, arrows move, swipe on touch screens, page scroll is locked while open.
function Lightbox({ items, index, onIndex, onClose }) {
  const n = items.length;
  const cur = items[index];
  const touch = useRef(null);
  const closeRef = useRef(null);

  const step = useCallback((d) => onIndex(((index + d) % n + n) % n), [index, n, onIndex]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
      else if (e.key === 'Tab') { e.preventDefault(); if (closeRef.current) closeRef.current.focus(); }
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (closeRef.current) closeRef.current.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [step, onClose]);

  const onTouchStart = (e) => { touch.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touch.current == null) return;
    const dx = e.changedTouches[0].clientX - touch.current;
    touch.current = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  };

  const nb = items[(index + 1) % n];

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo viewer: ${cur.caption}`}
      className="fixed inset-0 z-[10000] flex flex-col bg-black"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex items-center justify-between px-4 py-3 text-white" onClick={(e) => e.stopPropagation()}>
        <p className="font-cinzel-reg text-xs tracking-[2px] text-white/80">
          {String(index + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close photo viewer"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-2xl leading-none hover:bg-white/25"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-14">
        <img
          key={cur.file}
          src={commonsUrl(cur.file, 1600)}
          srcSet={srcSetFor(cur.file, [800, 1200, 1600, 2400])}
          sizes="100vw"
          alt={cur.alt}
          decoding="async"
          onError={retry}
          onClick={(e) => e.stopPropagation()}
          className="max-h-full max-w-full select-none object-contain"
        />
        <link rel="preload" as="image" imageSrcSet={srcSetFor(nb.file, [800, 1200, 1600, 2400])} imageSizes="100vw" />
        {n > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); step(-1); }}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/30 sm:left-4"
            >
              <span aria-hidden="true">&lsaquo;</span>
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); step(1); }}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/30 sm:right-4"
            >
              <span aria-hidden="true">&rsaquo;</span>
            </button>
          </>
        )}
      </div>

      <div className="px-4 py-3 text-center text-white" onClick={(e) => e.stopPropagation()}>
        <p className="font-cinzel text-sm font-bold sm:text-base">{cur.caption}</p>
        <p className="mt-1 text-[11px] text-white/75">
          Photo: {cur.credit},{' '}
          <a href={commonsPage(cur.file)} target="_blank" rel="noopener noreferrer" className="underline">
            {cur.license}, via Wikimedia Commons
          </a>
        </p>
      </div>
    </div>,
    document.body
  );
}

export default function PhotoCarousel({ eyebrow, title, items }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [tick, setTick] = useState(0);
  const [open, setOpen] = useState(false);
  const openerRef = useRef(null);
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

  const running = !paused && !hidden && !reduced && !open;

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
  const MAIN_W = [640, 960, 1280, 1600, 2000];
  const MAIN_SIZES = '(min-width: 1024px) 800px, (min-width: 768px) 60vw, 100vw';
  const closeBox = useCallback(() => {
    setOpen(false);
    setTimeout(() => { if (openerRef.current) openerRef.current.focus(); }, 0);
  }, []);

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
                src={commonsUrl(p.file, 160)}
                srcSet={`${commonsUrl(p.file, 160)} 160w, ${commonsUrl(p.file, 320)} 320w`}
                sizes="96px"
                alt=""
                loading="lazy"
                decoding="async"
                onError={retry}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>

        <figure className="relative order-1 aspect-[4/3] flex-1 overflow-hidden rounded-2xl bg-[#f3e6cf] md:order-2 md:aspect-auto md:h-[520px]">
          <img
            key={cur.file}
            src={commonsUrl(cur.file, 1280)}
            srcSet={srcSetFor(cur.file, MAIN_W)}
            sizes={MAIN_SIZES}
            alt={cur.alt}
            decoding="async"
            fetchPriority={i === 0 ? 'high' : 'auto'}
            onError={retry}
            className="absolute inset-0 h-full w-full animate-[pcFade_0.6s_ease] object-cover"
          />
          <link rel="preload" as="image" imageSrcSet={srcSetFor(next.file, MAIN_W)} imageSizes={MAIN_SIZES} />
          <button
            ref={openerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Open photo full screen: ${cur.caption}`}
            className="absolute inset-0 cursor-zoom-in"
          />
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

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="View photo full screen"
            className="absolute right-3 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-black/65"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
            </svg>
          </button>

          {running && (
            <div className="absolute inset-x-0 top-0 h-1 bg-white/20">
              <div key={`${i}-${tick}`} className="h-full origin-left bg-[#e8760a]" style={{ animation: `pcBar ${INTERVAL}ms linear forwards` }} />
            </div>
          )}
        </figure>
      </div>

      {open && <Lightbox items={items} index={i} onIndex={go} onClose={closeBox} />}

      <style>{`
        @keyframes pcBar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes pcFade { from { opacity: 0; } to { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { [class*=pcFade] { animation: none !important; } }
      `}</style>
    </section>
  );
}
