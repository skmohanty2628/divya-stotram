'use client';
import { useEffect } from 'react';

/**
 * AdSlot — drop in anywhere, two sizes:
 *   <AdSlot slot="1234567890" size="banner"  />  → 728x90
 *   <AdSlot slot="1234567891" size="square"  />  → 300x250
 *   <AdSlot slot="1234567892" size="mobile"  />  → 320x50
 */
export default function AdSlot({ slot, size = 'square', className = '' }) {
  const sizeMap = {
    banner: { w: '728px', h: '90px',  label: 'AD SPACE 728×90'  },
    square: { w: '300px', h: '250px', label: 'AD SPACE 300×250' },
    mobile: { w: '320px', h: '50px',  label: 'AD SPACE 320×50'  },
  };
  const { w, h, label } = sizeMap[size] || sizeMap.square;
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  useEffect(() => {
    if (clientId && typeof window !== 'undefined') {
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch {}
    }
  }, [clientId]);

  // AdSense not configured — show placeholder
  if (!clientId) {
    return (
      <div
        className={`ad-slot mx-auto ${className}`}
        style={{ width: w, maxWidth: '100%', height: h }}
      >
        {label}
      </div>
    );
  }

  return (
    <div className={`overflow-hidden mx-auto ${className}`} style={{ maxWidth: '100%' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: w, maxWidth: '100%', height: h }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
