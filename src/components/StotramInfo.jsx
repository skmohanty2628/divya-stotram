'use client';
import { useState } from 'react';
import { STOTRAM_INFO } from '@/data/stotram-info';

export default function StotramInfo({ slug }) {
  const info = STOTRAM_INFO[slug];
  const [openFaq, setOpenFaq] = useState(null);
  if (!info) return null;

  return (
    <div className="mt-12 space-y-8 border-t border-[#c9922a]/20 pt-10">

      {/* What is */}
      <div className="bg-white border border-[#c9922a]/20 rounded-2xl p-6 shadow-sm">
        <h2 className="font-cinzel text-lg font-bold text-[#8b1a00] mb-3">
          What is this Stotram?
        </h2>
        <p className="font-garamond text-base text-[#3d1a00]/80 leading-relaxed">
          {info.what}
        </p>
      </div>

      {/* Meaning */}
      <div className="bg-white border border-[#c9922a]/20 rounded-2xl p-6 shadow-sm">
        <h2 className="font-cinzel text-lg font-bold text-[#8b1a00] mb-3">
          Simple Meaning
        </h2>
        <p className="font-garamond text-base text-[#3d1a00]/80 leading-relaxed">
          {info.meaning}
        </p>
      </div>

      {/* Benefits */}
      <div className="bg-white border border-[#c9922a]/20 rounded-2xl p-6 shadow-sm">
        <h2 className="font-cinzel text-lg font-bold text-[#8b1a00] mb-4">
          Benefits of Chanting
        </h2>
        <ul className="space-y-2">
          {info.benefits.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-[#c9922a] mt-1 flex-shrink-0">✦</span>
              <span className="font-garamond text-base text-[#3d1a00]/80 leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Best time */}
      <div className="bg-[#fdf6e3] border border-[#c9922a]/25 rounded-2xl p-6">
        <h2 className="font-cinzel text-lg font-bold text-[#8b1a00] mb-3">
          Best Time to Chant
        </h2>
        <p className="font-garamond text-base text-[#3d1a00]/80 leading-relaxed">
          {info.bestTime}
        </p>
      </div>

      {/* FAQ */}
      <div className="bg-white border border-[#c9922a]/20 rounded-2xl p-6 shadow-sm">
        <h2 className="font-cinzel text-lg font-bold text-[#8b1a00] mb-5">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {info.faqs.map((faq, i) => (
            <div key={i} className="border border-[#c9922a]/15 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-[#fdf6e3] transition-colors"
              >
                <span className="font-garamond text-base font-semibold text-[#3d1a00]">{faq.q}</span>
                <span className="text-[#c9922a] text-lg flex-shrink-0">{openFaq === i ? '−' : '+'}</span>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 pt-1 border-t border-[#c9922a]/10">
                  <p className="font-garamond text-base text-[#3d1a00]/75 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}