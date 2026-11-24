import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import JsonLd from '@/components/JsonLd';
import { Prose } from '@/components/StotramSections';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';
import { GUIDES } from '@/data/guides';
import { SITE_URL, SITE_NAME, CONTACT_EMAIL } from '@/lib/site';

export default function AboutPage() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${SITE_NAME}`,
    url: `${SITE_URL}/about`,
    mainEntity: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      email: CONTACT_EMAIL,
      founder: { '@type': 'Person', name: 'Subham Mohanty', jobTitle: 'Founder and Editor', sameAs: ['https://github.com/skmohanty2628'] },
    },
  };
  return (
    <SiteShell>
      <JsonLd data={ld} />
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-14 sm:px-6">
        <p className="font-cinzel-reg text-[11px] uppercase tracking-[5px] text-[#a85200]">Our story</p>
        <h1 className="mt-3 font-cinzel text-4xl font-bold text-[#8b1a00]">About Divya Stotram</h1>
        <div className="mt-8">
          <Prose>
            <p>
              Divya Stotram is an independent devotional website created by Subham Mohanty, from India.
              He started it because the prayers we grew up reciting were hard to find in one clean place, with the
              original text, an accurate transliteration and a meaning that an ordinary reader could follow, in the
              languages our families actually speak.
            </p>
            <p>
              Today the site carries {STOTRAMS_INDEX.length} stotrams and mantras, each available in English, Hindi,
              Odia and Telugu, and {GUIDES.length} practical guides on how, when and why people chant. Each stotram page
              includes the verses, transliteration, a plain-language meaning, an original article on the prayer's
              background, a glossary of key terms and, where available, audio.
            </p>
            <h2>Who is behind this site</h2>
            <p>
              <strong>Subham Mohanty</strong> is the founder and editor. He builds and maintains the site, prepares and
              checks the texts, transliterations and guides, and answers reader messages. He is a data and analytics
              professional by training, and brings the same habit of checking sources and numbers to devotional content.
              He can be reached at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
            <p>
              The site is not run by priests or Sanskrit scholars, and we say so plainly. Where a text, date or custom varies by
              region or tradition, we say that too, and we welcome corrections from readers who know better.
            </p>
            <h2>What we promise</h2>
            <p>
              We write for understanding, not for traffic. We name our sources, we say when the tradition is unsure
              about authorship or dating, and we do not promise results. Prayer is a personal practice; we will never
              tell you a mantra will cure an illness or guarantee money, a job or a marriage. Our{' '}
              <Link href="/editorial-policy">Editorial Policy</Link> explains how we work, and our{' '}
              <Link href="/disclaimer">Disclaimer</Link> explains the limits of what this site is.
            </p>
            <h2>How a page is made</h2>
            <p>
              Every stotram page starts with the Sanskrit or Hindi text. We compare it with more than one printed or
              published edition, and we correct slips such as a wrong vowel length or a split word. For example, the
              Vishnu Sahasranamam page was checked line by line against several editions, and its 108 verses of the
              thousand names were compared with a volunteer-proofread edition of the text. We then add a transliteration,
              a plain-language meaning, a short article on the background of the prayer, a glossary of key words and
              frequently asked questions.
            </p>
            <p>
              Meanings are written in our own words rather than copied from another site, and we try to keep each
              explanation close to what the verse actually says. When a verse can be read in more than one way, we give
              the common reading and say that others exist.
            </p>
            <h2>What you will not find here</h2>
            <p>
              You will not find promises of miracle results, astrology predictions, or paid blessings. We do not sell
              rituals or ask for donations on behalf of any temple. The guides on festivals and temples give dates,
              customs and practical information, and they say plainly when dates change from year to year or between regions.
            </p>
            <h2>Who the site is for</h2>
            <p>
              The site is for anyone who wants to read, understand or learn a prayer: a student who learned it by ear
              and wants to see the words, a family member abroad who wants a transliteration to follow, or a reader who
              is curious about what a well-known verse means. You do not need any background to use it.
            </p>
            <h2>Languages</h2>
            <p>
              Hindu devotional texts are shared across many languages. We offer every stotram in English, Hindi, Odia
              and Telugu so that readers can follow along in the script they find most natural. Each language has its own
              page, so you can bookmark and share exactly the version you read.
            </p>
            <h2>Support and corrections</h2>
            <p>
              The site is funded by modest advertising. If you notice a mistake in a text or translation, or want us to
              add a prayer, write to us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or use the{' '}
              <Link href="/contact">contact page</Link>. We read every message.
            </p>
            <p>
              Begin with the <Link href="/all-stotrams">full list of stotrams</Link> or the{' '}
              <Link href="/guides">prayer guides</Link>.
            </p>
          </Prose>
        </div>
      </div>
    </SiteShell>
  );
}
