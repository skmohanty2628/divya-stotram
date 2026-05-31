export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function emailToKey(email) {
  return email.replace(/\./g, ',');
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email')?.trim().toLowerCase();

  if (!email) {
    return new Response('<h1>Invalid unsubscribe link.</h1>', { headers: { 'Content-Type': 'text/html' } });
  }

  const base = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || process.env.FIREBASE_DATABASE_URL;

  if (base) {
    try {
      const key = emailToKey(email);
      await fetch(`${base.replace(/\/$/, '')}/subscribers/${key}.json`, { method: 'DELETE' });

      // Decrement total
      const statsRes = await fetch(`${base.replace(/\/$/, '')}/subscriberStats/total.json`);
      const total = await statsRes.json();
      if (total > 0) {
        await fetch(`${base.replace(/\/$/, '')}/subscriberStats/total.json`, {
          method: 'PUT',
          body: JSON.stringify(total - 1),
        });
      }
    } catch (e) {
      console.error('Unsubscribe error:', e);
    }
  }

  return new Response(`
    <!DOCTYPE html>
    <html>
    <head><title>Unsubscribed — Divya Stotram</title>
    <style>body{background:#0d0000;color:#e8d5b5;font-family:Georgia,serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;text-align:center;}
    .card{background:#1a0505;border:1px solid rgba(201,146,42,0.3);border-radius:24px;padding:48px 40px;max-width:400px;}
    h1{color:#f0c040;font-size:24px;}p{color:#e8d5b5;opacity:0.7;line-height:1.7;}
    a{color:#c9922a;}</style>
    </head>
    <body><div class="card">
    <div style="font-size:48px;">🙏</div>
    <h1>Unsubscribed</h1>
    <p>You have been removed from Divya Stotram daily emails.<br>You are always welcome back.</p>
    <a href="https://divyastotram.com">← Return to Divya Stotram</a>
    </div></body></html>
  `, { headers: { 'Content-Type': 'text/html' } });
}