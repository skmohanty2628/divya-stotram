import JsonLd from '@/components/JsonLd';
import StotramClientPage from '@/app/[slug]/StotramClientPage';
import { StotramTop, StotramBody } from '@/components/StotramSections';
import { getMeta, getStotramSeo } from '@/lib/stotramSeo';
import { getStotramContent, getGuidesForStotram } from '@/lib/stotramContent';
import { VERSE_DATA } from '@/lib/verseData';
import { LANG_BY_CODE, SITE_URL, SITE_NAME, CONTENT_UPDATED, stotramUrl } from '@/lib/site';

export default function StotramPageView({ slug, langCode = 'en' }) {
  const meta = getMeta(slug);
  if (!meta) return null;

  const seo = getStotramSeo(slug, langCode);
  const content = getStotramContent(slug);
  const guides = getGuidesForStotram(slug, 4);
  const verseData = VERSE_DATA[slug] || null;
  const url = stotramUrl(slug, langCode);
  const lang = LANG_BY_CODE[langCode];

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: seo.title,
    description: seo.description,
    url,
    inLanguage: lang.hreflang,
    image: `${SITE_URL}/og-image.png`,
    datePublished: '2026-04-08',
    dateModified: CONTENT_UPDATED,
    author: { '@type': 'Organization', name: `${SITE_NAME} Editorial Team`, url: `${SITE_URL}/about` },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/android-chrome-512x512.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    about: { '@type': 'Thing', name: meta.deity },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Stotrams', item: `${SITE_URL}/all-stotrams` },
      { '@type': 'ListItem', position: 3, name: meta.title?.en, item: url },
    ],
  };

  const faq = content.faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: content.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

  return (
    <>
      <JsonLd data={article} />
      <JsonLd data={breadcrumb} />
      {faq && <JsonLd data={faq} />}
      <StotramClientPage
        meta={meta}
        verseData={verseData}
        htmlLang={lang.htmlLang}
        top={<StotramTop meta={meta} content={content} langCode={langCode} />}
      >
        <StotramBody meta={meta} content={content} guides={guides} />
      </StotramClientPage>
    </>
  );
}
