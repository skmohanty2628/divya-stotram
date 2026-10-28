import { STOTRAMS_INDEX } from '@/data/stotrams-index';
import { stotramUrl, LANGS, SITE_URL } from '@/lib/site';

const SEO_COPY = {
  'hanuman-chalisa': {
    title: 'Hanuman Chalisa in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Hanuman Chalisa in English, Hindi, Odia and Telugu with meaning, lyrics, benefits, best time to chant and FAQs. Hanuman Chalisa full path with meaning, Jai Hanuman Gyan Gun Sagar.',
  },
  'shiva-tandav': {
    title: 'Shiva Tandav Stotram Lyrics in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Shiva Tandav Stotram lyrics in English, Hindi, Odia and Telugu with meaning. Jatatavigalajjala, powerful Shiva prayer by Ravana with devotional overview, benefits and FAQs.',
  },
  'vishnu-sahasranamam': {
    title: 'Vishnu Sahasranamam in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Vishnu Sahasranamam, 1000 names of Lord Vishnu in English, Hindi, Odia and Telugu with meaning. From Mahabharata, structured reading support, benefits and FAQs.',
  },
  'durga-stotram': {
    title: 'Durga Stotram in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Durga Stotram in English, Hindi, Odia and Telugu with devotional meaning. Ya Devi Sarvabhuteshu, Maa Durga prayer with benefits, chanting guidance and FAQs.',
  },
  'aigiri-nandini': {
    title: 'Aigiri Nandini Lyrics in English, Hindi, Odia & Telugu | Mahishasura Mardini Stotram',
    description:
      'Read Aigiri Nandini (Mahishasura Mardini Stotram) full lyrics in English, Hindi, Odia and Telugu with meaning. Powerful Navratri prayer by Adi Shankaracharya, Ayi Giri Nandini Nandita Medini, verse by verse.',
  },
  'gayatri-mantra': {
    title: 'Gayatri Mantra in English, Hindi, Odia & Telugu | Om Bhur Bhuva Swaha with Meaning',
    description:
      'Read Gayatri Mantra (Om Bhur Bhuva Swaha) in English, Hindi, Odia and Telugu with full meaning. Most powerful Vedic mantra, benefits of chanting 108 times, best time to chant and complete guide.',
  },
  'ganesh-aarti': {
    title: 'Ganesh Aarti | Jai Ganesh Deva Lyrics in English, Hindi, Odia & Telugu',
    description:
      'Read Ganesh Aarti, Jai Ganesh Jai Ganesh Deva, in English, Hindi, Odia and Telugu with devotional meaning. Lord Ganesha prayer with benefits and FAQs.',
  },
  'saraswati-vandana': {
    title: 'Saraswati Vandana in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Saraswati Vandana, Ya Kundendu Tushar Hara Dhavala, in English, Hindi, Odia and Telugu with meaning. Goddess Saraswati prayer for knowledge and wisdom.',
  },
  'mahalakshmi-ashtakam': {
    title: 'Mahalakshmi Ashtakam in English, Hindi, Odia & Telugu | Namaste Astu Mahamaye',
    description:
      'Read Mahalakshmi Ashtakam (Namaste Astu Mahamaye) in English, Hindi, Odia and Telugu with meaning. Powerful 8-verse Lakshmi prayer for wealth, prosperity and good fortune, recited on Fridays and during Lakshmi Puja.',
  },
  'ram-raksha-stotram': {
    title: 'Ram Raksha Stotram in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Ram Raksha Stotram in English, Hindi, Odia and Telugu with devotional overview. Powerful Ram protection prayer with benefits and FAQs.',
  },
  'aditya-hridayam': {
    title: 'Aditya Hridayam in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Aditya Hridayam, sacred solar hymn from Valmiki Ramayana, in English, Hindi, Odia and Telugu with meaning. Surya prayer taught by sage Agastya to Lord Ram.',
  },
  'navagraha-stotram': {
    title: 'Navagraha Stotram in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Navagraha Stotram, prayers to all nine planets, in English, Hindi, Odia and Telugu with devotional meaning. Removes malefic planetary effects with benefits and FAQs.',
  },
  'shiv-chalisa': {
    title: 'Shiv Chalisa in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Shiv Chalisa, 40 verses praising Lord Shiva, in English, Hindi, Odia and Telugu with meaning. Jai Girijapati Deen Dayala, lyrics, benefits and FAQs.',
  },
  'krishna-vasudevaya-mantra': {
    title: 'Om Krishnaya Vasudevaya Mantra | Krishna Mantra with Meaning',
    description:
      'Read Om Krishnaya Vasudevaya Haraye Paramatmane mantra in English, Hindi, Odia & Telugu. Powerful Krishna mantra that destroys sorrow, brings peace and divine protection.',
  },
  'bajrang-baan': {
    title: 'Bajrang Baan in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Bajrang Baan, Nishchay Prem Prateeti Te, in English, Hindi, Odia and Telugu with meaning. Powerful Hanuman protective prayer that destroys enemies and removes fear.',
  },
  'maha-mrityunjaya-mantra': {
    title: 'Maha Mrityunjaya Mantra in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read the Maha Mrityunjaya Mantra (Om Tryambakam Yajamahe, Rigveda 7.59.12) in English, Hindi, Odia and Telugu with word meaning, how and when to chant it, and a YouTube chant to follow along.',
  },
  'karpura-gauram': {
    title: 'Karpura Gauram Karunavataram in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Karpura Gauram Karunavataram, the Shiva dhyana shloka sung at aarti, in English, Hindi, Odia and Telugu with word meaning, when to recite it, and a YouTube video to follow along.',
  },
  'sarve-bhavantu-sukhinah': {
    title: 'Sarve Bhavantu Sukhinah in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Sarve Bhavantu Sukhinah, the shanti mantra for the happiness and health of all, in English, Hindi, Odia and Telugu with meaning, when to chant it, and a YouTube chant to follow along.',
  },
  'hare-krishna-maha-mantra': {
    title: 'Hare Krishna Maha Mantra in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read the Hare Krishna Hare Rama maha mantra in English, Hindi, Odia and Telugu with meaning, its source in the Kali-Santarana Upanishad, how to chant it, and a video to follow along.',
  },
  'shiva-panchakshara-stotram': {
    title: 'Shiva Panchakshara Stotram in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Shiva Panchakshara Stotram (Nagendraharaya Trilochanaya) in English, Hindi, Odia and Telugu with meaning, the five syllables Na Ma Shi Va Ya, when to recite it, and a video to follow along.',
  },
  'sahana-vavatu-mantra': {
    title: 'Om Sahana Vavatu Mantra in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Om Sahana Vavatu, the teacher and student shanti mantra from the Upanishads, in English, Hindi, Odia and Telugu with meaning, when to chant it before study, and a video to follow along.',
  },
  'indra-jimi-jambh-par': {
    title: 'Indra Jimi Jambh Par | Shivaji Maharaj Kavitt | Kavi Bhushan Poem with Meaning',
    description:
      'Read Indra Jimi Jambh Par (इंद्र जिमि जंभ पर), the immortal Kavitt by Kavi Bhushan praising Chhatrapati Shivaji Maharaj. Full poem lyrics in Hindi with English meaning. Sher Shivaraj hai! Shivaji Maharaj poem in Hindi with meaning.',
  },
};

