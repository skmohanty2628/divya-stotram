'use client';

import { Share2 } from 'lucide-react';
import { useLang } from './LanguageSwitcher';
import { getVerseDisplayText } from '@/lib/stotramText';

export default function VerseCard({ verse }) {
  const { lang } = useLang();
  const isDoha = verse.type === 'doha' || verse.type === 'mantra';

  const { verseText, meaningText, usedFallback } = getVerseDisplayText(verse, lang);
  const meaningIsFallback = usedFallback === true && (!meaningText || lang === 'od' || lang === 'te');

  const handleShare = async () => {
    try {
      const shareText = `${verseText}\n\n${meaningText || ''}\n\nDivya Stotram`;

      if (navigator.share) {
        await navigator.share({
          title: 'Divya Stotram',
          text: shareText,
        });
      } else {
        await navigator.clipboard?.writeText(shareText);
        alert('Copied!');
      }
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  const LABELS = {
    doha: { en: 'Opening Doha', hi: 'दोहा', od: 'ଦୋହା', te: 'ప్రారంభ దోహా', sa: 'दोहा' },
    dohaClosing: { en: 'Closing Doha', hi: 'दोहा', od: 'ଦୋହା', te: 'ముగింపు దోహా', sa: 'दोहा' },
    chaupai: { en: 'Chaupai', hi: 'चौपाई', od: 'ଚୌପାଈ', te: 'చౌపాయి', sa: 'चौपाई' },
    shloka: { en: 'Shloka', hi: 'श्लोक', od: 'ଶ୍ଲୋକ', te: 'శ్లోకం', sa: 'श्लोक' },
    aarti: { en: 'Aarti', hi: 'आरती', od: 'ଆରତୀ', te: 'ఆరతి', sa: 'आरती' },
    mantra: { en: 'Mantra', hi: 'मंत्र', od: 'ମନ୍ତ୍ର', te: 'మంత్రం', sa: 'मंत्र' },
  };

  const MEANING_LABEL = {
    en: 'Meaning',
    hi: 'हिंदी अर्थ',
    od: 'ଅର୍ଥ',
    te: 'అర్థం',
    sa: 'संस्कृत अर्थ',
  };

  const typeLabel = () => {
    if (verse.type === 'mantra') {
      return LABELS.mantra[lang] || LABELS.mantra.en;
    }

    if (verse.type === 'doha') {
      const key = verse.label?.en?.toLowerCase().includes('closing') ? 'dohaClosing' : 'doha';
      return LABELS[key][lang] || LABELS[key].en;
    }

    if (verse.type === 'shloka') {
      return `${LABELS.shloka[lang] || LABELS.shloka.en} ${verse.num ?? ''}`.trim();
    }

    if (verse.type === 'aarti') {
      return `${LABELS.aarti[lang] || LABELS.aarti.en} ${verse.num ?? ''}`.trim();
    }

    return `${LABELS.chaupai[lang] || LABELS.chaupai.en} ${verse.num ?? ''}`.trim();
  };

  const verseFontClass =
    lang === 'od'
      ? 'font-serif not-italic'
      : lang === 'te'
        ? 'font-serif not-italic'
        : lang === 'hi' || lang === 'sa'
          ? 'font-serif not-italic'
          : 'font-garamond italic';

  const meaningFontClass =
    lang === 'od'
      ? 'font-serif not-italic'
      : lang === 'te'
        ? 'font-serif not-italic'
        : lang === 'hi' || lang === 'sa'
          ? 'font-serif not-italic'
          : 'font-garamond not-italic';

  const meaningLabel = meaningIsFallback
    ? MEANING_LABEL.en
    : (MEANING_LABEL[lang] || MEANING_LABEL.en);

  return (
    <div
      className={`relative w-full rounded-3xl border shadow-md overflow-hidden transition-all duration-300 group ${
        isDoha ? 'border-[#c9922a]/40 text-center' : 'border-[#c9922a]/30'
      }`}
      style={{ background: 'linear-gradient(to bottom, #fffdf8, #fdf8ec)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#c9922a]/70 to-transparent opacity-100" />

      <div className="p-5 sm:p-7 md:p-8">
        <div className={`flex items-center mb-5 ${isDoha ? 'justify-center' : 'justify-between'}`}>
          <span className="inline-block font-cinzel-reg text-[10px] tracking-[3px] uppercase text-[#8b4513] border border-[#c9922a]/50 rounded-full px-3 py-1 bg-[#c9922a]/10 font-bold">
            {typeLabel()}
          </span>

          {!isDoha && verse.num && (
            <span className="font-cinzel-reg text-[11px] text-[#8b4513]/70 tracking-widest font-bold">
              {String(verse.num).padStart(2, '0')}
            </span>
          )}
        </div>

        <div className="rounded-2xl border border-amber-200/60 bg-white/95 shadow-sm px-5 py-5 md:px-7 md:py-6">
          <div
            className={`${verseFontClass} whitespace-pre-line text-[#1a0a00] text-[1.2rem] sm:text-[1.45rem] md:text-[1.7rem] leading-[2] md:leading-[2.1] font-bold tracking-[0.01em]`}
            style={{ textShadow: '0 0 20px rgba(201,146,42,0.10)' }}
          >
            {verseText}
          </div>

          <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-amber-300 to-transparent" />

          <div className="mb-2 font-cinzel-reg text-[10px] md:text-xs tracking-[2.5px] uppercase text-[#8b4513]/80 font-bold">
            {meaningLabel}
          </div>

          <div
            className={`${meaningFontClass} whitespace-pre-line text-[#1a0a00] text-[1rem] sm:text-[1.08rem] md:text-[1.15rem] leading-8 md:leading-9 font-semibold`}
          >
            {meaningText || '—'}
          </div>
        </div>

        <div className="flex items-center justify-end mt-5 pt-3 border-t border-[#c9922a]/20">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 font-cinzel-reg text-[11px] tracking-widest text-[#8b4513]/60 hover:text-[#8b4513] transition-colors font-bold"
            type="button"
          >
            <Share2 size={12} />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}