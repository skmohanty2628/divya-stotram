export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const url1 = process.env.FIREBASE_DATABASE_URL;
  const url2 = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

  // Try fetching directly
  let firebaseResult = null;
  let firebaseError = null;
  const base = url1 || url2;

  if (base) {
    try {
      const res = await fetch(`${base.replace(/\/$/, '')}/subscriberStats.json`, { cache: 'no-store' });
      firebaseResult = await res.json();
    } catch (e) {
      firebaseError = e.message;
    }
  }

  return Response.json({
    FIREBASE_DATABASE_URL: url1 ? '✅ set' : '❌ missing',
    NEXT_PUBLIC_FIREBASE_DATABASE_URL: url2 ? '✅ set' : '❌ missing',
    baseUsed: base ? base.substring(0, 30) + '...' : 'NONE',
    firebaseResult,
    firebaseError,
  });
}