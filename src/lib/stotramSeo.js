import { STOTRAMS_INDEX } from '@/data/stotrams-index';
import { stotramUrl, LANGS, SITE_URL } from '@/lib/site';

const SEO_COPY = {
  'hanuman-chalisa': {
    title: 'Hanuman Chalisa in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Hanuman Chalisa in English, Hindi, Odia and Telugu with meaning, lyrics, benefits, best time to chant and FAQs. Hanuman Chalisa full path with meaning, Jai Hanuman Gyan Gun Sagar.',
  },
  'shiva-tandav': {
    title: 'Shiv Tandav Stotram Lyrics in English with Meaning | Hindi, Odia, Telugu',
    description:
      'Shiv Tandav Stotram lyrics in English (Jatatavi Galajjala), with meaning, the tradition that Ravana composed it, how to chant it and FAQs. Also in Hindi, Odia and Telugu script.',
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
    title: 'Aigiri Nandini Lyrics in English with Meaning | Hindi, Odia, Telugu',
    description:
      'Aigiri Nandini (Ayi Giri Nandini, Mahishasura Mardini Stotram) full lyrics in English with meaning, plus Hindi, Odia and Telugu script. Navratri prayer to Goddess Durga, verse by verse.',
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
    title: 'Ram Raksha Stotra Lyrics in English with Meaning | Hindi, Odia, Telugu',
    description:
      'Ram Raksha Stotra (Shri Rama Raksha Stotram) lyrics in English with meaning, how and when to chant it, and FAQs. Also in Hindi, Odia and Telugu script, with a video to follow.',
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
    title: 'Bajrang Baan Lyrics in English with Meaning | Hindi, Odia, Telugu',
    description:
      'Bajrang Baan lyrics in English (Nishchay Prem Prateeti Te) with meaning, when it is recited and FAQs. Hanuman prayer also in Hindi, Odia and Telugu script, with a video.',
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
  'vakratunda-mahakaya-mantra': {
    title: 'Vakratunda Mahakaya Mantra in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Vakratunda Mahakaya Suryakoti Samaprabha, the Ganesha shloka for removing obstacles, in English, Hindi, Odia and Telugu with meaning, when to chant it before a new task, and a video to follow along.',
  },
  'shuklambaradharam-mantra': {
    title: 'Shuklambaradharam Vishnum Mantra in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Shuklambaradharam Vishnum Shashivarnam Chaturbhujam, the dhyana shloka for removing obstacles, in English, Hindi, Odia and Telugu with meaning, when to chant it before a puja, and a video to follow along.',
  },
  'asato-ma-sadgamaya': {
    title: 'Asato Ma Sadgamaya Mantra in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Asato Ma Sadgamaya (असतो मा सद्गमय), the Brihadaranyaka Upanishad prayer for truth, light and immortality, in English, Hindi, Odia and Telugu with meaning, when to chant it, and a video to follow along.',
  },
  'om-jai-jagdish-hare-aarti': {
    title: 'Om Jai Jagdish Hare Aarti Lyrics in Hindi, Odia, Telugu & English with Meaning',
    description:
      'Read Om Jai Jagdish Hare (ॐ जय जगदीश हरे), the Vishnu aarti, with all eight stanzas in Hindi, Odia, Telugu and English script, meaning in four languages, and a video to sing along.',
  },
  'karagre-vasate-lakshmi': {
    title: 'Karagre Vasate Lakshmi Mantra in English, Hindi, Odia & Telugu with Meaning',
    description:
      'Read Karagre Vasate Lakshmi (कराग्रे वसते लक्ष्मीः), the Kara Darshan morning verse, in English, Hindi, Odia and Telugu with meaning, when to say it, and a video to follow along.',
  },
  'lingashtakam': {
    title: 'Lingashtakam Lyrics in English, Hindi, Odia & Telugu with Meaning (Brahma Murari Surarchita Lingam)',
    description:
      'Read Lingashtakam (लिङ्गाष्टकम्), Brahma Murari Surarchita Lingam, all eight verses and the closing verse in English, Hindi, Odia and Telugu with meaning, when to chant it, and a video to follow along.',
  },
  'jagannath-ashtakam': {
    title: 'Jagannath Ashtakam Lyrics in English, Hindi, Odia & Telugu with Meaning (Kadachit Kalindi)',
    description:
      'Read Jagannath Ashtakam (जगन्नाथाष्टकम्), Kadachit Kalindi Tata Vipine, all eight verses and the closing verse in English, Hindi, Odia and Telugu with meaning, when it is recited, and a video to follow along.',
  },
  'krishnashtakam': {
    title: 'Krishnashtakam Lyrics in English, Hindi, Odia & Telugu with Meaning (Vasudeva Sutam Devam)',
    description:
      'Read Krishnashtakam (कृष्णाष्टकम्), Vasudeva Sutam Devam Kamsa Chanura Mardanam, all eight verses and the closing verse in English, Hindi, Odia and Telugu with meaning, when it is sung, and a video to follow along.',
  },
  'sankat-mochan-hanuman-ashtak': {
    title: 'Sankat Mochan Hanuman Ashtak Lyrics in English, Hindi, Odia & Telugu with Meaning (Bal Samay Ravi Bhakshi Liyo)',
    description:
      'Read Sankat Mochan Hanuman Ashtak (संकट मोचन हनुमान अष्टक), Bal Samay Ravi Bhakshi Liyo Tab, all eight verses and the closing doha in English, Hindi, Odia and Telugu with meaning, when it is recited, and a video to chant along.',
  },
  'shantakaram-bhujagashayanam': {
    title: 'Shantakaram Bhujagashayanam Lyrics in English, Hindi, Odia & Telugu with Meaning (Vishnu Dhyana Shloka)',
    description:
      'Read Shantakaram Bhujagashayanam (शान्ताकारं भुजगशयनं), the four-line Vishnu dhyana shloka, in English, Hindi, Odia and Telugu with meaning, when it is recited, and a video to follow along.',
  },
  'guru-brahma-guru-vishnu': {
    title: 'Guru Brahma Guru Vishnu Lyrics in English, Hindi, Odia & Telugu with Meaning (Guru Shloka)',
    description:
      'Read Guru Brahma Guru Vishnu (गुरुर्ब्रह्मा गुरुर्विष्णुः), the Sanskrit guru shloka, in English, Hindi, Odia and Telugu with meaning, when it is recited, and a video to follow along.',
  },
  'purnamadah-purnamidam': {
    title: 'Om Purnamadah Purnamidam Lyrics in English, Hindi, Odia & Telugu with Meaning (Shanti Mantra)',
    description:
      'Read Om Purnamadah Purnamidam (ॐ पूर्णमदः पूर्णमिदं), the peace mantra of the Isha Upanishad, in English, Hindi, Odia and Telugu with meaning, when it is recited, and a video to follow along.',
  },
  'brahmarpanam-brahma-havir': {
    title: 'Brahmarpanam Brahma Havir Lyrics in English, Hindi, Odia & Telugu with Meaning (Bhojan Mantra)',
    description:
      'Read Brahmarpanam Brahma Havir (ब्रह्मार्पणं ब्रह्म हविः), Bhagavad Gita 4.24, the food prayer said before meals, in English, Hindi, Odia and Telugu with meaning, when it is recited, and a video to follow along.',
  },
  'manojavam-marutatulyavegam': {
    title: 'Manojavam Marutatulyavegam Lyrics in English, Hindi, Odia & Telugu with Meaning (Hanuman Mantra)',
    description:
      'Read Manojavam Marutatulyavegam (मनोजवं मारुततुल्यवेगं), the Hanuman prayer to Rama\'s messenger, in English, Hindi, Odia and Telugu with meaning, when to chant it, and a video to follow along.',
  },
  'shri-ramachandra-kripalu': {
    title: 'Shri Ramachandra Kripalu Bhajman Lyrics in English, Hindi, Odia & Telugu with Meaning (Ram Stuti)',
    description:
      'Read Shri Ramachandra Kripalu Bhajman (श्री रामचन्द्र कृपालु भज मन), the Ram Stuti attributed to Tulsidas, in English, Hindi, Odia and Telugu with meaning, when it is sung, and a video to follow along.',
  },
  'kalabhairava-ashtakam': {
    title: 'Kalabhairava Ashtakam Lyrics in English, Hindi, Odia & Telugu with Meaning (Deva Raja Sevyamana)',
    description:
      'Read Kalabhairava Ashtakam (देवराजसेव्यमान), the hymn to Kalabhairava of Kashi traditionally credited to Adi Shankara, in English, Hindi, Odia and Telugu with meaning, a note on when it is recited and a video.',
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
      title: `${t.en} Lyrics in Hindi | ${t.hi} हिंदी में पाठ और अर्थ`,
      description: `${t.en} lyrics in Hindi (Devanagari) with meaning. ${t.hi} का पूरा पाठ देवनागरी में, अर्थ और पढ़ने की विधि सहित। ${d.hi || ''}`.trim(),
    };
  }
  if (langCode === 'od') {
    return {
      title: `${t.en} Lyrics in Odia | ${t.od} ଓଡ଼ିଆ ପାଠ ଓ ଅର୍ଥ`,
      description: `${t.en} lyrics in Odia script with meaning, to read and chant. ${t.od} ର ସମ୍ପୂର୍ଣ୍ଣ ପାଠ ଓଡ଼ିଆ ଲିପିରେ, ଅର୍ଥ ସହିତ। ${d.od || ''}`.trim(),
    };
  }
  if (langCode === 'te') {
    return {
      title: `${t.en} Lyrics in Telugu | ${t.te} తెలుగు పాఠం మరియు అర్థం`,
      description: `${t.en} lyrics in Telugu script with meaning. ${t.te} పూర్తి పాఠం తెలుగు లిపిలో, అర్థంతో సహా. ${d.te || ''}`.trim(),
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
