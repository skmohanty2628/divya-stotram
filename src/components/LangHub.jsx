import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import JsonLd from '@/components/JsonLd';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';
import { SubscribeInline } from '@/components/SubscribeWidget';
import { LANG_BY_CODE, SITE_URL, stotramPath } from '@/lib/site';

const HUBS = [
  ['en', 'English', '/all-stotrams'],
  ['hi', 'हिन्दी', '/hindi-stotras'],
  ['od', 'ଓଡ଼ିଆ', '/odia-stotras'],
  ['te', 'తెలుగు', '/telugu-stotras'],
];

// Language landing page: lists every stotram in one language, with native-script headings so it can
// rank for searches written in that language (for example "aigiri nandini lyrics odia").
export default function LangHub({ langCode, h1, intro, englishNote, hubPath }) {
  const lang = LANG_BY_CODE[langCode];
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: h1,
    url: `${SITE_URL}${hubPath}`,
    inLanguage: lang.hreflang,
    hasPart: STOTRAMS_INDEX.map((s) => ({
      '@type': 'Article',
      headline: s.title[langCode] || s.title.en,
      url: `${SITE_URL}${stotramPath(s.slug, langCode)}`,
    })),
  };
  const groups = [];
  STOTRAMS_INDEX.forEach((s) => {
    const d = s.deity.split(' / ')[0];
    let g = groups.find((x) => x[0] === d);
    if (!g) { g = [d, []]; groups.push(g); }
    g[1].push(s);
  });
  return (
    <SiteShell>
      <JsonLd data={ld} />
      <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6" lang={lang.htmlLang}>
        <header className="pb-8 pt-14 text-center">
          <p className="font-cinzel-reg text-[11px] uppercase tracking-[5px] text-[#a85200]">{lang.name}</p>
          <h1 className="mt-3 font-cinzel text-3xl font-bold leading-snug text-[#8b1a00] md:text-5xl">{h1}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl leading-relaxed text-[#3d1a00]/80">{intro}</p>
          <p lang="en" className="mx-auto mt-3 max-w-2xl font-garamond text-base text-[#3d1a00]/60">
            {englishNote}
          </p>
        </header>
        <nav aria-label="Other languages" lang="en" className="mb-8 flex flex-wrap items-center justify-center gap-2">
          <span className="font-cinzel-reg text-[10px] uppercase tracking-[2px] text-[#8a5f00]">Also in</span>
          {HUBS.filter(([c]) => c !== langCode).map(([c, label, href]) => (
            <Link key={c} href={href} className="rounded-full border border-[#c9922a]/40 bg-white px-4 py-1.5 text-base text-[#8b1a00] transition-colors hover:border-[#c9922a] hover:bg-[#fff1d1]">
              {label}
            </Link>
          ))}
        </nav>
        {groups.map(([deity, list]) => (
          <section key={deity} aria-label={deity} className="mb-10">
            <div className="mb-4 flex items-center gap-4">
              <h2 lang="en" className="font-cinzel text-xl font-bold text-[#8b1a00]">{deity}</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-[#c9922a]/40 to-transparent" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((s) => (
                <Link
                  key={s.slug}
                  href={stotramPath(s.slug, langCode)}
                  className="group rounded-2xl border border-[#c9922a]/25 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-[#c9922a] hover:shadow-lg"
                >
                  <h3 className="text-xl font-bold leading-snug text-[#8b1a00]">{s.title[langCode] || s.title.en}</h3>
                  <p lang="en" className="mt-1 font-cinzel-reg text-[10px] uppercase tracking-[2px] text-[#8a5f00]">
                    {s.title.en} · {s.verseCount} verses
                  </p>
                  <p className="mt-3 line-clamp-3 text-base leading-snug text-[#3d1a00]/70">
                    {s.description[langCode] || s.description.en}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
        <div lang="en" className="mx-auto max-w-3xl">
          <SubscribeInline variant="compact" />
          <p className="text-center font-garamond text-base text-[#3d1a00]/70">
            Looking for how and when to chant? Read the <Link href="/guides" className="text-[#8b1a00] underline">prayer and mantra guides</Link> or see the{' '}
            <Link href="/festivals" className="text-[#8b1a00] underline">festival calendar</Link>.
          </p>
        </div>
      </div>
    </SiteShell>
  );
}
