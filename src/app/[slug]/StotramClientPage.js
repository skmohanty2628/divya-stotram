'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import VerseCard from '@/components/VerseCard';
import MusicPlayer from '@/components/MusicPlayer';
import AskPandit from '@/components/AskPandit';
import { LangProvider, useLang } from '@/components/LanguageSwitcher';
import StreakTracker from '@/components/StreakTracker';
import { SubscribeInline } from '@/components/SubscribeWidget';
import DailyPrayerSuggestions from '@/components/DailyPrayerSuggestions';
import { LANGS, stotramPath } from '@/lib/site';
import ReadingBar from '@/components/ReadingBar';

import ReadingToolbar from '@/components/ReadingToolbar';

function Breadcrumbs({ title }) {
  return (
    <nav aria-label="Breadcrumb" className="pt-6 mb-4">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        <li>
          <Link href="/" className="font-garamond text-[#8b1a00]/70 hover:text-[#8b1a00] transition-colors">
            Home
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight size={14} className="text-[#8a5f00]" />
        </li>
        <li>
          <Link href="/all-stotrams" className="font-garamond text-[#8b1a00]/70 hover:text-[#8b1a00] transition-colors">
            Stotrams
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight size={14} className="text-[#8a5f00]" />
        </li>
        <li>
          <span className="font-garamond text-[#3d1a00]/85">{title}</span>
        </li>
      </ol>
    </nav>
  );
}

function LanguageTabs({ slug }) {
  const { lang } = useLang();
  const [saved, setSaved] = useState(null);
  const [hide, setHide] = useState(false);
  useEffect(() => {
    try {
      const s = localStorage.getItem('divya_lang');
      setSaved(LANGS.some((l) => l.code === s) ? s : null);
    } catch (e) {}
  }, []);
  const pref = saved && saved !== lang ? LANGS.find((l) => l.code === saved) : null;
  return (
    <>
      {pref && !hide && (
        <div className="mb-3 flex items-center gap-3 rounded-2xl border border-[#c9922a]/40 bg-[#fff8ec] px-4 py-2.5 font-garamond text-base text-[#3d1a00]">
          <span className="flex-1">You usually read in {pref.name}.</span>
          <Link href={stotramPath(slug, pref.code)} hrefLang={pref.hreflang} className="rounded-full bg-[#8b1a00] px-4 py-1 font-cinzel-reg text-[11px] uppercase tracking-[1.5px] text-white">
            Switch to {pref.native}
          </Link>
          <button type="button" onClick={() => setHide(true)} aria-label="Dismiss" className="h-9 w-9 rounded-full text-xl leading-none text-[#3d1a00]/70 hover:bg-[#8b1a00]/10">×</button>
        </div>
      )}
      <LanguageTabsInner slug={slug} lang={lang} />
    </>
  );
}

function LanguageTabsInner({ slug, lang }) {
  return (
    <div
      role="navigation"
      aria-label="Choose language"
      className="mb-6 flex flex-wrap items-center gap-2"
    >
      <span className="font-cinzel-reg text-[10px] uppercase tracking-[2px] text-[#8a5f00]">Read in</span>
      {LANGS.map((l) => {
        const active = l.code === lang;
        return (
          <Link
            key={l.code}
            href={stotramPath(slug, l.code)}
            hrefLang={l.hreflang}
            scroll={false}
            aria-current={active ? 'page' : undefined}
            className={`rounded-full border px-4 py-1.5 font-garamond text-base transition-all ${
              active
                ? 'border-[#8b1a00] bg-[#8b1a00] text-white shadow-sm'
                : 'border-[#c9922a]/40 bg-white text-[#8b1a00] hover:border-[#c9922a] hover:bg-[#fff1d1]'
            }`}
          >
            {l.native}
          </Link>
        );
      })}
    </div>
  );
}

