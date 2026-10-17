'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const KEY = 'ds_text_zoom';
const STEPS = [0.9, 1, 1.15, 1.3, 1.5];

// Reader controls: text size, save as PDF (browser print), WhatsApp share, jump to the japa counter.
export default function ReadingToolbar({ title }) {
  const [step, setStep] = useState(1);

  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(KEY));
      if (Number.isInteger(saved) && saved >= 0 && saved < STEPS.length) setStep(saved);
    } catch {}
  }, []);

  useEffect(() => {
    const el = document.getElementById('verses');
    if (el) el.style.zoom = String(STEPS[step]);
    try {
      localStorage.setItem(KEY, String(step));
    } catch {}
  }, [step]);

  const whatsapp = () => {
    const text = `🙏 ${title} with meaning in English, Hindi, Odia and Telugu\n${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };

  const btn =
    'rounded-full border border-[#c9922a]/40 bg-white px-4 py-2 font-garamond text-base text-[#3d1a00] transition-colors hover:border-[#c9922a] hover:bg-[#fff3d6] disabled:opacity-40';

  return (
    <div className="no-print mb-4 mt-6 flex flex-wrap items-center gap-2" role="toolbar" aria-label="Reading tools">
      <div className="flex items-center gap-1 rounded-full border border-[#c9922a]/40 bg-white px-1">
        <button className="px-3 py-2 font-garamond text-sm disabled:opacity-30" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} aria-label="Smaller text">
          A−
        </button>
        <span className="px-1 font-cinzel-reg text-[10px] uppercase tracking-[2px] text-[#c9922a]">Text</span>
        <button className="px-3 py-2 font-garamond text-lg disabled:opacity-30" onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))} disabled={step === STEPS.length - 1} aria-label="Larger text">
          A+
        </button>
      </div>
      <button className={btn} onClick={() => window.print()}>
        ⬇ Save as PDF
      </button>
      <button className={btn} onClick={whatsapp}>
        WhatsApp
      </button>
      <Link href="/chanting-room" className={btn}>
        📿 Japa counter
      </Link>
    </div>
  );
}
