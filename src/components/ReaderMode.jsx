'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLang } from '@/components/LanguageSwitcher';
import { getVerseDisplayText } from '@/lib/stotramText';

const SIZES = [1, 1.2, 1.45, 1.8, 2.2];
const THEMES = {
  cream: { name: 'Cream', bg: '#fdf6e3', fg: '#2a1200', muted: '#7a5a3a', bar: '#fff3d6', line: '#c9922a55', accent: '#8b1a00' },
  dark: { name: 'Dark', bg: '#17120e', fg: '#f3e8d2', muted: '#b9a888', bar: '#241c15', line: '#c9922a44', accent: '#f0a64a' },
  black: { name: 'Black', bg: '#000000', fg: '#ece4d2', muted: '#a89c85', bar: '#111111', line: '#ffffff22', accent: '#f0a64a' },
};
const ORDER = ['cream', 'dark', 'black'];
const LS = { size: 'ds_reader_size', theme: 'ds_reader_theme', meaning: 'ds_reader_meaning' };

const LABEL = {
  en: { open: 'Reader mode', close: 'Close reader mode', meaning: 'Meaning', theme: 'Theme', smaller: 'Smaller text', larger: 'Larger text', screen: 'Keep screen on', verse: 'Verse' },
  hi: { open: 'रीडर मोड', close: 'रीडर मोड बंद करें', meaning: 'अर्थ', theme: 'थीम', smaller: 'छोटा पाठ', larger: 'बड़ा पाठ', screen: 'स्क्रीन चालू रखें', verse: 'श्लोक' },
  od: { open: 'ରିଡର୍ ମୋଡ୍', close: 'ରିଡର୍ ମୋଡ୍ ବନ୍ଦ କରନ୍ତୁ', meaning: 'ଅର୍ଥ', theme: 'ଥିମ୍', smaller: 'ଛୋଟ ଅକ୍ଷର', larger: 'ବଡ଼ ଅକ୍ଷର', screen: 'ସ୍କ୍ରିନ୍ ଚାଲୁ ରଖନ୍ତୁ', verse: 'ଶ୍ଳୋକ' },
  te: { open: 'రీడర్ మోడ్', close: 'రీడర్ మోడ్ మూసివేయండి', meaning: 'అర్థం', theme: 'థీమ్', smaller: 'చిన్న అక్షరాలు', larger: 'పెద్ద అక్షరాలు', screen: 'స్క్రీన్ ఆన్‌లో ఉంచండి', verse: 'శ్లోకం' },
};

function readPref(key, fallback, ok) {
  try {
    const v = localStorage.getItem(key);
    return v != null && ok(v) ? v : fallback;
  } catch {
    return fallback;
  }
}
function writePref(key, value) {
  try { localStorage.setItem(key, String(value)); } catch {}
}

