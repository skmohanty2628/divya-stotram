import { VERSE_DATA } from '@/lib/verseData';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';
import { getVerseDisplayText } from '@/lib/stotramText';

// One verse a day, the same for every visitor. The pool is every verse in the site data that is short
// enough to read as a card and has an English meaning. Order is a fixed shuffle (hash of slug and verse id)
// so neighbouring days rarely come from the same stotram. Day number counts IST days, so it changes at
// midnight in India, the same clock the daily email uses.

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

let POOL = null;

function pool() {
  if (POOL) return POOL;
  const list = [];
  for (const [slug, data] of Object.entries(VERSE_DATA)) {
    const verses = data?.verses || [];
    verses.forEach((v, i) => {
      const original = (v.original || '').trim();
      const en = (v.meaning?.en || '').trim();
      if (!original || !en || original.length > 260) return;
      list.push({ slug, index: i, total: verses.length, key: `${slug}:${v.id || i}` });
    });
  }
  list.sort((a, b) => hash(a.key) - hash(b.key) || (a.key < b.key ? -1 : 1));
  POOL = list;
  return POOL;
}

export function istDayNumber(now = new Date()) {
  const ist = new Date(now.getTime() + 330 * 60_000);
  return Math.floor(ist.getTime() / 86_400_000);
}

export function istDateString(now = new Date()) {
  return new Date(now.getTime() + 330 * 60_000).toISOString().slice(0, 10);
}

export function verseOfTheDay(lang = 'en', now = new Date()) {
  const list = pool();
  if (!list.length) return null;
  const pick = list[istDayNumber(now) % list.length];
  const verse = VERSE_DATA[pick.slug].verses[pick.index];
  const meta = STOTRAMS_INDEX.find((s) => s.slug === pick.slug);
  const { verseText, meaningText } = getVerseDisplayText(verse, lang);
  return {
    date: istDateString(now),
    slug: pick.slug,
    title: meta?.title?.[lang] || meta?.title?.en || pick.slug,
    num: verse.num || pick.index + 1,
    total: pick.total,
    verseText,
    meaningText,
  };
}

export function poolSize() {
  return pool().length;
}
