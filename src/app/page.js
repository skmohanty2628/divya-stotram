import HomePageClient from './HomePageClient';
import { GUIDES, getGuideBySlug } from '@/data/guides';

// Guides are large. Only the six featured cards (title and blurb) are sent to the browser, not every guide.
const FEATURED_GUIDES = [
  'how-to-chant-hanuman-chalisa',
  'how-to-chant-gayatri-mantra',
  'best-mantra-for-anxiety',
  'morning-prayer-routine',
  'durga-mantra-during-navratri',
  'spiritual-routine-for-beginners',
];

export const metadata = {
  title: 'Divya Stotram | Hindu Prayers, Stotrams & Mantras in 4 Languages',
  description:
    'Read Hanuman Chalisa, Shiva Tandav, Durga Stotram, Vishnu Sahasranamam, Aigiri Nandini and more in English, Hindi, Odia and Telugu with meaning.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  const featured = FEATURED_GUIDES.map(getGuideBySlug)
    .filter(Boolean)
    .map((g) => ({ slug: g.slug, h1: g.h1, description: g.description }));
  return <HomePageClient featuredGuides={featured} guideCount={GUIDES.length} />;
}