'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Flame, BookOpen, ChevronRight } from 'lucide-react';

// Related stotrams by deity/theme
const RELATED_MAP = {
  'hanuman-chalisa': ['bajrang-baan', 'ram-raksha-stotram', 'shiv-chalisa'],
  'bajrang-baan': ['hanuman-chalisa', 'ram-raksha-stotram', 'aditya-hridayam'],
  'durga-stotram': ['aigiri-nandini', 'mahalakshmi-ashtakam', 'saraswati-vandana'],
  'aigiri-nandini': ['durga-stotram', 'mahalakshmi-ashtakam', 'saraswati-vandana'],
  'shiva-tandav': ['shiv-chalisa', 'navagraha-stotram', 'hanuman-chalisa'],
  'shiv-chalisa': ['shiva-tandav', 'hanuman-chalisa', 'bajrang-baan'],
  'gayatri-mantra': ['aditya-hridayam', 'vishnu-sahasranamam', 'saraswati-vandana'],
  'vishnu-sahasranamam': ['gayatri-mantra', 'krishna-vasudevaya-mantra', 'mahalakshmi-ashtakam'],
  'krishna-vasudevaya-mantra': ['vishnu-sahasranamam', 'gayatri-mantra', 'ganesh-aarti'],
  'mahalakshmi-ashtakam': ['saraswati-vandana', 'durga-stotram', 'vishnu-sahasranamam'],
  'saraswati-vandana': ['gayatri-mantra', 'mahalakshmi-ashtakam', 'vishnu-sahasranamam'],
  'ganesh-aarti': ['hanuman-chalisa', 'shiv-chalisa', 'gayatri-mantra'],
  'ram-raksha-stotram': ['hanuman-chalisa', 'bajrang-baan', 'aditya-hridayam'],
  'aditya-hridayam': ['gayatri-mantra', 'ram-raksha-stotram', 'navagraha-stotram'],
  'navagraha-stotram': ['aditya-hridayam', 'gayatri-mantra', 'shiva-tandav'],
};

