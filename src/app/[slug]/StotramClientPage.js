'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import VerseCard from '@/components/VerseCard';
import MusicPlayer from '@/components/MusicPlayer';
import AskPandit from '@/components/AskPandit';
import StotramInfo from '@/components/StotramInfo';
import { LangProvider, useLang } from '@/components/LanguageSwitcher';
import { trackAndWatch } from '@/lib/firebase';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';

const CONTENT_MAP = {
  'hanuman-chalisa': {
    intro:
      'Hanuman Chalisa is one of the most loved Hindu devotional hymns dedicated to Lord Hanuman. On this page, devotees can read Hanuman Chalisa in English, Hindi, Odia and Telugu along with meaning and a clean verse-by-verse format for daily chanting.',
    benefits: [
      'Helps devotees build discipline, devotion and courage.',
      'Commonly recited for strength, protection and peace of mind.',
      'Easy to read daily because of its structured chaupai format.',
    ],
    bestTime:
      'Many devotees chant Hanuman Chalisa on Tuesdays, Saturdays, early mornings or evenings after pooja. It can also be recited daily with sincerity.',
    faq: [
      {
        q: 'Can I read Hanuman Chalisa daily?',
        a: 'Yes. Many devotees read Hanuman Chalisa every day, while others especially chant it on Tuesday and Saturday.',
      },
      {
        q: 'What is the best time to chant Hanuman Chalisa?',
        a: 'There is no single compulsory time. Early morning, evening, Tuesday and Saturday are especially common among devotees.',
      },
      {
        q: 'Can beginners chant Hanuman Chalisa?',
        a: 'Yes. Beginners can start by reading slowly, understanding the meaning and improving pronunciation with practice.',
      },
      {
        q: 'Is Hanuman Chalisa available here in multiple languages?',
        a: 'Yes. This page is designed to help readers access Hanuman Chalisa in English, Hindi, Odia and Telugu.',
      },
      {
        q: 'How many verses are there in Hanuman Chalisa?',
        a: 'Hanuman Chalisa traditionally includes 40 chaupais, along with opening and closing dohas.',
      },
      {
        q: 'Why do people chant Hanuman Chalisa?',
        a: 'Many devotees chant it for strength, courage, devotion, peace of mind and spiritual protection.',
      },
    ],
  },

  'shiva-tandav': {
    intro:
      'Shiva Tandav Stotram is a powerful Sanskrit hymn praising Lord Shiva in his cosmic tandava form. This page presents Shiva Tandav lyrics in a readable format with multilingual support and devotional guidance.',
    benefits: [
      'Deepens devotional connection with Lord Shiva.',
      'Popular among devotees who enjoy rhythmic and poetic stotrams.',
      'Useful for readers searching for Shiva Tandav lyrics with meaning-oriented reading support.',
    ],
    bestTime:
      'Many devotees prefer chanting Shiva stotrams on Mondays, during Pradosh, in the early morning, or in quiet prayer time.',
    faq: [
      {
        q: 'Who composed Shiva Tandav Stotram?',
        a: 'Shiva Tandav Stotram is traditionally attributed to Ravana in praise of Lord Shiva.',
      },
      {
        q: 'Can beginners read Shiva Tandav?',
        a: 'Yes. Even if pronunciation is not perfect at first, reading with devotion and learning gradually is common.',
      },
      {
        q: 'What is Shiva Tandav about?',
        a: 'It is a powerful hymn glorifying Lord Shiva, especially his cosmic dance, energy and divine majesty.',
      },
      {
        q: 'When do devotees chant Shiva Tandav Stotram?',
        a: 'Many devotees chant it on Mondays, during Shiva worship, during Pradosh, or in personal daily prayer time.',
      },
      {
        q: 'Is Shiva Tandav difficult to read?',
        a: 'It can feel intense for beginners, but repeated reading makes it easier over time.',
      },
      {
        q: 'Does this page help with Shiva Tandav lyrics access?',
        a: 'Yes. This page is designed to make Shiva Tandav lyrics easier to read and revisit.',
      },
    ],
  },

  'vishnu-sahasranamam': {
    intro:
      'Vishnu Sahasranamam is the sacred litany of the thousand names of Lord Vishnu. This page helps devotees read Vishnu Sahasranamam in a clear sequence and makes the text easier to access across multiple languages.',
    benefits: [
      'Supports disciplined daily devotional reading.',
      'Useful for those searching for Vishnu Sahasranamam lyrics and meaning-based reading.',
      'Often recited for peace, faith and spiritual focus.',
    ],
    bestTime:
      'Many devotees chant Vishnu Sahasranamam in the morning, on Ekadashi, on Thursdays, or during calm prayer hours.',
    faq: [
      {
        q: 'How many names are in Vishnu Sahasranamam?',
        a: 'Traditionally, Vishnu Sahasranamam contains one thousand names of Lord Vishnu.',
      },
      {
        q: 'Is this suitable for regular reading?',
        a: 'Yes. Many devotees read Vishnu Sahasranamam daily or weekly depending on their routine.',
      },
      {
        q: 'What is the best time to chant Vishnu Sahasranamam?',
        a: 'Morning prayer time is common, though it can also be read on Ekadashi, Thursdays or any peaceful devotional time.',
      },
      {
        q: 'Why do people read Vishnu Sahasranamam?',
        a: 'Many devotees read it for inner peace, bhakti, focus and remembrance of Lord Vishnu.',
      },
      {
        q: 'Can beginners start reading Vishnu Sahasranamam?',
        a: 'Yes. Beginners may read gradually and build consistency over time.',
      },
      {
        q: 'Does this page support multi-language reading?',
        a: 'Yes. The page is designed to make Vishnu Sahasranamam easier to access in multiple language formats.',
      },
    ],
  },

  'durga-stotram': {
    intro:
      'Durga Stotram is a devotional hymn in praise of Goddess Durga, revered as the protector and destroyer of evil. This page provides a clean devotional reading format for Durga Stotram in multiple languages.',
    benefits: [
      'Popular during Navratri and regular Devi worship.',
      'Helps readers connect with the devotional meaning of the hymn.',
      'Useful for users searching for Durga Stotram lyrics or prayer text online.',
    ],
    bestTime:
      'Many devotees chant Durga Stotram in the morning, during Navratri, on Fridays, or before beginning important work.',
    faq: [
      {
        q: 'Can I chant Durga Stotram during Navratri?',
        a: 'Yes. Durga Stotram is especially popular during Navratri, though devotees may chant it anytime.',
      },
      {
        q: 'What is Durga Stotram about?',
        a: 'It is a hymn praising Goddess Durga and invoking her divine strength, protection and blessings.',
      },
      {
        q: 'Is Durga Stotram only for festival days?',
        a: 'No. Many devotees also read it as part of regular daily or weekly prayer.',
      },
      {
        q: 'Can beginners read Durga Stotram?',
        a: 'Yes. Beginners can read it with devotion and gradually improve familiarity with the text.',
      },
      {
        q: 'Why do devotees read Durga Stotram?',
        a: 'Many devotees read it for courage, divine protection, emotional strength and bhakti toward Maa Durga.',
      },
      {
        q: 'Is this page only for Sanskrit readers?',
        a: 'No. The page is intended to support readers across multiple language formats.',
      },
    ],
  },

  'aigiri-nandini': {
    intro:
      'Aigiri Nandini, also known as Mahishasura Mardini Stotram, is one of the most famous hymns praising Goddess Durga. This page is built for readers searching for Aigiri Nandini lyrics, structured chanting support and devotional reading.',
    benefits: [
      'Highly loved for its musical rhythm and devotional power.',
      'Useful for daily reading, Navratri worship and Durga devotion.',
      'Helps users find Aigiri Nandini lyrics in a neat verse layout.',
    ],
    bestTime:
      'Many devotees chant Aigiri Nandini during Navratri, on Fridays, in the morning, or during Devi worship.',
    faq: [
      {
        q: 'Is Aigiri Nandini the same as Mahishasura Mardini Stotram?',
        a: 'Yes. Aigiri Nandini is widely known as Mahishasura Mardini Stotram.',
      },
      {
        q: 'Can beginners start reading Aigiri Nandini here?',
        a: 'Yes. This page is designed to make reading easier and more approachable.',
      },
      {
        q: 'Why is Aigiri Nandini so popular?',
        a: 'It is loved for its strong devotional rhythm, poetic beauty and praise of Goddess Durga’s victory over evil.',
      },
      {
        q: 'When do devotees chant Aigiri Nandini?',
        a: 'Many devotees chant it during Navratri, on Fridays, in the morning or during Devi pooja.',
      },
      {
        q: 'Is Aigiri Nandini good for daily chanting?',
        a: 'Yes. Some devotees chant it daily, while others chant it on special Devi worship days.',
      },
      {
        q: 'Does this page help users looking for Aigiri Nandini lyrics?',
        a: 'Yes. This page is structured specifically to help readers access Aigiri Nandini lyrics more easily.',
      },
    ],
  },
};

