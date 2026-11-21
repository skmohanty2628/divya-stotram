import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import SiteShell from '@/components/SiteShell';
import AdSlot from '@/components/AdSlot';
import { FaqList, Prose, Card } from '@/components/StotramSections';
import { SubscribeInline } from '@/components/SubscribeWidget';
import PhotoCarousel from '@/components/PhotoCarousel';
import ShareBar from '@/components/ShareBar';
import ReadingBar from '@/components/ReadingBar';
import TravelBox from '@/components/TravelBox';
import TempleGear from '@/components/TempleGear';
import { getTempleBySlug, TEMPLES_UPDATED } from '@/data/temples';
import { getGuideBySlug } from '@/data/guides';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';
import { commonsUrl } from '@/data/festival-photos';
import { SITE_URL, SITE_NAME } from '@/lib/site';

const idFor = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

function Block({ b }) {
  if (b.t === 'p') return <p>{b.text}</p>;
  if (b.t === 'note')
    return <p className="rounded-xl border border-[#c9922a]/30 bg-[#fff7e8] p-4 text-base text-[#3d1a00]/75">{b.text}</p>;
  if (b.t === 'ul')
    return (
      <ul className="list-disc space-y-2 pl-6 marker:text-[#c9922a]">
        {b.items.map((x, i) => <li key={i}>{x}</li>)}
      </ul>
    );
  if (b.t === 'ol')
    return (
      <ol className="list-decimal space-y-2 pl-6 marker:font-bold marker:text-[#a85200]">
        {b.items.map((x, i) => <li key={i}>{x}</li>)}
      </ol>
    );
  if (b.t === 'table')
    return (
      <div className="overflow-x-auto rounded-xl border border-[#c9922a]/25">
        <table className="w-full min-w-[480px] text-left text-base">
          <thead className="bg-[#fff1d1] font-cinzel-reg text-[11px] uppercase tracking-[2px] text-[#8a5f00]">
            <tr>{b.head.map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr>
          </thead>
          <tbody>
            {b.rows.map((r, i) => (
              <tr key={i} className={i % 2 ? 'bg-[#fffaf1]' : 'bg-white'}>
                {r.map((c, j) => <td key={j} className={`px-4 py-3 align-top ${j === 0 ? 'font-semibold text-[#8b1a00]' : ''}`}>{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  if (b.t === 'links')
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {b.items.map((l) => (
          <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-[#c9922a]/30 bg-[#fffaf1] p-4 no-underline transition-all hover:-translate-y-0.5 hover:border-[#c9922a] hover:shadow-md">
            <span className="block font-cinzel text-sm font-bold text-[#8b1a00]">{l.label} →</span>
            <span className="mt-1 block text-base text-[#3d1a00]/70">{l.note}</span>
          </a>
        ))}
      </div>
    );
  return null;
}

export default function TemplePageView({ slug }) {
  const t = getTempleBySlug(slug);
  if (!t) return null;
  const url = `${SITE_URL}/temples/${t.slug}`;
  const words = JSON.stringify(t.sections).split(/\s+/).length + JSON.stringify(t.faqs).split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 220));
  const sectionList = [
    ...t.sections.map((s) => ({ id: idFor(s.h), h: s.h })),
    { id: 'packing-list', h: 'Packing list' },
    { id: 'faq', h: 'Frequently asked questions' },
  ];
  const relStot = (t.related?.stotrams || []).map((s) => STOTRAMS_INDEX.find((x) => x.slug === s)).filter(Boolean);
  const relGuides = (t.related?.guides || []).map(getGuideBySlug).filter(Boolean);
  const first = t.photos[0];

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t.h1,
    description: t.description,
    url,
    image: first ? commonsUrl(first.file, 1200) : undefined,
    inLanguage: 'en',
    datePublished: TEMPLES_UPDATED,
    dateModified: TEMPLES_UPDATED,
    author: { '@type': 'Organization', name: `${SITE_NAME} Editorial Team`, url: `${SITE_URL}/about` },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/android-chrome-512x512.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
  const place = {
    '@context': 'https://schema.org',
    '@type': ['HinduTemple', 'TouristAttraction'],
    name: t.name,
    url,
    description: t.description,
    image: first ? commonsUrl(first.file, 1200) : undefined,
    address: { '@type': 'PostalAddress', addressRegion: t.state, addressCountry: 'IN', addressLocality: t.district },
    geo: { '@type': 'GeoCoordinates', latitude: 30.7352, longitude: 79.0669 },
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Temples', item: `${SITE_URL}/temples` },
      { '@type': 'ListItem', position: 3, name: t.name, item: url },
    ],
  };
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <SiteShell>
      <JsonLd data={article} />
      <JsonLd data={place} />
      <JsonLd data={breadcrumb} />
      <JsonLd data={faq} />
      <ReadingBar sections={sectionList} />
      <div className="mx-auto max-w-4xl px-4 pb-24 sm:px-6">
        <nav aria-label="Breadcrumb" className="pt-6 text-sm font-garamond text-[#8b1a00]/70">
          <Link href="/" className="hover:text-[#8b1a00]">Home</Link>
          <span className="mx-2 text-[#8a5f00]">›</span>
          <Link href="/temples" className="hover:text-[#8b1a00]">Temples</Link>
          <span className="mx-2 text-[#8a5f00]">›</span>
          <span className="text-[#3d1a00]/85">{t.state}</span>
        </nav>

        <header className="pb-6 pt-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9922a]" />
            <span className="font-cinzel-reg text-[11px] uppercase tracking-[4px] text-[#a85200]">{t.kind} · {t.state}</span>
          </div>
          <h1 className="font-cinzel text-3xl font-bold leading-tight text-[#8b1a00] md:text-5xl">{t.h1}</h1>
          <p className="mt-5 font-garamond text-xl leading-relaxed text-[#3d1a00]/85">{t.intro}</p>
          <p className="mt-5 font-cinzel-reg text-[10px] uppercase tracking-[2px] text-[#3d1a00]/50">
            By the Divya Stotram editorial team · Updated {TEMPLES_UPDATED} · {mins} min read ·{' '}
            <Link href="/editorial-policy" className="underline decoration-[#c9922a]/50">How we write</Link>
          </p>
          <div className="mt-5"><ShareBar url={url} title={t.h1} label="Share this guide" /></div>
        </header>

        <PhotoCarousel eyebrow="Photo gallery" title={`${t.name} in pictures`} items={t.photos} />

        <section aria-label="Quick facts" className="mt-8 rounded-2xl border border-[#c9922a]/25 bg-gradient-to-br from-[#fff7e8] to-[#fff1d1] p-5 sm:p-6">
          <h2 className="font-cinzel text-xl font-bold text-[#8b1a00]">Quick facts</h2>
          <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {t.facts.map(([k, v]) => (
              <div key={k}>
                <dt className="font-cinzel-reg text-[10px] uppercase tracking-[2px] text-[#8a5f00]">{k}</dt>
                <dd className="font-garamond text-lg leading-snug text-[#3d1a00]">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <nav aria-label="Contents" className="mt-8 rounded-2xl border border-[#c9922a]/25 bg-[#fffaf1] p-5">
          <p className="font-cinzel-reg text-[10px] uppercase tracking-[3px] text-[#8a5f00]">In this guide</p>
          <ol className="mt-3 grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
            {sectionList.map((s, i) => (
              <li key={s.id} className="font-garamond text-lg">
                <a href={`#${s.id}`} className="text-[#8b1a00] hover:underline">
                  <span className="mr-2 text-[#8a5f00]">{i + 1}.</span>{s.h}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article>
          {t.sections.map((s, i) => (
            <div key={s.h}>
              <section id={idFor(s.h)} className="scroll-mt-24 pt-10">
                <h2 className="mb-4 font-cinzel text-2xl font-bold text-[#8b1a00]">{s.h}</h2>
                <Prose>{s.blocks.map((b, j) => <Block key={j} b={b} />)}</Prose>
              </section>
              {i === 1 && <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE} />}
              {i === Math.floor(t.sections.length / 2) && <SubscribeInline variant="compact" />}
              {s.h.startsWith('How to reach') && (
                <TravelBox place={t.travel.place} officialLink={t.travel.official} extra={t.travel.extra} />
              )}
            </div>
          ))}
        </article>

        <Card id="packing-list" title={`${t.name} packing list`}>
          <TempleGear gear={t.gear} />
        </Card>

        {!!relStot.length && (
          <section className="mt-12 rounded-2xl border border-[#c9922a]/25 bg-gradient-to-br from-[#fff7e8] to-[#fff1d1] p-6">
            <h2 className="font-cinzel text-xl font-bold text-[#8b1a00]">Read and chant the prayers</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {relStot.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`} className="flex items-center gap-4 rounded-xl border border-[#c9922a]/25 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-[#c9922a] hover:shadow-md">
                  <span className="text-3xl" aria-hidden="true">{s.deityEmoji || '🕉️'}</span>
                  <span className="font-cinzel text-sm font-bold text-[#8b1a00]">{s.title?.en || s.title}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Card id="faq" title="Frequently asked questions"><FaqList faqs={t.faqs} /></Card>

        <Card title="Sources and further reading" tone="cream">
          <ul className="list-disc space-y-1.5 pl-6 font-garamond text-base text-[#3d1a00]/75">
            {t.sources.map((s) => (
              <li key={s.u}><a href={s.u} target="_blank" rel="noopener noreferrer" className="underline decoration-[#c9922a]/60">{s.t}</a></li>
            ))}
          </ul>
          <p className="mt-3 font-garamond text-sm text-[#3d1a00]/60">
            Photos are from Wikimedia Commons under free licences, credited in the gallery. Dates, fares and rules change each season, so confirm with the official sites above before you travel. This guide is general information and not medical advice.{' '}
            <Link href="/disclaimer" className="underline decoration-[#c9922a]/60">Read our disclaimer</Link>.
          </p>
        </Card>

        {!!relGuides.length && (
          <section className="mt-12">
            <h2 className="mb-4 font-cinzel text-2xl font-bold text-[#8b1a00]">Keep reading</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {relGuides.map((g) => (
                <Link key={g.slug} href={`/${g.slug}`} className="group rounded-2xl border border-[#c9922a]/25 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#c9922a] hover:shadow-md">
                  <p className="font-cinzel-reg text-[10px] uppercase tracking-[2px] text-[#a85200]">{g.category}</p>
                  <p className="mt-1 font-cinzel text-base font-bold leading-snug text-[#8b1a00]">{g.h1}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-10 rounded-2xl border border-[#c9922a]/25 bg-[#fffaf1] p-5">
          <ShareBar url={url} title={t.h1} label="Found this useful? Share it" />
        </div>
        <div className="mt-12"><SubscribeInline /></div>
      </div>
    </SiteShell>
  );
}
