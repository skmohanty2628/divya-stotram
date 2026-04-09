'use client';

import { useState } from 'react';
import { Share2, ChevronDown, ChevronUp, Sparkles, Brain, MessageCircle } from 'lucide-react';
import { useLang } from './LanguageSwitcher';
import { getVerseDisplayText } from '@/lib/stotramText';

export default function VerseCard({ verse }) {
  const { lang } = useLang();

  const [meaningOpen, setMeaningOpen] = useState(false);
  const [activeAiMode, setActiveAiMode] = useState(null);

  const isDoha = verse.type === 'doha' || verse.type === 'mantra';

  const { verseText, meaningText, usedFallback } = getVerseDisplayText(verse, lang);
  const meaningIsFallback =
    usedFallback === true && (!meaningText || lang === 'od' || lang === 'te');

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

  const ACTION_LABELS = {
    explain: {
      en: 'Explain',
      hi: 'अर्थ देखें',
      od: 'ଅର୍ଥ ଦେଖନ୍ତୁ',
      te: 'అర్థం చూడండి',
      sa: 'अर्थ देखें',
    },
    hide: {
      en: 'Hide Meaning',
      hi: 'अर्थ छुपाएँ',
      od: 'ଅର୍ଥ ଲୁଚାନ୍ତୁ',
      te: 'అర్థం దాచండి',
      sa: 'अर्थ छुपाएँ',
    },
    meaning: {
      en: 'Meaning',
      hi: 'हिंदी अर्थ',
      od: 'ଅର୍ଥ',
      te: 'అర్థం',
      sa: 'संस्कृत अर्थ',
    },
    noMeaning: {
      en: 'Meaning coming soon',
      hi: 'अर्थ जल्द आएगा',
      od: 'ଅର୍ଥ ଶୀଘ୍ର ଆସିବ',
      te: 'అర్థం త్వరలో వస్తుంది',
      sa: 'अर्थ शीघ्र उपलब्ध होगा',
    },
    share: {
      en: 'Share',
      hi: 'शेयर',
      od: 'ଶେୟର',
      te: 'షేర్',
      sa: 'शेयर',
    },
  };

  const AI_LABELS = {
    simple: {
      en: 'Explain Simply',
      hi: 'सरल अर्थ',
      od: 'ସରଳ ଅର୍ଥ',
      te: 'సరళమైన అర్థం',
      sa: 'सरल अर्थ',
    },
    deep: {
      en: 'Explain Deeper',
      hi: 'गहराई से समझें',
      od: 'ଗଭୀର ଭାବେ ବୁଝନ୍ତୁ',
      te: 'లోతుగా అర్థం చేసుకోండి',
      sa: 'गहराई से समझें',
    },
    ask: {
      en: 'Ask AI',
      hi: 'AI से पूछें',
      od: 'AI କୁ ପଚାରନ୍ତୁ',
      te: 'AI ని అడగండి',
      sa: 'AI से पूछें',
    },
    aiTitle: {
      en: 'AI Explanation',
      hi: 'AI व्याख्या',
      od: 'AI ବ୍ୟାଖ୍ୟା',
      te: 'AI వివరణ',
      sa: 'AI व्याख्या',
    },
  };

  const AI_PLACEHOLDER_TEXT = {
    simple: {
      en: 'This verse is saying the same meaning in a simpler and easier way. In the next step, we will connect this to Groq so it can generate a beginner-friendly explanation.',
      hi: 'यह श्लोक के अर्थ को आसान और सरल भाषा में समझाएगा। अगले चरण में हम इसे Groq से जोड़ेंगे ताकि यह शुरुआती पाठकों के लिए सरल व्याख्या दे सके।',
      od: 'ଏହି ଅଂଶ ଶ୍ଳୋକର ଅର୍ଥକୁ ଅଧିକ ସରଳ ଭାବରେ ବୁଝେଇବ। ପରବର୍ତ୍ତୀ ପଦକ୍ଷେପରେ ଏହାକୁ Groq ସହିତ ଯୋଡ଼ାଯିବ ଯାହା ଆରମ୍ଭିକ ପାଠକଙ୍କ ପାଇଁ ସହଜ ବ୍ୟାଖ୍ୟା ଦେବ।',
      te: 'ఈ భాగం ఈ శ్లోకంలోని అర్థాన్ని ఇంకా సులభంగా వివరిస్తుంది. తర్వాతి దశలో దీనిని Groq తో కలిపి ప్రారంభస్థాయి వినియోగదారులకు సులభమైన వివరణ ఇస్తాం.',
      sa: 'यह भाग अर्थ को सरल रूप में समझाएगा। अगले चरण में इसे Groq से जोड़ा जाएगा।',
    },
    deep: {
      en: 'This section will show a deeper spiritual explanation, symbolism, devotion, and inner message of the verse. We will connect this to Groq in the next step.',
      hi: 'यह भाग श्लोक का गहरा आध्यात्मिक अर्थ, प्रतीक, भक्ति और आंतरिक संदेश दिखाएगा। अगले चरण में हम इसे Groq से जोड़ेंगे।',
      od: 'ଏହି ଅଂଶରେ ଶ୍ଳୋକର ଗଭୀର ଆଧ୍ୟାତ୍ମିକ ଅର୍ଥ, ପ୍ରତୀକ, ଭକ୍ତି ଓ ଅନ୍ତର୍ନିହିତ ସନ୍ଦେଶ ଦେଖାଯିବ। ପରବର୍ତ୍ତୀ ପଦକ୍ଷେପରେ ଏହାକୁ Groq ସହିତ ଯୋଡ଼ାଯିବ।',
      te: 'ఈ భాగం శ్లోకంలోని లోతైన ఆధ్యాత్మిక అర్థం, ప్రతీకలు, భక్తి భావం మరియు అంతర్ముఖ సందేశాన్ని చూపిస్తుంది. తర్వాతి దశలో దీనిని Groq తో కలుపుతాం.',
      sa: 'यह भाग गहरे आध्यात्मिक अर्थ और संकेतों को दर्शाएगा। अगले चरण में इसे Groq से जोड़ा जाएगा।',
    },
    ask: {
      en: 'This area will let the user ask questions about this specific verse, such as why a word is used, what the symbolism means, or how it applies in life. We will connect it to Groq next.',
      hi: 'यह भाग उपयोगकर्ता को इसी श्लोक से जुड़े प्रश्न पूछने देगा, जैसे किसी शब्द का अर्थ, प्रतीक का महत्व या जीवन में इसका उपयोग। अगले चरण में इसे Groq से जोड़ा जाएगा।',
      od: 'ଏହି ଅଂଶରେ ବ୍ୟବହାରକାରୀ ଏହି ନିର୍ଦ୍ଦିଷ୍ଟ ଶ୍ଳୋକ ସମ୍ପର୍କରେ ପ୍ରଶ୍ନ ପଚାରିପାରିବେ, ଯେପରିକି କୌଣସି ଶବ୍ଦର ଅର୍ଥ, ପ୍ରତୀକର ମହତ୍ତ୍ୱ, କିମ୍ବା ଜୀବନରେ ଏହାର ପ୍ରୟୋଗ। ପରବର୍ତ୍ତୀ ପଦକ୍ଷେପରେ ଏହାକୁ Groq ସହିତ ଯୋଡ଼ାଯିବ।',
      te: 'ఈ భాగం వినియోగదారికి ఈ ప్రత్యేక శ్లోకం గురించి ప్రశ్నలు అడగడానికి అవకాశం ఇస్తుంది, ఉదాహరణకు ఏ పదం ఎందుకు వాడారు, దాని ప్రతీకార్థం ఏమిటి, లేదా జీవితంలో దాని ఉపయోగం ఏమిటి. తర్వాతి దశలో దీనిని Groq తో కలుపుతాం.',
      sa: 'यह भाग उपयोगकर्ता को इस श्लोक के बारे में प्रश्न पूछने देगा। अगले चरण में इसे Groq से जोड़ा जाएगा।',
    },
  };

  const typeLabel = () => {
    if (verse.type === 'mantra') {
      return LABELS.mantra[lang] || LABELS.mantra.en;
    }

    if (verse.type === 'doha') {
      const key = verse.label?.en?.toLowerCase().includes('closing')
        ? 'dohaClosing'
        : 'doha';
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
      ? 'font-odia not-italic'
      : lang === 'te'
        ? 'font-serif not-italic'
        : lang === 'hi' || lang === 'sa'
          ? 'font-serif not-italic'
          : 'font-garamond italic';

  const meaningFontClass =
    lang === 'od'
      ? 'font-odia not-italic'
      : lang === 'te'
        ? 'font-serif not-italic'
        : lang === 'hi' || lang === 'sa'
          ? 'font-serif not-italic'
          : 'font-garamond not-italic';

  const meaningLabel = meaningIsFallback
    ? ACTION_LABELS.meaning.en
    : (ACTION_LABELS.meaning[lang] || ACTION_LABELS.meaning.en);

  const explainButtonLabel = meaningOpen
    ? (ACTION_LABELS.hide[lang] || ACTION_LABELS.hide.en)
    : (ACTION_LABELS.explain[lang] || ACTION_LABELS.explain.en);

  const handleMeaningToggle = () => {
    setMeaningOpen((prev) => {
      const next = !prev;
      if (!next) {
        setActiveAiMode(null);
      }
      return next;
    });
  };

  const handleAiModeClick = (mode) => {
    setActiveAiMode((prev) => (prev === mode ? null : mode));
  };

  const activeAiText =
    activeAiMode ? (AI_PLACEHOLDER_TEXT[activeAiMode][lang] || AI_PLACEHOLDER_TEXT[activeAiMode].en) : '';

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

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleMeaningToggle}
              className="inline-flex items-center gap-2 rounded-full border border-[#c9922a]/35 bg-[#c9922a]/10 hover:bg-[#c9922a]/18 text-[#8b4513] px-4 py-2 font-cinzel-reg text-[11px] sm:text-xs tracking-widest uppercase font-bold transition-all"
            >
              {meaningOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {explainButtonLabel}
            </button>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              meaningOpen ? 'max-h-[1200px] opacity-100 mt-5' : 'max-h-0 opacity-0 mt-0'
            }`}
          >
            <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-amber-300 to-transparent" />

            <div className="mb-2 font-cinzel-reg text-[10px] md:text-xs tracking-[2.5px] uppercase text-[#8b4513]/80 font-bold">
              {meaningLabel}
            </div>

            <div
              className={`${meaningFontClass} whitespace-pre-line text-[#1a0a00] text-[1rem] sm:text-[1.08rem] md:text-[1.15rem] leading-8 md:leading-9 font-semibold`}
            >
              {meaningText || (ACTION_LABELS.noMeaning[lang] || ACTION_LABELS.noMeaning.en)}
            </div>

            <div className="mt-6">
              <div className="mb-3 font-cinzel-reg text-[10px] md:text-xs tracking-[2.5px] uppercase text-[#8b4513]/70 font-bold">
                AI Help
              </div>

              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => handleAiModeClick('simple')}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-cinzel-reg text-[10px] sm:text-[11px] tracking-widest uppercase border transition-all ${
                    activeAiMode === 'simple'
                      ? 'bg-[#e8f3ff] border-[#7bb6ff] text-[#0f4c81]'
                      : 'bg-[#f8fbff] border-[#d4e6ff] text-[#2f5d8a] hover:bg-[#eef6ff]'
                  }`}
                >
                  <Sparkles size={13} />
                  {AI_LABELS.simple[lang] || AI_LABELS.simple.en}
                </button>

                <button
                  type="button"
                  onClick={() => handleAiModeClick('deep')}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-cinzel-reg text-[10px] sm:text-[11px] tracking-widest uppercase border transition-all ${
                    activeAiMode === 'deep'
                      ? 'bg-[#f4ecff] border-[#c9a8ff] text-[#6a35a8]'
                      : 'bg-[#fcf9ff] border-[#eadbff] text-[#7a4cb8] hover:bg-[#f8f0ff]'
                  }`}
                >
                  <Brain size={13} />
                  {AI_LABELS.deep[lang] || AI_LABELS.deep.en}
                </button>

                <button
                  type="button"
                  onClick={() => handleAiModeClick('ask')}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-cinzel-reg text-[10px] sm:text-[11px] tracking-widest uppercase border transition-all ${
                    activeAiMode === 'ask'
                      ? 'bg-[#ecfff3] border-[#9ed7b1] text-[#216b42]'
                      : 'bg-[#f7fff9] border-[#d7efdf] text-[#2f7d50] hover:bg-[#effcf4]'
                  }`}
                >
                  <MessageCircle size={13} />
                  {AI_LABELS.ask[lang] || AI_LABELS.ask.en}
                </button>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  activeAiMode ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                }`}
              >
                {activeAiMode && (
                  <div className="rounded-2xl border border-[#c9922a]/20 bg-[#fffaf3] px-4 py-4 sm:px-5 sm:py-5">
                    <div className="mb-2 font-cinzel-reg text-[10px] md:text-xs tracking-[2px] uppercase text-[#8b4513]/75 font-bold">
                      {AI_LABELS.aiTitle[lang] || AI_LABELS.aiTitle.en}
                    </div>

                    <div
                      className={`${meaningFontClass} whitespace-pre-line text-[#3d1a00]/85 text-[0.96rem] sm:text-[1rem] leading-7 font-medium`}
                    >
                      {activeAiText}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end mt-5 pt-3 border-t border-[#c9922a]/20">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 font-cinzel-reg text-[11px] tracking-widest text-[#8b4513]/60 hover:text-[#8b4513] transition-colors font-bold"
            type="button"
          >
            <Share2 size={12} />
            {ACTION_LABELS.share[lang] || ACTION_LABELS.share.en}
          </button>
        </div>
      </div>
    </div>
  );
}