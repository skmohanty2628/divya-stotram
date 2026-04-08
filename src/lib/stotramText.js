import { convertDevanagariToScript } from '@/lib/scriptConvert';

const PLACEHOLDER_PATTERNS = [
  /\s{3,}/,
  /[।]{0,2}\s{2,}[।।॥]{0,2}\s*$/,
  /[^a-zA-Zऀ-ॿ\u0B00-\u0B7F\u0C00-\u0C7Fа-яА-Я\u{1000}-\u{109F}।॥ ]/u,
  /[।]{1}[\s]{3,}/,
];

const BROKEN_PATTERNS = [
  /\s{4,}/,         // 4+ consecutive spaces = placeholder
  /।\s{2,}।/,       // ।   । style gaps = incomplete
  /॥\s{2,}/,        // ॥ followed by spaces = broken
];

function normalizeText(text) {
  if (typeof text !== 'string') return '';
  return text.replace(/\r/g, '').trim();
}

function isBrokenText(text) {
  const value = normalizeText(text);
  if (!value) return true;
  // Check for obviously broken placeholder patterns (ChatGPT incomplete output)
  return BROKEN_PATTERNS.some((rx) => rx.test(value));
}

function getMeaningText(verse, lang) {
  const localizedMeaning = verse?.meaning?.[lang];
  const englishMeaning = verse?.meaning?.en;
  const hindiMeaning = verse?.meaning?.hi;

  if (lang === 'en') return normalizeText(englishMeaning || hindiMeaning || '');
  if (lang === 'hi' || lang === 'sa') {
    return normalizeText(hindiMeaning || englishMeaning || '');
  }

  // For od / te: use localized if valid, else English fallback
  if (!isBrokenText(localizedMeaning)) {
    return normalizeText(localizedMeaning);
  }

  return normalizeText(englishMeaning || hindiMeaning || '');
}

export function getVerseDisplayText(verse, lang = 'en') {
  const original = normalizeText(verse?.original || '');
  const transliteration = normalizeText(verse?.transliteration || '');

  if (lang === 'en') {
    return {
      verseText: transliteration || original,
      meaningText: getMeaningText(verse, lang),
      usedFallback: false,
    };
  }

  if (lang === 'hi' || lang === 'sa') {
    return {
      verseText: original,
      meaningText: getMeaningText(verse, lang),
      usedFallback: false,
    };
  }

  if (lang === 'od' || lang === 'te') {
    // ✅ ALWAYS check native script data first (most accurate)
    const nativeScript = normalizeText(verse?.script?.[lang] || '');
    
    if (nativeScript && !isBrokenText(nativeScript)) {
      return {
        verseText: nativeScript,
        meaningText: getMeaningText(verse, lang),
        usedFallback: false,
      };
    }

    // Fallback: auto-convert Devanagari (less accurate but better than nothing)
    const converted = convertDevanagariToScript(original, lang);
    return {
      verseText: converted || transliteration || original,
      meaningText: getMeaningText(verse, lang),
      usedFallback: true,
    };
  }

  return {
    verseText: original || transliteration,
    meaningText: getMeaningText(verse, lang),
    usedFallback: true,
  };
}
