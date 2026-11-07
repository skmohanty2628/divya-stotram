import SiteShell from '@/components/SiteShell';
import FeedbackBoard from '@/components/FeedbackBoard';
import { SITE_URL } from '@/lib/site';

// Reader-written content changes constantly, so this page is kept out of search results.
export const metadata = {
  title: 'Reader Feedback and Opinions',
  description: 'Read what visitors say about Divya Stotram and share your own feedback, questions and suggestions.',
  alternates: { canonical: `${SITE_URL}/feedback` },
  robots: { index: false, follow: true },
};

export default function FeedbackPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <header className="pb-8 pt-14 text-center">
          <p className="font-cinzel-reg text-[11px] uppercase tracking-[5px] text-[#a85200]">Community</p>
          <h1 className="mt-3 font-cinzel text-4xl font-bold text-[#8b1a00] md:text-5xl">Feedback and Opinions</h1>
          <p className="mx-auto mt-4 max-w-2xl font-garamond text-xl leading-relaxed text-[#3d1a00]/75">
            Tell us what helped, what was unclear and what you would like to read next. Messages are public, and our
            team replies here.
          </p>
        </header>
        <FeedbackBoard />
      </div>
    </SiteShell>
  );
}
