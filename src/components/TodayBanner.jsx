'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FESTIVAL_DATES } from '@/data/festival-dates';

// Prayers worth reading on each festival, matched by the festival's guide slug.
const PRAYERS = {
  'diwali-lakshmi-puja-guide': [['mahalakshmi-ashtakam', 'Mahalakshmi Ashtakam'], ['ganesh-aarti', 'Ganesh Aarti']],
  'boita-bandana-bali-jatra-kartika-purnima-guide': [['vishnu-sahasranamam', 'Vishnu Sahasranamam'], ['om-jai-jagdish-hare-aarti', 'Om Jai Jagdish Hare']],
  'makar-sankranti-odisha-guide': [['aditya-hridayam', 'Aditya Hridayam'], ['gayatri-mantra', 'Gayatri Mantra']],
  'vasant-panchami-saraswati-puja-guide': [['saraswati-vandana', 'Saraswati Vandana']],
  'maha-shivaratri-guide': [['shiva-panchakshara-stotram', 'Shiva Panchakshara Stotram'], ['lingashtakam', 'Lingashtakam']],
  'dola-purnima-odisha-guide': [['krishna-vasudevaya-mantra', 'Krishna Vasudevaya Mantra'], ['hare-krishna-maha-mantra', 'Hare Krishna Maha Mantra']],
  'rama-navami-guide': [['ram-raksha-stotram', 'Ram Raksha Stotram']],
  'hanuman-jayanti-guide': [['hanuman-chalisa', 'Hanuman Chalisa'], ['bajrang-baan', 'Bajrang Baan']],
  'akhi-muthi-anukula-akshaya-tritiya-odisha-guide': [['mahalakshmi-ashtakam', 'Mahalakshmi Ashtakam'], ['vishnu-sahasranamam', 'Vishnu Sahasranamam']],
  'jagannath-ratha-yatra-puri-guide': [['jagannath-ashtakam', 'Jagannath Ashtakam']],
  'gamha-purnima-rakhi-purnima-odisha-guide': [['vishnu-sahasranamam', 'Vishnu Sahasranamam'], ['gayatri-mantra', 'Gayatri Mantra']],
  'krishna-janmashtami-guide': [['krishna-vasudevaya-mantra', 'Krishna Vasudevaya Mantra'], ['hare-krishna-maha-mantra', 'Hare Krishna Maha Mantra']],
  'ganesh-chaturthi-guide': [['ganesh-aarti', 'Ganesh Aarti'], ['vakratunda-mahakaya-mantra', 'Vakratunda Mahakaya']],
  'durga-puja-odisha-guide': [['durga-stotram', 'Durga Stotram'], ['aigiri-nandini', 'Aigiri Nandini']],
};

const istDate = (offsetDays = 0) => {
  const t = Date.now() + offsetDays * 86400000;
  return new Date(t).toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
};

export default function TodayBanner() {
  const [state, setState] = useState(null);

  useEffect(() => {
    let today = istDate(0);
    let tomorrow = istDate(1);
    try {
      // Add ?festival-preview=2026-11-08 to any page to preview the banner on that day.
      const p = new URLSearchParams(window.location.search).get('festival-preview');
      if (p && /^\d{4}-\d{2}-\d{2}$/.test(p)) {
        const d = new Date(`${p}T00:00:00Z`);
        today = p;
        tomorrow = new Date(d.getTime() + 86400000).toISOString().slice(0, 10);
      }
    } catch (e) {}
    const hit = FESTIVAL_DATES.find((f) => f.date === today);
    const eve = hit ? null : FESTIVAL_DATES.find((f) => f.date === tomorrow);
    const f = hit || eve;
    if (!f) return;
    let closed = false;
    try {
      closed = sessionStorage.getItem(`dsb-${f.date}-${f.slug}`) === '1';
    } catch (e) {}
    if (!closed) setState({ f, isToday: !!hit });
  }, []);

  if (!state) return null;
  const { f, isToday } = state;
  const prayers = PRAYERS[f.slug] || [];

  const close = () => {
    try {
      sessionStorage.setItem(`dsb-${f.date}-${f.slug}`, '1');
    } catch (e) {}
    setState(null);
  };

  return (
    <div role="status" className="relative z-[5] border-b border-[#c9922a]/40 bg-gradient-to-r from-[#8b1a00] via-[#b53a00] to-[#e8760a] text-white print:hidden">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 pr-12 sm:px-6">
        <p className="font-cinzel text-sm font-bold sm:text-base">
          {isToday ? `Shubh ${f.name.split(',')[0].split(' and ')[0]}!` : `Tomorrow: ${f.name}`}
        </p>
        <p className="font-garamond text-base text-white/90">
          {isToday ? `Today is ${f.name}. ${f.note}.` : `${f.note}. Dates can differ by a day between regions, so confirm with your local panchang.`}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Link href={`/${f.slug}`} className="rounded-full bg-white px-4 py-1 font-cinzel-reg text-[11px] uppercase tracking-[2px] text-[#8b1a00] transition hover:bg-[#fff1d1]">
            Read the guide
          </Link>
          {prayers.map(([slug, label]) => (
            <Link key={slug} href={`/${slug}`} className="rounded-full border border-white/60 px-4 py-1 font-cinzel-reg text-[11px] uppercase tracking-[2px] text-white transition hover:bg-white/15">
              {label}
            </Link>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={close}
        aria-label="Dismiss festival banner"
        className="absolute right-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full text-xl leading-none text-white/90 transition hover:bg-white/15"
      >
        ×
      </button>
    </div>
  );
}