function Reader({ title, verses, onClose }) {
  const { lang } = useLang();
  const t = LABEL[lang] || LABEL.en;
  const [size, setSize] = useState(1);
  const [theme, setTheme] = useState('cream');
  const [showMeaning, setShowMeaning] = useState(true);
  const [awake, setAwake] = useState(true);
  const [progress, setProgress] = useState(0);
  const scroller = useRef(null);
  const closeRef = useRef(null);
  const lock = useRef(null);

  useEffect(() => {
    setSize(Number(readPref(LS.size, '0', (v) => Number.isInteger(+v) && +v >= 0 && +v < SIZES.length)));
    setTheme(readPref(LS.theme, 'cream', (v) => v in THEMES));
    setShowMeaning(readPref(LS.meaning, '1', (v) => v === '0' || v === '1') === '1');
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (closeRef.current) closeRef.current.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  // Screen Wake Lock keeps the phone from dimming while someone reads or chants along. Silent if unsupported.
  useEffect(() => {
    let dead = false;
    const take = async () => {
      try {
        if (awake && 'wakeLock' in navigator && document.visibilityState === 'visible') {
          const l = await navigator.wakeLock.request('screen');
          if (dead) { l.release().catch(() => {}); return; }
          lock.current = l;
        }
      } catch {}
    };
    take();
    const onVis = () => { if (document.visibilityState === 'visible') take(); };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      dead = true;
      document.removeEventListener('visibilitychange', onVis);
      if (lock.current) { lock.current.release().catch(() => {}); lock.current = null; }
    };
  }, [awake]);

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 1);
  };

  const th = THEMES[theme] || THEMES.cream;
  const nextTheme = () => {
    const n = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length];
    setTheme(n); writePref(LS.theme, n);
  };
  const bump = (d) => {
    const n = Math.max(0, Math.min(SIZES.length - 1, size + d));
    setSize(n); writePref(LS.size, n);
  };
  const toggleMeaning = () => { setShowMeaning((m) => { writePref(LS.meaning, m ? '0' : '1'); return !m; }); };

  const pill = {
    border: `1px solid ${th.line}`, background: 'transparent', color: th.fg,
  };
  const pillCls = 'rounded-full px-3 py-1.5 text-sm font-garamond transition-opacity hover:opacity-80 disabled:opacity-30';

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${t.open}: ${title}`}
      className="fixed inset-0 z-[10000] flex flex-col"
      style={{ background: th.bg, color: th.fg }}
    >
      <div className="relative flex flex-wrap items-center gap-2 px-3 py-2 sm:px-5" style={{ background: th.bar, borderBottom: `1px solid ${th.line}` }}>
        <button ref={closeRef} type="button" onClick={onClose} aria-label={t.close} className={`${pillCls} flex h-9 w-9 items-center justify-center text-xl leading-none`} style={pill}>
          <span aria-hidden="true">&times;</span>
        </button>
        <p className="min-w-0 flex-1 truncate font-cinzel text-sm font-bold sm:text-base" style={{ color: th.accent }}>{title}</p>
        <div className="flex flex-wrap items-center gap-1.5" role="toolbar" aria-label={t.open}>
          <button type="button" className={pillCls} style={pill} onClick={() => bump(-1)} disabled={size === 0} aria-label={t.smaller}>A&minus;</button>
          <button type="button" className={`${pillCls} text-lg`} style={pill} onClick={() => bump(1)} disabled={size === SIZES.length - 1} aria-label={t.larger}>A+</button>
          <button type="button" className={pillCls} style={pill} onClick={nextTheme} aria-label={`${t.theme}: ${th.name}`}>{th.name}</button>
          <button type="button" className={pillCls} style={{ ...pill, opacity: showMeaning ? 1 : 0.55 }} onClick={toggleMeaning} aria-pressed={showMeaning}>{t.meaning}</button>
          <button type="button" className={pillCls} style={{ ...pill, opacity: awake ? 1 : 0.55 }} onClick={() => setAwake((a) => !a)} aria-pressed={awake} title={t.screen}>&#9728;</button>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[3px]" style={{ background: th.line }}>
          <div className="h-full" style={{ width: `${Math.round(progress * 100)}%`, background: th.accent }} />
        </div>
      </div>

      <div ref={scroller} onScroll={onScroll} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-8 sm:px-8">
        <div className="mx-auto max-w-2xl">
          {verses.map((v, i) => {
            const { verseText, meaningText } = getVerseDisplayText(v, lang);
            return (
              <article key={v.id || i} className="mb-12" style={{ borderBottom: i < verses.length - 1 ? `1px solid ${th.line}` : 'none', paddingBottom: i < verses.length - 1 ? '2.5rem' : 0 }}>
                <p className="mb-3 text-center font-cinzel-reg text-[10px] uppercase tracking-[4px]" style={{ color: th.muted }}>
                  {t.verse} {v.num || i + 1} / {verses.length}
                </p>
                <div className="verse-text text-center" style={{ color: th.fg, fontSize: `${1.45 * SIZES[size]}rem` }}>{verseText}</div>
                {showMeaning && meaningText ? (
                  <p className="verse-meaning mt-5 text-center" style={{ color: th.muted, fontSize: `${1.05 * SIZES[size]}rem` }}>{meaningText}</p>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function ReaderModeButton({ title, verses, className = '' }) {
  const { lang } = useLang();
  const t = LABEL[lang] || LABEL.en;
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const close = useCallback(() => {
    setOpen(false);
    setTimeout(() => { if (btnRef.current) btnRef.current.focus(); }, 0);
  }, []);
  if (!verses || !verses.length) return null;
  return (
    <>
      <button ref={btnRef} type="button" className={className} onClick={() => setOpen(true)} aria-haspopup="dialog">
        &#128214; {t.open}
      </button>
      {open && <Reader title={title} verses={verses} onClose={close} />}
    </>
  );
}
