import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import JsonLd from '@/components/JsonLd';
import { TEMPLES } from '@/data/temples';
import { commonsUrl } from '@/data/festival-photos';
import { SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'Temples of India: History, How to Visit, Best Time and Packing Lists',
  description:
    'Detailed guides to the great temples of India: history and legend, registration and booking, best time to visit, how to reach, what to see, eat and buy, and what to pack.',
  alternates: { canonical: `${SITE_URL}/temples` },
  // Kept out of search until the section has enough guides to stand on its own.
  robots: { index: false, follow: true },
};

export default function TemplesHub() {
  const list = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Temples of India',
    url: `${SITE_URL}/temples`,
    hasPart: TEMPLES.map((t) => ({ '@type': 'Article', headline: t.h1, url: `${SITE_URL}/temples/${t.slug}` })),
  };
  return (
    <SiteShell>
      <JsonLd data={list} />
      <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <header className="pb-8 pt-14 text-center">
          <p className="font-cinzel-reg text-[11px] uppercase tracking-[5px] text-[#a85200]">Pilgrimage</p>
          <h1 className="mt-3 font-cinzel text-4xl font-bold text-[#8b1a00] md:text-5xl">Temples of India</h1>
          <p className="mx-auto mt-4 max-w-2xl font-garamond text-xl leading-relaxed text-[#3d1a00]/75">
            Each temple guide covers the legend and history, registration and booking, the best months, the route,
            what to see, eat and buy, and a packing list for men, women, kids and elders.
          </p>
        </header>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLES.map((t) => (
            <Link key={t.slug} href={`/temples/${t.slug}`} className="group overflow-hidden rounded-2xl border border-[#c9922a]/25 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-[#c9922a] hover:shadow-lg">
              {t.photos[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={commonsUrl(t.photos[0].file, 800)} alt={t.photos[0].alt} loading="lazy" className="h-48 w-full object-cover" />
              )}
              <div className="p-5">
                <p className="font-cinzel-reg text-[10px] uppercase tracking-[2px] text-[#a85200]">{t.state} · {t.kind}</p>
                <h2 className="mt-1 font-cinzel text-lg font-bold leading-snug text-[#8b1a00]">{t.name}</h2>
                <p className="mt-2 line-clamp-3 font-garamond text-base leading-snug text-[#3d1a00]/70">{t.description}</p>
                <span className="mt-3 inline-block font-cinzel-reg text-[11px] uppercase tracking-widest text-[#8a5f00] transition-all group-hover:translate-x-1">Read guide →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
