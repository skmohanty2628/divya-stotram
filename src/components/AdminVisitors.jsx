'use client';

import { useCallback, useEffect, useState } from 'react';

function dur(secs) {
  const s = Math.max(0, Math.round(secs || 0));
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const r = s % 60;
  if (m < 60) return `${m}m ${String(r).padStart(2, '0')}s`;
  return `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, '0')}m`;
}

function clock(ms) {
  if (!ms) return '';
  try {
    return new Date(ms).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/New_York' });
  } catch {
    return '';
  }
}

function flag(code) {
  if (!code || code.length !== 2) return '';
  return String.fromCodePoint(...[...code.toUpperCase()].map((c) => 127397 + c.charCodeAt(0)));
}

const DEVICE = { m: 'Mobile', t: 'Tablet', d: 'Desktop' };
const chip =
  'rounded-full border px-3 py-1 font-cinzel-reg text-[9px] uppercase tracking-[1.5px] transition-colors';

function Tile({ label, value, sub }) {
  return (
    <div className="rounded-2xl border border-[#c9922a]/20 bg-[#1a0505]/95 p-4">
      <div className="font-cinzel-reg text-[9px] uppercase tracking-[2px] text-[#e8d5b5]/40">{label}</div>
      <div className="mt-1 font-cinzel text-2xl font-bold text-[#f0c040]">{value}</div>
      {sub ? <div className="mt-0.5 font-garamond text-xs text-[#e8d5b5]/55">{sub}</div> : null}
    </div>
  );
}

