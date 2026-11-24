import { STOTRAM_INFO } from '@/data/stotram-info';
import { STOTRAM_EXTRA } from '@/data/stotram-extra';
import { STOTRAM_ARTICLES } from '@/data/stotram-articles';
import { STOTRAM_ARTICLES_MORE_A } from '@/data/stotram-articles-more';
import { STOTRAM_ARTICLES_MORE_B } from '@/data/stotram-articles-more2';
import { STOTRAM_ARTICLES_DEEP } from '@/data/stotram-articles-deep';
import { GUIDES } from '@/data/guides';

export function getStotramContent(slug) {
  const info = STOTRAM_INFO[slug] || STOTRAM_EXTRA[slug] || null;
  const base =
    STOTRAM_ARTICLES[slug] || STOTRAM_ARTICLES_MORE_A[slug] || STOTRAM_ARTICLES_MORE_B[slug] || null;
  const deep = STOTRAM_ARTICLES_DEEP[slug] || [];
  const article = base && deep.length ? { ...base, sections: [...(base.sections || []), ...deep] } : base;
  return {
    what: info?.what || '',
    meaning: info?.meaning || '',
    benefits: info?.benefits || [],
    bestTime: info?.bestTime || '',
    faqs: info?.faqs || [],
    article,
  };
}

export function getGuidesForStotram(slug, limit = 4) {
  return GUIDES.filter((g) => g.related?.stotrams?.includes(slug)).slice(0, limit);
}