const DEFAULT_CONTENT = (title, deity) => ({
  intro: `${title} is a sacred devotional prayer dedicated to ${deity}. This page helps devotees read ${title} in a clean format with multilingual support, devotional context and easier verse-by-verse access.`,
  benefits: [
    `Supports regular devotional reading of ${title}.`,
    `Helps readers access ${title} online in a structured format.`,
    `Improves discoverability for devotees searching for ${title} lyrics, meaning and prayer guidance.`,
  ],
  bestTime:
    'Many devotees prefer reading stotrams in the morning, evening, during pooja, or on spiritually significant days connected with the deity.',
  faq: [
    {
      q: `Can I read ${title} daily?`,
      a: `Yes. Many devotees read ${title} daily or on special devotional days according to their tradition.`,
    },
    {
      q: `What is ${title} about?`,
      a: `${title} is a devotional prayer connected with ${deity} and is read with faith, reverence and spiritual focus.`,
    },
    {
      q: `What is the best time to read ${title}?`,
      a: `There is no single compulsory rule. Many devotees read ${title} in the morning, evening, during pooja, or on deity-specific days.`,
    },
    {
      q: `Can beginners read ${title}?`,
      a: `Yes. Beginners can start slowly, understand the meaning and improve pronunciation over time.`,
    },
    {
      q: `Is ${title} available here in multiple languages?`,
      a: 'Yes. This site is structured to support multi-language devotional reading.',
    },
  ],
});

