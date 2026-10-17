import { STOTRAM_INFO } from '@/data/stotram-info';
import { STOTRAM_EXTRA } from '@/data/stotram-extra';
import { STOTRAM_ARTICLES } from '@/data/stotram-articles';
import { GUIDES } from '@/data/guides';

export function getStotramContent(slug) {
  const info = STOTRAM_INFO[slug] || STOTRAM_EXTRA[slug] || null;
  const article = STOTRAM_ARTICLES[slug] || null;
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
