// Best-effort in-memory limiter (per server instance). Enough to stop casual abuse of paid APIs.
const buckets = new Map();

export function clientIp(request) {
  const xf = request.headers.get('x-forwarded-for') || '';
  return xf.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown';
}

export function rateLimit(key, { limit = 10, windowMs = 60_000 } = {}) {
  const now = Date.now();
  const entry = buckets.get(key);
  if (!entry || entry.reset < now) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    if (buckets.size > 5000) for (const [k, v] of buckets) if (v.reset < now) buckets.delete(k);
    return true;
  }
  entry.count += 1;
  return entry.count <= limit;
}
