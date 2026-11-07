'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

export function Stars({ value = 0, size = 16, onChange, label = 'Rating' }) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  const interactive = typeof onChange === 'function';
  return (
    <span className="inline-flex items-center gap-0.5" role={interactive ? 'radiogroup' : 'img'} aria-label={interactive ? label : `${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const on = n <= shown;
        const star = (
          <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={on ? 'text-[#e8a317]' : 'text-[#8a5f00]'}>
            <path fill="currentColor" d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" />
          </svg>
        );
        return interactive ? (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} star${n > 1 ? 's' : ''}`}
            onClick={() => onChange(value === n ? 0 : n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            className="rounded p-0.5 transition hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b1a00]"
          >
            {star}
          </button>
        ) : (
          <span key={n}>{star}</span>
        );
      })}
    </span>
  );
}

function pageLabel(p) {
  if (!p || p === '/') return 'Home page';
  return p.replace(/^\//, '').replace(/[-/]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 48);
}

function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return '';
  }
}

export function FeedbackForm({ onSent, compact = false }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const started = useRef(0);

  useEffect(() => {
    started.current = Date.now();
    try {
      const n = localStorage.getItem('ds_feedback_name');
      if (n) setName(n);
    } catch {}
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setError('');
    if (message.trim().length < 10) {
      setError('Please write at least 10 characters.');
      return;
    }
    setBusy(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          rating,
          message,
          website,
          elapsed: Date.now() - started.current,
          page: window.location.pathname,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setError(data.error || 'Sorry, something went wrong. Please try again.');
      } else {
        try {
          if (name.trim()) localStorage.setItem('ds_feedback_name', name.trim());
        } catch {}
        setSent(true);
        setMessage('');
        setRating(0);
        if (onSent) onSent();
      }
    } catch {
      setError('Network problem. Please check your connection and try again.');
    }
    setBusy(false);
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-[#c9922a]/30 bg-[#fffaf1] p-5 text-center">
        <p className="font-cinzel text-lg font-bold text-[#8b1a00]">Thank you</p>
        <p className="mt-2 font-garamond text-lg leading-snug text-[#3d1a00]/80">
          Your message is now visible to other readers. We read every note and reply where we can.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            started.current = Date.now();
          }}
          className="mt-3 font-cinzel-reg text-[11px] uppercase tracking-[2px] text-[#8b1a00] underline"
        >
          Write another
        </button>
      </div>
    );
  }

  const field =
    'w-full rounded-xl border border-[#c9922a]/40 bg-white px-3 py-2 font-garamond text-lg text-[#3d1a00] placeholder:text-[#3d1a00]/40 focus:border-[#8b1a00] focus:outline-none focus:ring-1 focus:ring-[#8b1a00]';
  return (
    <form onSubmit={submit} className="space-y-3" noValidate>
      <div>
        <p className="mb-1 font-cinzel-reg text-[10px] uppercase tracking-[3px] text-[#8b1a00]/70">How would you rate your experience?</p>
        <Stars value={rating} onChange={setRating} size={26} label="Your rating" />
      </div>
      <div>
        <label htmlFor={`fb-msg-${compact ? 'w' : 'p'}`} className="mb-1 block font-cinzel-reg text-[10px] uppercase tracking-[3px] text-[#8b1a00]/70">
          Your feedback or opinion
        </label>
        <textarea
          id={`fb-msg-${compact ? 'w' : 'p'}`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={800}
          rows={compact ? 4 : 5}
          placeholder="What did you find helpful? What could be better? Which prayer or guide would you like to see next?"
          className={`${field} resize-y`}
          required
        />
        <p className="mt-0.5 text-right font-garamond text-xs text-[#3d1a00]/50">{message.length}/800</p>
      </div>
      <div className="space-y-3">
        <div>
          <label htmlFor={`fb-name-${compact ? 'w' : 'p'}`} className="mb-1 block font-cinzel-reg text-[10px] uppercase tracking-[3px] text-[#8b1a00]/70">
            Name (optional)
          </label>
          <input id={`fb-name-${compact ? 'w' : 'p'}`} value={name} onChange={(e) => setName(e.target.value)} maxLength={40} placeholder="Shown with your message" className={field} autoComplete="name" />
        </div>
        <div>
          <label htmlFor={`fb-mail-${compact ? 'w' : 'p'}`} className="mb-1 block font-cinzel-reg text-[10px] uppercase tracking-[3px] text-[#8b1a00]/70">
            Email (optional, private)
          </label>
          <input id={`fb-mail-${compact ? 'w' : 'p'}`} type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={120} placeholder="Never shown on the site" className={field} autoComplete="email" />
        </div>
      </div>
      {/* Honeypot: real visitors never see or fill this. */}
      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </label>
      </div>
      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 font-garamond text-base text-red-800">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-full bg-gradient-to-r from-[#8b1a00] to-[#c2410c] px-5 py-2.5 font-cinzel-reg text-xs uppercase tracking-[3px] text-white shadow transition hover:brightness-110 disabled:opacity-60"
      >
        {busy ? 'Sending...' : 'Send feedback'}
      </button>
      <p className="font-garamond text-sm leading-snug text-[#3d1a00]/60">
        Messages are public so other readers can see them. Please do not include links or personal details.
      </p>
    </form>
  );
}

