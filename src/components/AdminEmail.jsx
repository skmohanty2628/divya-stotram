'use client';

import { useCallback, useEffect, useState } from 'react';

const btn =
  'rounded-full border px-4 py-2 font-cinzel-reg text-[10px] uppercase tracking-[2px] transition-colors disabled:opacity-50';

export default function AdminEmail() {
  const [info, setInfo] = useState(null);
  const [err, setErr] = useState('');
  const [testTo, setTestTo] = useState('');
  const [busy, setBusy] = useState('');
  const [confirmAll, setConfirmAll] = useState(false);
  const [result, setResult] = useState(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/send-daily', { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not load email settings.');
      setInfo(data);
      setErr('');
    } catch (e) {
      setErr(e.message || 'Could not load email settings.');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const send = async (mode) => {
    setBusy(mode);
    setResult(null);
    try {
      const res = await fetch('/api/admin/send-daily', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, email: testTo }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setResult({ ok: false, error: e.message || 'Request failed.' });
    }
    setBusy('');
    setConfirmAll(false);
  };

  return (
    <div className="rounded-2xl border border-[#c9922a]/25 bg-[#1a0505] p-5 text-[#e8d5b5]">
      {err && <p className="mb-3 text-sm text-red-300">{err}</p>}
      {info && (
        <ul className="mb-4 space-y-1 text-sm">
          <li>Subscribers: <strong className="text-[#f0c040]">{info.subscribers}</strong></li>
          <li>Sender: <span className="text-[#f0c040]">{info.from}</span></li>
          <li>Resend key: {info.hasResendKey ? 'set' : <span className="text-red-300">missing</span>}</li>
          <li>Daily schedule secret (CRON_SECRET): {info.hasCronSecret ? 'set' : <span className="text-red-300">missing, the daily schedule will be refused</span>}</li>
        </ul>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <input
          type="email"
          value={testTo}
          onChange={(e) => setTestTo(e.target.value)}
          placeholder="your email for a test"
          className="min-w-[220px] flex-1 rounded-full border border-[#c9922a]/30 bg-[#0d0000] px-4 py-2 text-sm text-[#e8d5b5] outline-none focus:border-[#c9922a]"
        />
        <button type="button" disabled={!testTo || !!busy} onClick={() => send('test')} className={`${btn} border-[#c9922a] text-[#f0c040] hover:bg-[#c9922a]/15`}>
          {busy === 'test' ? 'Sending...' : 'Send test to me'}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {!confirmAll ? (
          <button type="button" disabled={!!busy || !info?.subscribers} onClick={() => setConfirmAll(true)} className={`${btn} border-[#c9922a] bg-[#c9922a]/15 text-[#f0c040] hover:bg-[#c9922a]/30`}>
            Send today&apos;s email to all subscribers
          </button>
        ) : (
          <>
            <span className="text-sm">Send to all {info?.subscribers} subscribers now?</span>
            <button type="button" disabled={!!busy} onClick={() => send('all')} className={`${btn} border-red-400 text-red-200 hover:bg-red-500/20`}>
              {busy === 'all' ? 'Sending...' : 'Yes, send'}
            </button>
            <button type="button" disabled={!!busy} onClick={() => setConfirmAll(false)} className={`${btn} border-[#c9922a]/40 text-[#e8d5b5]`}>
              Cancel
            </button>
          </>
        )}
      </div>

      {result && (
        <div className={`mt-4 rounded-xl border p-3 text-sm ${result.ok ? 'border-green-500/40 bg-green-500/10' : 'border-red-400/40 bg-red-500/10'}`}>
          {result.error && <p>Error: {result.error}</p>}
          {typeof result.sent === 'number' && (
            <p>
              {result.stotram ? `${result.stotram}: ` : ''}sent {result.sent} of {result.total}, failed {result.failed}.
            </p>
          )}
          {result.message && <p>{result.message}</p>}
          {Array.isArray(result.errors) && result.errors.length > 0 && (
            <ul className="mt-1 list-disc pl-5 text-red-200">
              {result.errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      <p className="mt-4 text-xs text-[#e8d5b5]/60">
        The same email is sent automatically once a day at about 6:30 AM India time. Resend&apos;s free plan allows 100 emails a day and 3,000 a month.
      </p>
    </div>
  );
}
