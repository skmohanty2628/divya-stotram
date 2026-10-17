import SiteShell from '@/components/SiteShell';
import { SITE_URL, CONTACT_EMAIL } from '@/lib/site';
import { Prose } from '@/components/StotramSections';

export const metadata = {
  title: 'Terms of Use',
  description: 'The terms that apply when you use Divya Stotram: acceptable use, content, intellectual property and limitation of liability.',
  alternates: { canonical: `${SITE_URL}/terms` },
};

const TERMS = [
  ['1. Acceptance', 'By using divyastotram.com you agree to these terms. If you do not agree, please do not use the site.'],
  ['2. Use of the site', 'You may read, listen to and share links to the content for personal, non-commercial devotional and educational use. You agree not to misuse the site, attempt to disrupt it, scrape it at scale, or abuse the contact, subscription or Ask the Pandit features.'],
  ['3. Content and ownership', 'The sacred texts presented on this site are traditional works. The explanatory articles, guides, translations, layout and software are created by Divya Stotram and are protected by copyright. You may quote short excerpts with a link back to the page, but you may not republish whole pages or guides without permission.'],
  ['4. No professional advice', 'Content is for information and devotion only and is not medical, legal, financial or astrological advice. See our Disclaimer for details.'],
  ['5. Third-party services', 'The site uses third-party services such as Google Analytics, Google AdSense, YouTube and AI providers. Their use is governed by their own terms and policies, and by our Privacy Policy.'],
  ['6. User submissions', 'If you send us a message or email address, you confirm that the information is yours to give. We use it only as described in the Privacy Policy.'],
  ['7. Limitation of liability', 'The site is provided as is. To the fullest extent permitted by law, Divya Stotram is not liable for any loss arising from your use of, or inability to use, the site or from reliance on its content.'],
  ['8. Changes', 'We may update these terms from time to time. Continued use of the site after changes means you accept them.'],
  ['9. Contact', `Questions about these terms: ${CONTACT_EMAIL}`],
];

export default function TermsPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-14 sm:px-6">
        <h1 className="font-cinzel text-4xl font-bold text-[#8b1a00]">Terms of Use</h1>
        <p className="mt-2 font-garamond text-base text-[#3d1a00]/60">Last updated: October 2026</p>
        <div className="mt-8 space-y-8">
          {TERMS.map(([h, t]) => (
            <section key={h}>
              <h2 className="mb-2 font-cinzel text-xl font-bold text-[#8b1a00]">{h}</h2>
              <Prose>
                <p>{t}</p>
              </Prose>
            </section>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
