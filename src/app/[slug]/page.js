// ✅ SERVER COMPONENT — no 'use client' here
import { notFound } from 'next/navigation';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';
import { hanumanChalisa } from '@/data/hanuman-chalisa';
import {
  durgaStotram,
  shivaTandav,
  gayatriMantra,
  ganeshAarti,
  saraswatiVandana,
  mahalakshmiAshtakam,
  vishnuSahasranamam,
  ramRakshaStotram,
  adityaHridayam,
  navagrahaStotram,
  aigiriNandini,
  shivChalisa,
} from '@/data/other-stotrams';
import StotramClientPage from './StotramClientPage';

const SITE_URL = 'https://divyastotram.com';

const VERSE_DATA = {
  'hanuman-chalisa':      hanumanChalisa,
  'durga-stotram':        durgaStotram,
  'shiva-tandav':         shivaTandav,
  'gayatri-mantra':       gayatriMantra,
  'ganesh-aarti':         ganeshAarti,
  'saraswati-vandana':    saraswatiVandana,
  'mahalakshmi-ashtakam': mahalakshmiAshtakam,
  'vishnu-sahasranamam':  vishnuSahasranamam,
  'ram-raksha-stotram':   ramRakshaStotram,
  'aditya-hridayam':      adityaHridayam,
  'navagraha-stotram':    navagrahaStotram,
  'aigiri-nandini':       aigiriNandini,
  'shiv-chalisa':         shivChalisa,
};

function getMeta(slug) {
  return STOTRAMS_INDEX.find((s) => s.slug === slug);
}

export function generateStaticParams() {
  return STOTRAMS_INDEX.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const meta = getMeta(slug);

  if (!meta) {
    return {
      title: 'Page Not Found | Divya Stotram',
      description: 'The requested stotram page could not be found.',
    };
  }

  const pageTitle       = `${meta.title?.en || 'Stotram'} | Divya Stotram`;
  const pageDescription = meta.description?.en ||
    `Read ${meta.title?.en} in English, Hindi, Odia and Telugu with meaning, benefits and FAQs.`;
  const canonicalUrl    = `${SITE_URL}/${slug}`;
  const ogImage         = `${SITE_URL}/og-image.png`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title:       pageTitle,
      description: pageDescription,
      url:         canonicalUrl,
      siteName:    'Divya Stotram',
      type:        'article',
      images: [{ url: ogImage, width: 1200, height: 630, alt: meta.title?.en }],
    },
    twitter: {
      card:        'summary_large_image',
      title:       pageTitle,
      description: pageDescription,
      images:      [ogImage],
    },
  };
}

export default function StotramPage({ params }) {
  const { slug } = params;
  const meta = getMeta(slug);
  if (!meta) return notFound();

  const verseData = VERSE_DATA[slug] || null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title?.en,
    description: meta.description?.en,
    url: `${SITE_URL}/${slug}`,
    inLanguage: ['en', 'hi', 'or', 'te'],
    about: {
      '@type': 'Thing',
      name: meta.deity,
      description: `Hindu deity — ${meta.deity}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Divya Stotram',
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StotramClientPage meta={meta} verseData={verseData} />
    </>
  );
}