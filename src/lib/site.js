export const SITE_URL = 'https://divyastotram.com';
export const SITE_NAME = 'Divya Stotram';
export const CONTENT_UPDATED = '2026-10-17';
export const CONTACT_EMAIL = 'contactdivyastotram@gmail.com';

// Internal language codes are kept as en / hi / od / te because verse data uses them.
// hreflang uses the ISO 639-1 code for Odia, which is "or".
export const LANGS = [
  { code: 'en', path: '', hreflang: 'en', name: 'English', native: 'English', short: 'EN', htmlLang: 'en' },
  { code: 'hi', path: 'hindi', hreflang: 'hi', name: 'Hindi', native: 'हिन्दी', short: 'हि', htmlLang: 'hi' },
  { code: 'od', path: 'odia', hreflang: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', short: 'ଓ', htmlLang: 'or' },
  { code: 'te', path: 'telugu', hreflang: 'te', name: 'Telugu', native: 'తెలుగు', short: 'తె', htmlLang: 'te' },
];

export const LANG_BY_CODE = Object.fromEntries(LANGS.map((l) => [l.code, l]));
export const LANG_BY_PATH = Object.fromEntries(LANGS.filter((l) => l.path).map((l) => [l.path, l]));

export function stotramPath(slug, langCode = 'en') {
  const l = LANG_BY_CODE[langCode];
  return l && l.path ? `/${slug}/${l.path}` : `/${slug}`;
}

export function stotramUrl(slug, langCode = 'en') {
  return `${SITE_URL}${stotramPath(slug, langCode)}`;
}
