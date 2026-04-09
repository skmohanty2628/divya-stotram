import { convertDevanagariToScript } from '@/lib/scriptConvert';

function normalizeText(text) {
  if (typeof text !== 'string') return '';
  return text.replace(/\r/g, '').replace(/\u00A0/g, ' ').trim();
}

function collapseSpaces(text) {
  return normalizeText(text).replace(/\s+/g, ' ').trim();
}

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
    value.includes('     ।') ||
    value.includes('।     ') ||
    value.includes('॥     ') ||
    value.includes('     ॥') ||
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

  if (lang === 'od') {
    return !hasOdia(value);
  }

  if (lang === 'te') {
    return !hasTelugu(value);
  }

  return false;
}

function getMeaningText(verse, lang) {
  const meaning = verse?.meaning || {};

  const englishMeaning = normalizeText(meaning.en);
  const hindiMeaning = normalizeText(meaning.hi);
  const odiaMeaning = normalizeText(meaning.od);
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
    return '';
  }

  if (lang === 'te') {
    if (!isBrokenLocalizedText(teluguMeaning, 'te')) {
      return teluguMeaning;
    }
    return '';
  }

  return englishMeaning || hindiMeaning || '';
}

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
    const nativeScript = normalizeText(script[lang] || '');

    if (!isBrokenScriptText(nativeScript, lang)) {
      return {
        verseText: nativeScript,
        meaningText: getMeaningText(verse, lang),
        usedFallback: false,
      };
    }

    const converted = normalizeText(convertDevanagariToScript(original, lang) || '');

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