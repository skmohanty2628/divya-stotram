import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import { Prose } from '@/components/StotramSections';
import { CONTACT_EMAIL } from '@/lib/site';

const SECTIONS = [
  ['Who we are', `Divya Stotram (divyastotram.com) is an independent devotional website operated from India. You can reach us at ${CONTACT_EMAIL}.`],
  ['Information we collect', 'We collect only what is needed to run the site: (a) anonymous usage data through Google Analytics, such as pages viewed, approximate location, device and browser type; (b) the name, email address and message you choose to send through the contact form; (c) your email address, and optionally your name and preferred deity, if you subscribe to the daily prayer email; (d) the questions you type into the Ask the Pandit assistant or the verse explanation feature, which are sent to our AI provider to produce an answer.'],
  ['How we use it', 'To show you the pages you ask for, understand which content is useful, answer your messages, send the daily prayer email you asked for, keep the site secure and prevent abuse. We do not sell your personal information.'],
  ['Cookies and advertising', 'We use Google AdSense to show advertising. Google and its partners use cookies and similar technologies to serve and measure ads, including ads based on your prior visits to this or other websites. You can learn how Google uses data from sites that use its services at https://policies.google.com/technologies/partner-sites, opt out of personalised advertising at https://adssettings.google.com, or manage cookies in your browser. Where required (for example in the EEA, UK and Switzerland) we show a consent message and honour your choice.'],
  ['Google Analytics', 'We use Google Analytics 4 to understand aggregate traffic. It sets cookies and receives your IP address, which Google truncates. You can block it with Google\'s browser add-on at https://tools.google.com/dlpage/gaoptout.'],
  ['Email subscriptions', 'If you subscribe, we store your email address with Firebase and send mail through Resend. Every email contains an unsubscribe link, and unsubscribing removes you from the list. You can also write to us and ask us to delete your data.'],
  ['AI features', 'Questions to Ask the Pandit and the verse explanation tool are processed by Groq. Please do not include personal, medical or financial information in them.'],
  ['Other third parties', 'Embedded YouTube videos may set cookies when played. Our hosting provider, Vercel, processes technical request data (such as IP address) to deliver the site.'],
  ['Retention and security', 'Contact messages are kept only as long as needed to respond. Subscriber data is kept until you unsubscribe. We use HTTPS and access controls, but no system is perfectly secure.'],
  ['Your rights', `Depending on where you live you may have rights to access, correct or delete your personal data, or to object to its processing. Write to ${CONTACT_EMAIL} and we will respond within a reasonable time.`],
  ['Children', 'The site is intended for a general audience and is not directed to children under 13. We do not knowingly collect personal data from children.'],
  ['Changes', 'We may update this policy and will change the date below when we do.'],
];

export default function PrivacyPolicyPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-14 sm:px-6">
        <h1 className="font-cinzel text-4xl font-bold text-[#8b1a00]">Privacy Policy</h1>
        <p className="mt-2 font-garamond text-base text-[#3d1a00]/60">Last updated: October 2026</p>
        <div className="mt-8 space-y-8">
          {SECTIONS.map(([h, t], i) => (
            <section key={h}>
              <h2 className="mb-2 font-cinzel text-xl font-bold text-[#8b1a00]">
                {i + 1}. {h}
              </h2>
              <Prose>
                <p>{t}</p>
              </Prose>
            </section>
          ))}
        </div>
        <p className="mt-10 font-garamond text-lg text-[#3d1a00]/75">
          See also our <Link href="/terms" className="underline decoration-[#c9922a]">Terms of Use</Link> and{' '}
          <Link href="/disclaimer" className="underline decoration-[#c9922a]">Disclaimer</Link>.
        </p>
      </div>
    </SiteShell>
  );
}
