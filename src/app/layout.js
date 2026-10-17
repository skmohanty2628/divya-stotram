import './globals.css';
import Link from 'next/link';
import { SubscribePopup } from '@/components/SubscribeWidget';
import { SITE_URL } from '@/lib/site';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#8b1a00',
};

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
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Divya Stotram — Hindu prayers and stotrams in four languages',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Divya Stotram | Hindu Prayers, Stotrams & Mantras in 4 Languages',
    description:
      'Read sacred Hindu prayers and stotrams in English, Hindi, Odia and Telugu with meaning.',
    images: ['/og-image.png'],
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

const FOOTER_LINK =
  'text-white/85 hover:text-[#ffd68a] transition-colors font-semibold';

function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-[#c9922a]/20 bg-gradient-to-br from-[#2b0d00] via-[#5c1d0c] to-[#8b1a00] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-cinzel-reg text-lg sm:text-xl tracking-[0.18em] uppercase text-[#ffd68a] font-bold">
              Divya Stotram
            </h3>
            <p className="mt-3 text-sm sm:text-base leading-7 text-white/85 font-medium">
              Sacred Hindu prayers, stotrams and mantras in English, Hindi, Odia and Telugu, with
              transliteration, meaning and practical chanting guides.
            </p>
          </div>

          <div>
            <h4 className="font-cinzel-reg text-xs tracking-[0.2em] uppercase text-[#ffd68a] font-bold">
              Popular Stotrams
            </h4>
            <div className="mt-4 grid gap-2 text-sm sm:text-[15px]">
              <Link href="/hanuman-chalisa" className={FOOTER_LINK}>Hanuman Chalisa</Link>
              <Link href="/shiva-tandav" className={FOOTER_LINK}>Shiva Tandav</Link>
              <Link href="/durga-stotram" className={FOOTER_LINK}>Durga Stotram</Link>
              <Link href="/vishnu-sahasranamam" className={FOOTER_LINK}>Vishnu Sahasranamam</Link>
              <Link href="/gayatri-mantra" className={FOOTER_LINK}>Gayatri Mantra</Link>
              <Link href="/all-stotrams" className={FOOTER_LINK}>All Stotrams →</Link>
            </div>
          </div>

          <div>
            <h4 className="font-cinzel-reg text-xs tracking-[0.2em] uppercase text-[#ffd68a] font-bold">
              Guides
            </h4>
            <div className="mt-4 grid gap-2 text-sm sm:text-[15px]">
              <Link href="/how-to-chant-hanuman-chalisa" className={FOOTER_LINK}>How to chant Hanuman Chalisa</Link>
              <Link href="/best-mantra-for-anxiety" className={FOOTER_LINK}>Mantras for anxiety</Link>
              <Link href="/best-mantra-for-sleep" className={FOOTER_LINK}>Mantras for sleep</Link>
              <Link href="/durga-mantra-during-navratri" className={FOOTER_LINK}>Navratri mantras</Link>
              <Link href="/spiritual-routine-for-beginners" className={FOOTER_LINK}>Daily routine for beginners</Link>
              <Link href="/guides" className={FOOTER_LINK}>All guides →</Link>
            </div>
          </div>

          <div>
            <h4 className="font-cinzel-reg text-xs tracking-[0.2em] uppercase text-[#ffd68a] font-bold">
              About
            </h4>
            <div className="mt-4 grid gap-2 text-sm sm:text-[15px]">
              <Link href="/about" className={FOOTER_LINK}>About us</Link>
              <Link href="/editorial-policy" className={FOOTER_LINK}>Editorial policy</Link>
              <Link href="/contact" className={FOOTER_LINK}>Contact</Link>
              <Link href="/privacy-policy" className={FOOTER_LINK}>Privacy policy</Link>
              <Link href="/terms" className={FOOTER_LINK}>Terms of use</Link>
              <Link href="/disclaimer" className={FOOTER_LINK}>Disclaimer</Link>
              <Link href="/chanting-room" className={FOOTER_LINK}>Japa counter</Link>
            </div>
          </div>
        </div>

        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-[#ffd68a]/50 to-transparent" />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs sm:text-sm text-white/75 font-medium">
            © {year} Divya Stotram. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-white/75 font-medium">
            Educational and devotional content. Not medical, legal or financial advice.
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
  };

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Divya Stotram',
    url: SITE_URL,
    logo: `${SITE_URL}/android-chrome-512x512.png`,
    email: 'contactdivyastotram@gmail.com',
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

        {/* All site fonts in a single request (was a render-blocking CSS @import chain) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600&family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Noto+Sans+Oriya:wght@400;600;700&display=swap"
          rel="stylesheet"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
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
        <SubscribePopup />
      </body>
    </html>
  );
}