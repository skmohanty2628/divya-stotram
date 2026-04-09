import { convertDevanagariToScript } from '@/lib/scriptConvert';

function normalizeText(text) {
  if (typeof text !== 'string') return '';
  return text.replace(/\r/g, '').replace(/\u00A0/g, ' ').trim();
}

function hasOdia(text) {
  return /[\u0B00-\u0B7F]/.test(text || '');
}

function hasTelugu(text) {
  return /[\u0C00-\u0C7F]/.test(text || '');
}

function isPlaceholderLike(text) {
  const value = normalizeText(text);
  if (!value) return true;

  return (
    /^\.*$/.test(value) ||
    /^[।॥\s]+$/.test(value) ||
    /[।॥]\s{2,}[।॥]?/.test(value) ||
    /\s{4,}/.test(value)
  );
}

function cleanOdiaText(text) {
  if (typeof text !== 'string') return '';

  let cleaned = text;

  // normalize spaces/newlines first
  cleaned = cleaned.replace(/\u00A0/g, ' ');

  // remove spaces around Odia virama (୍)
  cleaned = cleaned.replace(/\s*([\u0B4D])\s*/g, '$1');

  // remove spaces around Odia combining marks
  cleaned = cleaned.replace(/\s*([\u0B3C-\u0B44\u0B47-\u0B4D\u0B55-\u0B57])\s*/g, '$1');

  // join Odia letter + next Odia letter when incorrectly spaced
  cleaned = cleaned.replace(/([\u0B15-\u0B39\u0B5C-\u0B5D\u0B5F-\u0B61])\s+(?=[\u0B00-\u0B7F])/g, '$1');

  // join punctuation properly
  cleaned = cleaned.replace(/\s+([।॥,;:])/g, '$1');

  // keep line breaks, collapse only spaces/tabs
  cleaned = cleaned
    .split('\n')
    .map((line) => line.replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .trim();

  return cleaned;
}

function cleanTeluguText(text) {
  if (typeof text !== 'string') return '';

  let cleaned = text;

  cleaned = cleaned.replace(/\u00A0/g, ' ');
  cleaned = cleaned.replace(/\s*([\u0C4D])\s*/g, '$1');
  cleaned = cleaned.replace(/\s*([\u0C3C-\u0C44\u0C46-\u0C4D\u0C55-\u0C56])\s*/g, '$1');
  cleaned = cleaned.replace(/([\u0C15-\u0C39\u0C58-\u0C61])\s+(?=[\u0C00-\u0C7F])/g, '$1');
  cleaned = cleaned.replace(/\s+([।॥,;:])/g, '$1');

  cleaned = cleaned
    .split('\n')
    .map((line) => line.replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .trim();

  return cleaned;
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

  if (lang === 'od' && !hasOdia(value)) return true;
  if (lang === 'te' && !hasTelugu(value)) return true;

  return false;
}

function isBrokenScriptText(text, lang) {
  return isBrokenLocalizedText(text, lang);
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