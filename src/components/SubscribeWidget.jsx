'use client';

import { useEffect, useState } from 'react';
import { X, Mail, Flame, Bell } from 'lucide-react';

// ─── Popup: shows once per session after 15s ──────────────────────────────────
export function SubscribePopup() {
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Don't show if already subscribed
    if (typeof window === 'undefined') return;
    if (localStorage.getItem('divya_subscribed')) return;
    if (sessionStorage.getItem('divya_popup_shown')) return;

    const timer = setTimeout(() => {
      setShow(true);
      sessionStorage.setItem('divya_popup_shown', 'true');
    }, 15000); // 15 seconds delay

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async () => {
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (data.ok) {
        localStorage.setItem('divya_subscribed', 'true');
        localStorage.setItem('divya_subscriber_email', email.trim());
        setSubmitted(true);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-end justify-center sm:items-center px-4 pb-6 sm:pb-0">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setShow(false)}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md rounded-[28px] border border-[#c9922a]/30 bg-gradient-to-br from-[#1a0505] via-[#1f0a0a] to-[#120202] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(201,146,42,0.15)]">
        {/* Close */}
        <button
          onClick={() => setShow(false)}
          className="absolute right-4 top-4 rounded-full p-1.5 text-[#c9922a]/50 transition-colors hover:text-[#c9922a]"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {!submitted ? (
          <>
            {/* Header */}
            <div className="mb-5 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#c9922a]/20 bg-[#c9922a]/10">
                <Flame size={22} className="text-[#f0c040]" />
              </div>
              <div>
                <h3 className="font-cinzel text-lg font-bold text-[#f0c040]">
                  Keep Your Streak Alive 🔥
                </h3>
                <p className="mt-1 font-garamond text-sm leading-5 text-[#e8d5b5]/70">
                  Get a daily devotional reminder so you never miss your prayer streak.
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-5 space-y-2">
              {[
                'Daily stotram reminder to maintain your streak',
                'New mantras, prayers & devotional content',
                'Spiritual tips & auspicious day alerts',
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[#f0c040] text-xs">✦</span>
                  <span className="font-garamond text-sm text-[#e8d5b5]/80">{b}</span>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="your@email.com"
                className="flex-1 rounded-xl border border-[#c9922a]/30 bg-[#0d0000] px-4 py-2.5 font-garamond text-sm text-[#e8d5b5] placeholder-[#e8d5b5]/30 focus:border-[#f0c040]/60 focus:outline-none"
              />
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="rounded-xl bg-gradient-to-r from-[#c9922a] to-[#f0c040] px-4 py-2.5 font-cinzel text-xs font-bold tracking-wider text-[#0d0000] transition-all hover:scale-105 disabled:opacity-60"
              >
                {loading ? '...' : 'Join'}
              </button>
            </div>

            {error && (
              <p className="mt-2 font-garamond text-xs text-red-400">{error}</p>
            )}

            <p className="mt-3 text-center font-cinzel-reg text-[9px] uppercase tracking-[1.8px] text-[#c9922a]/40">
              Unsubscribe anytime · No spam · Sacred only 🕉️
            </p>
          </>
        ) : (
          <div className="py-4 text-center">
            <div className="mb-3 text-4xl">🙏</div>
            <h3 className="font-cinzel text-lg font-bold text-[#f0c040]">Jai Shri Ram!</h3>
            <p className="mt-2 font-garamond text-sm text-[#e8d5b5]/75">
              You&apos;re subscribed! Your daily devotional reminders will help keep your streak alive. 🔥
            </p>
            <button
              onClick={() => setShow(false)}
              className="mt-4 rounded-full border border-[#c9922a]/30 px-5 py-2 font-cinzel-reg text-[10px] tracking-widest text-[#c9922a]"
            >
              Continue Reading
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Inline widget: embeds in any page ───────────────────────────────────────
export function SubscribeInline() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('divya_subscribed')) {
      setSubmitted(true);
    }
  }, []);

  const handleSubmit = async () => {
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (data.ok) {
        localStorage.setItem('divya_subscribed', 'true');
        localStorage.setItem('divya_subscriber_email', email.trim());
        setSubmitted(true);
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-8 rounded-[24px] border border-[#c9922a]/25 bg-gradient-to-br from-[#1a0505] via-[#1c0808] to-[#120202] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
      {!submitted ? (
        <>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#c9922a]/20 bg-[#c9922a]/10">
              <Bell size={16} className="text-[#f0c040]" />
            </div>
            <div>
              <h4 className="font-cinzel text-base font-bold text-[#f0c040]">
                Daily Devotional Reminders 🔥
              </h4>
              <p className="font-garamond text-xs text-[#e8d5b5]/60">
                Never miss a day. Keep your prayer streak alive.
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Enter your email address"
              className="flex-1 rounded-xl border border-[#c9922a]/30 bg-[#0d0000] px-4 py-2.5 font-garamond text-sm text-[#e8d5b5] placeholder-[#e8d5b5]/30 focus:border-[#f0c040]/60 focus:outline-none"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="rounded-xl bg-gradient-to-r from-[#c9922a] to-[#f0c040] px-5 py-2.5 font-cinzel text-xs font-bold tracking-wider text-[#0d0000] transition-all hover:scale-105 disabled:opacity-60"
            >
              {loading ? '...' : 'Subscribe'}
            </button>
          </div>

          {error && <p className="mt-2 font-garamond text-xs text-red-400">{error}</p>}
          <p className="mt-2 font-cinzel-reg text-[9px] uppercase tracking-[1.5px] text-[#c9922a]/40">
            Free · No spam · Unsubscribe anytime
          </p>
        </>
      ) : (
        <div className="flex items-center gap-4">
          <div className="text-3xl">🙏</div>
          <div>
            <p className="font-cinzel text-base font-bold text-[#f0c040]">You&apos;re all set!</p>
            <p className="font-garamond text-sm text-[#e8d5b5]/70">
              Daily reminders will help you maintain your devotional streak 🔥
            </p>
          </div>
        </div>
      )}
    </div>
  );
}