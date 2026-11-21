import { notFound } from 'next/navigation';
import TemplePageView from '@/components/TemplePageView';
import { TEMPLES, getTempleBySlug } from '@/data/temples';
import { commonsUrl } from '@/data/festival-photos';
import { SITE_URL, SITE_NAME } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return TEMPLES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const t = getTempleBySlug(slug);
  if (!t) return { title: 'Page not found', robots: { index: false } };
  const url = `${SITE_URL}/temples/${t.slug}`;
  const img = t.photos[0] ? [{ url: commonsUrl(t.photos[0].file, 1200), alt: t.photos[0].alt }] : [];
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: url },
    openGraph: { title: t.title, description: t.description, url, siteName: SITE_NAME, type: 'article', images: img },
    twitter: { card: 'summary_large_image', title: t.title, description: t.description, images: img.map((i) => i.url) },
  };
}

export default async function TemplePage({ params }) {
  const { slug } = await params;
  if (!getTempleBySlug(slug)) notFound();
  return <TemplePageView slug={slug} />;
}
