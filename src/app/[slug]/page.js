import { notFound } from 'next/navigation';
import StotramPageView from '@/components/StotramPageView';
import GuidePageView from '@/components/GuidePageView';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';
import { GUIDES, getGuideBySlug } from '@/data/guides';
import { getMeta, getStotramSeo, getAlternates } from '@/lib/stotramSeo';
import { SITE_URL, SITE_NAME, stotramUrl } from '@/lib/site';

// Fully static: every stotram and guide is generated at build time.
// Unknown URLs return a real 404 (old thin pages are 301-redirected in next.config.mjs).
export const dynamicParams = false;

export function generateStaticParams() {
  return [...STOTRAMS_INDEX.map((s) => ({ slug: s.slug })), ...GUIDES.map((g) => ({ slug: g.slug }))];
}

function ogImages(alt) {
  return [{ url: '/og-image.png', width: 1200, height: 630, alt }];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const meta = getMeta(slug);
  if (meta) {
    const seo = getStotramSeo(slug, 'en');
    const url = stotramUrl(slug, 'en');
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
        images: ogImages(meta.title?.en),
      },
      twitter: { card: 'summary_large_image', title: seo.title, description: seo.description, images: ['/og-image.png'] },
    };
  }

  const guide = getGuideBySlug(slug);
  if (guide) {
    const url = `${SITE_URL}/${guide.slug}`;
    return {
      title: guide.title,
      description: guide.description,
      alternates: { canonical: url },
      openGraph: {
        title: guide.title,
        description: guide.description,
        url,
        siteName: SITE_NAME,
        type: 'article',
        images: ogImages(guide.h1),
      },
      twitter: { card: 'summary_large_image', title: guide.title, description: guide.description, images: ['/og-image.png'] },
    };
  }

  return { title: 'Page not found', robots: { index: false } };
}

export default async function SlugPage({ params }) {
  const { slug } = await params;
  if (getMeta(slug)) return <StotramPageView slug={slug} langCode="en" />;
  if (getGuideBySlug(slug)) return <GuidePageView slug={slug} />;
  notFound();
}
