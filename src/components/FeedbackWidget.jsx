'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FeedbackForm, FeedbackList } from '@/components/FeedbackParts';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';

const STOTRAM_SLUGS = new Set(STOTRAMS_INDEX.map((s) => s.slug));

// A small "Feedback" tab in the bottom-left corner of every public page. It opens a compact card
// (never a full-screen overlay) with a form and the latest messages from other readers.
export default function FeedbackWidget() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('write');
  const [refresh, setRefresh] = useState(0);
  const btn = useRef(null);
  // Stotram pages already carry Play and Ask Pandit buttons on phones, so keep the screen clear there.
  const onStotram = STOTRAM_SLUGS.has(pathname.split('/').filter(Boolean)[0] || '');

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        if (btn.current) btn.current.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  if (pathname.startsWith('/admin') || pathname === '/feedback') return null;

  const tabCls = (id) =>
    `flex-1 rounded-full px-3 py-1.5 font-cinzel-reg text-[10px] uppercase tracking-[2px] transition ${
      tab === id ? 'bg-[#8b1a00] text-white' : 'text-[#8b1a00] hover:bg-[#8b1a00]/10'
    }`;

  return (
    <div className={`fixed bottom-3 left-3 z-[55] print:hidden sm:bottom-4 sm:left-4 ${onStotram ? 'hidden sm:block' : ''}`}>
      {open && (
        <div
          role="dialog"
          aria-label="Feedback"
          className="mb-3 flex max-h-[min(78vh,640px)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-[#c9922a]/40 bg-[#fffdf8] shadow-2xl"
        >
          <div className="flex items-center justify-between bg-gradient-to-r from-[#5c1000] to-[#8b1a00] px-4 py-3 text-white">
            <div>
              <p className="font-cinzel text-base font-bold">Your feedback</p>
              <p className="font-garamond text-sm text-white/80">Help us improve Divya Stotram</p>
            </div>
            <button type="button" onClick={() => { setOpen(false); if (btn.current) btn.current.focus(); }} aria-label="Close feedback" className="rounded-full p-1.5 text-white/90 hover:bg-white/15">
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </div>
          <div className="flex gap-1 px-3 pt-3" role="tablist">
            <button type="button" role="tab" aria-selected={tab === 'write'} className={tabCls('write')} onClick={() => setTab('write')}>Share feedback</button>
            <button type="button" role="tab" aria-selected={tab === 'read'} className={tabCls('read')} onClick={() => setTab('read')}>What readers say</button>
          </div>
          <div className="overflow-y-auto p-4">
            {tab === 'write' ? (
              <FeedbackForm compact onSent={() => setRefresh((n) => n + 1)} />
            ) : (
              <FeedbackList limit={4} refreshKey={refresh} showAllLink />
            )}
            <Link href="/feedback" className="mt-4 block text-center font-cinzel-reg text-[10px] uppercase tracking-[2px] text-[#8b1a00]/70 underline">
              Open the full feedback page
            </Link>
          </div>
        </div>
      )}
      <button
        ref={btn}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Close feedback' : 'Give feedback'}
        className="flex h-11 w-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#8b1a00] to-[#c2410c] font-cinzel-reg text-[11px] uppercase tracking-[2px] text-white shadow-lg ring-1 ring-white/30 transition hover:brightness-110 sm:h-auto sm:w-auto sm:px-4 sm:py-2.5"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 5h16v11H9l-5 4z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
        <span className="hidden sm:inline">Feedback</span>
      </button>
    </div>
  );
}
