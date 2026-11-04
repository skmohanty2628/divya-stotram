'use client';

import { useEffect, useState } from 'react';

const Icon = ({ d, stroke }) => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill={stroke ? 'none' : 'currentColor'}
    stroke={stroke ? 'currentColor' : 'none'}
    strokeWidth={stroke ? 2 : 0}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);
const WA = 'M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm4.2 13.4c-.2.5-1.1 1-1.6 1.1-.4.1-1 .1-2.8-.6a9.5 9.5 0 0 1-3.6-3.2c-.8-1-1.2-2-1.2-2.8s.5-1.2.7-1.4c.2-.2.4-.2.6-.2h.4c.1 0 .3 0 .5.4l.7 1.7c.1.2.1.3 0 .5l-.3.4-.3.3c-.1.1-.2.3-.1.5.5.9 1.2 1.7 2.2 2.2.2.1.4.1.5-.1l.7-.9c.2-.2.3-.2.5-.1l1.6.8c.2.1.3.2.3.3s0 .6-.2 1Z';
const FB = 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z';
const LINK = 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1';
const SH = 'M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8.6 13.5l6.8 4M15.4 6.5l-6.8 4';

const btn =
  'inline-flex items-center gap-2 rounded-full border border-[#c9922a]/40 bg-white px-4 py-1.5 font-cinzel-reg text-[11px] uppercase tracking-[2px] text-[#8b1a00] transition hover:border-[#8b1a00] hover:bg-[#fff7e8]';

export default function ShareBar({ url, title, label = 'Share' }) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    try {
      setCanShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
    } catch (e) {}
  }, []);

  const text = `${title} ${url}`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (e) {
      try {
        const t = document.createElement('textarea');
        t.value = url;
        document.body.appendChild(t);
        t.select();
        document.execCommand('copy');
        t.remove();
      } catch (e2) {}
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 print:hidden" aria-label="Share this page">
      <span className="mr-1 font-cinzel-reg text-[10px] uppercase tracking-[3px] text-[#3d1a00]/55">{label}</span>
      <a className={btn} href={`https://wa.me/?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer">
        <Icon d={WA} /> WhatsApp
      </a>
      <a className={btn} href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">
        <Icon d={FB} /> Facebook
      </a>
      <button type="button" className={btn} onClick={copy}>
        <Icon d={LINK} stroke /> <span aria-live="polite">{copied ? 'Link copied' : 'Copy link'}</span>
      </button>
      {canShare && (
        <button
          type="button"
          className={btn}
          onClick={() => {
            try {
              navigator.share({ title, url });
            } catch (e) {}
          }}
        >
          <Icon d={SH} stroke /> More
        </button>
      )}
    </div>
  );
}
