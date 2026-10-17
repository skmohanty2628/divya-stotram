'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LANGS, LANG_BY_PATH, stotramPath } from '@/lib/site';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';

export const LangContext = createContext({ lang: 'en', setLang: () => {} });
export function useLang() {
  return useContext(LangContext);
}

const STOTRAM_SLUGS = new Set(STOTRAMS_INDEX.map((s) => s.slug));

// Stotram pages carry the language in the URL (/slug, /slug/hindi, /slug/odia, /slug/telugu),
// so every language is a real, crawlable, server-rendered page.
function parsePath(pathname = '') {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length >= 1 && parts.length <= 2 && STOTRAM_SLUGS.has(parts[0])) {
    const l = parts[1] ? LANG_BY_PATH[parts[1]] : null;
    return { isStotram: true, slug: parts[0], lang: l ? l.code : 'en' };
  }
  return { isStotram: false, slug: null, lang: 'en' };
}

export function LangProvider({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const parsed = parsePath(pathname);
  const [lang, setLangState] = useState(parsed.lang);

  useEffect(() => {
    const p = parsePath(pathname);
    let q = null;
    try {
      q = new URLSearchParams(window.location.search).get('lang');
    } catch {}
    const valid = LANGS.some((l) => l.code === q) ? q : null;

    if (p.isStotram) {
      // Old links such as /hanuman-chalisa?lang=hi move to the clean language URL.
      if (valid && valid !== p.lang) {
        router.replace(stotramPath(p.slug, valid));
        return;
      }
      setLangState(p.lang);
      return;
    }

    let saved = null;
    try {
      saved = localStorage.getItem('divya_lang');
    } catch {}
    const next = valid || (LANGS.some((l) => l.code === saved) ? saved : 'en');
    setLangState(next);
  }, [pathname, router]);

  const setLang = useCallback(
    (newLang) => {
      try {
        localStorage.setItem('divya_lang', newLang);
      } catch {}
      const p = parsePath(pathname);
      if (p.isStotram) {
        router.push(stotramPath(p.slug, newLang), { scroll: false });
      } else {
        setLangState(newLang);
      }
    },
    [pathname, router]
  );

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const current = LANGS.find((l) => l.code === lang) || LANGS[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 px-3 py-1.5 border border-[#c9922a]/40 rounded-lg bg-white/60 hover:border-[#c9922a]/70 transition-colors"
        title="Change language"
      >
        <span className="font-cinzel-reg text-xs tracking-wider text-[#8b1a00] font-bold">
          {current.native}
        </span>
        <span className="text-[#c9922a] text-xs">▾</span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-2 bg-white border border-[#c9922a]/30 rounded-xl overflow-hidden z-50 min-w-[160px] shadow-xl shadow-black/10"
        >
          <p className="font-cinzel-reg text-[9px] tracking-[2px] uppercase text-[#c9922a]/60 px-3 pt-3 pb-1">
            Select Language
          </p>
          {LANGS.map((l) => (
            <button
              key={l.code}
              role="option"
              aria-selected={l.code === lang}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 hover:bg-[#fdf6e3] transition-colors flex items-center gap-3 border-b border-[#c9922a]/10 last:border-0 ${
                l.code === lang ? 'text-[#8b1a00] bg-[#fdf6e3]' : 'text-[#3d1a00]/80'
              }`}
            >
              <span className="text-lg w-6 text-center">{l.short}</span>
              <span className="font-garamond text-sm font-bold">{l.name}</span>
              {l.code === lang && <span className="ml-auto text-[#c9922a] text-xs">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
