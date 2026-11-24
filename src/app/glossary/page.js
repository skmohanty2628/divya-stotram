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
  ['Abhishekam', 'The ritual bathing of a deity image or linga with water, milk, honey or other offerings, accompanied by mantras.'],
  ['Archana', 'Worship by offering flowers or leaves while reciting the names of a deity, often one hundred and eight or a thousand names.'],
  ['Atman', 'The inner self, understood in Vedanta as ultimately one with Brahman.'],
  ['Bilva', 'The leaf of the wood-apple tree, offered to Shiva in a set of three leaflets.'],
  ['Brahman', 'The ultimate reality in the Upanishads, without form and beyond description.'],
  ['Darshan', 'The act of seeing and being seen by a deity, a holy place or a revered teacher, regarded as a blessing in itself.'],
  ['Deepam', 'A lamp, often of ghee or sesame oil, lit before a deity; the word is common in southern India and Odisha.'],
  ['Guru', 'A teacher, especially a spiritual one, who guides a student in study and practice.'],
  ['Homa', 'A fire ritual in which offerings are made into a consecrated fire while mantras are recited.'],
  ['Ishta devata', 'The deity a person chooses, or a family inherits, as the centre of personal worship.'],
  ['Kalasha', 'A pot, often of brass or copper, filled with water and topped with leaves and a coconut, used as a symbol of auspiciousness in rituals.'],
  ['Kumkum', 'A red powder, usually made from turmeric, applied as a mark on the forehead or offered to the Goddess.'],
  ['Mudra', 'A hand gesture used in worship, dance and meditation.'],
  ['Murti', 'A consecrated image or statue of a deity used in worship.'],
  ['Naivedya', 'Food offered to a deity before it is shared as prasad.'],
  ['Namaskar', 'A greeting made by folding the palms together, also used as an act of reverence.'],
  ['Phalashruti', 'The closing verses of a hymn that describe the fruit of reciting it; we treat these as part of the tradition, not as promises.'],
  ['Pradakshina', 'Walking clockwise around a shrine, a temple or a sacred object as an act of respect.'],
  ['Pradosha', 'The twilight period of the thirteenth lunar day, considered especially auspicious for worship of Shiva.'],
  ['Rudraksha', 'The seed of a tree used to make prayer beads, associated with Shiva.'],
  ['Sandhya', 'The junctures of the day, dawn, noon and dusk, traditionally used for prayer.'],
  ['Shanti', 'Peace; the word is repeated three times at the end of many Vedic prayers.'],
  ['Shraddha', 'Faith or sincere trust; also the name for rites in memory of ancestors.'],
  ['Tilak', 'A mark applied to the forehead with sandal paste, ash or powder, indicating devotion or tradition.'],
  ['Upanishad', 'One of the philosophical texts at the end of the Vedas, which explore the nature of the self and ultimate reality.'],
  ['Vahana', 'The animal or vehicle associated with a deity, such as the lion of Durga or the mouse of Ganesha.'],
  ['Vibhuti', 'Sacred ash applied to the forehead and body, especially by devotees of Shiva.'],
  ['Yantra', 'A geometric diagram used as a focus for worship and meditation.'],
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
        <p className="font-cinzel-reg text-[11px] uppercase tracking-[5px] text-[#a85200]">Learn</p>
        <h1 className="mt-3 font-cinzel text-4xl font-bold text-[#8b1a00]">Glossary of Devotional Terms</h1>
        <p className="mt-4 text-lg text-[#3d1a00]/85">
          Short, plain definitions of words you will meet on this site and in temples. Meanings can differ between
          traditions, so treat these as a starting point. For fuller explanations, see our{' '}
          <Link href="/stotram-mantra-chalisa-aarti-difference" className="underline decoration-[#c9922a]/50">
            guide to stotram, mantra, chalisa and aarti
          </Link>{' '}
          and the <Link href="/guides" className="underline decoration-[#c9922a]/50">prayer guides</Link>.
        </p>
        <h2 className="mt-12 font-cinzel text-2xl font-bold text-[#8b1a00]">How to use this glossary</h2>
        <p className="mt-3 text-[#3d1a00]/90">
          The entries are in alphabetical order. Most of the words are Sanskrit, and they are written here in a simple
          Roman spelling without diacritics, so you may see slightly different spellings elsewhere. When a word has
          several meanings in different traditions, we give the most common one and say so. If you are new to the
          vocabulary, begin with mantra, stotram, japa, puja and aarti, which cover most of the daily practice described
          on this site.
        </p>
        <h2 className="mt-12 font-cinzel text-2xl font-bold text-[#8b1a00]">Terms and definitions</h2>
        <dl className="mt-4 divide-y divide-[#c9922a]/25">
          {[...TERMS].sort((x, y) => x[0].localeCompare(y[0])).map(([name, desc]) => (
            <div key={name} className="py-4">
              <dt className="font-cinzel text-xl font-semibold text-[#8b1a00]">{name}</dt>
              <dd className="mt-1 text-[#3d1a00]/90">{desc}</dd>
            </div>
          ))}
        </dl>
        <h2 className="mt-12 font-cinzel text-2xl font-bold text-[#8b1a00]">A note on spelling and meaning</h2>
        <p className="mt-3 text-[#3d1a00]/90">
          Hindu practice is not a single rulebook. A word such as puja can mean a five minute lamp offering in one home
          and a day-long ritual in another. Regional spellings also differ: Odia, Telugu, Hindi and Sanskrit sources may
          write the same word differently. Treat these definitions as a friendly starting point, and when you want a
          precise ritual meaning, ask a teacher or a knowledgeable elder in your own tradition.
        </p>
      </div>
    </SiteShell>
  );
}
