import { convertDevanagariToScript } from '@/lib/scriptConvert';

// Detects broken/placeholder text patterns
const BROKEN_PATTERNS = [
  /\s{4,}/,                          // 4+ consecutive spaces = placeholder
  /।\s{2,}।/,                        // ।   । style gaps
  /॥\s{2,}/,                         // ॥ followed by spaces
  /,\s*,/,                           // ,, or , , = broken placeholders
  /[\u0B00-\u0B7F]\s[\u0B00-\u0B7F]\s[\u0B00-\u0B7F]/, // spaced Odia chars
  /[\u0C00-\u0C7F]\s[\u0C00-\u0C7F]\s[\u0C00-\u0C7F]/, // spaced Telugu chars
  /[ଅ-ୱ]\s[ଅ-ୱ]\s[ଅ-ୱ]\s[ଅ-ୱ]/,    // 4 spaced Odia chars (stricter)
];

function normalizeText(text) {
  if (typeof text !== 'string') return '';
  return text.replace(/\r/g, '').trim();
}

function isBrokenText(text) {
  const value = normalizeText(text);
  if (!value) return true;
  return BROKEN_PATTERNS.some((rx) => rx.test(value));
}

// Returns { text, isFallback }
function getMeaningText(verse, lang) {
  const localizedMeaning = verse?.meaning?.[lang];
  const englishMeaning   = verse?.meaning?.en;
  const hindiMeaning     = verse?.meaning?.hi;

  if (lang === 'en') {
    return { text: normalizeText(englishMeaning || hindiMeaning || ''), isFallback: false };
  }

  if (lang === 'hi' || lang === 'sa') {
    return { text: normalizeText(hindiMeaning || englishMeaning || ''), isFallback: false };
  }

  // For od / te: use localized if valid, else English fallback
  if (!isBrokenText(localizedMeaning)) {
    return { text: normalizeText(localizedMeaning), isFallback: false };
  }

  return {
    text: normalizeText(englishMeaning || hindiMeaning || ''),
    isFallback: true,
  };
}

export function getVerseDisplayText(verse, lang = 'en') {
  const original        = normalizeText(verse?.original || '');
  const transliteration = normalizeText(verse?.transliteration || '');

  if (lang === 'en') {
    const { text, isFallback } = getMeaningText(verse, lang);
    return { verseText: transliteration || original, meaningText: text, meaningIsFallback: isFallback };
  }

  if (lang === 'hi' || lang === 'sa') {
    const { text, isFallback } = getMeaningText(verse, lang);
    return { verseText: original, meaningText: text, meaningIsFallback: isFallback };
  }

  if (lang === 'od' || lang === 'te') {
    // ✅ Use native script data first (if available and not broken)
    const nativeScript = normalizeText(verse?.script?.[lang] || '');

    let verseText;
    if (nativeScript && !isBrokenText(nativeScript)) {
      verseText = nativeScript;
    } else {
      // Fall back: auto-convert Devanagari → Odia/Telugu
      verseText = convertDevanagariToScript(original, lang) || transliteration || original;
    }

    const { text, isFallback } = getMeaningText(verse, lang);
    return { verseText, meaningText: text, meaningIsFallback: isFallback };
  }

  const { text, isFallback } = getMeaningText(verse, lang);
  return { verseText: original || transliteration, meaningText: text, meaningIsFallback: isFallback };
}