export default function AdminVisitors() {
  const [data, setData] = useState(null);
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState('');
  const [q, setQ] = useState('');

  const load = useCallback(async (d) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/visitors${d ? `?date=${d}` : ''}`, { cache: 'no-store' });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || 'Could not load visitor data.');
      setData(json);
      setDate(json.date);
      setError('');
    } catch (e) {
      setError(e.message || 'Could not load visitor data.');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load('');
  }, [load]);

  const dates = data ? Array.from(new Set([data.date, ...(data.dates || [])])).sort().reverse().slice(0, 14) : [];
  const visitors = (data?.visitors || []).filter((v) => !q || v.pages.some((p) => p.path.toLowerCase().includes(q.toLowerCase())));
  const t = data?.totals;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {dates.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => load(d)}
            className={`${chip} ${d === date ? 'border-[#f0c040] bg-[#f0c040]/10 text-[#f0c040]' : 'border-[#c9922a]/25 text-[#e8d5b5]/60 hover:text-[#f0c040]'}`}
          >
            {d.slice(5)}
          </button>
        ))}
        <button type="button" onClick={() => load(date)} className={`${chip} border-[#c9922a]/25 text-[#e8d5b5]/60 hover:text-[#f0c040]`}>
          {loading ? 'Loading' : 'Refresh'}
        </button>
      </div>

      {error ? <p className="font-garamond text-sm text-red-300">{error}</p> : null}

      {t ? (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Tile label="Visitors" value={t.visitors} sub={`${t.singlePage} saw one page only`} />
            <Tile label="Page views" value={t.views} sub="Counted by the site's own tracker" />
            <Tile label="Avg time per visitor" value={dur(t.avgSecsPerVisitor)} sub={`Total ${dur(t.secs)}`} />
            <Tile label="Pages per visitor" value={t.avgPagesPerVisitor} sub="Views divided by visitors" />
          </div>

          {t.visitors === 0 ? (
            <div className="rounded-3xl border border-[#c9922a]/15 bg-[#1a0505]/95 p-5">
              <p className="font-garamond text-sm italic text-[#e8d5b5]/50">
                No visits recorded for this day. The tracker starts counting from the day it was deployed. If today stays empty after you have opened the
                site in another tab, check that the Firebase database rules allow reads and writes on the &quot;visits&quot; node.
              </p>
            </div>
          ) : (
            <>
              <div className="rounded-3xl border border-[#c9922a]/20 bg-[#1a0505]/95 p-4">
                <h3 className="mb-2 font-cinzel text-sm font-bold text-[#f0c040]">Pages where visitors spend the most time</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-garamond text-sm text-[#e8d5b5]/80">
                    <thead>
                      <tr className="text-[#e8d5b5]/40">
                        <th className="py-1 pr-3 font-cinzel-reg text-[9px] uppercase tracking-[1.5px]">Page</th>
                        <th className="py-1 pr-3 font-cinzel-reg text-[9px] uppercase tracking-[1.5px]">Visitors</th>
                        <th className="py-1 pr-3 font-cinzel-reg text-[9px] uppercase tracking-[1.5px]">Views</th>
                        <th className="py-1 pr-3 font-cinzel-reg text-[9px] uppercase tracking-[1.5px]">Total time</th>
                        <th className="py-1 font-cinzel-reg text-[9px] uppercase tracking-[1.5px]">Avg per visitor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.topPages.map((p) => (
                        <tr key={p.path} className="border-t border-white/5">
                          <td className="max-w-[260px] truncate py-1.5 pr-3">{p.path}</td>
                          <td className="py-1.5 pr-3">{p.visitors}</td>
                          <td className="py-1.5 pr-3">{p.views}</td>
                          <td className="py-1.5 pr-3">{dur(p.secs)}</td>
                          <td className="py-1.5">{dur(p.avgSecs)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-3xl border border-[#c9922a]/20 bg-[#1a0505]/95 p-4">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-cinzel text-sm font-bold text-[#f0c040]">Each visitor, longest stay first</h3>
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Filter by page, e.g. hanuman"
                    className="w-56 rounded-full border border-[#c9922a]/25 bg-black/30 px-3 py-1.5 font-garamond text-sm text-[#e8d5b5] placeholder:text-[#e8d5b5]/30 focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  {visitors.map((v, i) => {
                    const k = `${v.id}-${i}`;
                    const isOpen = open === k;
                    return (
                      <div key={k} className="rounded-2xl border border-white/5 bg-white/[0.02]">
                        <button type="button" onClick={() => setOpen(isOpen ? '' : k)} className="flex w-full flex-wrap items-center gap-x-4 gap-y-1 px-3 py-2 text-left">
                          <span className="font-cinzel text-xs text-[#f0c040]">Visitor {v.id}</span>
                          <span className="font-garamond text-sm text-[#e8d5b5]/70">
                            {flag(v.country)} {v.country || 'Unknown'} , {DEVICE[v.device] || 'Desktop'}
                          </span>
                          <span className="font-garamond text-sm text-[#e8d5b5]/70">{v.views} page{v.views === 1 ? '' : 's'}</span>
                          <span className="font-garamond text-sm text-[#e8d5b5]/70">{dur(v.secs)} total</span>
                          <span className="font-garamond text-xs text-[#e8d5b5]/40">
                            {clock(v.first)}{v.last && v.last !== v.first ? ` to ${clock(v.last)}` : ''} ET{v.ref ? `, from ${v.ref}` : ''}
                          </span>
                          <span className="ml-auto font-cinzel-reg text-[9px] uppercase tracking-[1.5px] text-[#c9922a]/60">{isOpen ? 'Hide' : 'Pages'}</span>
                        </button>
                        {isOpen ? (
                          <div className="border-t border-white/5 px-3 py-2">
                            <table className="w-full text-left font-garamond text-sm text-[#e8d5b5]/80">
                              <tbody>
                                {v.pages.map((p) => (
                                  <tr key={p.path}>
                                    <td className="max-w-[320px] truncate py-1 pr-3">{p.path}</td>
                                    <td className="py-1 pr-3 text-[#e8d5b5]/50">{p.views} view{p.views === 1 ? '' : 's'}</td>
                                    <td className="py-1">{dur(p.secs)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                  {visitors.length === 0 ? <p className="font-garamond text-sm italic text-[#e8d5b5]/45">No visitor matches that filter.</p> : null}
                </div>
                <p className="mt-3 font-garamond text-xs text-[#e8d5b5]/40">
                  Time counts only while a page is open, visible and in use. A visitor is an anonymous browser, so one person on two devices shows as two.
                  Visitors who block scripts or send Do Not Track are not counted, so totals are lower than Google Analytics. Days are India dates. Records older than 45 days are removed.
                </p>
              </div>
            </>
          )}
        </>
      ) : loading ? (
        <p className="font-garamond text-sm italic text-[#e8d5b5]/45">Loading visitors...</p>
      ) : null}
    </div>
  );
}
