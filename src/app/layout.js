import './globals.css';
import Link from 'next/link';
// import TrackVisit from '@/components/TrackVisit';

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

function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-[#c9922a]/20 bg-gradient-to-br from-[#2b0d00] via-[#5c1d0c] to-[#8b1a00] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="font-cinzel-reg text-lg sm:text-xl tracking-[0.18em] uppercase text-[#ffd68a] font-bold">
              Divya Stotram
            </h3>
            <p className="mt-3 text-sm sm:text-base leading-7 text-white/85 font-medium">
              Sacred Hindu prayers, stotrams and mantras in English, Hindi, Odia and Telugu with meaning.
            </p>
          </div>

          <div>
            <h4 className="font-cinzel-reg text-xs tracking-[0.2em] uppercase text-[#ffd68a] font-bold">
              Quick Links
            </h4>
            <div className="mt-4 grid gap-2 text-sm sm:text-[15px]">
              <Link href="/" className="text-white/85 hover:text-[#ffd68a] transition-colors font-semibold">
                Home
              </Link>
              <Link href="/about" className="text-white/85 hover:text-[#ffd68a] transition-colors font-semibold">
                About
              </Link>
              <Link href="/contact" className="text-white/85 hover:text-[#ffd68a] transition-colors font-semibold">
                Contact
              </Link>
              <Link href="/privacy-policy" className="text-white/85 hover:text-[#ffd68a] transition-colors font-semibold">
                Privacy Policy
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-cinzel-reg text-xs tracking-[0.2em] uppercase text-[#ffd68a] font-bold">
              Popular Stotrams
            </h4>
            <div className="mt-4 grid gap-2 text-sm sm:text-[15px]">
              <Link href="/hanuman-chalisa" className="text-white/85 hover:text-[#ffd68a] transition-colors font-semibold">
                Hanuman Chalisa
              </Link>
              <Link href="/shiva-tandav" className="text-white/85 hover:text-[#ffd68a] transition-colors font-semibold">
                Shiva Tandav
              </Link>
              <Link href="/durga-stotram" className="text-white/85 hover:text-[#ffd68a] transition-colors font-semibold">
                Durga Stotram
              </Link>
              <Link href="/vishnu-sahasranamam" className="text-white/85 hover:text-[#ffd68a] transition-colors font-semibold">
                Vishnu Sahasranamam
              </Link>
            </div>
          </div>
        </div>

        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-[#ffd68a]/50 to-transparent" />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs sm:text-sm text-white/75 font-medium">
            © {year} Divya Stotram. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-white/75 font-medium">
            Built with devotion for sacred reading and learning.
          </p>
        </div>
      </div>
    </footer>
  );
}

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

        {/* Odia font fix */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Oriya:wght@400;600;700&display=swap"
          rel="stylesheet"
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

      <body className="min-h-screen bg-white text-[#1a0a00]">
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>

        {/* <TrackVisit /> */}
      </body>
    </html>
  );
}