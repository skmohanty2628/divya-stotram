import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import JsonLd from '@/components/JsonLd';
import { getGuideCategories, GUIDES, guideReadMinutes } from '@/data/guides';
import { SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'Mantra and Prayer Guides: How to Chant, When and Why',
  description:
    'In-depth guides to Hindu mantras and prayers: how to chant Hanuman Chalisa, Gayatri and Shiva mantras, mantras for anxiety, sleep and study, Navratri worship, daily routines and honest answers to common questions.',
  alternates: { canonical: `${SITE_URL}/guides` },
};

export default function GuidesHub() {
  const categories = getGuideCategories();
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Mantra and Prayer Guides',
    url: `${SITE_URL}/guides`,
    hasPart: GUIDES.map((g) => ({ '@type': 'Article', headline: g.h1, url: `${SITE_URL}/${g.slug}` })),
  };

  return (
    <SiteShell>
      <JsonLd data={itemList} />
      <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <header className="pb-8 pt-14 text-center">
          <p className="font-cinzel-reg text-[11px] uppercase tracking-[5px] text-[#e8760a]">Learn</p>
          <h1 className="mt-3 font-cinzel text-4xl font-bold text-[#8b1a00] md:text-5xl">Prayer and Mantra Guides</h1>
          <p className="mx-auto mt-4 max-w-2xl font-garamond text-xl leading-relaxed text-[#3d1a00]/75">
            Practical, carefully written guides on how to chant, when to chant and what the prayers mean. Every guide
            names its sources and says plainly what tradition teaches and what it does not promise.
          </p>
        </header>

        {categories.map((cat) => (
          <section key={cat.name} className="mt-12">
            <div className="mb-5 flex items-center gap-4">
              <h2 className="font-cinzel text-2xl font-bold text-[#8b1a00]">{cat.name}</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-[#c9922a]/40 to-transparent" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.items.map((g) => (
                <Link
                  key={g.slug}
                  href={`/${g.slug}`}
                  className="group flex flex-col rounded-2xl border border-[#c9922a]/25 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-[#c9922a] hover:shadow-lg"
                >
                  <p className="font-cinzel text-base font-bold leading-snug text-[#8b1a00]">{g.h1}</p>
                  <p className="mt-2 line-clamp-3 flex-1 font-garamond text-base leading-snug text-[#3d1a00]/70">
                    {g.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between font-cinzel-reg text-[10px] uppercase tracking-[2px] text-[#c9922a]">
                    <span>{guideReadMinutes(g)} min read</span>
                    <span className="transition-transform group-hover:translate-x-1">Read →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </SiteShell>
  );
}
