import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import JsonLd from '@/components/JsonLd';
import { SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'Glossary of Hindu Devotional Terms: Mantra, Stotram, Japa, Puja and More',
  description:
    'Plain-language definitions of common terms in Hindu devotional practice: aarti, avatar, bhakti, chalisa, japa, kavacham, mala, mantra, prasad, puja, sankalpa, stotram, vrata and more.',
  alternates: { canonical: `${SITE_URL}/glossary` },
};

const TERMS = [
  ['Aarti', 'A ritual of worship in which a lit lamp is waved before an image of a deity while a devotional song is sung, usually at the end of a puja.'],
  ['Ashtakam', 'A hymn of eight verses (ashta means eight), for example the Mahalakshmi Ashtakam.'],
  ['Avatar', 'In Vaishnava tradition, the descent of Vishnu to earth in a form such as Rama or Krishna.'],
  ['Bhajan', 'A devotional song, often in a regional language, sung alone or in a group.'],
  ['Bhakti', 'Loving devotion to a personal deity, and the devotional movements and poetry that grew around it.'],
  ['Chalisa', 'A devotional poem of about forty verses (from chalis, forty), such as the Hanuman Chalisa.'],
  ['Dharma', 'A broad term for righteous conduct, duty and the natural order, understood differently across traditions.'],
  ['Diya', 'A small oil lamp lit during worship and festivals such as Diwali.'],
  ['Ekadashi', 'The eleventh day of each lunar fortnight, observed by many Vaishnavas with fasting and prayer.'],
  ['Japa', 'The quiet or silent repetition of a mantra or divine name, often counted on a mala.'],
  ['Kavacham', 'A protective prayer; the word means armour.'],
  ['Kirtan', 'Call-and-response group singing of devotional verses and divine names.'],
  ['Mala', 'A string of usually 108 beads used to count repetitions of a mantra.'],
  ['Mantra', 'A short sacred word, syllable or verse repeated for focus and devotion, such as Om Namah Shivaya.'],
  ['Meru', 'The larger bead on a mala where the string joins; practitioners turn back instead of crossing it.'],
  ['Moksha', 'Liberation from the cycle of birth and death, the ultimate aim in many Hindu traditions.'],
  ['Navaratri', 'A festival of nine nights devoted to the Goddess, observed in spring and autumn.'],
  ['Om', 'A sacred syllable placed at the start and end of many mantras and prayers.'],
  ['Panchang', 'The Hindu almanac, giving lunar days, auspicious times and festival dates.'],
  ['Prasad', 'Food offered to a deity and then shared among devotees as a blessing.'],
  ['Puja', 'Ritual worship, from a simple lamp and flower offering at home to an elaborate temple ceremony.'],
  ['Purana', 'One of a large body of ancient texts that tell the stories of deities, cosmology and sacred places.'],
  ['Sahasranama', 'A litany of a thousand names of a deity, such as the Vishnu Sahasranamam.'],
  ['Sankalpa', 'A statement of intention made at the start of a puja or vow.'],
  ['Sattvic', 'Describes pure, light, simple food and conduct, often used for fasting meals.'],
  ['Shloka', 'A verse, usually of two lines with a fixed metre, in which much Sanskrit literature is written.'],
  ['Stotram', 'A hymn of praise to a deity (also written stotra), recited or sung through rather than repeated like a mantra.'],
  ['Tulsi', 'Holy basil, a plant worshipped in many Hindu homes and especially associated with Vishnu and Krishna.'],
  ['Veda', 'The oldest body of Hindu sacred texts, composed in Sanskrit: the Rig, Yajur, Sama and Atharva Vedas.'],
  ['Visarjan', 'The immersion of a deity image in water at the end of a festival such as Ganesh Chaturthi or Durga Puja.'],
  ['Vrata', 'A vow, often involving fasting or a special observance for a period of time.'],
];

export default function GlossaryPage() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Glossary of Hindu devotional terms',
    url: `${SITE_URL}/glossary`,
    hasDefinedTerm: TERMS.map(([name, description]) => ({ '@type': 'DefinedTerm', name, description })),
  };
  return (
    <SiteShell>
      <JsonLd data={ld} />
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-14 sm:px-6">
        <p className="font-cinzel-reg text-[11px] uppercase tracking-[5px] text-[#e8760a]">Learn</p>
        <h1 className="mt-3 font-cinzel text-4xl font-bold text-[#8b1a00]">Glossary of Devotional Terms</h1>
        <p className="mt-4 text-lg text-[#3d1a00]/85">
          Short, plain definitions of words you will meet on this site and in temples. Meanings can differ between
          traditions, so treat these as a starting point. For fuller explanations, see our{' '}
          <Link href="/stotram-mantra-chalisa-aarti-difference" className="underline decoration-[#c9922a]/50">
            guide to stotram, mantra, chalisa and aarti
          </Link>{' '}
          and the <Link href="/guides" className="underline decoration-[#c9922a]/50">prayer guides</Link>.
        </p>
        <dl className="mt-10 divide-y divide-[#c9922a]/25">
          {TERMS.map(([name, desc]) => (
            <div key={name} className="py-4">
              <dt className="font-cinzel text-xl font-semibold text-[#8b1a00]">{name}</dt>
              <dd className="mt-1 text-[#3d1a00]/90">{desc}</dd>
            </div>
          ))}
        </dl>
      </div>
    </SiteShell>
  );
}
