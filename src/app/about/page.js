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
              Hello, I&apos;m Subham Mohanty, and this is my little corner of the internet for the prayers I grew up
              hearing at home. Divya Stotram started with a simple frustration: whenever I wanted a prayer, I had to
              piece it together from several places. One site had the verses, another had a rough transliteration, and
              a third had a meaning that did not quite match the words. I wanted all of it in one clean page, in the
              languages our families actually speak. These prayers were part of the sound of my home growing up, and I still
              want to understand every word I say.
            </p>
            <p>
              Today the site has {STOTRAMS_INDEX.length} stotrams and mantras, each in English, Hindi, Odia and Telugu,
              along with {GUIDES.length} guides on how, when and why people chant. Every stotram page gives you the
              verses, a transliteration, a meaning in plain language, a short article on where the prayer comes from, a
              glossary of the harder words and, for some prayers, audio.
            </p>
            <h2>Who is behind this site</h2>
            <p>
              It is just me. I build the site, prepare and check the texts, transliterations and guides, and read every
              message that comes in. By training I work in data and analytics, so I carry the same habit into this
              project: check the source, check it again, and do not publish what I cannot back up. You can write to me
              at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
            <p>
              I should be honest about one thing. I am not a priest or a Sanskrit scholar, and this site is not run by
              one. I am a devotee and a careful reader who likes getting things right. When a text, a date or a custom
              differs from one region or tradition to another, I say so on the page. And if you know better, please tell
              me. I would much rather fix a mistake than leave it standing.
            </p>
            <h2>What I promise</h2>
            <p>
              I write to help you understand a prayer, not to chase clicks. I name my sources. When tradition is unsure
              about who wrote a verse or when, I say that instead of pretending to know. And I will never tell you that a
              mantra will cure an illness or bring you money, a job or a marriage. Prayer is a personal practice, and no
              website can promise what it will do for you. The <Link href="/editorial-policy">Editorial Policy</Link>{' '}
              explains how I work, and the <Link href="/disclaimer">Disclaimer</Link> explains what this site is and is
              not.
            </p>
            <h2>How a page is made</h2>
            <p>
              Each stotram begins with the Sanskrit or Hindi text. I compare it against more than one printed or
              published edition and fix the small slips that creep in, such as a wrong vowel length or a word split in
              the wrong place. The Vishnu Sahasranamam page is a good example. I checked it line by line against several
              editions, and compared its 108 verses of the thousand names with a volunteer-proofread edition. After the
              text is settled, I add the transliteration, the meaning, a short note on the background of the prayer, a
              glossary and a few frequently asked questions.
            </p>
            <p>
              The meanings are written in my own words rather than copied from another site, and I try to stay close to
              what the verse actually says. When a verse can be read in more than one way, I give the common reading and
              mention that others exist.
            </p>
            <h2>What you will not find here</h2>
            <p>
              You will not find promises of miracle results, astrology predictions or paid blessings. I do not sell
              rituals, and I do not collect donations on behalf of any temple. The festival and temple guides give dates,
              customs and practical details, and they tell you plainly when a date changes from year to year or from one
              region to another.
            </p>
            <h2>Who the site is for</h2>
            <p>
              Anyone who wants to read, understand or learn a prayer. Maybe you learned it by ear as a child and want to
              finally see the words. Maybe you live far from home and want a transliteration to follow along with your
              family. Or maybe you have heard a famous verse a hundred times and simply wonder what it means. You do not
              need any background to use this site.
            </p>
            <h2>Why four languages</h2>
            <p>
              Hindu devotional texts travel across many languages, and people feel closest to a prayer in the script they
              grew up reading. That is why every stotram is available in English, Hindi, Odia and Telugu. Each language
              has its own page, so you can bookmark or share exactly the version you read.
            </p>
            <h2>Support and corrections</h2>
            <p>
              The site is paid for by modest advertising, which covers the cost of keeping it running. If you spot a
              mistake in a text or a translation, or you would like me to add a prayer, write to me at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or use the <Link href="/contact">contact page</Link>.
              I read every message.
            </p>
            <p>
              If you are new here, a good place to begin is the <Link href="/all-stotrams">full list of stotrams</Link>{' '}
              or the <Link href="/guides">prayer guides</Link>. Thank you for visiting.
            </p>
          </Prose>
        </div>
      </div>
    </SiteShell>
  );
}