const STOTRAM_INFO = {
  'hanuman-chalisa':          { emoji: '🦧', en: 'Hanuman Chalisa',         hi: 'हनुमान चालीसा',        od: 'ହନୁମାନ ଚାଳୀଶା',          te: 'హనుమాన్ చాలీసా' },
  'bajrang-baan':             { emoji: '⚡', en: 'Bajrang Baan',             hi: 'बजरंग बाण',             od: 'ବଜ୍ରଙ୍ଗ ବାଣ',             te: 'బజ్రంగ బాణ' },
  'durga-stotram':            { emoji: '🌺', en: 'Durga Stotram',            hi: 'दुर्गा स्तोत्रम्',        od: 'ଦୁର୍ଗା ସ୍ତୋତ୍ରମ୍',          te: 'దుర్గా స్తోత్రం' },
  'aigiri-nandini':           { emoji: '🌸', en: 'Aigiri Nandini',           hi: 'अयि गिरिनन्दिनि',       od: 'ଅୟି ଗିରି ନନ୍ଦିନୀ',          te: 'అయి గిరి నందిని' },
  'shiva-tandav':             { emoji: '🔱', en: 'Shiva Tandav',             hi: 'शिव तांडव',              od: 'ଶିବ ତାଣ୍ଡବ',               te: 'శివ తాండవ' },
  'shiv-chalisa':             { emoji: '🔱', en: 'Shiv Chalisa',             hi: 'शिव चालीसा',             od: 'ଶିବ ଚାଳୀଶ',                te: 'శివ చాళీసా' },
  'gayatri-mantra':           { emoji: '☀️', en: 'Gayatri Mantra',           hi: 'गायत्री मंत्र',           od: 'ଗାୟତ୍ରୀ ମନ୍ତ୍ର',             te: 'గాయత్రీ మంత్రం' },
  'vishnu-sahasranamam':      { emoji: '🪷', en: 'Vishnu Sahasranamam',      hi: 'विष्णु सहस्रनामम्',      od: 'ବିଷ୍ଣୁ ସହସ୍ରନାମ',           te: 'విష్ణు సహస్రనామం' },
  'krishna-vasudevaya-mantra':{ emoji: '🪈', en: 'Krishna Mantra',           hi: 'कृष्णाय वासुदेवाय',      od: 'କୃଷ୍ଣାୟ ବାସୁଦେବାୟ',          te: 'కృష్ణాయ వాసుదేవాయ' },
  'mahalakshmi-ashtakam':     { emoji: '👣', en: 'Mahalakshmi Ashtakam',     hi: 'महालक्ष्मी अष्टकम्',     od: 'ମହାଲକ୍ଷ୍ମୀ ଅଷ୍ଟକମ୍',         te: 'మహాలక్ష్మి అష్టకం' },
  'saraswati-vandana':        { emoji: '🦢', en: 'Saraswati Vandana',        hi: 'सरस्वती वंदना',          od: 'ସରସ୍ୱତୀ ବନ୍ଦନା',             te: 'సరస్వతి వందన' },
  'ganesh-aarti':             { emoji: '🐘', en: 'Ganesh Aarti',             hi: 'गणेश आरती',              od: 'ଗଣେଶ ଆରତୀ',                te: 'గణేష్ ఆరతి' },
  'ram-raksha-stotram':       { emoji: '🏹', en: 'Ram Raksha Stotram',       hi: 'राम रक्षा स्तोत्रम्',    od: 'ରାମ ରକ୍ଷା ସ୍ତୋତ୍ରମ୍',         te: 'రామ రక్షా స్తోత్రం' },
  'aditya-hridayam':          { emoji: '🚩', en: 'Aditya Hridayam',          hi: 'आदित्य हृदयम्',           od: 'ଆଦିତ୍ୟ ହୃଦୟଂ',              te: 'ఆదిత్య హృదయం' },
  'navagraha-stotram':        { emoji: '🪐', en: 'Navagraha Stotram',        hi: 'नवग्रह स्तोत्रम्',        od: 'ନବ ଗ୍ରହ ସ୍ତୋତ୍ରମ୍',           te: 'నవగ్రహ స్తోత్రం' },
};

const MOTIVATE = {
  en: [
    'Your devotion grows stronger every day 🙏',
    'Each mantra read is a step closer to the divine ✨',
    'Your prayer streak is your greatest spiritual asset 🔥',
  ],
  hi: [
    'आपकी भक्ति हर दिन और गहरी होती है 🙏',
    'हर मंत्र पाठ आपको ईश्वर के करीब लाता है ✨',
    'आपकी प्रार्थना श्रृंखला आपकी सबसे बड़ी साधना है 🔥',
  ],
  od: [
    'ଆପଣଙ୍କ ଭକ୍ତି ପ୍ରତ୍ୟେକ ଦିନ ଗଭୀର ହେଉଛି 🙏',
    'ପ୍ରତ୍ୟେକ ମନ୍ତ୍ର ପାଠ ଆପଣଙ୍କୁ ଈଶ୍ୱରଙ୍କ ନିକଟ ଆଣୁଛି ✨',
    'ଆପଣଙ୍କ ପ୍ରାର୍ଥନା ଧାରା ଆପଣଙ୍କ ଶ୍ରେଷ୍ଠ ସାଧନା 🔥',
  ],
  te: [
    'మీ భక్తి ప్రతి రోజూ మరింత బలపడుతోంది 🙏',
    'ప్రతి మంత్రం దైవానికి మీరు దగ్గరవడానికి సహాయపడుతుంది ✨',
    'మీ ప్రార్థన స్ట్రీక్ మీ అతిపెద్ద ఆధ్యాత్మిక సంపద 🔥',
  ],
};

