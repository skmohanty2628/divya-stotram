import './globals.css';
import LiveVisitorCard from '@/components/LiveVisitorCard';
import TrackVisit from '@/components/TrackVisit';

export const metadata = {
  title: 'Divya Stotram — Hindu Prayers & Stotrams',
  description: 'Read and listen to Hindu prayers, stotrams and mantras in English, Hindi, Odia and Telugu.',
  keywords: 'hanuman chalisa, durga stotram, shiva tandav, hindu prayers, stotram, mantra, odia prayer',
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