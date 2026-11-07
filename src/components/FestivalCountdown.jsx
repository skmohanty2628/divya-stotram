'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { FESTIVAL_DATES } from '@/data/festival-dates';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function parts(date) {
  const [y, m, d] = date.split('-').map(Number);
  const wd = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return { y, m: MONTHS[m - 1], d, wd: DAYS[wd] };
}
const target = (date) => new Date(`${date}T00:00:00+05:30`).getTime();
const pad = (n) => String(n).padStart(2, '0');

function Tile({ date, size = 'lg' }) {
  const p = parts(date);
  const big = size === 'lg';
  return (
    <div className={`flex-none overflow-hidden rounded-2xl bg-white text-center shadow-lg ring-1 ring-black/10 ${big ? 'w-32 sm:w-36' : 'w-16'}`}>
      <div className={`bg-gradient-to-r from-[#8b1a00] to-[#e8760a] font-cinzel-reg uppercase tracking-[2px] text-white ${big ? 'py-1.5 text-[11px]' : 'py-0.5 text-[8px]'}`}>
        {p.m.slice(0, big ? 20 : 3)} {big ? p.y : ''}
      </div>
      <div className={`font-cinzel font-bold leading-none text-[#8b1a00] ${big ? 'pt-3 text-6xl sm:text-7xl' : 'pt-1.5 text-2xl'}`}>{p.d}</div>
      <div className={`font-garamond text-[#3d1a00]/70 ${big ? 'pb-3 pt-1 text-base' : 'pb-1.5 text-[10px]'}`}>{p.wd}</div>
    </div>
  );
}

function Unit({ value, label }) {
  return (
    <div className="min-w-[64px] flex-1 rounded-xl bg-white/10 px-2 py-3 text-center ring-1 ring-white/20 backdrop-blur sm:min-w-[84px]">
      <div className="font-cinzel text-3xl font-bold tabular-nums text-white sm:text-5xl">{value}</div>
      <div className="mt-1 font-cinzel-reg text-[9px] uppercase tracking-[3px] text-[#ffd98a] sm:text-[10px]">{label}</div>
    </div>
  );
}

export default function FestivalCountdown({ slug, heading = 'Next festival' }) {
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const list = useMemo(() => {
    const base = slug ? FESTIVAL_DATES.filter((f) => f.slug === slug) : FESTIVAL_DATES;
    return base.slice().sort((a, b) => a.date.localeCompare(b.date));
  }, [slug]);

  if (!now) {
    return <div className="mt-8 h-72 rounded-3xl bg-gradient-to-br from-[#8b1a00] to-[#c2410c]" aria-hidden="true" />;
  }

  const upcoming = list.filter((f) => target(f.date) + 86400000 > now);
  if (!upcoming.length) return null;
  const nextF = upcoming[0];
  const t = target(nextF.date);
  const diff = Math.max(0, t - now);
  const today = now >= t && now < t + 86400000;
  const dd = Math.floor(diff / 86400000);
  const hh = Math.floor((diff % 86400000) / 3600000);
  const mm = Math.floor((diff % 3600000) / 60000);
  const ss = Math.floor((diff % 60000) / 1000);
  const rest = upcoming.slice(1, 9);
  const p = parts(nextF.date);

  return (
    <section className="mt-8" aria-label="Festival calendar and countdown">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#5c1000] via-[#8b1a00] to-[#d4560a] p-5 text-white shadow-xl sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#ffb347]/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-[#ffd98a]/15 blur-3xl" />
        <div className="relative flex flex-col items-center gap-6 md:flex-row md:items-center md:gap-10">
          <Tile date={nextF.date} />
          <div className="w-full flex-1 text-center md:text-left">
            <p className="font-cinzel-reg text-[11px] uppercase tracking-[5px] text-[#ffd98a]">{heading}</p>
            <h2 className="mt-1 font-cinzel text-2xl font-bold leading-tight sm:text-3xl">{nextF.name}</h2>
            <p className="mt-1 font-garamond text-lg text-white/85">
              {p.wd}, {p.d} {p.m} {p.y}. {nextF.note}.
            </p>
            {today ? (
              <p className="mt-4 font-cinzel text-2xl font-bold text-[#ffd98a]">It is today. Shubh parba!</p>
            ) : (
              <div className="mt-4 flex gap-2 sm:gap-3" role="timer" aria-live="off" aria-label={`Time left until ${nextF.name}`}>
                <Unit value={dd} label="Days" />
                <Unit value={pad(hh)} label="Hours" />
                <Unit value={pad(mm)} label="Minutes" />
                <Unit value={pad(ss)} label="Seconds" />
              </div>
            )}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <Link href={`/${nextF.slug}`} className="rounded-full bg-white px-5 py-2 font-cinzel-reg text-xs uppercase tracking-[2px] text-[#8b1a00] transition hover:bg-[#fff3d6]">
                Read the guide
              </Link>
              <p className="max-w-md font-garamond text-sm text-white/70">
                Counts down to midnight at the start of the date, India time. Lunar dates can differ by a day between regions, so confirm with your local panchang.
              </p>
            </div>
          </div>
        </div>
      </div>

      {rest.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 font-cinzel-reg text-[11px] uppercase tracking-[4px] text-[#a85200]">Coming up</p>
          <ul className="flex gap-3 overflow-x-auto pb-2">
            {rest.map((f) => {
              const days = Math.max(0, Math.ceil((target(f.date) - now) / 86400000));
              return (
                <li key={f.name + f.date} className="flex-none">
                  <Link href={`/${f.slug}`} className="flex w-60 items-center gap-3 rounded-2xl border border-[#c9922a]/30 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-[#c9922a] hover:shadow-md">
                    <Tile date={f.date} size="sm" />
                    <div className="min-w-0">
                      <p className="line-clamp-2 font-cinzel text-sm font-bold leading-snug text-[#8b1a00]">{f.name}</p>
                      <p className="mt-1 font-garamond text-sm text-[#3d1a00]/70">in {days} days</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