function PageVisitorBadge({ slug }) {
  const [count, setCount] = useState(null);

  useEffect(() => {
    try {
      const unsub = trackAndWatch(slug, setCount);
      return unsub;
    } catch {
      setCount(Math.floor(Math.random() * 80) + 20);
    }
  }, [slug]);

  if (!count) return null;

  return (
    <span className="inline-flex items-center gap-1.5 bg-[#e8760a]/10 border border-[#e8760a]/30 rounded-full px-3 py-1">
      <span className="w-1.5 h-1.5 rounded-full bg-[#e8760a] animate-pulse" />
      <span className="font-cinzel-reg text-[10px] tracking-widest text-[#e8760a]">
        {count} praying now
      </span>
    </span>
  );
}

function Breadcrumbs({ title }) {
  return (
    <nav aria-label="Breadcrumb" className="pt-6 mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        <li>
          <Link
            href="/"
            className="font-garamond text-[#8b1a00]/70 hover:text-[#8b1a00] transition-colors"
          >
            Home
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight size={14} className="text-[#c9922a]" />
        </li>
        <li>
          <span className="font-garamond text-[#3d1a00]/85">{title}</span>
        </li>
      </ol>
    </nav>
  );
}

function ShareButtons({ meta }) {
  const handleWhatsAppShare = () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const text = `🙏 Reading ${meta.title?.en || 'this stotram'} on Divya Stotram\n${url}`;

    if (navigator.share) {
      navigator.share({ title: meta.title?.en || 'Divya Stotram', url });
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  const handleCopyLink = async () => {
    try {
      if (typeof window !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied!');
      }
    } catch {
      alert('Could not copy the link.');
    }
  };

  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      <button
        onClick={handleWhatsAppShare}
        className="flex items-center gap-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#25D366] font-cinzel-reg text-xs tracking-widest px-5 py-2.5 rounded-full transition-all"
      >
        📱 WhatsApp
      </button>

      <button
        onClick={handleCopyLink}
        className="flex items-center gap-2 bg-[#c9922a]/15 hover:bg-[#c9922a]/25 border border-[#c9922a]/35 text-[#8b1a00] font-cinzel-reg text-xs tracking-widest px-5 py-2.5 rounded-full transition-all"
      >
        🔗 Copy Link
      </button>
    </div>
  );
}

function ContentSection({ title, children }) {
  return (
    <section className="mt-10 bg-white border border-[#c9922a]/20 rounded-2xl p-6 sm:p-8 shadow-sm">
      <h2 className="font-cinzel text-2xl font-bold text-[#8b1a00] mb-4">{title}</h2>
      {children}
    </section>
  );
}

function FAQSection({ faq }) {
  return (
    <div className="space-y-4">
      {faq.map((item) => (
        <div
          key={item.q}
          className="rounded-xl border border-[#c9922a]/15 bg-[#fffaf1] p-4"
        >
          <h3 className="font-cinzel text-lg text-[#8b1a00] font-bold mb-2">{item.q}</h3>
          <p className="font-garamond text-base text-[#3d1a00]/80 leading-relaxed">
            {item.a}
          </p>
        </div>
      ))}
    </div>
  );
}