export function getMeta(slug) {
  return STOTRAMS_INDEX.find((s) => s.slug === slug) || null;
}

export function getEnglishSeo(slug, meta) {
  return (
    SEO_COPY[slug] || {
      title: `${meta.title?.en} in English, Hindi, Odia & Telugu with Meaning`,
      description:
        meta.description?.en ||
        `Read ${meta.title?.en} in English, Hindi, Odia and Telugu with meaning, benefits and FAQs.`,
    }
  );
}

// Page title / description for each language URL. Hindi, Odia and Telugu pages get their own
// native-language titles so they can rank for searches written in those languages.
export function getStotramSeo(slug, langCode = 'en') {
  const meta = getMeta(slug);
  if (!meta) return null;
  const en = getEnglishSeo(slug, meta);
  const t = meta.title || {};
  const d = meta.description || {};

  if (langCode === 'hi') {
    return {
      title: `${t.hi} | हिंदी में पाठ और अर्थ सहित (${t.en})`,
      description: `${t.hi} (${t.en}) का पूरा पाठ देवनागरी में, अर्थ और पढ़ने की विधि सहित। ${d.hi || ''}`.trim(),
    };
  }
  if (langCode === 'od') {
    return {
      title: `${t.od} | ଓଡ଼ିଆରେ ପାଠ ଓ ଅର୍ଥ ସହିତ (${t.en})`,
      description: `${t.od} (${t.en}) ର ସମ୍ପୂର୍ଣ୍ଣ ପାଠ ଓଡ଼ିଆ ଲିପିରେ, ଅର୍ଥ ସହିତ। ${d.od || ''}`.trim(),
    };
  }
  if (langCode === 'te') {
    return {
      title: `${t.te} | తెలుగులో పాఠం మరియు అర్థంతో (${t.en})`,
      description: `${t.te} (${t.en}) పూర్తి పాఠం తెలుగు లిపిలో, అర్థంతో సహా. ${d.te || ''}`.trim(),
    };
  }
  return en;
}

export function getAlternates(slug) {
  const languages = {};
  LANGS.forEach((l) => {
    languages[l.hreflang] = stotramUrl(slug, l.code);
  });
  languages['x-default'] = stotramUrl(slug, 'en');
  return languages;
}

export { SITE_URL };
