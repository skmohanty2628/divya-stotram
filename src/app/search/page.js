import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';
import { GUIDES } from '@/data/guides';

export const metadata = {
  title: 'Search stotrams and guides',
  description: 'Search every stotram, mantra and prayer guide on Divya Stotram.',
  robots: { index: false, follow: true },
};

const norm = (t) => String(t || '').toLowerCase();

function run(q) {
  const terms = norm(q).split(/\s+/).filter(Boolean);
  if (!terms.length) return { stotrams: [], guides: [] };
  const hit = (text) => terms.every((t) => text.includes(t));
  const stotrams = STOTRAMS_INDEX.filter((s) =>
    hit(norm([s.title.en, s.title.hi, s.title.od, s.title.te, s.deity, s.description.en, s.slug].join(' ')))
  );
  const guides = GUIDES.filter((g) => hit(norm([g.h1, g.title, g.description, g.category, g.slug].join(' '))));
  return { stotrams, guides };
}

export default async function SearchPage({ searchParams }) {
  const sp = await searchParams;
  const q = String((Array.isArray(sp?.q) ? sp.q[0] : sp?.q) || '').slice(0, 80).trim();
  const { stotrams, guides } = run(q);
  const total = stotrams.length + guides.length;

  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-12 sm:px-6">
        <h1 className="font-cinzel text-3xl font-bold text-[#8b1a00]">Search</h1>
        <form action="/search" method="get" role="search" className="mt-5 flex gap-2">
          <label htmlFor="q" className="sr-only">Search stotrams and guides</label>
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Try hanuman, sleep, diwali or lakshmi"
            className="min-w-0 flex-1 rounded-full border border-[#c9922a]/50 bg-white px-5 py-3 font-garamond text-lg text-[#1a0a00] outline-none focus:border-[#8b1a00]"
          />
          <button type="submit" className="rounded-full bg-[#8b1a00] px-6 font-cinzel-reg text-xs uppercase tracking-[2px] text-white hover:bg-[#a82300]">
            Search
          </button>
        </form>

        {q && (
          <p className="mt-6 font-garamond text-lg text-[#3d1a00]/75">
            {total ? `${total} result${total === 1 ? '' : 's'} for "${q}"` : `No results for "${q}". Try a shorter word, such as a deity name or a topic like sleep or anxiety.`}
          </p>
        )}

        {stotrams.length > 0 && (
          <section className="mt-8">
            <h2 className="font-cinzel text-xl font-bold text-[#8b1a00]">Stotrams and mantras</h2>
            <ul className="mt-3 grid gap-3">
              {stotrams.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className="block rounded-2xl border border-[#c9922a]/25 bg-white p-4 transition hover:border-[#c9922a] hover:shadow-md">
                    <span className="block font-cinzel text-base font-bold text-[#8b1a00]">{s.title.en}</span>
                    <span className="block font-garamond text-sm text-[#3d1a00]/70">{s.deity} · {s.verseCount} verses</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {guides.length > 0 && (
          <section className="mt-8">
            <h2 className="font-cinzel text-xl font-bold text-[#8b1a00]">Guides</h2>
            <ul className="mt-3 grid gap-3">
              {guides.slice(0, 30).map((g) => (
                <li key={g.slug}>
                  <Link href={`/${g.slug}`} className="block rounded-2xl border border-[#c9922a]/25 bg-white p-4 transition hover:border-[#c9922a] hover:shadow-md">
                    <span className="block font-cinzel text-base font-bold text-[#8b1a00]">{g.h1}</span>
                    <span className="mt-1 line-clamp-2 block font-garamond text-sm text-[#3d1a00]/70">{g.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {!q && (
          <p className="mt-8 font-garamond text-lg text-[#3d1a00]/75">
            Or browse <Link href="/all-stotrams" className="text-[#8b1a00] underline">all stotrams</Link> and{' '}
            <Link href="/guides" className="text-[#8b1a00] underline">all guides</Link>.
          </p>
        )}
      </div>
    </SiteShell>
  );
}
