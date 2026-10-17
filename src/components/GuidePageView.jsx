import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import SiteShell from '@/components/SiteShell';
import AdSlot from '@/components/AdSlot';
import { FaqList, Prose, Card } from '@/components/StotramSections';
import { SubscribeInline } from '@/components/SubscribeWidget';
import { GUIDES, GUIDES_UPDATED, getGuideBySlug, guideReadMinutes } from '@/data/guides';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';
import { SITE_URL, SITE_NAME } from '@/lib/site';

const idFor = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);

export default function GuidePageView({ slug }) {
  const guide = getGuideBySlug(slug);
  if (!guide) return null;

  const url = `${SITE_URL}/${guide.slug}`;
  const mins = guideReadMinutes(guide);
  const relatedStotrams = (guide.related?.stotrams || [])
    .map((s) => STOTRAMS_INDEX.find((x) => x.slug === s))
    .filter(Boolean);
  const relatedGuides = (guide.related?.guides || []).map(getGuideBySlug).filter(Boolean);
  const sameCategory = GUIDES.filter((g) => g.category === guide.category && g.slug !== guide.slug).slice(0, 3);

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.h1,
    description: guide.description,
    url,
    image: `${SITE_URL}/og-image.png`,
    inLanguage: 'en',
    datePublished: '2026-04-08',
    dateModified: GUIDES_UPDATED,
    author: { '@type': 'Organization', name: `${SITE_NAME} Editorial Team`, url: `${SITE_URL}/about` },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/android-chrome-512x512.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guides` },
      { '@type': 'ListItem', position: 3, name: guide.h1, item: url },
    ],
  };
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <SiteShell>
      <JsonLd data={article} />
      <JsonLd data={breadcrumb} />
      <JsonLd data={faq} />

      <div className="mx-auto max-w-4xl px-4 pb-24 sm:px-6">
        <nav aria-label="Breadcrumb" className="pt-6 text-sm font-garamond text-[#8b1a00]/70">
          <Link href="/" className="hover:text-[#8b1a00]">Home</Link>
          <span className="mx-2 text-[#c9922a]">›</span>
          <Link href="/guides" className="hover:text-[#8b1a00]">Guides</Link>
          <span className="mx-2 text-[#c9922a]">›</span>
          <span className="text-[#3d1a00]/85">{guide.category}</span>
        </nav>

        <header className="pb-6 pt-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9922a]" />
            <span className="font-cinzel-reg text-[11px] uppercase tracking-[4px] text-[#e8760a]">{guide.category}</span>
          </div>
          <h1 className="font-cinzel text-3xl font-bold leading-tight text-[#8b1a00] md:text-5xl">{guide.h1}</h1>
          <p className="mt-5 font-garamond text-xl leading-relaxed text-[#3d1a00]/85">{guide.intro}</p>
          <p className="mt-5 font-cinzel-reg text-[10px] uppercase tracking-[2px] text-[#3d1a00]/50">
            By the Divya Stotram editorial team · Updated {GUIDES_UPDATED} · {mins} min read ·{' '}
            <Link href="/editorial-policy" className="underline decoration-[#c9922a]/50">How we write</Link>
          </p>
        </header>

        <nav aria-label="Contents" className="rounded-2xl border border-[#c9922a]/25 bg-[#fffaf1] p-5">
          <p className="font-cinzel-reg text-[10px] uppercase tracking-[3px] text-[#c9922a]">In this guide</p>
          <ol className="mt-3 grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
            {guide.sections.map((s, i) => (
              <li key={s.h} className="font-garamond text-lg">
                <a href={`#${idFor(s.h)}`} className="text-[#8b1a00] hover:underline">
                  <span className="mr-2 text-[#c9922a]">{i + 1}.</span>
                  {s.h}
                </a>
              </li>
            ))}
            <li className="font-garamond text-lg">
              <a href="#faq" className="text-[#8b1a00] hover:underline">
                <span className="mr-2 text-[#c9922a]">{guide.sections.length + 1}.</span>Frequently asked questions
              </a>
            </li>
          </ol>
        </nav>

        <article>
          {guide.sections.map((s, i) => (
            <div key={s.h}>
              <section id={idFor(s.h)} className="scroll-mt-24 pt-10">
                <h2 className="mb-4 font-cinzel text-2xl font-bold text-[#8b1a00]">{s.h}</h2>
                <Prose>
                  {s.p.map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                </Prose>
              </section>
              {i === 1 && <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE} />}
            </div>
          ))}
        </article>

        {!!relatedStotrams.length && (
          <section className="mt-12 rounded-2xl border border-[#c9922a]/25 bg-gradient-to-br from-[#fff7e8] to-[#fff1d1] p-6">
            <h2 className="font-cinzel text-xl font-bold text-[#8b1a00]">Read and chant the prayers mentioned here</h2>
            <p className="mt-1 font-garamond text-base text-[#3d1a00]/70">
              Full text with transliteration and meaning in English, Hindi, Odia and Telugu.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {relatedStotrams.map((s) => (
                <Link
                  key={s.slug}
                  href={`/${s.slug}`}
                  className="flex items-center gap-4 rounded-xl border border-[#c9922a]/25 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-[#c9922a] hover:shadow-md"
                >
                  <span className="text-3xl">{s.deityEmoji && s.deityEmoji.length <= 4 ? s.deityEmoji : '🕉️'}</span>
                  <span>
                    <span className="block font-cinzel text-base font-bold text-[#8b1a00]">{s.title.en}</span>
                    <span className="block font-garamond text-sm text-[#3d1a00]/65">{s.deity} · {s.verseCount} verses</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Card id="faq" title="Frequently asked questions">
          <FaqList faqs={guide.faqs} />
        </Card>

        {!!guide.sources?.length && (
          <Card title="Sources and further reading" tone="cream">
            <ul className="list-disc space-y-1 pl-5 font-garamond text-base text-[#3d1a00]/80">
              {guide.sources.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="mt-3 font-garamond text-sm text-[#3d1a00]/60">
              This guide is for general information and devotional learning. It is not medical, legal or financial advice.{' '}
              <Link href="/disclaimer" className="underline decoration-[#c9922a]/60">Read our disclaimer</Link>.
            </p>
          </Card>
        )}

        {!!(relatedGuides.length || sameCategory.length) && (
          <section className="mt-12">
            <h2 className="mb-4 font-cinzel text-2xl font-bold text-[#8b1a00]">Keep reading</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[...relatedGuides, ...sameCategory.filter((g) => !relatedGuides.some((r) => r.slug === g.slug))]
                .slice(0, 4)
                .map((g) => (
                  <Link
                    key={g.slug}
                    href={`/${g.slug}`}
                    className="group rounded-2xl border border-[#c9922a]/25 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#c9922a] hover:shadow-md"
                  >
                    <p className="font-cinzel-reg text-[10px] uppercase tracking-[2px] text-[#e8760a]">{g.category}</p>
                    <p className="mt-1 font-cinzel text-base font-bold leading-snug text-[#8b1a00]">{g.h1}</p>
                    <span className="mt-3 inline-block font-cinzel-reg text-[11px] uppercase tracking-widest text-[#c9922a] transition-all group-hover:translate-x-1">
                      Read guide →
                    </span>
                  </Link>
                ))}
            </div>
          </section>
        )}

        <div className="mt-12">
          <SubscribeInline />
        </div>
      </div>
    </SiteShell>
  );
}