export function FeedbackList({ limit, refreshKey = 0, showAllLink = false }) {
  const [state, setState] = useState({ loading: true, items: [], total: 0, average: 0, ratingCount: 0, failed: false });

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/feedback', { cache: 'no-store' });
      const data = await res.json();
      setState({
        loading: false,
        items: data.items || [],
        total: data.total || 0,
        average: data.average || 0,
        ratingCount: data.ratingCount || 0,
        failed: !data.ok,
      });
    } catch {
      setState((s) => ({ ...s, loading: false, failed: true }));
    }
  }, []);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  if (state.loading) return <p className="py-6 text-center font-garamond text-lg text-[#3d1a00]/60">Loading what readers say...</p>;
  if (state.failed && !state.items.length) {
    return <p className="py-6 text-center font-garamond text-lg text-[#3d1a00]/60">Reader feedback could not be loaded right now.</p>;
  }
  if (!state.items.length) {
    return <p className="py-6 text-center font-garamond text-lg text-[#3d1a00]/70">No feedback yet. Be the first to share your thoughts.</p>;
  }

  const items = limit ? state.items.slice(0, limit) : state.items;
  return (
    <div>
      {state.ratingCount > 0 && (
        <div className="mb-3 flex flex-wrap items-center gap-3 rounded-xl bg-[#fffaf1] px-4 py-3">
          <span className="font-cinzel text-3xl font-bold text-[#8b1a00]">{state.average.toFixed(1)}</span>
          <div>
            <Stars value={Math.round(state.average)} size={18} />
            <p className="font-garamond text-sm text-[#3d1a00]/70">
              from {state.ratingCount} rating{state.ratingCount > 1 ? 's' : ''} · {state.total} message{state.total > 1 ? 's' : ''}
            </p>
          </div>
        </div>
      )}
      <ul className="space-y-3">
        {items.map((f) => (
          <li
            key={f.id}
            className={`rounded-2xl border p-4 ${f.highlighted ? 'border-[#c9922a] bg-gradient-to-br from-[#fff6df] to-white shadow-sm' : 'border-[#c9922a]/25 bg-white'}`}
          >
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gradient-to-br from-[#8b1a00] to-[#e8760a] font-cinzel text-sm font-bold text-white" aria-hidden="true">
                {(f.name || 'D').trim().charAt(0).toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <p className="font-cinzel text-sm font-bold text-[#8b1a00]">{f.name}</p>
                  {f.highlighted && (
                    <span className="rounded-full bg-[#c9922a]/20 px-2 py-0.5 font-cinzel-reg text-[9px] uppercase tracking-[2px] text-[#8b5a00]">Featured</span>
                  )}
                  {f.rating > 0 && <Stars value={f.rating} size={13} />}
                </div>
                <p className="font-cinzel-reg text-[10px] uppercase tracking-[1.5px] text-[#3d1a00]/45">
                  {fmtDate(f.createdAt)}
                  {f.page ? (
                    <>
                      {' '}
                      · on{' '}
                      <Link href={f.page} className="underline decoration-[#c9922a]/50">
                        {pageLabel(f.page)}
                      </Link>
                    </>
                  ) : null}
                </p>
                <p className="mt-2 whitespace-pre-line break-words font-garamond text-lg leading-snug text-[#3d1a00]/90">{f.message}</p>
                {f.reply && (
                  <div className="mt-3 rounded-xl border-l-4 border-[#8b1a00] bg-[#8b1a00]/5 px-3 py-2">
                    <p className="font-cinzel-reg text-[10px] uppercase tracking-[2px] text-[#8b1a00]">Reply from Divya Stotram</p>
                    <p className="mt-1 whitespace-pre-line break-words font-garamond text-lg leading-snug text-[#3d1a00]/90">{f.reply.text}</p>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      {showAllLink && state.total > items.length && (
        <Link href="/feedback" className="mt-3 block text-center font-cinzel-reg text-[11px] uppercase tracking-[2px] text-[#8b1a00] underline">
          See all {state.total} messages
        </Link>
      )}
    </div>
  );
}
