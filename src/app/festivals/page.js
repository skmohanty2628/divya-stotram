import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import JsonLd from '@/components/JsonLd';
import FestivalCalendar from '@/components/FestivalCalendar';
import FestivalCountdown from '@/components/FestivalCountdown';
import { FESTIVAL_DATES } from '@/data/festival-dates';
import { SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'Hindu and Odisha Festival Calendar 2026 and 2027: Dates and Guides',
  description:
    'A month-by-month calendar of major Hindu and Odisha festivals for late 2026 and 2027, from Kartika Purnima and Bali Jatra to Maha Shivaratri and Ratha Yatra, with a guide for each and an add-to-calendar button.',
  alternates: { canonical: `${SITE_URL}/festivals` },
};

export default function FestivalsPage() {
  const sorted = FESTIVAL_DATES.slice().sort((a, b) => a.date.localeCompare(b.date));
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Hindu and Odisha Festival Calendar',
    url: `${SITE_URL}/festivals`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: sorted.map((f, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `${f.name} (${f.date})`,
        url: `${SITE_URL}/${f.slug}`,
      })),
    },
  };

  return (
    <SiteShell>
      <JsonLd data={jsonLd} />
      <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <header className="pb-6 pt-14 text-center">
          <p className="font-cinzel-reg text-[11px] uppercase tracking-[5px] text-[#e8760a]">Calendar</p>
          <h1 className="mt-3 font-cinzel text-4xl font-bold text-[#8b1a00] md:text-5xl">Festival Calendar</h1>
          <p className="mx-auto mt-4 max-w-2xl font-garamond text-xl leading-relaxed text-[#3d1a00]/75">
            Major Hindu and Odisha festivals month by month, with a guide for each one. Filter for Odisha, or add any
            festival to your own calendar.
          </p>
        </header>

        <FestivalCountdown />

        <div className="mt-10">
          <FestivalCalendar />
        </div>

        <aside className="mt-12 rounded-2xl border border-[#c9922a]/30 bg-[#fffaf1] p-5">
          <p className="font-cinzel-reg text-[10px] uppercase tracking-[3px] text-[#c9922a]">About these dates</p>
          <p className="mt-2 font-garamond text-lg leading-relaxed text-[#3d1a00]/85">
            Festival dates follow the Hindu lunar calendar, so they move on the Gregorian calendar every year. The dates
            here follow the Drik Panchang calendar for India and were checked against a second source, but a tithi can
            begin on one day and end on the next, and regions sometimes observe a festival a day apart. For a vrat or
            puja, confirm the exact time with your local temple or panchang. Read{' '}
            <Link href="/editorial-policy" className="underline decoration-[#c9922a]/60">how we write and check our pages</Link>.
          </p>
        </aside>
      </div>
    </SiteShell>
  );
}
