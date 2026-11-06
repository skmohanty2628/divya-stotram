'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// First-party, anonymous visit tracking. It counts page views and the seconds a page was open, visible and in use
// (no clicks, keys or scrolling for a minute counts as idle). It sends a random id kept on this device and no personal data.
// It does nothing when the browser sends Do Not Track or Global Privacy Control, and never runs in the admin area.
const IDLE_MS = 60_000;
const FLUSH_MS = 15_000;

function visitorId() {
  try {
    let id = localStorage.getItem('ds_vid');
    if (!id || !/^[a-f0-9]{16,32}$/.test(id)) {
      const a = new Uint8Array(12);
      crypto.getRandomValues(a);
      id = Array.from(a, (b) => b.toString(16).padStart(2, '0')).join('');
      localStorage.setItem('ds_vid', id);
    }
    return id;
  } catch {
    return null;
  }
}

function send(payload) {
  try {
    const data = JSON.stringify(payload);
    if (navigator.sendBeacon && navigator.sendBeacon('/api/track', new Blob([data], { type: 'text/plain' }))) return;
    fetch('/api/track', { method: 'POST', body: data, keepalive: true, headers: { 'Content-Type': 'text/plain' } }).catch(() => {});
  } catch {
    // Tracking must never break the page.
  }
}

export default function VisitTracker() {
  const pathname = usePathname();
  const state = useRef({ path: null, secs: 0, lastActive: 0, vid: null, optOut: false });

  // Timer and listeners, set up once.
  useEffect(() => {
    const s = state.current;
    s.optOut = navigator.doNotTrack === '1' || window.doNotTrack === '1' || navigator.globalPrivacyControl === true;
    if (s.optOut) return undefined;
    s.vid = visitorId();
    if (!s.vid) return undefined;
    s.lastActive = Date.now();

    const touch = () => { s.lastActive = Date.now(); };
    const tick = setInterval(() => {
      if (document.visibilityState === 'visible' && Date.now() - s.lastActive < IDLE_MS) s.secs += 1;
    }, 1000);
    const flush = () => {
      if (!s.path || s.secs < 1) return;
      send({ v: s.vid, p: s.path, s: s.secs });
      s.secs = 0;
    };
    const flushTimer = setInterval(flush, FLUSH_MS);
    const onHide = () => { if (document.visibilityState === 'hidden') flush(); };
    const events = ['pointerdown', 'keydown', 'scroll', 'touchstart', 'mousemove'];
    events.forEach((e) => window.addEventListener(e, touch, { passive: true }));
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('pagehide', flush);
    return () => {
      clearInterval(tick);
      clearInterval(flushTimer);
      events.forEach((e) => window.removeEventListener(e, touch));
      document.removeEventListener('visibilitychange', onHide);
      window.removeEventListener('pagehide', flush);
    };
  }, []);

  // A new page: send leftover seconds for the old page, then count the new view.
  useEffect(() => {
    const s = state.current;
    if (s.optOut || !s.vid || !pathname || pathname.startsWith('/admin')) return;
    if (s.path && s.secs > 0) send({ v: s.vid, p: s.path, s: s.secs });
    s.secs = 0;
    s.path = pathname;
    s.lastActive = Date.now();
    let ref = '';
    try {
      if (document.referrer) {
        const h = new URL(document.referrer).hostname.replace(/^www\./, '');
        if (h && h !== window.location.hostname.replace(/^www\./, '')) ref = h;
      }
    } catch {
      ref = '';
    }
    const w = window.innerWidth;
    send({ v: s.vid, p: pathname, n: 1, d: w < 768 ? 'm' : w < 1100 ? 't' : 'd', r: ref });
  }, [pathname]);

  return null;
}
