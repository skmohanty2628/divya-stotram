import { STOTRAMS_INDEX } from '@/data/stotrams-index';
import { GUIDES } from '@/data/guides';
import { SITE_URL, LANGS, stotramUrl, CONTENT_UPDATED } from '@/lib/site';

export default function sitemap() {
  const lastModified = new Date(CONTENT_UPDATED);
  const entry = (url, changeFrequency, priority) => ({ url, lastModified, changeFrequency, priority });

  const core = [
    entry(SITE_URL, 'daily', 1),
    entry(`${SITE_URL}/all-stotrams`, 'weekly', 0.9),
    entry(`${SITE_URL}/guides`, 'weekly', 0.8),
    entry(`${SITE_URL}/chanting-room`, 'monthly', 0.5),
    entry(`${SITE_URL}/odia-stotras`, 'weekly', 0.8),
    entry(`${SITE_URL}/hindi-stotras`, 'weekly', 0.7),
    entry(`${SITE_URL}/telugu-stotras`, 'weekly', 0.7),
  ];

  const stotrams = STOTRAMS_INDEX.flatMap((s) =>
    LANGS.map((l) => ({
      ...entry(stotramUrl(s.slug, l.code), 'monthly', l.code === 'en' ? 0.9 : 0.7),
      alternates: {
        languages: Object.fromEntries(LANGS.map((x) => [x.hreflang, stotramUrl(s.slug, x.code)])),
      },
    }))
  );

  const guides = GUIDES.map((g) => entry(`${SITE_URL}/${g.slug}`, 'monthly', 0.7));

  const statics = ['about', 'contact', 'editorial-policy', 'privacy-policy', 'terms', 'disclaimer'].map((p) =>
    entry(`${SITE_URL}/${p}`, 'yearly', 0.3)
  );

  return [...core, ...stotrams, ...guides, ...statics];
}
