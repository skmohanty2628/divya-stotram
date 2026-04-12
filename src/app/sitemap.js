import { devotionalPages } from '@/data/devotionalPages';

export default function sitemap() {
  const baseUrl = 'https://divyastotram.com';

  // ✅ Fixed stable date (update only when content changes)
  const LAST_MODIFIED = '2026-04-10';

  // 📿 Main Stotram Pages
  const stotrams = [
    'hanuman-chalisa',
    'durga-stotram',
    'shiva-tandav',
    'gayatri-mantra',
    'vishnu-sahasranamam',
    'mahalakshmi-ashtakam',
    'saraswati-vandana',
    'ganesh-aarti',
    'ram-raksha-stotram',
    'aditya-hridayam',
    'navagraha-stotram',
    'aigiri-nandini',
    'shiv-chalisa',
  ];

  const stotramUrls = stotrams.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly',
    priority: 0.9, // High authority pages
  }));

  // 🔥 SEO / Devotional Pages (Traffic Pages)
  const devotionalUrls = devotionalPages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'weekly',
    priority: 0.8, // Increased priority (important for ranking)
  }));

  return [
    // 🏠 Homepage (Highest Priority)
    {
      url: baseUrl,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1.0,
    },

    // 🔊 Chanting Room (High Engagement Page)
    {
      url: `${baseUrl}/chanting-room`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // 📄 Static Pages
    {
      url: `${baseUrl}/about`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.3,
    },

    // 📿 + 🔥 Combined URLs
    ...stotramUrls,
    ...devotionalUrls,
  ];
}