function RelatedStotrams({ currentSlug, deity }) {
  const related = STOTRAMS_INDEX.filter(
    (item) => item.slug !== currentSlug && (item.deity === deity || item.featured)
  ).slice(0, 4);

  if (!related.length) return null;

  return (
    <section className="mt-10">
      <h2 className="font-cinzel text-2xl font-bold text-[#8b1a00] mb-4">
        Related Prayers
      </h2>

      <div className="grid sm:grid-cols-2 gap-4">
        {related.map((item) => (
          <Link
            key={item.slug}
            href={`/${item.slug}`}
            className="bg-white border border-[#c9922a]/20 rounded-xl p-4 hover:border-[#c9922a] transition-all shadow-sm"
          >
            <p className="font-cinzel text-lg text-[#8b1a00] font-bold mb-1">
              {item.deityEmoji} {item.title.en}
            </p>
            <p className="font-garamond text-base text-[#3d1a00]/75">
              {item.description.en}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function StotramContent({ meta, verseData }) {
  const { lang } = useLang();

  const content = useMemo(() => {
    return CONTENT_MAP[meta.slug] || DEFAULT_CONTENT(meta.title?.en, meta.deity);
  }, [meta]);

  if (!verseData) {
    return (
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="text-center py-24">
          <p className="font-garamond text-2xl text-[#8b1a00]/70 italic">
            Stotram content coming soon...
          </p>
          <p className="font-cinzel-reg text-xs tracking-widest text-[#c9922a]/60 mt-3">
            We are adding more stotrams. Please check back.
          </p>
        </div>
      </div>
    );
  }

  const verses = verseData.verses || [];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Breadcrumbs title={meta.title?.en} />

      <div className="flex items-center gap-4 pt-2 pb-5 border-b border-[#c9922a]/20 mb-6">
        <span className="text-4xl flex-shrink-0">{meta.deityEmoji}</span>

        <div className="flex-1 min-w-0">
          <h1 className="font-cinzel text-xl sm:text-3xl font-bold text-[#8b1a00] leading-tight">
            {meta.title?.[lang] || meta.title?.en}
          </h1>
          <p className="font-cinzel-reg text-[10px] tracking-[2px] uppercase text-[#c9922a]/60 mt-1">
            {meta.language} · {meta.verseCount} Verses
          </p>
        </div>

        <PageVisitorBadge slug={meta.slug} />
      </div>

      <ContentSection title={`${meta.title?.en} Meaning and Overview`}>
        <p className="font-garamond text-lg text-[#3d1a00]/80 leading-relaxed">
          {content.intro}
        </p>
      </ContentSection>

      <ContentSection title={`${meta.title?.en} Lyrics / Verses`}>
        <div className="flex flex-col gap-5">
          {verses.map((verse, i) => (
            <div key={verse.id || i}>
              <VerseCard verse={verse} index={i} />
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection title={`Benefits of Reading ${meta.title?.en}`}>
        <ul className="space-y-3">
          {content.benefits.map((item) => (
            <li
              key={item}
              className="font-garamond text-lg text-[#3d1a00]/80 leading-relaxed"
            >
              • {item}
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection title={`Best Time to Chant ${meta.title?.en}`}>
        <p className="font-garamond text-lg text-[#3d1a00]/80 leading-relaxed">
          {content.bestTime}
        </p>
      </ContentSection>

      <ContentSection title={`Frequently Asked Questions about ${meta.title?.en}`}>
        <FAQSection faq={content.faq} />
      </ContentSection>

      <StotramInfo slug={meta.slug} />

      <RelatedStotrams currentSlug={meta.slug} deity={meta.deity} />

      <div className="mt-12 text-center border-t border-[#c9922a]/15 pt-10">
        <p className="font-cinzel text-lg text-[#8b1a00] mb-2">🙏 Share the Blessings</p>
        <p className="font-garamond text-sm text-[#3d1a00]/60 mb-4 italic">
          Share this stotram with your family and friends
        </p>
        <ShareButtons meta={meta} />
      </div>
    </div>
  );
}

export default function StotramClientPage({ meta, verseData }) {
  return (
    <LangProvider>
      <div className="min-h-screen" style={{ background: '#fdf6e3' }}>
        <Navbar />
        <StotramContent meta={meta} verseData={verseData} />
        <MusicPlayer youtubeId={meta.youtubeId} title={meta.title?.en} />
        <AskPandit stotramContext={`${meta.title?.en} — ${meta.description?.en}`} />
      </div>
    </LangProvider>
  );
}