'use client';

import { useState } from 'react';

// Small photo thumbnail for a guide card. Falls back to a warm gradient if the image cannot load.
export default function GuideThumb({ src, alt = '' }) {
  const [bad, setBad] = useState(!src);
  return (
    <div className="relative h-32 w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#8b1a00] via-[#b53a00] to-[#e8760a]">
      {!bad && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setBad(true)} className="h-full w-full object-cover" />
      )}
    </div>
  );
}
