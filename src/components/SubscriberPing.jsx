'use client';

import { useEffect } from 'react';

// Counts a reading day for subscribers. It runs at most once a day, only when the visitor has a private reader id,
// which comes from signing up on this device or from opening a link in the daily email.
export default function SubscriberPing() {
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const r = url.searchParams.get('r');
      if (r && /^[a-f0-9]{24}$/.test(r)) {
        localStorage.setItem('ds_sid', r);
        url.searchParams.delete('r');
        window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
      }
      const sid = localStorage.getItem('ds_sid');
      if (!sid) return;
      const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
      if (localStorage.getItem('ds_ping') === today) return;
      fetch('/api/streak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sid }),
      })
        .then((res) => res.json())
        .then((d) => {
          if (d && d.ok) localStorage.setItem('ds_ping', today);
        })
        .catch(() => {});
    } catch {
      // Private mode or blocked storage: the streak is simply not counted.
    }
  }, []);

  return null;
}
