import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import { CONTENT_UPDATED } from '@/lib/site';

export function Card({ id, title, children, tone = 'white' }) {
  return (
    <section
      id={id}
      className={`mt-8 scroll-mt-24 rounded-2xl border border-[#c9922a]/20 p-6 shadow-sm sm:p-8 ${
        tone === 'cream' ? 'bg-[#fffaf1]' : 'bg-white'
      }`}
    >
      {title && (
        <h2 className="mb-4 font-cinzel text-xl font-bold text-[#8b1a00] sm:text-2xl">{title}</h2>
      )}
      {children}
    </section>
  );
}

export function Prose({ children }) {
  return (
    <div className="space-y-4 font-garamond text-lg leading-relaxed text-[#3d1a00]/85 [&_a]:text-[#8b1a00] [&_a]:underline [&_a]:decoration-[#c9922a] [&_a]:underline-offset-2 [&_h2]:pt-4 [&_h2]:font-cinzel [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#8b1a00] [&_strong]:text-[#3d1a00]">{children}</div>
  );
}

export function FaqList({ faqs }) {
  return (
    <div className="space-y-3">
      {faqs.map((f) => (
        <details
          key={f.q}
          className="group rounded-xl border border-[#c9922a]/20 bg-[#fffaf1] open:bg-white"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
            <h3 className="font-garamond text-lg font-semibold text-[#3d1a00]">{f.q}</h3>
            <span className="text-xl text-[#c9922a] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="px-5 pb-5 font-garamond text-lg leading-relaxed text-[#3d1a00]/80">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function ByLine() {
  return (
    <p className="font-cinzel-reg text-[10px] uppercase tracking-[2px] text-[#3d1a00]/50">
      By the Divya Stotram editorial team · Last reviewed {CONTENT_UPDATED} ·{' '}
      <Link href="/editorial-policy" className="underline decoration-[#c9922a]/50 hover:text-[#8b1a00]">
        How we write
      </Link>
    </p>
  );
}

// Content shown above the verses: overview, quick facts and a jump menu.
export function StotramTop({ meta, content, langCode = 'en' }) {
  const nativeTitle = langCode !== 'en' ? meta.title?.[langCode] : null;
  const nativeDesc = langCode !== 'en' ? meta.description?.[langCode] : null;
  const quick = content.article?.quick || [];
  return (
    <>
      <div className="mb-3">
        <ByLine />
      </div>

      {nativeTitle && nativeDesc && (
        <Card title={nativeTitle}>
          <Prose>
            <p className="text-xl">{nativeDesc}</p>
            <p lang="en" className="text-base text-[#3d1a00]/70">
              The verses below are shown in this language. The detailed article that follows is in English.
            </p>
          </Prose>
        </Card>
      )}

      <Card title={`About ${meta.title.en}`}>
        <Prose>
          {content.what && <p>{content.what}</p>}
          {content.meaning && <p>{content.meaning}</p>}
        </Prose>
      </Card>

      {!!quick.length && (
        <Card title="Quick facts" tone="cream">
          <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {quick.map(([k, v]) => (
              <div key={k} className="border-b border-[#c9922a]/15 pb-2">
                <dt className="font-cinzel-reg text-[10px] uppercase tracking-[2px] text-[#c9922a]">{k}</dt>
                <dd className="mt-0.5 font-garamond text-lg text-[#3d1a00]">{v}</dd>
              </div>
            ))}
          </dl>
        </Card>
      )}

      <nav
        aria-label="On this page"
        className="mt-8 flex flex-wrap items-center gap-2 font-cinzel-reg text-[11px] uppercase tracking-[1.5px]"
      >
        <span className="text-[#c9922a]">Jump to</span>
        {[
          ['#verses', 'Verses'],
          ['#background', 'Background'],
          ['#benefits', 'Benefits'],
          ['#when', 'When to chant'],
          ['#faq', 'FAQ'],
        ].map(([href, label]) => (
          <a
            key={href}
            href={href}
            className="rounded-full border border-[#c9922a]/30 bg-white px-3 py-1.5 text-[#8b1a00] transition-colors hover:border-[#c9922a] hover:bg-[#fff1d1]"
          >
            {label}
          </a>
        ))}
      </nav>
    </>
  );
}

// Content shown below the verses.
export function StotramBody({ meta, content, guides }) {
  const article = content.article;
  return (
    <>
      <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE} />

      {article?.sections?.map((s, i) => (
        <Card key={s.h} id={i === 0 ? 'background' : undefined} title={s.h}>
          <Prose>
            {s.p.map((para, j) => (
              <p key={j}>{para}</p>
            ))}
          </Prose>
        </Card>
      ))}

      {!!article?.glossary?.length && (
        <Card title="Key words explained" tone="cream">
          <dl className="grid gap-3 sm:grid-cols-2">
            {article.glossary.map(([term, def]) => (
              <div key={term} className="rounded-xl border border-[#c9922a]/15 bg-white p-4">
                <dt className="font-cinzel text-base font-bold text-[#8b1a00]">{term}</dt>
                <dd className="mt-1 font-garamond text-base leading-snug text-[#3d1a00]/80">{def}</dd>
              </div>
            ))}
          </dl>
        </Card>
      )}

      {!!content.benefits.length && (
        <Card id="benefits" title={`Why devotees recite ${meta.title.en}`}>
          <ul className="space-y-3">
            {content.benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 font-garamond text-lg leading-relaxed text-[#3d1a00]/85">
                <span className="mt-1 text-[#c9922a]">✦</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-xl bg-[#fffaf1] p-4 font-garamond text-base leading-relaxed text-[#3d1a00]/80">
            These are beliefs and experiences from the devotional tradition. They are offered for
            information and are not medical, legal or financial advice or a promise of any result.
          </p>
        </Card>
      )}

      {content.bestTime && (
        <Card id="when" title={`Best time to chant ${meta.title.en}`}>
          <Prose>
            <p>{content.bestTime}</p>
          </Prose>
        </Card>
      )}

      {!!content.faqs.length && (
        <Card id="faq" title={`Frequently asked questions about ${meta.title.en}`}>
          <FaqList faqs={content.faqs} />
        </Card>
      )}

      {!!article?.sources?.length && (
        <Card title="Sources and further reading" tone="cream">
          <ul className="list-disc space-y-1 pl-5 font-garamond text-base text-[#3d1a00]/80">
            {article.sources.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="mt-3 font-garamond text-sm text-[#3d1a00]/60">
            Found a mistake? We correct errors promptly. Please{' '}
            <Link href="/contact" className="underline decoration-[#c9922a]/60">
              tell us
            </Link>
            .
          </p>
        </Card>
      )}

      {!!guides?.length && (
        <section className="mt-10">
          <h2 className="mb-4 font-cinzel text-xl font-bold text-[#8b1a00] sm:text-2xl">Read next</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {guides.map((g) => (
              <Link
                key={g.slug}
                href={`/${g.slug}`}
                className="group rounded-2xl border border-[#c9922a]/25 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#c9922a] hover:shadow-md"
              >
                <p className="font-cinzel-reg text-[10px] uppercase tracking-[2px] text-[#e8760a]">{g.category}</p>
                <p className="mt-1 font-cinzel text-base font-bold leading-snug text-[#8b1a00]">{g.h1}</p>
                <p className="mt-2 line-clamp-2 font-garamond text-base text-[#3d1a00]/70">{g.description}</p>
                <span className="mt-3 inline-block font-cinzel-reg text-[11px] uppercase tracking-widest text-[#c9922a] transition-all group-hover:translate-x-1">
                  Read guide →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