const CONTINUE_LABEL = {
  en: 'Continue Your Sacred Journey',
  hi: 'अपनी पवित्र यात्रा जारी रखें',
  od: 'ଆପଣଙ୍କ ପବିତ୍ର ଯାତ୍ରା ଜାରି ରଖନ୍ତୁ',
  te: 'మీ పవిత్ర యాత్రను కొనసాగించండి',
};

const NOW_READING = {
  en: 'You are reading',
  hi: 'आप पढ़ रहे हैं',
  od: 'ଆପଣ ପଢ଼ୁଛନ୍ତି',
  te: 'మీరు చదువుతున్నారు',
};

const READ_LABEL = {
  en: 'Read',
  hi: 'पढ़ें',
  od: 'ପଢ଼ନ୍ତୁ',
  te: 'చదవండి',
};

export default function DailyPrayerSuggestions({ currentSlug, lang = 'en' }) {
  const [streak, setStreak] = useState(0);
  const [motivate, setMotivate] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const s = parseInt(localStorage.getItem('divya_streak') || '1', 10);
    setStreak(s);
    const msgs = MOTIVATE[lang] || MOTIVATE.en;
    setMotivate(msgs[s % msgs.length]);
  }, [lang]);

  const related = (RELATED_MAP[currentSlug] || [])
    .map((slug) => ({ slug, ...STOTRAM_INFO[slug] }))
    .filter(Boolean);

  const current = STOTRAM_INFO[currentSlug];
  if (!current) return null;

  const langParam = lang !== 'en' ? `?lang=${lang}` : '';

  return (
    <div className="mt-10 space-y-4">

      {/* You are reading — highlight */}
      <div className="rounded-2xl border border-[#c9922a]/30 bg-gradient-to-r from-[#1a0505] to-[#120202] p-4 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#c9922a]/20 bg-[#c9922a]/10 text-2xl">
          {current.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-cinzel-reg text-[10px] uppercase tracking-[2px] text-[#c9922a]/60">
            {NOW_READING[lang] || NOW_READING.en}
          </p>
          <p className="font-cinzel text-base font-bold text-[#f0c040] truncate">
            {current[lang] || current.en}
          </p>
        </div>
        {streak > 0 && (
          <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#c9922a]/20 bg-[#1a0505] px-3 py-1.5">
            <Flame size={14} className="text-[#f0c040]" />
            <span className="font-cinzel text-sm font-bold text-[#f0c040]">{streak}</span>
          </div>
        )}
      </div>

      {/* Motivational message */}
      {motivate && (
        <div className="rounded-xl border border-[#c9922a]/15 bg-[#0f0101] px-4 py-3 text-center">
          <p className="font-garamond text-sm text-[#e8d5b5]/75 italic">{motivate}</p>
        </div>
      )}

      {/* Related stotrams */}
      {related.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={16} className="text-[#c9922a]" />
            <h3 className="font-cinzel text-base font-bold text-[#8b1a00]">
              {CONTINUE_LABEL[lang] || CONTINUE_LABEL.en}
            </h3>
          </div>

          <div className="space-y-2">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.slug}${langParam}`}
                className="flex items-center gap-4 rounded-xl border border-[#c9922a]/15 bg-white p-4 transition-all hover:border-[#c9922a]/40 hover:shadow-sm group"
              >
                <span className="text-2xl shrink-0">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-cinzel text-sm font-bold text-[#8b1a00] truncate group-hover:text-[#c9922a] transition-colors">
                    {item[lang] || item.en}
                  </p>
                  {lang !== 'en' && (
                    <p className="font-cinzel-reg text-[10px] text-[#c9922a]/50 truncate mt-0.5">
                      {item.en}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-1 text-[#c9922a]/50 group-hover:text-[#c9922a]">
                  <span className="font-cinzel-reg text-[10px] uppercase tracking-wider">
                    {READ_LABEL[lang] || READ_LABEL.en}
                  </span>
                  <ChevronRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}