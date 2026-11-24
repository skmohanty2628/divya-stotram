'use client';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

// Pages where the AdSense script is not loaded: policy, contact, admin and tool pages.
const NO_ADS = ['/about', '/contact', '/privacy-policy', '/terms', '/disclaimer', '/editorial-policy', '/feedback', '/admin', '/search', '/chanting-room'];

export default function AdScript({ client }) {
  const pathname = usePathname() || '/';
  if (!client || client === 'ca-pub-your-id-here') return null;
  if (NO_ADS.some((p) => pathname === p || pathname.startsWith(p + '/'))) return null;
  return (
    <Script
      id="adsense-script"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
    />
  );
}
