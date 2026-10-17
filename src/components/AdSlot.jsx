'use client';
import { useEffect, useRef } from 'react';

// Ad slots stay completely empty (no layout shift, nothing rendered) until you turn ads on:
//   NEXT_PUBLIC_ADS_ENABLED=true  and  NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxx
// Then pass a real AdSense slot id, e.g. <AdSlot slot="1234567890" />.
export default function AdSlot({ slot, format = 'auto', className = '' }) {
  const ref = useRef(null);
  const enabled =
    process.env.NEXT_PUBLIC_ADS_ENABLED === 'true' &&
    !!process.env.NEXT_PUBLIC_ADSENSE_CLIENT &&
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT !== 'ca-pub-your-id-here' &&
    !!slot;

  useEffect(() => {
    if (!enabled || !ref.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className={`my-8 text-center ${className}`} aria-label="Advertisement">
      <p className="mb-1 font-cinzel-reg text-[9px] uppercase tracking-[3px] text-[#3d1a00]/40">Advertisement</p>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: 'block', minHeight: 90 }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
