import HomePageClient from './HomePageClient';

export const metadata = {
  title: 'Divya Stotram | Hindu Prayers, Stotrams & Mantras in 4 Languages',
  description:
    'Read Hanuman Chalisa, Shiva Tandav, Durga Stotram, Vishnu Sahasranamam, Aigiri Nandini and more in English, Hindi, Odia and Telugu with meaning.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return <HomePageClient />;
}