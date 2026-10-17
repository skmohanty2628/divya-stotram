import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import JsonLd from '@/components/JsonLd';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';
import { LANG_BY_CODE, SITE_URL, stotramPath } from '@/lib/site';

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
  return (
    <SiteShell>
      <JsonLd data={ld} />
      <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6" lang={lang.htmlLang}>
        <header className="pb-8 pt-14 text-center">
          <p className="font-cinzel-reg text-[11px] uppercase tracking-[5px] text-[#e8760a]">{lang.name}</p>
          <h1 className="mt-3 font-cinzel text-3xl font-bold leading-snug text-[#8b1a00] md:text-5xl">{h1}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl leading-relaxed text-[#3d1a00]/80">{intro}</p>
          <p lang="en" className="mx-auto mt-3 max-w-2xl font-garamond text-base text-[#3d1a00]/60">
            {englishNote}
          </p>
        </header>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STOTRAMS_INDEX.map((s) => (
            <Link
              key={s.slug}
              href={stotramPath(s.slug, langCode)}
              className="group rounded-2xl border border-[#c9922a]/25 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-[#c9922a] hover:shadow-lg"
            >
              <h2 className="text-xl font-bold leading-snug text-[#8b1a00]">{s.title[langCode] || s.title.en}</h2>
              <p lang="en" className="mt-1 font-cinzel-reg text-[10px] uppercase tracking-[2px] text-[#c9922a]">
                {s.title.en}
              </p>
              <p className="mt-3 line-clamp-3 text-base leading-snug text-[#3d1a00]/70">
                {s.description[langCode] || s.description.en}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
