import SiteShell from '@/components/SiteShell';
import { SITE_URL, CONTACT_EMAIL } from '@/lib/site';
import { Prose } from '@/components/StotramSections';

export const metadata = {
  title: 'Disclaimer',
  description:
    'Divya Stotram is an educational and devotional resource. It does not provide medical, legal, financial or astrological advice, and does not promise any result from prayer.',
  alternates: { canonical: `${SITE_URL}/disclaimer` },
};

export default function DisclaimerPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-14 sm:px-6">
        <h1 className="font-cinzel text-4xl font-bold text-[#8b1a00]">Disclaimer</h1>
        <div className="mt-8">
          <Prose>
            <p>
              Divya Stotram is an educational and devotional resource. Everything published here is offered for general
              information and spiritual reading only.
            </p>
            <p>
              <strong>No medical or mental health advice.</strong> Prayers and mantras are not a treatment for any
              illness, including anxiety, depression, sleep disorders or physical disease. If you are unwell or in
              distress, please consult a qualified doctor or mental health professional. In the United States you can
              call or text 988 for crisis support; in India you can call Tele-MANAS on 14416. In an emergency call your
              local emergency number.
            </p>
            <p>
              <strong>No financial, legal or astrological advice.</strong> Articles about prosperity, careers or
              planetary prayers describe traditional beliefs. They are not advice, and we cannot promise any financial,
              professional or personal outcome.
            </p>
            <p>
              <strong>Traditions differ.</strong> Hindu practice varies by region, family and lineage. We present
              commonly followed practices but cannot speak for every tradition. For initiation or complex rituals,
              consult a qualified teacher.
            </p>
            <p>
              <strong>Translations and transliteration.</strong> We take care with texts and translations but errors can
              occur. Meanings given are simplified to aid understanding and are not a substitute for a scholarly
              commentary.
            </p>
            <p>
              <strong>AI features.</strong> The Ask the Pandit assistant and the verse explanation feature use an
              artificial intelligence model. Its answers can be incomplete or wrong and should not be treated as
              authoritative religious, medical or legal guidance.
            </p>
            <p>
              <strong>External links and third parties.</strong> We are not responsible for the content of external
              sites, including embedded videos.
            </p>
            <p>Questions or corrections: {CONTACT_EMAIL}</p>
          </Prose>
        </div>
      </div>
    </SiteShell>
  );
}
