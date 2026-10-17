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
      founder: [
        { '@type': 'Person', name: 'Subham Mohanty', jobTitle: 'Founder and Editor', sameAs: ['https://github.com/skmohanty2628'] },
        { '@type': 'Person', name: 'Aishwarya', jobTitle: 'Co-founder' },
      ],
    },
  };
  return (
    <SiteShell>
      <JsonLd data={ld} />
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-14 sm:px-6">
        <p className="font-cinzel-reg text-[11px] uppercase tracking-[5px] text-[#e8760a]">Our story</p>
        <h1 className="mt-3 font-cinzel text-4xl font-bold text-[#8b1a00]">About Divya Stotram</h1>
        <div className="mt-8">
          <Prose>
            <p>
              Divya Stotram is an independent devotional website created by Subham Mohanty and Aishwarya, from India.
              We started it because the prayers we grew up reciting were hard to find in one clean place, with the
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
              <strong>Aishwarya</strong> is the co-founder. Together we started the site because of the prayers our
              families recite, and we run it as a small independent project.
            </p>
            <p>
              We are not priests or Sanskrit scholars, and we say so plainly. Where a text, date or custom varies by
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
