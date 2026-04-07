// SERVER COMPONENT — generates SEO metadata, no 'use client'
import ChantingRoomClient from './ChantingRoomClient';

const SITE_URL = 'https://divyastotram.com';

export async function generateMetadata() {
  return {
    title: 'Online Japa Counter — Chanting Room | Divya Stotram',
    description:
      'Free online japa mala counter with voice recognition. Chant Jai Shree Ram, Om Namah Shivaya, Hare Krishna and more — the app listens and counts automatically. Track 108, 54, or 1008 chants.',
    keywords:
      'japa counter, online mala counter, 108 chant counter, voice japa, jai shree ram counter, om namah shivaya, online rudraksha mala, mantra counter',
    alternates: { canonical: `${SITE_URL}/chanting-room` },
    openGraph: {
      title: 'Online Japa Counter — Chanting Room | Divya Stotram',
      description: 'Voice-powered japa mala counter. Say the mantra — it counts automatically.',
      url: `${SITE_URL}/chanting-room`,
      siteName: 'Divya Stotram',
      type: 'website',
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Online Japa Counter — Chanting Room | Divya Stotram',
      description: 'Voice-powered japa mala counter. Say the mantra — it counts automatically.',
    },
  };
}

export default function ChantingRoomPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Japa Mala Counter — Chanting Room',
    url: `${SITE_URL}/chanting-room`,
    description: 'Online japa counter with voice recognition for Hindu devotional chanting',
    applicationCategory: 'ReligiousApplication',
    publisher: {
      '@type': 'Organization',
      name: 'Divya Stotram',
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ChantingRoomClient />
    </>
  );
}