export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
    ],
    sitemap: 'https://divyastotram.com/sitemap.xml',
    host: 'https://divyastotram.com',
  };
}