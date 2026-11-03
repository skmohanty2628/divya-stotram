'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { FESTIVAL_DATES } from '@/data/festival-dates';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const SITE = 'https://divyastotram.com';

const target = (date) => new Date(`${date}T00:00:00+05:30`).getTime();
const ymd = (date) => date.replace(/-/g, '');

function nextDay(date) {
  const [y, m, d] = date.split('-').map(Number);
  const n = new Date(Date.UTC(y, m - 1, d + 1));
  return `${n.getUTCFullYear()}${String(n.getUTCMonth() + 1).padStart(2, '0')}${String(n.getUTCDate()).padStart(2, '0')}`;
}

function esc(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

function eventBlock(f) {
  return [
    'BEGIN:VEVENT',
    `UID:${ymd(f.date)}-${f.slug}@divyastotram.com`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
    `DTSTART;VALUE=DATE:${ymd(f.date)}`,
    `DTEND;VALUE=DATE:${nextDay(f.date)}`,
    `SUMMARY:${esc(f.name)}`,
    `DESCRIPTION:${esc(`${f.note}. Guide: ${SITE}/${f.slug}. Lunar dates can differ by a day between regions, so confirm with your local panchang.`)}`,
    `URL:${SITE}/${f.slug}`,
    'END:VEVENT',
  ].join('\r\n');
}

function download(name, events) {
  const body = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Divya Stotram//Festival Calendar//EN', 'CALSCALE:GREGORIAN', ...events.map(eventBlock), 'END:VCALENDAR'].join('\r\n');
  try {
    const blob = new Blob([body], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  } catch (e) {}
}

function MonthGrid({ year, month, days }) {
  const first = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const count = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= count; d++) cells.push(d);
  return (
    <div className="w-full max-w-[260px] flex-none rounded-2xl border border-[#c9922a]/30 bg-white p-3 shadow-sm" aria-hidden="true">
      <p className="mb-2 bg-gradient-to-r from-[#8b1a00] to-[#e8760a] py-1 text-center font-cinzel-reg text-[11px] uppercase tracking-[3px] text-white rounded-lg">
        {MONTHS[month]} {year}
      </p>
      <div className="grid grid-cols-7 gap-y-1 text-center font-garamond text-[11px] text-[#3d1a00]/50">
        {WEEK.map((w) => (
          <span key={w}>{w[0]}</span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-y-1 text-center font-garamond text-sm text-[#3d1a00]/80">
        {cells.map((d, i) =>
          d === null ? (
            <span key={`b${i}`} />
          ) : (
            <span
              key={d}
              className={
                days.has(d)
                  ? 'mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-[#8b1a00] font-bold text-white'
                  : 'mx-auto flex h-7 w-7 items-center justify-center'
              }
            >
              {d}
            </span>
          )
        )}
      </div>
    </div>
  );
}

export default function FestivalCalendar() {
  const [region, setRegion] = useState('all');
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(Date.now());
  }, []);

  const list = useMemo(
    () =>
      FESTIVAL_DATES.filter((f) => region === 'all' || f.odisha)
        .slice()
        .sort((a, b) => a.date.localeCompare(b.date)),
    [region]
  );

  const groups = useMemo(() => {
    const map = new Map();
    for (const f of list) {
      const key = f.date.slice(0, 7);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(f);
    }
    return [...map.entries()];
  }, [list]);

  const chip = (id, label) => (
    <button
      type="button"
      onClick={() => setRegion(id)}
      aria-pressed={region === id}
      className={`rounded-full border px-5 py-2 font-cinzel-reg text-xs uppercase tracking-[2px] transition ${
        region === id ? 'border-[#8b1a00] bg-[#8b1a00] text-white' : 'border-[#c9922a]/40 bg-white text-[#8b1a00] hover:border-[#8b1a00]'
      }`}
    >
      {label}
    </button>
  );

  return (
    <section aria-label="Festival calendar">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter festivals">
          {chip('all', 'All India')}
          {chip('odisha', 'Odisha')}
        </div>
        <button
          type="button"
          onClick={() => download('divya-stotram-festivals.ics', list)}
          className="rounded-full border border-[#c9922a]/40 bg-white px-5 py-2 font-cinzel-reg text-xs uppercase tracking-[2px] text-[#8b1a00] transition hover:border-[#8b1a00]"
        >
          Download all (.ics)
        </button>
      </div>

      <div className="mt-8 space-y-8">
        {groups.map(([key, items]) => {
          const [y, m] = key.split('-').map(Number);
          const days = new Set(items.map((f) => Number(f.date.slice(8))));
          return (
            <div key={key} className="flex flex-col gap-4 md:flex-row md:items-start">
              <MonthGrid year={y} month={m - 1} days={days} />
              <ul className="flex-1 space-y-3">
                {items.map((f) => {
                  const t = target(f.date);
                  const past = now !== null && t + 86400000 <= now;
                  const today = now !== null && now >= t && now < t + 86400000;
                  const away = now === null ? null : Math.ceil((t - now) / 86400000);
                  const dateObj = new Date(Date.UTC(y, m - 1, Number(f.date.slice(8))));
                  return (
                    <li
                      key={f.name + f.date}
                      className={`rounded-2xl border border-[#c9922a]/30 bg-white p-4 shadow-sm ${past ? 'opacity-60' : ''}`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <p className="font-cinzel-reg text-[10px] uppercase tracking-[3px] text-[#e8760a]">
                            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dateObj.getUTCDay()]}, {Number(f.date.slice(8))} {MONTHS[m - 1]} {y}
                          </p>
                          <h3 className="mt-1 font-cinzel text-lg font-bold leading-snug text-[#8b1a00]">{f.name}</h3>
                          <p className="font-garamond text-base text-[#3d1a00]/75">{f.note}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          {f.odisha && (
                            <span className="rounded-full bg-[#e8760a]/10 px-3 py-1 font-cinzel-reg text-[10px] uppercase tracking-[2px] text-[#b45309]">Odisha</span>
                          )}
                          {today && <span className="rounded-full bg-[#8b1a00] px-3 py-1 font-cinzel-reg text-[10px] uppercase tracking-[2px] text-white">Today</span>}
                          {!today && !past && away !== null && (
                            <span className="rounded-full bg-[#c9922a]/15 px-3 py-1 font-cinzel-reg text-[10px] uppercase tracking-[2px] text-[#8b1a00]">
                              in {away} {away === 1 ? 'day' : 'days'}
                            </span>
                          )}
                          {past && <span className="rounded-full bg-black/5 px-3 py-1 font-cinzel-reg text-[10px] uppercase tracking-[2px] text-[#3d1a00]/60">Passed</span>}
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Link
                          href={`/${f.slug}`}
                          className="rounded-full bg-[#8b1a00] px-4 py-1.5 font-cinzel-reg text-[11px] uppercase tracking-[2px] text-white transition hover:bg-[#6b1400]"
                        >
                          Read the guide
                        </Link>
                        <button
                          type="button"
                          onClick={() => download(`${f.slug}-${f.date}.ics`, [f])}
                          className="rounded-full border border-[#c9922a]/40 px-4 py-1.5 font-cinzel-reg text-[11px] uppercase tracking-[2px] text-[#8b1a00] transition hover:border-[#8b1a00]"
                        >
                          Add to calendar
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
