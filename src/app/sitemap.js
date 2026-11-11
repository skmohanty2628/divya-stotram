import { STOTRAMS_INDEX } from '@/data/stotrams-index';
import { GUIDES } from '@/data/guides';
import { SITE_URL, LANGS, stotramUrl, CONTENT_UPDATED } from '@/lib/site';
import { LASTMOD } from '@/lib/lastmod';

export default function sitemap() {
  const dateFor = (slug) => new Date((slug && LASTMOD[slug]) || CONTENT_UPDATED);
  const entry = (url, changeFrequency, priority, slug) => ({
    url,
    lastModified: dateFor(slug),
    changeFrequency,
    priority,
  });
  // Listing pages change whenever new content is added, so they take the newest date on record.
  const newest = Object.values(LASTMOD).sort().slice(-1)[0];
  const listing = (url, changeFrequency, priority) => ({
    url,
    lastModified: new Date(newest),
    changeFrequency,
    priority,
  });

  const core = [
    listing(SITE_URL, 'daily', 1),
    listing(`${SITE_URL}/all-stotrams`, 'weekly', 0.9),
    listing(`${SITE_URL}/guides`, 'weekly', 0.8),
    listing(`${SITE_URL}/festivals`, 'weekly', 0.8),
    entry(`${SITE_URL}/chanting-room`, 'monthly', 0.5),
    entry(`${SITE_URL}/glossary`, 'monthly', 0.6),
    listing(`${SITE_URL}/odia-stotras`, 'weekly', 0.8),
    listing(`${SITE_URL}/hindi-stotras`, 'weekly', 0.7),
    listing(`${SITE_URL}/telugu-stotras`, 'weekly', 0.7),
  ];

  const stotrams = STOTRAMS_INDEX.flatMap((s) =>
    LANGS.map((l) => ({
      ...entry(stotramUrl(s.slug, l.code), 'monthly', l.code === 'en' ? 0.9 : 0.7, s.slug),
      // Hindi, Odia and Telugu titles were rewritten on this date.
      ...(l.code !== 'en' ? { lastModified: new Date(newest) } : {}),
      alternates: {
        languages: Object.fromEntries(LANGS.map((x) => [x.hreflang, stotramUrl(s.slug, x.code)])),
      },
    }))
  );

  const guides = GUIDES.map((g) => entry(`${SITE_URL}/${g.slug}`, 'monthly', 0.7, g.slug));

  const statics = ['about', 'contact', 'editorial-policy', 'privacy-policy', 'terms', 'disclaimer'].map((p) =>
    entry(`${SITE_URL}/${p}`, 'yearly', 0.3)
  );

  return [...core, ...stotrams, ...guides, ...statics];
}
