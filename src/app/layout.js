import './globals.css';
import LiveVisitorCard from '@/components/LiveVisitorCard';
import TrackVisit from '@/components/TrackVisit';

export const metadata = {
  title: 'Divya Stotram — Hindu Prayers & Stotrams in 4 Languages',
  description: 'Read sacred Hindu prayers and stotrams in English, Hindi, Odia and Telugu. Hanuman Chalisa, Durga Stotram, Shiva Tandav, Gayatri Mantra, Vishnu Sahasranamam and more with meaning.',
  keywords: 'hanuman chalisa, durga stotram, shiva tandav, gayatri mantra, vishnu sahasranamam, hindu prayers, stotram, mantra, odia prayer, telugu prayer',
  openGraph: {
    title: 'Divya Stotram — Sacred Hindu Prayers',
    description: 'Read Hindu prayers in English, Hindi, Odia and Telugu with meaning.',
    type: 'website',
    url: 'https://divyastotram.com',
    siteName: 'Divya Stotram',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Divya Stotram — Sacred Hindu Prayers',
    description: 'Read Hindu prayers in 4 languages with meaning.',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="PgObA56qPvqCtYo6wbzYDQBhAW7SC2zgpYK8JlCI3Yc" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script dangerouslySetInnerHTML={{ __html: `
              window.dataLayer=window.dataLayer||[];
              function gtag(){dataLayer.push(arguments);}
              gtag('js',new Date());
              gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');
            `}} />
          </>
        )}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && process.env.NEXT_PUBLIC_ADSENSE_CLIENT !== 'ca-pub-your-id-here' && (
          <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`} crossOrigin="anonymous" />
        )}
      </head>
      <body>
        {children}
        {/* Track every page visit → Firebase */}
        <TrackVisit />
      </body>
    </html>
  );
}