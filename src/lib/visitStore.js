// Server-only helpers for first-party visit tracking. One record per anonymous visitor per day (India date),
// kept in the same Firebase Realtime Database as subscribers and feedback, under the "visits" node.
// No IP address, name or email is stored. The visitor id is a random value made in the browser.

export const VID_RE = /^[a-f0-9]{16,32}$/;
export const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
export const KEEP_DAYS = 45;

function url(path, query = '') {
  const base = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || process.env.FIREBASE_DATABASE_URL;
  if (!base) return null;
  const secret = process.env.FIREBASE_DATABASE_SECRET;
  const parts = [];
  if (secret) parts.push(`auth=${encodeURIComponent(secret)}`);
  if (query) parts.push(query);
  return `${base.replace(/\/$/, '')}/${path}.json${parts.length ? `?${parts.join('&')}` : ''}`;
}

async function call(path, method, body, query) {
  const u = url(path, query);
  if (!u) throw new Error('Database is not configured.');
  const res = await fetch(u, {
    method,
    cache: 'no-store',
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Database error ${res.status}`);
  const text = await res.text();
  return text && text !== 'null' ? JSON.parse(text) : null;
}

export function istDate(offsetDays = 0) {
  return new Date(Date.now() + offsetDays * 86400000).toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
}

export function pathKey(path) {
  return encodeURIComponent(path).replace(/\./g, '%2E').slice(0, 150);
}

export function cleanPath(raw) {
  const p = String(raw || '').split('?')[0].split('#')[0];
  if (!p.startsWith('/') || p.length > 150 || /[\u0000-\u001F]/.test(p)) return null;
  if (p.startsWith('/admin') || p.startsWith('/api')) return null;
  return p.length > 1 ? p.replace(/\/+$/, '') : p;
}

const MAX_PAGES_PER_VISITOR = 80;
const MAX_SECS_PER_VISITOR = 6 * 3600;
const MAX_SECS_PER_EVENT = 120;

// Adds one event (a new page view and/or some seconds of active time) to the visitor's record for today.
async function applyEvent({ vid, path, secs, isView, country, device, ref }) {
  const date = istDate(0);
  const node = `visits/${date}/${vid}`;
  const now = Date.now();
  const rec = (await call(node, 'GET')) || { f: now, c: country || '', d: device || '', r: ref || '', s: 0, n: 0, p: {} };
  rec.p = rec.p || {};
  const key = pathKey(path);
  if (!rec.p[key] && Object.keys(rec.p).length >= MAX_PAGES_PER_VISITOR) return { ok: false, reason: 'cap' };
  const page = rec.p[key] || { p: path, n: 0, s: 0 };
  if (isView) {
    page.n += 1;
    rec.n = (rec.n || 0) + 1;
  }
  const add = Math.max(0, Math.min(MAX_SECS_PER_EVENT, Math.round(Number(secs) || 0)));
  if (add && (rec.s || 0) < MAX_SECS_PER_VISITOR) {
    page.s += add;
    rec.s = (rec.s || 0) + add;
  }
  rec.p[key] = page;
  rec.l = now;
  if (!rec.c && country) rec.c = country;
  if (!rec.d && device) rec.d = device;
  if (!rec.r && ref) rec.r = ref;
  await call(node, 'PUT', rec);
  return { ok: true };
}

// Events from one visitor are applied one after another, so two beacons sent back to back
// (leftover seconds for the old page and the view of the new page) cannot overwrite each other.
const chains = new Map();
export function recordVisit(ev) {
  const prev = chains.get(ev.vid) || Promise.resolve();
  const next = prev.catch(() => {}).then(() => applyEvent(ev));
  chains.set(ev.vid, next);
  next.finally(() => {
    if (chains.get(ev.vid) === next) chains.delete(ev.vid);
  }).catch(() => {});
  return next;
}

export async function listDates() {
  const shallow = await call('visits', 'GET', undefined, 'shallow=true');
  return shallow ? Object.keys(shallow).filter((d) => DATE_RE.test(d)).sort().reverse() : [];
}

export async function getDay(date) {
  return (await call(`visits/${date}`, 'GET')) || {};
}

export async function deleteDay(date) {
  return call(`visits/${date}`, 'DELETE');
}
