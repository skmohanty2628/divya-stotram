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
import { krishnaVasudevayaMantra } from '@/data/krishna-vasudevaya-mantra';
import { bajrangBaan } from '@/data/bajrang-baan';
import { indraJimiJambhPar } from '@/data/indra-jimi-jambh-par';

import StotramClientPage from './StotramClientPage';

const SITE_URL = 'https://divyastotram.com';

// ✅ FORCE FULL DYNAMIC RENDERING
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
  'krishna-vasudevaya-mantra': krishnaVasudevayaMantra,
  'bajrang-baan': bajrangBaan,
  'indra-jimi-jambh-par': indraJimiJambhPar,
};

const SEO_COPY = {
  'hanuman-chalisa': {
    title: 'Hanuman Chalisa in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Hanuman Chalisa in English, Hindi, Odia and Telugu with meaning, lyrics, benefits, best time to chant and FAQs. Hanuman Chalisa full path with meaning — Jai Hanuman Gyan Gun Sagar.',
  },
  'shiva-tandav': {
    title: 'Shiva Tandav Stotram Lyrics in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Shiva Tandav Stotram lyrics in English, Hindi, Odia and Telugu with meaning. Jatatavigalajjala — powerful Shiva prayer by Ravana with devotional overview, benefits and FAQs.',
  },
  'vishnu-sahasranamam': {
    title: 'Vishnu Sahasranamam in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Vishnu Sahasranamam — 1000 names of Lord Vishnu in English, Hindi, Odia and Telugu with meaning. From Mahabharata — structured reading support, benefits and FAQs.',
  },
  'durga-stotram': {
    title: 'Durga Stotram in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Durga Stotram in English, Hindi, Odia and Telugu with devotional meaning. Ya Devi Sarvabhuteshu — Maa Durga prayer with benefits, chanting guidance and FAQs.',
  },
  'aigiri-nandini': {
    title: 'Aigiri Nandini Mahishasura Mardini Lyrics in English, Hindi, Odia & Telugu',
    description:
      'Read Aigiri Nandini (Mahishasura Mardini Stotram) lyrics in English, Hindi, Odia and Telugu with meaning. Famous Navratri prayer by Adi Shankaracharya — devotional overview and FAQs.',
  },
  'gayatri-mantra': {
    title: 'Gayatri Mantra in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Gayatri Mantra — Om Bhur Bhuva Swaha — in English, Hindi, Odia and Telugu with meaning. Most sacred Vedic mantra with prayer guidance, benefits and FAQs.',
  },
  'ganesh-aarti': {
    title: 'Ganesh Aarti — Jai Ganesh Deva Lyrics in English, Hindi, Odia & Telugu',
    description:
      'Read Ganesh Aarti — Jai Ganesh Jai Ganesh Deva — in English, Hindi, Odia and Telugu with devotional meaning. Lord Ganesha prayer with benefits and FAQs.',
  },
  'saraswati-vandana': {
    title: 'Saraswati Vandana in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Saraswati Vandana — Ya Kundendu Tushar Hara Dhavala — in English, Hindi, Odia and Telugu with meaning. Goddess Saraswati prayer for knowledge and wisdom.',
  },
  'mahalakshmi-ashtakam': {
    title: 'Mahalakshmi Ashtakam in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Mahalakshmi Ashtakam — Namastute Mahamaye — in English, Hindi, Odia and Telugu with meaning. Eight-verse prayer to Goddess Lakshmi for wealth and prosperity.',
  },
  'ram-raksha-stotram': {
    title: 'Ram Raksha Stotram in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Ram Raksha Stotram in English, Hindi, Odia and Telugu with devotional overview. Powerful Ram protection prayer with benefits and FAQs.',
  },
  'aditya-hridayam': {
    title: 'Aditya Hridayam in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Aditya Hridayam — sacred solar hymn from Valmiki Ramayana — in English, Hindi, Odia and Telugu with meaning. Surya prayer taught by sage Agastya to Lord Ram.',
  },
  'navagraha-stotram': {
    title: 'Navagraha Stotram in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Navagraha Stotram — prayers to all nine planets — in English, Hindi, Odia and Telugu with devotional meaning. Removes malefic planetary effects with benefits and FAQs.',
  },
  'shiv-chalisa': {
    title: 'Shiv Chalisa in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Shiv Chalisa — 40 verses praising Lord Shiva — in English, Hindi, Odia and Telugu with meaning. Jai Girijapati Deen Dayala — lyrics, benefits and FAQs.',
  },
  'krishna-vasudevaya-mantra': {
    title: 'Om Krishnaya Vasudevaya Mantra — Krishna Mantra with Meaning',
    description:
      'Read Om Krishnaya Vasudevaya Haraye Paramatmane mantra in English, Hindi, Odia & Telugu. Powerful Krishna mantra that destroys sorrow, brings peace and divine protection.',
  },
  'bajrang-baan': {
    title: 'Bajrang Baan in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Bajrang Baan — Nishchay Prem Prateeti Te — in English, Hindi, Odia and Telugu with meaning. Powerful Hanuman protective prayer that destroys enemies and removes fear.',
  },
  'indra-jimi-jambh-par': {
    title: 'Indra Jimi Jambh Par — Shivaji Maharaj Kavitt | Kavi Bhushan Poem with Meaning',
    description:
      'Read Indra Jimi Jambh Par (इंद्र जिमि जंभ पर) — the immortal Kavitt by Kavi Bhushan praising Chhatrapati Shivaji Maharaj. Full poem lyrics in Hindi with English meaning. Sher Shivaraj hai! Shivaji Maharaj poem in Hindi with meaning.',
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
    title: `${page.title} | Divya Stotram`,
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
        languages: {
          'en': canonicalUrl,
          'hi': `${canonicalUrl}?lang=hi`,
          'od': `${canonicalUrl}?lang=od`,
          'te': `${canonicalUrl}?lang=te`,
          'x-default': canonicalUrl,
        },
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
  const mantra = {
    name: page.mantra?.name || 'Hanuman Chalisa',
    link: page.mantra?.link || '/hanuman-chalisa',
  };

  return (
    <main className="relative z-10 max-w-5xl mx-auto px-4 py-20">
      <div className="bg-white border border-[#c9922a]/20 rounded-3xl p-8 shadow-md backdrop-blur-sm">
        <article className="space-y-8">
          <header className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9922a]" />
              <span className="font-cinzel-reg text-[11px] tracking-[4px] uppercase text-[#e8760a]">
                Spiritual Guidance
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9922a]" />
            </div>

            <h1 className="font-cinzel text-3xl md:text-5xl font-bold text-[#8b1a00] leading-tight">
              {page.h1}
            </h1>

            <p className="font-garamond text-lg text-[#3d1a00]/80 leading-relaxed">
              {page.intro}
            </p>

            <a
              href={mantra.link}
              className="inline-block mt-2 bg-[#e8760a] text-white px-6 py-3 rounded-full font-cinzel-reg tracking-wide shadow hover:bg-[#d96a05] transition"
            >
              🔊 Start Chanting {mantra.name}
            </a>
          </header>

          {page.sections?.map((section, index) => (
            <section key={index} className="space-y-3 mt-6">
              <h2 className="font-cinzel text-2xl font-bold text-[#8b1a00]">
                {section.heading}
              </h2>
              <p className="font-garamond text-lg text-[#3d1a00]/80 leading-relaxed">
                {section.content}
              </p>
            </section>
          ))}

          {!!page.faqs?.length && (
            <section className="space-y-4 pt-2">
              <h2 className="font-cinzel text-2xl font-bold text-[#8b1a00]">
                FAQs
              </h2>

              {page.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-[#c9922a]/20 p-5 rounded-2xl bg-[#fffaf1] mt-4"
                >
                  <h3 className="font-cinzel text-lg font-semibold text-[#8b1a00]">
                    {faq.q}
                  </h3>
                  <p className="mt-2 font-garamond text-lg text-[#3d1a00]/80 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </section>
          )}

          <section className="mt-10">
            <h2 className="font-cinzel text-2xl font-bold text-[#8b1a00]">
              🔗 Related Mantras & Guidance
            </h2>

            <ul className="mt-4 space-y-2">
              <li>
                <a href="/best-mantra-for-anxiety" className="text-orange-600 hover:text-orange-700">
                  Best Mantra for Anxiety
                </a>
              </li>
              <li>
                <a href="/best-mantra-for-confidence" className="text-orange-600 hover:text-orange-700">
                  Best Mantra for Confidence
                </a>
              </li>
              <li>
                <a href="/best-mantra-for-study-focus" className="text-orange-600 hover:text-orange-700">
                  Best Mantra for Study Focus
                </a>
              </li>
              <li>
                <a href="/best-prayer-for-inner-peace" className="text-orange-600 hover:text-orange-700">
                  Best Prayer for Inner Peace
                </a>
              </li>
              <li>
                <a href="/best-mantra-for-money" className="text-orange-600 hover:text-orange-700">
                  Best Mantra for Money
                </a>
              </li>
              <li>
                <a href="/how-to-chant-hanuman-chalisa" className="text-orange-600 hover:text-orange-700">
                  How to Chant Hanuman Chalisa
                </a>
              </li>
            </ul>
          </section>
        </article>
      </div>
    </main>
  );
}

export default async function StotramPage({ params }) {
  const { slug } = await params;

  console.log('🔍 Rendering page for slug:', slug);

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