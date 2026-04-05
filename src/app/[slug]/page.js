'use client';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import VerseCard from '@/components/VerseCard';
import AdSlot from '@/components/AdSlot';
import MusicPlayer from '@/components/MusicPlayer';
import AskPandit from '@/components/AskPandit';
import StotramInfo from '@/components/StotramInfo';
import { LangProvider, useLang } from '@/components/LanguageSwitcher';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';
import { hanumanChalisa } from '@/data/hanuman-chalisa';
import { durgaStotram, shivaTandav, gayatriMantra, ganeshAarti, saraswatiVandana, mahalakshmiAshtakam, vishnuSahasranamam } from '@/data/other-stotrams';
import { useEffect, useState } from 'react';
import { trackAndWatch } from '@/lib/firebase';

const VERSE_DATA = {
  'hanuman-chalisa':       hanumanChalisa,
  'durga-stotram':         durgaStotram,
  'shiva-tandav':          shivaTandav,
  'gayatri-mantra':        gayatriMantra,
  'ganesh-aarti':          ganeshAarti,
  'saraswati-vandana':     saraswatiVandana,
  'mahalakshmi-ashtakam':  mahalakshmiAshtakam,
  'vishnu-sahasranamam':   vishnuSahasranamam,
};

function PageVisitorBadge({ slug }) {
  const [count, setCount] = useState(null);
  useEffect(() => {
    try {
      const unsub = trackAndWatch(slug, setCount);
      return unsub;
    } catch { setCount(Math.floor(Math.random() * 80) + 20); }
  }, [slug]);
  if (!count) return null;
  return (
    <span className="inline-flex items-center gap-1.5 bg-[#e8760a]/10 border border-[#e8760a]/30 rounded-full px-3 py-1">
      <span className="w-1.5 h-1.5 rounded-full bg-[#e8760a] animate-pulse" />
      <span className="font-cinzel-reg text-[10px] tracking-widest text-[#e8760a]">
        {count} praying now
      </span>
    </span>
  );
}

function StotramContent({ meta, verseData }) {
  const { lang } = useLang();

  if (!verseData) {
    return (
      <div className="text-center py-32">
        <p className="font-garamond text-2xl text-[#e8d5b5]/50 italic">Stotram content coming soon...</p>
        <p className="font-cinzel-reg text-xs tracking-widest text-[#c9922a]/50 mt-3">We are adding more stotrams. Please check back.</p>
      </div>
    );
  }

  const verses = verseData.verses || [];

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">

      {/* Hero — compact */}
      <div className="flex items-center gap-4 pt-6 pb-5 border-b border-[#c9922a]/20 mb-6">
        <span className="text-4xl flex-shrink-0">{meta.deityEmoji}</span>
        <div className="flex-1 min-w-0">
          <h1 className="font-cinzel text-xl sm:text-3xl font-bold text-[#8b1a00] leading-tight truncate">
            {meta.title[lang] || meta.title.en}
          </h1>
          <p className="font-cinzel-reg text-[10px] tracking-[2px] uppercase text-[#c9922a]/60 mt-1">
            {meta.language} · {meta.verseCount} Verses
          </p>
        </div>
        <PageVisitorBadge slug={meta.slug} />
      </div>

      {/* Verses */}
      <div className="flex flex-col gap-5">
        {verses.map((verse, i) => (
          <div key={verse.id}>
            <VerseCard verse={verse} index={i} />
          </div>
        ))}
      </div>

      {/* Info section — What is, Benefits, FAQ */}
      <StotramInfo slug={meta.slug} />

      {/* Share section */}
      <div className="mt-12 text-center border-t border-[#c9922a]/15 pt-10">
        <p className="font-cinzel text-lg text-[#f0c040] mb-2">🙏 Share the Blessings</p>
        <p className="font-garamond text-sm text-[#e8d5b5]/50 mb-4 italic">
          Spread the divine light — share this stotram with your loved ones
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => {
              const url = typeof window !== 'undefined' ? window.location.href : '';
              const text = `🙏 Reading ${meta.title.en} on Divya Stotram\n${url}`;
              if (navigator.share) navigator.share({ title: meta.title.en, url });
              else window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
            }}
            className="flex items-center gap-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#25D366] font-cinzel-reg text-xs tracking-widest px-5 py-2.5 rounded-full transition-all"
          >
            📱 WhatsApp
          </button>
          <button
            onClick={() => typeof window !== 'undefined' && navigator.clipboard?.writeText(window.location.href) && alert('Link copied!')}
            className="flex items-center gap-2 bg-[#c9922a]/15 hover:bg-[#c9922a]/25 border border-[#c9922a]/35 text-[#f0c040] font-cinzel-reg text-xs tracking-widest px-5 py-2.5 rounded-full transition-all"
          >
            🔗 Copy Link
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StotramPage({ params }) {
  const { slug } = params;
  const meta = STOTRAMS_INDEX.find(s => s.slug === slug);
  if (!meta) return notFound();

  const verseData = VERSE_DATA[slug] || null;

  return (
    <LangProvider>
      <div className="min-h-screen" style={{ background: '#fdf6e3' }}>
        <Navbar />
        <StotramContent meta={meta} verseData={verseData} />
        <MusicPlayer youtubeId={meta.youtubeId} title={meta.title.en} />
        <AskPandit stotramContext={`${meta.title.en} — ${meta.description.en}`} />
      </div>
    </LangProvider>
  );
}