// SERVER COMPONENT - generates SEO metadata, no 'use client'
import ChantingRoomClient from './ChantingRoomClient';

const SITE_URL = 'https://divyastotram.com';

export async function generateMetadata() {
  return {
    title: 'Online Japa Counter | Chanting Room',
    description:
      'Free online japa mala counter with voice recognition. Chant Jai Shree Ram, Om Namah Shivaya, Hare Krishna and more, the app listens and counts automatically. Track 108, 54, or 1008 chants.',
    keywords:
      'japa counter, online mala counter, 108 chant counter, voice japa, jai shree ram counter, om namah shivaya, online rudraksha mala, mantra counter',
    alternates: { canonical: `${SITE_URL}/chanting-room` },
    openGraph: {
      title: 'Online Japa Counter | Chanting Room | Divya Stotram',
      description: 'Voice-powered japa mala counter. Say the mantra, it counts automatically.',
      url: `${SITE_URL}/chanting-room`,
      siteName: 'Divya Stotram',
      type: 'website',
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Online Japa Counter | Chanting Room | Divya Stotram',
      description: 'Voice-powered japa mala counter. Say the mantra, it counts automatically.',
    },
  };
}

export default function ChantingRoomPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Japa Mala Counter | Chanting Room',
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
      <section className="mx-auto mb-24 mt-10 max-w-3xl rounded-2xl border border-[#c9922a]/30 bg-[#fffaf1] p-6 font-garamond text-lg leading-relaxed text-[#3d1a00] sm:p-8">
        <h2 className="font-cinzel text-2xl font-bold text-[#8b1a00]">About the japa counter</h2>
        <p className="mt-4">
          Japa means the quiet, repeated chanting of a mantra or a divine name. For centuries devotees have kept count
          on a mala, a string of beads, so that the mind can rest on the sound and not on the number. This counter does
          the same job on your screen. Choose a target of 11, 21, 54, 108 or 1008, start the counter, and chant. Where
          your browser supports speech recognition, such as Chrome, the counter listens for the mantra and counts each
          round for you, and the bead ring fills as you go.
        </p>
        <h3 className="mt-6 font-cinzel text-xl font-bold text-[#8b1a00]">Why 108?</h3>
        <p className="mt-3">
          A traditional mala has 108 beads, plus one larger bead called the meru or sumeru that marks the start and end
          of a round. When you reach the meru you turn the mala around and do not cross over it. Teachers give several
          explanations for the number 108, and they differ between traditions, so none of them should be treated as the
          single true reason. What all traditions agree on is that a full round of 108 is a convenient, complete unit of
          practice. Smaller targets such as 11, 21 and 54 suit a short sitting, and 1008 is kept for special days.
        </p>
        <h3 className="mt-6 font-cinzel text-xl font-bold text-[#8b1a00]">How to chant well</h3>
        <p className="mt-3">
          Sit comfortably with your back straight and chant at a pace you can keep steady. Say the mantra clearly but
          without strain, and let your attention follow the words. If your mind wanders, bring it back without
          criticising yourself. Pick one mantra and keep to it for a few weeks, since repetition is the point. Good
          choices to begin with are Om Namah Shivaya, the Hare Krishna Maha Mantra, the Gayatri Mantra and the
          Maha Mrityunjaya Mantra, all of which have full pages on this site with the verses and their meaning. Japa is
          a devotional practice, and it is not a substitute for medical or professional help.
        </p>
      </section>
    </>
  );
}