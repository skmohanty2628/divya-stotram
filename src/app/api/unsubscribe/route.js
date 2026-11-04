import { verifyUnsubToken, REPLY_TO } from '@/lib/emailTokens';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function emailToKey(email) {
  return email.replace(/\./g, ',');
}

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const page = (inner, status = 200) =>
  new Response(
    `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Unsubscribe | Divya Stotram</title>
<style>body{background:#0d0000;color:#e8d5b5;font-family:Georgia,serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;text-align:center;padding:16px}
.card{background:#1a0505;border:1px solid rgba(201,146,42,0.3);border-radius:24px;padding:40px 32px;max-width:420px}
h1{color:#f0c040;font-size:24px}p{color:#e8d5b5;opacity:.75;line-height:1.7}a{color:#c9922a}
button{background:#c9922a;color:#0d0000;border:0;border-radius:999px;padding:12px 28px;font-size:16px;cursor:pointer;font-family:inherit}</style></head>
<body><div class="card">${inner}</div></body></html>`,
    { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } }
  );

async function removeSubscriber(email) {
  const base = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || process.env.FIREBASE_DATABASE_URL;
  if (!base) return;
  const root = base.replace(/\/$/, '');
  try {
    const key = emailToKey(email);
    const existing = await fetch(`${root}/subscribers/${key}.json`, { cache: 'no-store' }).then((r) => r.json()).catch(() => null);
    await fetch(`${root}/subscribers/${key}.json`, { method: 'DELETE' });
    if (existing) {
      const total = await fetch(`${root}/subscriberStats/total.json`, { cache: 'no-store' }).then((r) => r.json()).catch(() => null);
      if (typeof total === 'number' && total > 0) {
        await fetch(`${root}/subscriberStats/total.json`, { method: 'PUT', body: JSON.stringify(total - 1) });
      }
    }
  } catch (e) {
    console.error('Unsubscribe error:', e);
  }
}

const oldLink = () =>
  page(
    `<div style="font-size:44px">🙏</div><h1>This link has expired</h1><p>For your safety, unsubscribe links now carry a private code. Please use the Unsubscribe link in our latest email, or write to <a href="mailto:${esc(REPLY_TO)}?subject=unsubscribe">${esc(REPLY_TO)}</a> and we will remove you.</p><a href="https://divyastotram.com">Return to Divya Stotram</a>`,
    400
  );

const done = () =>
  page(
    `<div style="font-size:44px">🙏</div><h1>Unsubscribed</h1><p>You have been removed from Divya Stotram daily emails.<br>You are always welcome back.</p><a href="https://divyastotram.com">Return to Divya Stotram</a>`
  );

// The link in the email opens a confirmation page, so mail scanners that open links cannot unsubscribe anyone by accident.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email')?.trim().toLowerCase();
  const token = searchParams.get('token') || '';
  if (!email || !verifyUnsubToken(email, token)) return oldLink();
  return page(
    `<div style="font-size:44px">🙏</div><h1>Unsubscribe?</h1><p>Stop daily emails to <strong>${esc(email)}</strong>?</p>
<form method="POST" action="/api/unsubscribe?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}"><button type="submit">Yes, unsubscribe me</button></form>
<p style="margin-top:20px"><a href="https://divyastotram.com">No, keep me subscribed</a></p>`
  );
}

// Used by the confirmation button and by the one-click unsubscribe button in Gmail and Yahoo (RFC 8058).
export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email')?.trim().toLowerCase();
  const token = searchParams.get('token') || '';
  if (!email || !verifyUnsubToken(email, token)) return oldLink();
  await removeSubscriber(email);
  return done();
}