function ShareButtons({ meta }) {
  const handleShare = async () => {
    const url = window.location.href;
    const text = `🙏 Reading ${meta.title?.en || 'this stotram'} on Divya Stotram`;
    if (navigator.share) {
      try {
        await navigator.share({ title: meta.title?.en || 'Divya Stotram', text, url });
      } catch {}
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`, '_blank', 'noopener');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      const el = document.getElementById('copy-status');
      if (el) {
        el.textContent = 'Link copied';
        setTimeout(() => (el.textContent = ''), 2500);
      }
    } catch {}
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <button
        onClick={handleShare}
        className="rounded-full border border-[#25D366]/50 bg-[#25D366]/10 px-5 py-2.5 font-cinzel-reg text-xs tracking-widest text-[#128C7E] transition-all hover:bg-[#25D366]/20"
      >
        📱 Share
      </button>
      <button
        onClick={handleCopy}
        className="rounded-full border border-[#c9922a]/40 bg-[#c9922a]/10 px-5 py-2.5 font-cinzel-reg text-xs tracking-widest text-[#8b1a00] transition-all hover:bg-[#c9922a]/20"
      >
        🔗 Copy link
      </button>
      <span id="copy-status" role="status" className="font-garamond text-sm text-[#3d1a00]/60" />
    </div>
  );
}

function StotramContent({ meta, verseData, top, children, htmlLang }) {
  const { lang } = useLang();
  const verses = verseData?.verses || [];

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-32" lang={htmlLang}>
      <ReadingBar />
      <Breadcrumbs title={meta.title?.en} />

      <div className="flex items-center gap-4 pt-2 pb-5 border-b border-[#c9922a]/20 mb-5">
        <span className="text-4xl flex-shrink-0">{meta.deityEmoji}</span>
        <div className="flex-1 min-w-0">
          <h1 className="font-cinzel text-xl sm:text-3xl font-bold text-[#8b1a00] leading-tight">
            {meta.title?.[lang] || meta.title?.en}
          </h1>
          <p className="font-cinzel-reg text-[10px] tracking-[2px] uppercase text-[#8a5f00] mt-1">
            {meta.language} · {meta.verseCount} {meta.verseCount === 1 ? 'Verse' : 'Verses'}
          </p>
        </div>
        <StreakTracker />
      </div>

      <LanguageTabs slug={meta.slug} />

      <ReadingToolbar title={meta.title?.en || 'this stotram'} readerTitle={meta.title?.[lang] || meta.title?.en} verses={verses} />

      {top}

      <section
        id="verses"
        className="mt-8 scroll-mt-24 rounded-2xl border border-[#c9922a]/20 bg-white p-4 shadow-sm sm:p-8"
      >
        <h2 className="mb-5 font-cinzel text-xl font-bold text-[#8b1a00] sm:text-2xl">
          {meta.title?.en}: Verses with meaning
        </h2>
        {verses.length ? (
          <div className="flex flex-col gap-5">
            {verses.map((verse, i) => (
              <VerseCard key={verse.id || i} verse={verse} index={i} />
            ))}
          </div>
        ) : (
          <p className="font-garamond text-lg text-[#8b1a00]/80">
            The verses for this page are being prepared. Please check back soon.
          </p>
        )}
      </section>

      <SubscribeInline variant="compact" />

      {children}

      <DailyPrayerSuggestions currentSlug={meta.slug} lang={lang} />

      <SubscribeInline />

      <div className="mt-12 text-center border-t border-[#c9922a]/15 pt-10">
        <p className="font-cinzel text-lg text-[#8b1a00] mb-2">🙏 Share the blessings</p>
        <p className="font-garamond text-sm text-[#3d1a00]/70 mb-4">
          Share this stotram with your family and friends
        </p>
        <ShareButtons meta={meta} />
      </div>
    </div>
  );
}

export default function StotramClientPage({ meta, verseData, top, children, htmlLang = 'en' }) {
  return (
    <LangProvider>
      <div className="min-h-screen" style={{ background: '#fdf6e3' }}>
        <Navbar />
        <StotramContent meta={meta} verseData={verseData} top={top} htmlLang={htmlLang}>
          {children}
        </StotramContent>
        <MusicPlayer youtubeId={meta.youtubeId} title={meta.title?.en} />
        <AskPandit stotramContext={`${meta.title?.en}: ${meta.description?.en}`} />
      </div>
    </LangProvider>
  );
}
