// Server-only helpers for reader feedback. Data lives in the same Firebase Realtime Database
// that the subscriber list uses, under the "feedback" node, through the REST API.
// Optional: set FIREBASE_DATABASE_SECRET in Vercel to send an auth token with every call,
// which lets you lock the database rules so nobody can read or write it directly.

export const ID_RE = /^[-_A-Za-z0-9]{8,40}$/;

function url(path) {
  const base = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || process.env.FIREBASE_DATABASE_URL;
  if (!base) return null;
  const secret = process.env.FIREBASE_DATABASE_SECRET;
  return `${base.replace(/\/$/, '')}/${path}.json${secret ? `?auth=${encodeURIComponent(secret)}` : ''}`;
}

async function call(path, method, body) {
  const u = url(path);
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

export const dbGet = (path) => call(path, 'GET');
export const dbPatch = (path, data) => call(path, 'PATCH', data);
export const dbDelete = (path) => call(path, 'DELETE');
export async function dbPush(path, data) {
  const r = await call(path, 'POST', data);
  return r && r.name;
}

export function cleanText(value, max) {
  return String(value ?? '')
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, max);
}

export function hasLinkOrEmail(text) {
  return /(https?:\/\/|www\.|[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})/i.test(text);
}

export function publicShape(id, f) {
  return {
    id,
    name: f.name || 'Devotee',
    message: f.message || '',
    rating: Number(f.rating) || 0,
    page: f.page || '',
    createdAt: f.createdAt || '',
    highlighted: !!f.highlighted,
    reply: f.reply && f.reply.text ? { text: f.reply.text, at: f.reply.at || '' } : null,
  };
}

export function sortFeedback(list) {
  return list.sort(
    (a, b) => Number(!!b.highlighted) - Number(!!a.highlighted) || String(b.createdAt).localeCompare(String(a.createdAt))
  );
}
