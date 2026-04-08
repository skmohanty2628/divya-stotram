import { notFound } from 'next/navigation';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';

import { hanumanChalisa } from '@/data/hanuman-chalisa';
import { durgaStotram } from '@/data/durga-stotram';
import { shivaTandav } from '@/data/shiva-tandav';
import { gayatriMantra } from '@/data/gayatri-mantra';
import { ganeshAarti } from '@/data/ganesh-aarti';
import { saraswatiVandana } from '@/data/saraswati-vandana';
import { mahalakshmiAshtakam } from '@/data/mahalakshmi-ashtakam';
import { vishnuSahasranamam } from '@/data/vishnu-sahasranamam';
import { ramRakshaStotram } from '@/data/ram-raksha-stotram';
import { adityaHridayam } from '@/data/aditya-hridayam';
import { navagrahaStotram } from '@/data/navagraha-stotram';
import { aigiriNandini } from '@/data/aigiri-nandini';
import { shivChalisa } from '@/data/shiv-chalisa';

import StotramClientPage from './StotramClientPage';

const SITE_URL = 'https://divyastotram.com';

const VERSE_DATA = {
  'hanuman-chalisa': hanumanChalisa.verses || hanumanChalisa,
  'durga-stotram': durgaStotram.verses || durgaStotram,
  'shiva-tandav': shivaTandav.verses || shivaTandav,
  'gayatri-mantra': gayatriMantra.verses || gayatriMantra,
  'ganesh-aarti': ganeshAarti.verses || ganeshAarti,
  'saraswati-vandana': saraswatiVandana.verses || saraswatiVandana,
  'mahalakshmi-ashtakam': mahalakshmiAshtakam.verses || mahalakshmiAshtakam,
  'vishnu-sahasranamam': vishnuSahasranamam.verses || vishnuSahasranamam,
  'ram-raksha-stotram': ramRakshaStotram.verses || ramRakshaStotram,
  'aditya-hridayam': adityaHridayam.verses || adityaHridayam,
  'navagraha-stotram': navagrahaStotram.verses || navagrahaStotram,
  'aigiri-nandini': aigiriNandini.verses || aigiriNandini,
  'shiv-chalisa': shivChalisa.verses || shivChalisa,
};

const SEO_COPY = {
  'hanuman-chalisa': {
    title: 'Hanuman Chalisa in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Hanuman Chalisa in English, Hindi, Odia and Telugu with meaning, lyrics, benefits, best time to chant and FAQs.',
  },
  'shiva-tandav': {
    title: 'Shiva Tandav Stotram Lyrics in English, Hindi, Odia & Telugu',
    description:
      'Read Shiva Tandav Stotram lyrics in English, Hindi, Odia and Telugu with meaning, devotional overview, benefits and FAQs.',
  },
  'vishnu-sahasranamam': {
    title: 'Vishnu Sahasranamam in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Vishnu Sahasranamam in English, Hindi, Odia and Telugu with meaning, structured reading support, benefits and FAQs.',
  },
  'durga-stotram': {
    title: 'Durga Stotram in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Durga Stotram in English, Hindi, Odia and Telugu with devotional meaning, benefits, chanting guidance and FAQs.',
  },
  'aigiri-nandini': {
    title: 'Aigiri Nandini Lyrics in English, Hindi, Odia & Telugu',
    description:
      'Read Aigiri Nandini lyrics in English, Hindi, Odia and Telugu with devotional overview, benefits and FAQs.',
  },
  'gayatri-mantra': {
    title: 'Gayatri Mantra in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Gayatri Mantra in English, Hindi, Odia and Telugu with meaning, prayer guidance, benefits and FAQs.',
  },
  'ganesh-aarti': {
    title: 'Ganesh Aarti in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Ganesh Aarti in English, Hindi, Odia and Telugu with devotional meaning, benefits and FAQs.',
  },
  'saraswati-vandana': {
    title: 'Saraswati Vandana in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Saraswati Vandana in English, Hindi, Odia and Telugu with meaning, devotional context, benefits and FAQs.',
  },
  'mahalakshmi-ashtakam': {
    title: 'Mahalakshmi Ashtakam in English, Hindi, Odia & Telugu',
    description:
      'Read Mahalakshmi Ashtakam in English, Hindi, Odia and Telugu with meaning, prayer benefits and FAQs.',
  },
  'ram-raksha-stotram': {
    title: 'Ram Raksha Stotram in English, Hindi, Odia & Telugu',
    description:
      'Read Ram Raksha Stotram in English, Hindi, Odia and Telugu with devotional overview, benefits and FAQs.',
  },
  'aditya-hridayam': {
    title: 'Aditya Hridayam in English, Hindi, Odia & Telugu',
    description:
      'Read Aditya Hridayam in English, Hindi, Odia and Telugu with meaning, devotional context, benefits and FAQs.',
  },
  'navagraha-stotram': {
    title: 'Navagraha Stotram in English, Hindi, Odia & Telugu',
    description:
      'Read Navagraha Stotram in English, Hindi, Odia and Telugu with devotional meaning, benefits and FAQs.',
  },
  'shiv-chalisa': {
    title: 'Shiv Chalisa in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Shiv Chalisa in English, Hindi, Odia and Telugu with meaning, lyrics, benefits and FAQs.',
  },
};

function getMeta(slug) {
  return STOTRAMS_INDEX.find((s) => s.slug === slug);
}

function getSeoCopy(slug, meta) {
  return (
    SEO_COPY[slug] || {
      title: `${meta.title?.en} in English, Hindi, Odia & Telugu with Meaning`,
      description:
        meta.description?.en ||
        `Read ${meta.title?.en} in English, Hindi, Odia and Telugu with meaning, benefits and FAQs.`,
    }
  );
}

export function generateStaticParams() {
  return STOTRAMS_INDEX.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const meta = getMeta(slug);

  if (!meta) {
    return {
      title: 'Page Not Found',
      description: 'The requested stotram page could not be found.',
    };
  }

  const seo = getSeoCopy(slug, meta);
  const canonicalUrl = `${SITE_URL}/${slug}`;

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonicalUrl,
      siteName: 'Divya Stotram',
      type: 'article',
      images: [
        {
          url: '/logo.svg',
          width: 1200,
          height: 630,
          alt: meta.title?.en,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['/logo.svg'],
    },
  };
}

export default async function StotramPage({ params }) {
  const { slug } = await params;
  const meta = getMeta(slug);

  if (!meta) return notFound();

  const seo = getSeoCopy(slug, meta);
  const verseData = VERSE_DATA[slug] || null;
  const canonicalUrl = `${SITE_URL}/${slug}`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: seo.title,
    description: seo.description,
    url: canonicalUrl,
    inLanguage: ['en', 'hi', 'or', 'te'],
    author: {
      '@type': 'Organization',
      name: 'Divya Stotram',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Divya Stotram',
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    about: {
      '@type': 'Thing',
      name: meta.deity,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: meta.title?.en,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <StotramClientPage meta={meta} verseData={verseData} />
    </>
  );
}