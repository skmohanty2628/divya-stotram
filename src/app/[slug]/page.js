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
} from '@/data/other-stotrams';
import StotramClientPage from './StotramClientPage';

const SITE_URL = 'https://divyastotram.com';

const VERSE_DATA = {
  'hanuman-chalisa': hanumanChalisa,
  'durga-stotram': durgaStotram,
  'shiva-tandav': shivaTandav,
  'gayatri-mantra': gayatriMantra,
  'ganesh-aarti': ganeshAarti,
  'saraswati-vandana': saraswatiVandana,
  'mahalakshmi-ashtakam': mahalakshmiAshtakam,
  'vishnu-sahasranamam': vishnuSahasranamam,
};

function getMeta(slug) {
  return STOTRAMS_INDEX.find((s) => s.slug === slug);
}

function getVerseData(slug) {
  return VERSE_DATA[slug] || null;
}

export function generateStaticParams() {
  return STOTRAMS_INDEX.map((item) => ({
    slug: item.slug,
  }));
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

  const pageTitle = `${meta.title?.en || 'Stotram'} | Divya Stotram`;
  const pageDescription =
    meta.description?.en ||
    `Read ${meta.title?.en || 'this stotram'} in multiple languages with meaning, benefits, FAQs, and devotional guidance.`;

  const canonicalUrl = `${SITE_URL}/${slug}`;
  const ogImage = `${SITE_URL}/og-image.png`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: 'Divya Stotram',
      type: 'article',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: meta.title?.en || 'Divya Stotram',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [ogImage],
    },
  };
}

export default function StotramPage({ params }) {
  const { slug } = params;
  const meta = getMeta(slug);

  if (!meta) return notFound();

  const verseData = getVerseData(slug);

  return <StotramClientPage meta={meta} verseData={verseData} />;
}