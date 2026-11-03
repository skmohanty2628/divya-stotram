'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

function fmt(iso) {
  try {
    return new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' });
  } catch {
    return '';
  }
}

const btn =
  'rounded-full border px-3 py-1 font-cinzel-reg text-[9px] uppercase tracking-[1.5px] transition-colors disabled:opacity-50';

export default function AdminFeedback() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [busyId, setBusyId] = useState('');
  const [replyFor, setReplyFor] = useState('');
  const [replyText, setReplyText] = useState('');
  const [confirmDel, setConfirmDel] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/feedback', { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Could not load feedback.');
      setItems(data.items || []);
      setError('');
    } catch (e) {
      setError(e.message || 'Could not load feedback.');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const act = async (id, action, extra = {}) => {
    setBusyId(id);
    try {
      const res = await fetch('/api/admin/feedback', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action, ...extra }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Update failed.');
      await load();
    } catch (e) {
      setError(e.message || 'Update failed.');
    }
    setBusyId('');
  };

  const remove = async (id) => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/feedback?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Delete failed.');
      setConfirmDel('');
      await load();
    } catch (e) {
      setError(e.message || 'Delete failed.');
    }
    setBusyId('');
  };

  const stats = useMemo(() => {
    const rated = items.filter((i) => i.rating > 0);
    return {
      total: items.length,
      visible: items.filter((i) => i.status === 'visible').length,
      hidden: items.filter((i) => i.status === 'hidden').length,
      featured: items.filter((i) => i.highlighted).length,
      unanswered: items.filter((i) => !i.reply).length,
      avg: rated.length ? (rated.reduce((s, i) => s + i.rating, 0) / rated.length).toFixed(1) : '-',
    };
  }, [items]);

  const shown = items.filter((i) => {
    if (filter === 'visible') return i.status === 'visible';
    if (filter === 'hidden') return i.status === 'hidden';
    if (filter === 'featured') return i.highlighted;
    if (filter === 'unanswered') return !i.reply;
    return true;
  });

  const chip = (id, label) => (
    <button
      key={id}
      type="button"
      onClick={() => setFilter(id)}
      className={`${btn} ${filter === id ? 'border-[#c9922a] bg-[#c9922a]/20 text-[#f0c040]' : 'border-[#c9922a]/20 text-[#c9922a]/70 hover:text-[#c9922a]'}`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {chip('all', `All ${stats.total}`)}
          {chip('unanswered', `No reply ${stats.unanswered}`)}
          {chip('visible', `Visible ${stats.visible}`)}
          {chip('hidden', `Hidden ${stats.hidden}`)}
          {chip('featured', `Featured ${stats.featured}`)}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-garamond text-sm text-[#e8d5b5]/60">Average rating: {stats.avg}</span>
          <button type="button" onClick={load} disabled={loading} className={`${btn} border-[#c9922a]/20 text-[#c9922a]/80 hover:text-[#c9922a]`}>
            {loading ? 'Loading' : 'Refresh'}
          </button>
        </div>
      </div>

      {error && <p className="mb-3 rounded-2xl border border-red-900/40 bg-red-950/40 px-4 py-2 font-garamond text-sm text-red-300">{error}</p>}

      {!loading && !shown.length && (
        <div className="rounded-3xl border border-[#c9922a]/15 bg-[#1a0505]/95 p-5">
          <p className="font-garamond text-sm italic text-[#e8d5b5]/45">
            {items.length ? 'No messages match this filter.' : 'No feedback yet. Messages appear here as soon as a visitor sends one.'}
          </p>
        </div>
      )}

      <ul className="space-y-3">
        {shown.map((f) => {
          const busy = busyId === f.id;
          return (
            <li key={f.id} className={`rounded-3xl border bg-[#1a0505]/95 p-4 ${f.highlighted ? 'border-[#c9922a]/60' : 'border-[#c9922a]/15'} ${f.status === 'hidden' ? 'opacity-70' : ''}`}>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-cinzel text-sm font-bold text-[#f0c040]">{f.name}</p>
                {f.rating > 0 && <span className="text-sm text-[#e8a317]" aria-label={`${f.rating} stars`}>{'★'.repeat(f.rating)}{'☆'.repeat(5 - f.rating)}</span>}
                {f.highlighted && <span className="rounded-full bg-[#c9922a]/20 px-2 py-0.5 font-cinzel-reg text-[9px] uppercase tracking-[1.5px] text-[#f0c040]">Featured</span>}
                {f.status === 'hidden' && <span className="rounded-full bg-red-900/40 px-2 py-0.5 font-cinzel-reg text-[9px] uppercase tracking-[1.5px] text-red-300">Hidden from public</span>}
              </div>
              <p className="mt-0.5 font-garamond text-xs text-[#e8d5b5]/45">
                {fmt(f.createdAt)}
                {f.page ? <> · on <a href={f.page} target="_blank" rel="noopener noreferrer" className="underline">{f.page}</a></> : null}
                {f.email ? <> · <a href={`mailto:${f.email}`} className="underline">{f.email}</a></> : null}
              </p>
              <p className="mt-2 whitespace-pre-line break-words font-garamond text-base text-[#e8d5b5]/90">{f.message}</p>

              {f.reply && replyFor !== f.id && (
                <div className="mt-3 rounded-2xl border-l-4 border-[#c9922a] bg-[#c9922a]/10 px-3 py-2">
                  <p className="font-cinzel-reg text-[9px] uppercase tracking-[2px] text-[#c9922a]">Your reply ({fmt(f.reply.at)})</p>
                  <p className="mt-1 whitespace-pre-line break-words font-garamond text-base text-[#e8d5b5]/90">{f.reply.text}</p>
                </div>
              )}

              {replyFor === f.id && (
                <div className="mt-3">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    maxLength={1000}
                    rows={3}
                    placeholder="Write a public reply. It appears under the visitor's message."
                    className="w-full rounded-2xl border border-[#c9922a]/30 bg-[#0d0202] px-3 py-2 font-garamond text-base text-[#e8d5b5] placeholder:text-[#e8d5b5]/30 focus:border-[#c9922a] focus:outline-none"
                  />
                  <div className="mt-2 flex gap-2">
                    <button type="button" disabled={busy || !replyText.trim()} onClick={async () => { await act(f.id, 'reply', { reply: replyText }); setReplyFor(''); setReplyText(''); }} className={`${btn} border-green-700/60 text-green-300 hover:bg-green-900/30`}>
                      Post reply
                    </button>
                    <button type="button" onClick={() => { setReplyFor(''); setReplyText(''); }} className={`${btn} border-[#c9922a]/20 text-[#c9922a]/70`}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-3 flex flex-wrap gap-2">
                <button type="button" disabled={busy} onClick={() => { setReplyFor(f.id); setReplyText(f.reply ? f.reply.text : ''); }} className={`${btn} border-[#c9922a]/40 text-[#c9922a] hover:bg-[#c9922a]/10`}>
                  {f.reply ? 'Edit reply' : 'Reply'}
                </button>
                {f.reply && (
                  <button type="button" disabled={busy} onClick={() => act(f.id, 'clearReply')} className={`${btn} border-[#c9922a]/20 text-[#c9922a]/70 hover:text-[#c9922a]`}>
                    Remove reply
                  </button>
                )}
                <button type="button" disabled={busy} onClick={() => act(f.id, f.highlighted ? 'unhighlight' : 'highlight')} className={`${btn} border-[#c9922a]/40 text-[#f0c040] hover:bg-[#c9922a]/10`}>
                  {f.highlighted ? 'Remove highlight' : 'Highlight'}
                </button>
                <button type="button" disabled={busy} onClick={() => act(f.id, f.status === 'hidden' ? 'show' : 'hide')} className={`${btn} border-[#c9922a]/40 text-[#c9922a] hover:bg-[#c9922a]/10`}>
                  {f.status === 'hidden' ? 'Show publicly' : 'Hide'}
                </button>
                {confirmDel === f.id ? (
                  <>
                    <button type="button" disabled={busy} onClick={() => remove(f.id)} className={`${btn} border-red-600/70 bg-red-900/40 text-red-200`}>
                      Confirm delete
                    </button>
                    <button type="button" onClick={() => setConfirmDel('')} className={`${btn} border-[#c9922a]/20 text-[#c9922a]/70`}>
                      Keep
                    </button>
                  </>
                ) : (
                  <button type="button" disabled={busy} onClick={() => setConfirmDel(f.id)} className={`${btn} border-red-900/60 text-red-400/90 hover:bg-red-950/40`}>
                    Delete
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
