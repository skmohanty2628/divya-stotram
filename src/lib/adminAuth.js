// Edge-compatible (Web Crypto) admin session helpers.
export const ADMIN_COOKIE = 'ds_admin';
const MAX_AGE_SEC = 60 * 60 * 12;

function secret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || '';
}

const enc = new TextEncoder();

async function hmac(message) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret()), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export async function createSessionToken() {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE_SEC;
  return `${exp}.${await hmac(String(exp))}`;
}

export async function verifySessionToken(token) {
  if (!secret() || !token) return false;
  const [exp, sig] = String(token).split('.');
  if (!exp || !sig || Number(exp) < Date.now() / 1000) return false;
  return safeEqual(sig, await hmac(exp));
}

export async function checkPassword(input) {
  const real = process.env.ADMIN_PASSWORD || '';
  if (!real || typeof input !== 'string') return false;
  // Compare HMACs of both values so length/timing differences leak nothing.
  const [a, b] = await Promise.all([hmac('pw:' + input), hmac('pw:' + real)]);
  return safeEqual(a, b);
}

export const SESSION_MAX_AGE = MAX_AGE_SEC;
