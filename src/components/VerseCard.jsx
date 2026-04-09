'use client';

import { useState } from 'react';
import { Share2, ChevronDown, ChevronUp } from 'lucide-react';
import { useLang } from './LanguageSwitcher';
import { getVerseDisplayText } from '@/lib/stotramText';

export default function VerseCard({ verse }) {
  const { lang } = useLang();

  const [meaningOpen, setMeaningOpen] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);

  const { verseText, meaningText } = getVerseDisplayText(verse, lang);

  const handleShare = async () => {
    const shareText = `${verseText}\n\n${meaningText || ''}\n\nDivya Stotram`;

    if (navigator.share) {
      await navigator.share({ title: 'Divya Stotram', text: shareText });
    } else {
      await navigator.clipboard.writeText(shareText);
      alert('Copied!');
    }
  };

  const fetchAIExplanation = async () => {
    try {
      setLoadingAI(true);
      setAiResponse('');

      const res = await fetch('/api/groq-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verse: verseText, lang }),
      });

      const data = await res.json();
      setAiResponse(data.result);
    } catch (err) {
      setAiResponse('Error getting explanation');
    } finally {
      setLoadingAI(false);
    }
  };

  const LABELS = {
    explain: {
      en: 'Explain',
      hi: 'अर्थ देखें',
      od: 'ଅର୍ଥ ଦେଖନ୍ତୁ',
      te: 'అర్థం చూడండి',
    },
    hide: {
      en: 'Hide Meaning',
      hi: 'अर्थ छुपाएँ',
      od: 'ଅର୍ଥ ଲୁଚାନ୍ତୁ',
      te: 'అర్థం దాచండి',
    },
  };

  const explainLabel = meaningOpen
    ? LABELS.hide[lang] || LABELS.hide.en
    : LABELS.explain[lang] || LABELS.explain.en;

  return (
    <div className="rounded-3xl border border-[#c9922a]/30 bg-[#fffdf8] p-6 shadow-md">

      {/* Verse */}
      <div className="text-center text-xl md:text-2xl font-garamond italic leading-loose">
        {verseText}
      </div>

      {/* Explain Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => setMeaningOpen(!meaningOpen)}
          className="px-5 py-2 border border-[#c9922a]/40 rounded-full text-sm tracking-widest font-cinzel-reg text-[#8b1a00] hover:bg-[#fdf6e3]"
        >
          {meaningOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />} {explainLabel}
        </button>
      </div>

      {/* Meaning */}
      {meaningOpen && (
        <div className="mt-8 text-center">
          <div className="text-xs tracking-widest text-[#c9922a] mb-2 uppercase font-cinzel-reg">
            Meaning
          </div>

          <div className="text-lg font-garamond leading-relaxed text-[#3d1a00]">
            {meaningText}
          </div>

          {/* AI Button */}
          <div className="mt-6">
            <button
              onClick={fetchAIExplanation}
              className="px-5 py-2 rounded-full bg-[#eef6ff] border border-[#7bb6ff] text-[#0f4c81] text-sm tracking-widest font-cinzel-reg hover:bg-[#e0f0ff]"
            >
              ✨ Explain by AI
            </button>
          </div>

          {/* AI Response */}
          {(loadingAI || aiResponse) && (
            <div className="mt-6 p-5 rounded-2xl border border-[#c9922a]/20 bg-[#fffaf3]">
              <div className="text-xs tracking-widest text-[#c9922a] mb-2 uppercase font-cinzel-reg">
                AI Explanation
              </div>

              <div className="text-base font-garamond text-[#3d1a00] leading-relaxed">
                {loadingAI ? 'Thinking...' : aiResponse}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Share */}
      <div className="mt-6 flex justify-end">
        <button onClick={handleShare} className="flex items-center gap-1 text-sm text-[#8b4513]">
          <Share2 size={14} /> Share
        </button>
      </div>
    </div>
  );
}