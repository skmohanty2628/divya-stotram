'use client';

import { useState } from 'react';
import { FeedbackForm, FeedbackList } from '@/components/FeedbackParts';

export default function FeedbackBoard() {
  const [refresh, setRefresh] = useState(0);
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,380px)_1fr]">
      <section aria-label="Share your feedback" className="h-fit rounded-3xl border border-[#c9922a]/30 bg-[#fffdf8] p-5 shadow-sm lg:sticky lg:top-24">
        <h2 className="mb-4 font-cinzel text-xl font-bold text-[#8b1a00]">Share your feedback</h2>
        <FeedbackForm onSent={() => setRefresh((n) => n + 1)} />
      </section>
      <section aria-label="What readers say">
        <h2 className="mb-4 font-cinzel text-xl font-bold text-[#8b1a00]">What readers say</h2>
        <FeedbackList refreshKey={refresh} />
      </section>
    </div>
  );
}
