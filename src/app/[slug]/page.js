import { notFound } from 'next/navigation';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';
import { devotionalPages, getPageBySlug } from '@/data/devotionalPages';

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

/**
 * Main stotram verse data
 */
const VERSE_DATA = {
  'hanuman-chalisa': hanumanChalisa,
  'durga-stotram': durgaStotram,
  'shiva-tandav': shivaTandav,
  'gayatri-mantra': gayatriMantra,
  'ganesh-aarti': ganeshAarti,
  'saraswati-vandana': saraswatiVandana,
  'mahalakshmi-ashtakam': mahalakshmiAshtakam,
  'vishnu-sahasranamam': vishnuSahasranamam,
  'ram-raksha-stotram': ramRakshaStotram,
  'aditya-hridayam': adityaHridayam,
  'navagraha-stotram': navagrahaStotram,
  'aigiri-nandini': aigiriNandini,
  'shiv-chalisa': shivChalisa,
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

function isMainStotram(slug) {
  return STOTRAMS_INDEX.some((item) => item.slug === slug);
}

function buildDevotionalMetadata(page, slug) {
  const canonicalUrl = `${SITE_URL}/${slug}`;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonicalUrl,
      siteName: 'Divya Stotram',
      type: 'article',
      images: [
        {
          url: '/logo.svg',
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: ['/logo.svg'],
    },
  };
}

export function generateStaticParams() {
  const stotramParams = STOTRAMS_INDEX.map((item) => ({ slug: item.slug }));
  const devotionalParams = devotionalPages.map((page) => ({ slug: page.slug }));

  const merged = [...stotramParams, ...devotionalParams];

  const seen = new Set();
  return merged.filter((item) => {
    if (seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  });
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  if (isMainStotram(slug)) {
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

  const devotionalPage = getPageBySlug(slug);
  if (devotionalPage) {
    return buildDevotionalMetadata(devotionalPage, slug);
  }

  return {
    title: 'Page Not Found',
    description: 'The requested page could not be found.',
  };
}

function DevotionalContentPage({ page }) {

  // 🔥 AUTO DETECT MANTRA
  const detectMantra = () => {
    const text = (page.slug + " " + page.title).toLowerCase();

    if (text.includes("anxiety") || text.includes("peace")) {
      return { name: "Om Namah Shivaya", link: "shiva" };
    }

    if (text.includes("confidence") || text.includes("fear")) {
      return { name: "Hanuman Chalisa", link: "hanuman" };
    }

    if (text.includes("study") || text.includes("exam")) {
      return { name: "Saraswati Vandana", link: "saraswati" };
    }

    if (text.includes("money") || text.includes("wealth")) {
      return { name: "Mahalakshmi Ashtakam", link: "lakshmi" };
    }

    return { name: "Om Chanting", link: "om" };
  };

  const mantra = detectMantra();

  return (
    <main className="bg-white mx-auto max-w-4xl px-4 py-10">
      <article className="space-y-8">

        <header className="space-y-4">
          <h1 className="text-3xl font-bold leading-tight md:text-4xl">
            {page.h1}
          </h1>

          <p className="text-base leading-7 text-neutral-700 md:text-lg">
            {page.intro}
          </p>

          {/* 🔥 CHANT BUTTON */}
          <a
            href={`/chanting-room?mantra=${mantra.link}`}
            className="inline-block mt-4 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-orange-600 transition"
          >
            🔊 Start Chanting {mantra.name}
          </a>

        </header>

        {page.sections?.map((section, index) => (
          <section key={index} className="space-y-3">
            <h2 className="text-2xl font-semibold">{section.heading}</h2>
            <p className="text-base leading-7 text-neutral-800">
              {section.content}
            </p>
          </section>
        ))}

        {!!page.faqs?.length && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">FAQs</h2>

            <div className="space-y-4">
              {page.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-neutral-200 p-4"
                >
                  <h3 className="text-lg font-medium">{faq.q}</h3>
                  <p className="mt-2 text-base leading-7 text-neutral-800">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

      </article>
    </main>
  );
}

export default async function StotramPage({ params }) {
  const { slug } = await params;

  if (isMainStotram(slug)) {
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

  const devotionalPage = getPageBySlug(slug);
  if (!devotionalPage) return notFound();

  const canonicalUrl = `${SITE_URL}/${slug}`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: devotionalPage.title,
    description: devotionalPage.description,
    url: canonicalUrl,
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
        name: devotionalPage.title,
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
      <DevotionalContentPage page={devotionalPage} />
    </>
  );
}