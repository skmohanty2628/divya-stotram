import { sidFor } from '@/lib/emailTokens';

function base() {
  const b = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || process.env.FIREBASE_DATABASE_URL;
  return b ? b.replace(/\/$/, '') : null;
}

export async function fbGet(path) {
  const b = base();
  if (!b) return null;
  try {
    const res = await fetch(`${b}/${path}.json`, { cache: 'no-store' });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

export async function fbPut(path, data) {
  const b = base();
  if (!b) return false;
  try {
    const res = await fetch(`${b}/${path}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function fbPatch(path, data) {
  const b = base();
  if (!b) return false;
  try {
    const res = await fetch(`${b}/${path}.json`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function emailKey(email) {
  return String(email).trim().toLowerCase().replace(/\./g, ',');
}

// Civil date in India, YYYY-MM-DD, optionally shifted by whole days.
export function istDate(offsetDays = 0) {
  const d = new Date(Date.now() + offsetDays * 86400000);
  return d.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
}

// Streak as shown in the email: alive when the last reading day was today or yesterday.
export function liveStreak(streak) {
  if (!streak || !streak.count || !streak.last) return { count: 0, readToday: false };
  if (streak.last === istDate(0)) return { count: streak.count, readToday: true };
  if (streak.last === istDate(-1)) return { count: streak.count, readToday: false };
  return { count: 0, readToday: false };
}

// Records a reading day for the subscriber who owns this reader id.
export async function recordReading(sid) {
  if (!/^[a-f0-9]{24}$/.test(String(sid || ''))) return { ok: false };
  const key = await fbGet(`sidIndex/${sid}`);
  if (!key || typeof key !== 'string') return { ok: false };
  const sub = await fbGet(`subscribers/${key}`);
  if (!sub || !sub.email || sidFor(sub.email) !== sid) return { ok: false };

  const today = istDate(0);
  const s = sub.streak || {};
  let count = s.count || 0;
  if (s.last !== today) count = s.last === istDate(-1) ? count + 1 : 1;
  const next = { count, last: today, best: Math.max(s.best || 0, count) };
  if (s.last !== today) await fbPut(`subscribers/${key}/streak`, next);
  return { ok: true, count: next.count, best: next.best };
}
