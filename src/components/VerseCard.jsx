'use client';
import { Share2 } from 'lucide-react';
import { useLang } from './LanguageSwitcher';

export default function VerseCard({ verse, index }) {
  const { lang } = useLang();
  const isDoha  = verse.type === 'doha' || verse.type === 'mantra';
  const meaning = verse.meaning?.[lang] || verse.meaning?.en || '';

  const verseText = (() => {
    if (lang === 'en') return verse.transliteration;
    if (lang === 'sa' || lang === 'hi') return verse.original;
    return verse.script?.[lang] || verse.transliteration;
  })();

  const handleShare = async () => {
    const shareText = `${verseText}\n\n${meaning}\n\nDivya Stotram`;
    if (navigator.share) await navigator.share({ title: 'Divya Stotram', text: shareText });
    else { navigator.clipboard?.writeText(shareText); alert('Copied!'); }
  };

  const LABELS = {
    doha:        { en:'Opening Doha', hi:'दोहा',   od:'ଦୋହା',   te:'ప్రారంభ దోహా', sa:'दोहा' },
    dohaClosing: { en:'Closing Doha', hi:'दोहा',   od:'ଦୋହା',   te:'ముగింపు దోహా', sa:'दोहा' },
    chaupai:     { en:'Chaupai',      hi:'चौपाई',  od:'ଚୌପାଈ',  te:'చౌపాయి',        sa:'चौपाई' },
    shloka:      { en:'Shloka',       hi:'श्लोक',  od:'ଶ୍ଲୋକ',  te:'శ్లోకం',         sa:'श्लोक' },
    aarti:       { en:'Aarti',        hi:'आरती',   od:'ଆରତୀ',   te:'ఆరతి',           sa:'आरती' },
    mantra:      { en:'Mantra',       hi:'मंत्र',  od:'ମନ୍ତ୍ର', te:'మంత్రం',         sa:'मंत्र' },
  };

  const MEANING_LABEL = {
    en:'Meaning', hi:'हिंदी अर्थ', od:'ଓଡ଼ିଆ ଅର୍ଥ',
    te:'తెలుగు అర్థం', sa:'संस्कृत अर्थ',
  };

  const typeLabel = () => {
    if (verse.type === 'mantra') return LABELS.mantra[lang] || LABELS.mantra.en;
    if (verse.type === 'doha') {
      const key = verse.label?.en?.toLowerCase().includes('closing') ? 'dohaClosing' : 'doha';
      return LABELS[key][lang] || LABELS[key].en;
    }
    if (verse.type === 'shloka') return `${LABELS.shloka[lang] || LABELS.shloka.en} ${verse.num}`;
    if (verse.type === 'aarti')  return `${LABELS.aarti[lang]  || LABELS.aarti.en} ${verse.num}`;
    return `${LABELS.chaupai[lang] || LABELS.chaupai.en} ${verse.num}`;
  };

  return (
    <div
      className={`relative border rounded-xl transition-all duration-300 group overflow-hidden ${
        isDoha ? 'border-[#c9922a]/40 text-center' : 'border-[#c9922a]/30'
      }`}
      style={{ background: '#fdf8ec' }}
    >
      {/* Top gold shimmer on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#c9922a]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-5 sm:p-7">

        {/* Badge + verse number */}
        <div className={`flex items-center mb-5 ${isDoha ? 'justify-center' : 'justify-between'}`}>
          <span className="inline-block font-cinzel-reg text-[10px] tracking-[3px] uppercase text-[#8b4513] border border-[#c9922a]/50 rounded-full px-3 py-1 bg-[#c9922a]/10">
            {typeLabel()}
          </span>
          {!isDoha && verse.num && (
            <span className="font-cinzel-reg text-[11px] text-[#c9922a]/60 tracking-widest">
              {String(verse.num).padStart(2,'0')}
            </span>
          )}
        </div>

        {/* Verse text — bold, big, glowing */}
        <p className="font-garamond italic text-[#1a0a00] text-2xl sm:text-3xl leading-[1.9] mb-4 font-bold whitespace-pre-line"
           style={{ textShadow: '0 0 20px rgba(201,146,42,0.4), 0 0 40px rgba(201,146,42,0.2)' }}>
          {verseText}
        </p>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4 opacity-40">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#c9922a]" />
          <span className="text-[#c9922a] text-xs">✦</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#c9922a]" />
        </div>

        {/* Meaning label */}
        <p className="font-cinzel-reg text-[9px] tracking-[2.5px] uppercase text-[#8b4513]/70 mb-2">
          {MEANING_LABEL[lang] || MEANING_LABEL.en}
        </p>

        {/* Meaning text — dark black */}
        <p className="font-garamond text-[#1a0a00] text-lg sm:text-xl leading-[1.9] font-semibold">
          {meaning}
        </p>

        {/* Share */}
        <div className="flex items-center justify-end mt-5 pt-3 border-t border-[#c9922a]/20">
          <button onClick={handleShare}
            className="flex items-center gap-1.5 font-cinzel-reg text-[11px] tracking-widest text-[#8b4513]/50 hover:text-[#8b4513] transition-colors">
            <Share2 size={12}/> Share
          </button>
        </div>
      </div>
    </div>
  );
}