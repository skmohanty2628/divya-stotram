'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/components/LanguageSwitcher';
import { stotramPath, SITE_URL } from '@/lib/site';

const LABEL = {
  en: { eyebrow: 'Verse of the day', read: 'Read the full stotram', share: 'Share on WhatsApp', copy: 'Copy', copied: 'Copied', meaning: 'Meaning', verse: 'Verse' },
  hi: { eyebrow: 'आज का श्लोक', read: 'पूरा स्तोत्र पढ़ें', share: 'WhatsApp पर भेजें', copy: 'कॉपी', copied: 'कॉपी हुआ', meaning: 'अर्थ', verse: 'श्लोक' },
  od: { eyebrow: 'ଆଜିର ଶ୍ଳୋକ', read: 'ସମ୍ପୂର୍ଣ୍ଣ ସ୍ତୋତ୍ର ପଢ଼ନ୍ତୁ', share: 'WhatsApp ରେ ପଠାନ୍ତୁ', copy: 'କପି', copied: 'କପି ହେଲା', meaning: 'ଅର୍ଥ', verse: 'ଶ୍ଳୋକ' },
  te: { eyebrow: 'ఈ రోజు శ్లోకం', read: 'పూర్తి స్తోత్రం చదవండి', share: 'WhatsApp లో పంపండి', copy: 'కాపీ', copied: 'కాపీ అయింది', meaning: 'అర్థం', verse: 'శ్లోకం' },
};

// A short card on the home page: one verse a day, the same for everyone, in the reader's chosen language.
export default function VerseOfTheDay() {
  const { lang } = useLang();
  const t = LABEL[lang] || LABEL.en;
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let live = true;
    setFailed(false);
    fetch(`/api/verse-of-the-day?lang=${lang}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('bad'))))
      .then((d) => { if (live && d && d.ok) setData(d); else if (live) setFailed(true); })
      .catch(() => { if (live) setFailed(true); });
    return () => { live = false; };
  }, [lang]);

  if (failed && !data) return null;

  const href = data ? stotramPath(data.slug, lang) : '#';
  const shareText = data
    ? `${data.verseText}\n\n${data.meaningText ? `${data.meaningText}\n\n` : ''}${data.title}\n${SITE_URL}${href}`
    : '';

  const whatsapp = () => window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank', 'noopener');
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {}
  };

  const niceDate = (iso) => {
    try {
      return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' });
    } catch (e) {
      return iso;
    }
  };

  const btn = 'rounded-full border border-[#c9922a]/40 bg-white px-4 py-2 font-garamond text-base text-[#3d1a00] transition-colors hover:border-[#c9922a] hover:bg-[#fff3d6]';

  return (
    <section aria-labelledby="votd-h" className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
      <div className="min-h-[30rem] rounded-3xl border border-[#c9922a]/35 bg-gradient-to-br from-[#fff8ec] to-white p-5 shadow-sm sm:min-h-[22rem] sm:p-8">
        <div className="flex items-baseline justify-between gap-3">
          <h2 id="votd-h" className="font-cinzel-reg text-[11px] uppercase tracking-[4px] text-[#a85200]">{t.eyebrow}</h2>
          {data && (
            <p className="font-cinzel-reg text-[10px] uppercase tracking-[2px] text-[#8b1a00]/60">{niceDate(data.date)}</p>
          )}
        </div>

        {!data ? (
          <div className="mt-5 space-y-3" aria-hidden="true">
            <div className="h-6 w-3/4 rounded bg-[#f3e6cf]" />
            <div className="h-6 w-2/3 rounded bg-[#f3e6cf]" />
            <div className="h-4 w-full rounded bg-[#f3e6cf]/70" />
          </div>
        ) : (
          <>
            <p className="mt-4 font-cinzel text-lg font-bold text-[#8b1a00]">
              {data.title}
              <span className="ml-2 font-garamond text-sm font-normal text-[#3d1a00]/60">
                {t.verse} {data.num}
              </span>
            </p>
            <div className="verse-text mt-3 text-center text-xl sm:text-2xl">{data.verseText}</div>
            {data.meaningText ? (
              <div className="mt-5 border-t border-[#c9922a]/20 pt-4">
                <p className="font-cinzel-reg text-[10px] uppercase tracking-[3px] text-[#8a5f00]">{t.meaning}</p>
                <p className="verse-meaning mt-1 text-base sm:text-lg">{data.meaningText}</p>
              </div>
            ) : null}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Link href={href} className="rounded-full bg-[#8b1a00] px-5 py-2.5 font-cinzel-reg text-xs uppercase tracking-[2px] text-white transition-colors hover:bg-[#a82300]">
                {t.read}
              </Link>
              <button type="button" className={btn} onClick={whatsapp}>{t.share}</button>
              <button type="button" className={btn} onClick={copy}>{copied ? t.copied : t.copy}</button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
