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

function cleanOdiaText(text) {
  if (typeof text !== 'string') return '';

  let cleaned = text;

  // remove spaces between Odia letters
  cleaned = cleaned.replace(/([\u0B00-\u0B7F])\s+(?=[\u0B00-\u0B7F])/g, '$1');

  // remove spaces before Odia vowel signs / marks if separated badly
  cleaned = cleaned.replace(/\s+([\u0B3C-\u0B4D\u0B56-\u0B57])/g, '$1');

  // normalize repeated spaces
  cleaned = cleaned.replace(/[ \t]+/g, ' ').trim();

  return cleaned;
}

function cleanTeluguText(text) {
  if (typeof text !== 'string') return '';

  let cleaned = text;
  cleaned = cleaned.replace(/([\u0C00-\u0C7F])\s+(?=[\u0C00-\u0C7F])/g, '$1');
  cleaned = cleaned.replace(/\s+([\u0C3C-\u0C4D\u0C55-\u0C56])/g, '$1');
  cleaned = cleaned.replace(/[ \t]+/g, ' ').trim();

  return cleaned;
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
  const rawValue = normalizeText(text);
  if (!rawValue) return true;

  const value =
    lang === 'od'
      ? cleanOdiaText(rawValue)
      : lang === 'te'
        ? cleanTeluguText(rawValue)
        : rawValue;

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
  const rawValue = normalizeText(text);
  if (!rawValue) return true;

  const value =
    lang === 'od'
      ? cleanOdiaText(rawValue)
      : lang === 'te'
        ? cleanTeluguText(rawValue)
        : rawValue;

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
  const odiaMeaning = cleanOdiaText(normalizeText(meaning.od));
  const teluguMeaning = cleanTeluguText(normalizeText(meaning.te));
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
    const rawNativeScript = normalizeText(script[lang] || '');
    const nativeScript =
      lang === 'od'
        ? cleanOdiaText(rawNativeScript)
        : cleanTeluguText(rawNativeScript);

    if (!isBrokenScriptText(nativeScript, lang)) {
      return {
        verseText: nativeScript,
        meaningText: getMeaningText(verse, lang),
        usedFallback: false,
      };
    }

    const convertedRaw = normalizeText(convertDevanagariToScript(original, lang) || '');
    const converted =
      lang === 'od'
        ? cleanOdiaText(convertedRaw)
        : cleanTeluguText(convertedRaw);

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