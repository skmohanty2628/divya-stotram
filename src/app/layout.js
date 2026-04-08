import './globals.css';
import TrackVisit from '@/components/TrackVisit';

const SITE_URL = 'https://divyastotram.com';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Divya Stotram | Hindu Prayers, Stotrams & Mantras in 4 Languages',
    template: '%s | Divya Stotram',
  },
  description:
    'Read sacred Hindu prayers, stotrams and mantras in English, Hindi, Odia and Telugu with meaning, lyrics, benefits, and FAQs.',
  applicationName: 'Divya Stotram',
  category: 'Religion',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Divya Stotram | Hindu Prayers, Stotrams & Mantras in 4 Languages',
    description:
      'Read Hanuman Chalisa, Shiva Tandav, Vishnu Sahasranamam, Durga Stotram and more in 4 languages with meaning.',
    url: SITE_URL,
    siteName: 'Divya Stotram',
    type: 'website',
    images: [
      {
        url: '/logo.svg',
        width: 1200,
        height: 630,
        alt: 'Divya Stotram',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Divya Stotram | Hindu Prayers, Stotrams & Mantras in 4 Languages',
    description:
      'Read sacred Hindu prayers and stotrams in English, Hindi, Odia and Telugu with meaning.',
    images: ['/logo.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }) {
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Divya Stotram',
    url: SITE_URL,
    description:
      'Read sacred Hindu prayers, stotrams and mantras in English, Hindi, Odia and Telugu with meaning.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="PgObA56qPvqCtYo6wbzYDQBhAW7SC2zgpYK8JlCI3Yc"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />

        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}

        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT &&
          process.env.NEXT_PUBLIC_ADSENSE_CLIENT !== 'ca-pub-your-id-here' && (
            <script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
              crossOrigin="anonymous"
            />
          )}
      </head>
      <body>
        {children}
        <TrackVisit />
      </body>
    </html>
  );
}