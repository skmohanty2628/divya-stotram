'use client';
import { createContext, useContext, useState } from 'react';

export const LangContext = createContext({ lang: 'en', setLang: () => {} });
export function useLang() { return useContext(LangContext); }

export function LangProvider({ children }) {
  const [lang, setLang] = useState('en');
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

const LANGS = [
  { code: 'en', label: 'EN',  name: 'English'   },
  { code: 'hi', label: 'हि',  name: 'Hindi'     },
  { code: 'od', label: 'ଓ',   name: 'Odia'      },
  { code: 'te', label: 'తె',  name: 'Telugu'    },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen]   = useState(false);
  const current           = LANGS.find(l => l.code === lang);

  return (
    <div className="relative">
      {/* Tooltip above button */}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-garamond text-[10px] text-[#c9922a]/60 italic pointer-events-none hidden sm:block">
        Change language
      </div>

      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-3 py-1.5 border border-[#c9922a]/40 rounded-lg bg-[#1a0505]/10 hover:border-[#c9922a]/70 transition-colors"
        title="Click to change language"
      >
        <span className="font-cinzel-reg text-xs tracking-wider text-[#8b1a00] font-bold">Language</span>
        <span className="text-[#c9922a] text-xs">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white border border-[#c9922a]/30 rounded-xl overflow-hidden z-50 min-w-[150px] shadow-xl shadow-black/10">
          <p className="font-cinzel-reg text-[9px] tracking-[2px] uppercase text-[#c9922a]/50 px-3 pt-3 pb-1">Select Language</p>
          {LANGS.map(l => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              className={`w-full text-left px-3 py-2.5 hover:bg-[#fdf6e3] transition-colors flex items-center gap-3 border-b border-[#c9922a]/10 last:border-0 ${
                l.code === lang ? 'text-[#8b1a00] bg-[#fdf6e3]' : 'text-[#3d1a00]/80'
              }`}
            >
              <span className="text-lg w-6 text-center">{l.label}</span>
              <span className="font-garamond text-sm font-bold">{l.name}</span>
              {l.code === lang && <span className="ml-auto text-[#c9922a] text-xs">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}