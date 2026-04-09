import { convertDevanagariToScript } from '@/lib/scriptConvert';

function normalizeText(text) {
  if (typeof text !== 'string') return '';
  return text.replace(/\r/g, '').replace(/\u00A0/g, ' ').trim();
}

function collapseSpaces(text) {
  return normalizeText(text).replace(/\s+/g, ' ').trim();
}

/* =========================
   🔥 MAIN FIX — ODIA CLEAN
========================= */
function cleanOdiaText(text) {
  let cleaned = normalizeText(text);

  if (!cleaned) return '';

  // remove unwanted spaces between characters
  cleaned = cleaned.replace(/\s+/g, ' ');

  // ❗ REMOVE space BEFORE virama (୍)
  cleaned = cleaned.replace(/\s+([\u0B4D])/g, '$1');

  // ❗ REMOVE space AFTER virama
  cleaned = cleaned.replace(/([\u0B4D])\s+/g, '$1');

  // ❗ REMOVE space between combining marks and base chars
  cleaned = cleaned.replace(/([\u0B3C\u0B3E-\u0B44\u0B47-\u0B48\u0B4B-\u0B4C])\s+/g, '$1');
  cleaned = cleaned.replace(/\s+([\u0B3C\u0B3E-\u0B44\u0B47-\u0B48\u0B4B-\u0B4C])/g, '$1');

  return cleaned.trim();
}

/* ========================= */

function hasOdia(text) {
  return /[\u0B00-\u0B7F]/.test(text || '');
}

function hasTelugu(text) {
  return /[\u0C00-\u0C7F]/.test(text || '');
}

function hasDevanagari(text) {
  return /[\u0900-\u097F]/.test(text || '');
}

function hasLatin(text) {
  return /[A-Za-z]/.test(text || '');
}

function isPlaceholderLike(text) {
  const value = normalizeText(text);
  if (!value) return true;

  return (
    /^\.*$/.test(value) ||
    /^[।॥\s]+$/.test(value) ||
    value.includes('      ') ||
    /[।॥]\s{2,}[।॥]?/.test(value) ||
    /\s{4,}/.test(value)
  );
}

function isBrokenLocalizedText(text, lang) {
  const value = normalizeText(text);
  if (!value) return true;
  if (isPlaceholderLike(value)) return true;

  if (lang === 'od') {
    if (!hasOdia(value)) return true;
  }

  if (lang === 'te') {
    if (!hasTelugu(value)) return true;
  }

  return false;
}

function isBrokenScriptText(text, lang) {
  const value = normalizeText(text);
  if (!value) return true;
  if (isPlaceholderLike(value)) return true;

  if (lang === 'od') return !hasOdia(value);
  if (lang === 'te') return !hasTelugu(value);

  return false;
}

/* =========================
   ✅ MEANING FIX (NO ENGLISH LEAK)
========================= */
function getMeaningText(verse, lang) {
  const meaning = verse?.meaning || {};

  const englishMeaning = normalizeText(meaning.en);
  const hindiMeaning = normalizeText(meaning.hi);
  const odiaMeaning = cleanOdiaText(meaning.od);
  const teluguMeaning = normalizeText(meaning.te);
  const sanskritMeaning = normalizeText(meaning.sa);

  if (lang === 'en') {
    return englishMeaning || hindiMeaning || '';
  }

  if (lang === 'hi') {
    return hindiMeaning || englishMeaning || '';
  }

  if (lang === 'sa') {
    return sanskritMeaning || hindiMeaning || englishMeaning || '';
  }

  if (lang === 'od') {
    if (!isBrokenLocalizedText(odiaMeaning, 'od')) {
      return odiaMeaning;
    }
    return ''; // ❗ NO ENGLISH FALLBACK
  }

  if (lang === 'te') {
    if (!isBrokenLocalizedText(teluguMeaning, 'te')) {
      return teluguMeaning;
    }
    return '';
  }

  return englishMeaning || hindiMeaning || '';
}

/* =========================
   🚀 MAIN DISPLAY FUNCTION
========================= */
export function getVerseDisplayText(verse, lang = 'en') {
  const original = normalizeText(verse?.original || '');
  const transliteration = normalizeText(verse?.transliteration || '');
  const script = verse?.script || {};

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
    let nativeScript = normalizeText(script[lang] || '');

    // 🔥 CLEAN ODIA SCRIPT
    if (lang === 'od') {
      nativeScript = cleanOdiaText(nativeScript);
    }

    if (!isBrokenScriptText(nativeScript, lang)) {
      return {
        verseText: nativeScript,
        meaningText: getMeaningText(verse, lang),
        usedFallback: false,
      };
    }

    let converted = normalizeText(
      convertDevanagariToScript(original, lang) || ''
    );

    if (lang === 'od') {
      converted = cleanOdiaText(converted);
    }

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