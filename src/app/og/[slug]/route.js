import { ImageResponse } from 'next/og';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';
import { GUIDES, getGuideBySlug } from '@/data/guides';

// Share card (1200x630) for WhatsApp, Facebook and X links. Built per page from the page title only.
// The built-in font has no Devanagari, Odia or Telugu glyphs, so the card uses the English title.
export const runtime = 'nodejs';
export const dynamicParams = false;

export function generateStaticParams() {
  return [...STOTRAMS_INDEX.map((s) => ({ slug: s.slug })), ...GUIDES.map((g) => ({ slug: g.slug }))];
}

function pick(slug) {
  const s = STOTRAMS_INDEX.find((x) => x.slug === slug);
  if (s) return { kind: s.deity, title: s.title.en, foot: 'English  |  Hindi  |  Odia  |  Telugu' };
  const g = getGuideBySlug(slug);
  if (g) {
    const t = g.h1.length > 90 ? `${g.h1.slice(0, 87)}...` : g.h1;
    return { kind: g.category, title: t, foot: 'Prayer and mantra guide' };
  }
  return null;
}

export async function GET(_req, { params }) {
  const { slug } = await params;
  const d = pick(slug);
  if (!d) return new Response('Not found', { status: 404 });
  const size = d.title.length > 60 ? 54 : d.title.length > 34 ? 68 : 84;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: 'linear-gradient(135deg, #5c1000 0%, #8b1a00 55%, #c2410c 100%)',
          color: '#fff7e6',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 30, letterSpacing: 6, color: '#ffd68a' }}>
          DIVYA STOTRAM
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 30, letterSpacing: 5, color: '#ffd68a', textTransform: 'uppercase' }}>
            {d.kind}
          </div>
          <div style={{ display: 'flex', marginTop: 18, fontSize: size, fontWeight: 700, lineHeight: 1.12 }}>{d.title}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 28, color: '#ffe9c2' }}>
          <span>{d.foot}</span>
          <span>divyastotram.com</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630, headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=31536000, immutable' } }
  );
}
