export default function sitemap() {
  const baseUrl = 'https://divyastotram.com';
  
  const stotrams = [
    'hanuman-chalisa',
    'durga-stotram', 
    'shiva-tandav',
    'gayatri-mantra',
    'vishnu-sahasranamam',
    'mahalakshmi-ashtakam',
    'saraswati-vandana',
    'ganesh-aarti',
  ];

  const stotramUrls = stotrams.map(slug => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    ...stotramUrls,
  ];
}