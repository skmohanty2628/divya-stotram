import { notFound } from 'next/navigation';
import StotramPageView from '@/components/StotramPageView';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';
import { getMeta, getStotramSeo, getAlternates } from '@/lib/stotramSeo';
import { LANGS, LANG_BY_PATH, SITE_NAME, stotramUrl } from '@/lib/site';

// /hanuman-chalisa/hindi, /hanuman-chalisa/odia, /hanuman-chalisa/telugu
// Each language is its own static, server-rendered, indexable URL.
export const dynamicParams = false;

export function generateStaticParams() {
  const out = [];
  STOTRAMS_INDEX.forEach((s) => {
    LANGS.filter((l) => l.path).forEach((l) => out.push({ slug: s.slug, lang: l.path }));
  });
  return out;
}

export async function generateMetadata({ params }) {
  const { slug, lang } = await params;
  const l = LANG_BY_PATH[lang];
  const meta = getMeta(slug);
  if (!l || !meta) return { title: 'Page not found', robots: { index: false } };

  const seo = getStotramSeo(slug, l.code);
  const url = stotramUrl(slug, l.code);
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: url, languages: getAlternates(slug) },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: SITE_NAME,
      type: 'article',
      locale: l.hreflang,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: meta.title?.[l.code] || meta.title?.en }],
    },
    twitter: { card: 'summary_large_image', title: seo.title, description: seo.description, images: ['/og-image.png'] },
  };
}

export default async function StotramLanguagePage({ params }) {
  const { slug, lang } = await params;
  const l = LANG_BY_PATH[lang];
  if (!l || !getMeta(slug)) notFound();
  return <StotramPageView slug={slug} langCode={l.code} />;
}
