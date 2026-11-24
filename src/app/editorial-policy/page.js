import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import { SITE_URL, CONTACT_EMAIL, CONTENT_UPDATED } from '@/lib/site';
import { Prose } from '@/components/StotramSections';

export const metadata = {
  title: 'Editorial Policy: How Divya Stotram Creates and Checks Its Content',
  description:
    'How Divya Stotram sources, writes, reviews and corrects its prayers, translations and guides, and how we handle health, financial and religious claims.',
  alternates: { canonical: `${SITE_URL}/editorial-policy` },
};

const SECTIONS = [
  {
    h: 'What we publish',
    p: [
      `Divya Stotram publishes the text of Hindu prayers, stotrams and mantras, with transliteration and meaning in English, Hindi, Odia and Telugu, together with original explanatory articles and practical guides. We write for readers who want to understand what they are reciting, not only to find words to copy.`,
    ],
  },
  {
    h: 'Where the texts come from',
    p: [
      `The prayers on this site are traditional texts that have been recited for centuries. We prepare each page from widely used printed editions and compare variant readings where they exist. Where traditions differ on wording, authorship or dating, we say so on the page rather than presenting one version as the only one. For example, the authorship of Aigiri Nandini and Bajrang Baan is traditionally given but not documented, and our pages say that plainly.`,
      `Scripts for Odia and Telugu are produced from the Devanagari and transliterated text and are reviewed for readability. Language is a living matter and mistakes can happen. If you see one, please tell us.`,
    ],
  },
  {
    h: 'How our guides are written',
    p: [
      `Each guide begins with a question readers genuinely ask, such as how to chant, when to chant, or what a prayer means. We write from the primary texts where possible, name them in a Sources section, and distinguish clearly between three things: what the text says, what the tradition teaches, and what practitioners report. We do not copy guides from other sites, and we do not publish template pages with the keyword swapped.`,
    ],
  },
  {
    h: 'How we treat health, money and other claims',
    p: [
      `Devotional practice is offered as support for the spirit, never as a cure or a guarantee. We do not claim that any mantra treats a disease, repays a debt or secures a job, a marriage or a result. Where a page touches on health, mental health, money or safety, we say plainly that readers should seek qualified professional help and give relevant helpline information. Statements about benefits are framed as the beliefs of the tradition or the reports of devotees.`,
    ],
  },
  {
    h: 'How we check a text',
    p: [
      `Checking a prayer means comparing it, word by word, with other versions. For longer texts we compare the Devanagari with several editions, note where they disagree, and choose the reading that is most widely printed while keeping the others in mind. Differences that are only spelling or sandhi choices, such as how two words are joined, do not change the meaning and we follow the most common form.`,
      `Transliteration is generated from the checked text and then read through for obvious errors. Odia and Telugu scripts are produced from the Devanagari text. Because we are not native scholars of every script, we ask readers who are to tell us about mistakes, and we correct what they report.`,
    ],
  },
  {
    h: 'How we write meanings and articles',
    p: [
      `Each meaning and article is written for this site in plain language. We do not copy translations from other websites. We look at the primary text, at a recognised commentary where one exists, and at reliable reference works, and then we write what the verse says in our own words.`,
      `We separate fact from belief. If a page says that a hymn comes from a Purana, that is stated as the tradition's account unless we can point to the text. We avoid dates and authorship claims that we cannot support, and say so when a question is unsettled.`,
    ],
  },
  {
    h: 'Festival and temple information',
    p: [
      `Festival dates follow the Hindu lunar calendar and can differ by a day between regions and almanacs, so we give the date as published for the year and advise readers to confirm it with a local temple or panchang. Temple pages give practical information that can change, such as timings, so please check with the temple before travelling.`,
    ],
  },
  {
    h: 'Respect for the tradition',
    p: [
      `Hindu practice is diverse. Families and lineages differ on rituals, days, counts and even wording. We aim to present the mainstream range of practice respectfully and without insisting that one way is the only way. We are an educational site and not a religious authority; for initiation, vows or complex rituals, please consult a qualified teacher.`,
    ],
  },
  {
    h: 'Corrections and updates',
    p: [
      `We update pages when we find errors or learn something better, and each guide shows the date it was last reviewed. To report a mistake in a text, translation or explanation, email ${CONTACT_EMAIL} or use the contact form. We acknowledge corrections and fix verified errors promptly.`,
      `This policy was last reviewed on ${CONTENT_UPDATED}.`,
    ],
  },
  {
    h: 'Advertising and independence',
    p: [
      `Divya Stotram may show advertising from Google AdSense to support the cost of running the site. Advertising never influences what we write, and ads are always labelled and kept apart from the text of prayers.`,
    ],
  },
];

export default function EditorialPolicyPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-14 sm:px-6">
        <p className="font-cinzel-reg text-[11px] uppercase tracking-[5px] text-[#a85200]">Our standards</p>
        <h1 className="mt-3 font-cinzel text-4xl font-bold text-[#8b1a00]">Editorial Policy</h1>
        <p className="mt-4 font-garamond text-xl leading-relaxed text-[#3d1a00]/80">
          How we source, write, review and correct what we publish.
        </p>
        {SECTIONS.map((s) => (
          <section key={s.h} className="mt-10">
            <h2 className="mb-3 font-cinzel text-2xl font-bold text-[#8b1a00]">{s.h}</h2>
            <Prose>
              {s.p.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </Prose>
          </section>
        ))}
        <p className="mt-12 font-garamond text-lg text-[#3d1a00]/75">
          Read more <Link href="/about" className="underline decoration-[#c9922a]">about Divya Stotram</Link> or{' '}
          <Link href="/contact" className="underline decoration-[#c9922a]">contact us</Link>.
        </p>
      </div>
    </SiteShell>
  );
}
