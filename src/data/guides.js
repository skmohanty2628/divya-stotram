import { GUIDES_DEITY } from './guides-deity';
import { GUIDES_TOPIC } from './guides-topic';
import { GUIDES_PRACTICE } from './guides-practice';

export const GUIDES_UPDATED = '2026-10-17';

export const GUIDES = [...GUIDES_DEITY, ...GUIDES_TOPIC, ...GUIDES_PRACTICE];

export function getGuideBySlug(slug) {
  return GUIDES.find((g) => g.slug === slug) || null;
}

export function getAllGuideSlugs() {
  return GUIDES.map((g) => g.slug);
}

export function guideWordCount(guide) {
  const parts = [guide.intro];
  guide.sections.forEach((s) => {
    parts.push(s.h);
    (s.p || []).forEach((p) => parts.push(p));
  });
  guide.faqs.forEach((f) => parts.push(f.q, f.a));
  return parts.join(' ').split(/\s+/).filter(Boolean).length;
}

export function guideReadMinutes(guide) {
  return Math.max(2, Math.round(guideWordCount(guide) / 200));
}

export function getGuideCategories() {
  const map = new Map();
  GUIDES.forEach((g) => {
    if (!map.has(g.category)) map.set(g.category, []);
    map.get(g.category).push(g);
  });
  return [...map.entries()].map(([name, items]) => ({ name, items }));
}
