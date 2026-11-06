'use client';

import dynamic from 'next/dynamic';
import { themeForGuide } from '@/lib/guideThemes';

// Picks the decorative animation for a guide. Loaded on the client only, so it never touches page HTML or SEO.
const Fireworks = dynamic(() => import('@/components/Fireworks'), { ssr: false });
const ThemeCanvas = dynamic(() => import('@/components/ThemeCanvas'), { ssr: false });

export default function GuideEffect({ slug, category }) {
  const theme = themeForGuide(slug, category);
  if (!theme) return null;
  if (theme === 'diwali') return <Fireworks />;
  return <ThemeCanvas theme={theme} />;
}
