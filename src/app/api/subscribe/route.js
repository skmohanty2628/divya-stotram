import { Resend } from 'resend';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// ── Firebase REST helpers ─────────────────────────────────────────────────────
// Uses Firebase Realtime Database REST API — no SDK needed
// Requires NEXT_PUBLIC_FIREBASE_DATABASE_URL in Vercel env vars

function getFirebaseUrl(path) {
  const base = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;
  if (!base) return null;
  return `${base.replace(/\/$/, '')}/${path}.json`;
}

// Encode email to safe Firebase key: replace . with ,
function emailToKey(email) {
  return email.replace(/\./g, ',');
}

async function firebaseGet(path) {
  const url = getFirebaseUrl(path);
  if (!url) return null;
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.json();
}

async function firebaseSet(path, data) {
  const url = getFirebaseUrl(path);
  if (!url) return false;
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.ok;
}

// ── Main handler ──────────────────────────────────────────────────────────────

export async function POST(request) {
  try {
    const body = await request.json();
    const email = (body?.email || '').trim().toLowerCase();

    if (!email || !email.includes('@') || !email.includes('.')) {
      return Response.json(
        { ok: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const emailKey = emailToKey(email);
    const today = new Date().toISOString().split('T')[0];

    // ── 1. Check for duplicate in Firebase ────────────────────────────────────
    const existing = await firebaseGet(`subscribers/${emailKey}`);

    if (existing) {
      // Already subscribed — record another visit attempt but don't re-send email
      await firebaseSet(`subscribers/${emailKey}/lastSeen`, new Date().toISOString());
      await firebaseSet(`subscribers/${emailKey}/visitCount`,
        (existing.visitCount || 1) + 1
      );
      return Response.json({
        ok: true,
        message: 'Already subscribed.',
        alreadySubscribed: true,
      });
    }

    // ── 2. Save to Firebase ───────────────────────────────────────────────────
    await firebaseSet(`subscribers/${emailKey}`, {
      email,
      subscribedAt: new Date().toISOString(),
      subscribedDate: today,
      visitCount: 1,
      lastSeen: new Date().toISOString(),
    });

    // ── 3. Increment daily counter ────────────────────────────────────────────
    const todayCount = await firebaseGet(`subscriberStats/daily/${today}`);
    await firebaseSet(`subscriberStats/daily/${today}`, (todayCount || 0) + 1);

    // ── 4. Increment total counter ────────────────────────────────────────────
    const totalCount = await firebaseGet(`subscriberStats/total`);
    await firebaseSet(`subscriberStats/total`, (totalCount || 0) + 1);

    // ── 5. Send welcome email ─────────────────────────────────────────────────
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const resend = new Resend(resendKey);

      await resend.emails.send({
        from: 'Divya Stotram <contactdivyastotram@gmail.com>',
        to: email,
        subject: '🙏 Welcome to Divya Stotram — Your Daily Devotional Has Begun!',
        html: `
          <div style="font-family: Georgia, serif; max-width: 560px; margin: auto; background: #0d0000; color: #e8d5b5; padding: 32px; border-radius: 16px;">
            <h1 style="font-size: 24px; color: #f0c040; text-align: center; margin-bottom: 8px;">🕉️ Jai Shri Ram!</h1>
            <p style="text-align: center; color: #c9922a; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 24px;">Divya Stotram — Sacred Prayers Daily</p>
            <p style="font-size: 16px; line-height: 1.7;">Namaste 🙏</p>
            <p style="font-size: 16px; line-height: 1.7;">
              Thank you for subscribing to <strong style="color: #f0c040;">Divya Stotram</strong>!
              You will now receive daily devotional reminders to keep your prayer streak alive 🔥
            </p>
            <div style="background: #1a0505; border: 1px solid rgba(201,146,42,0.3); border-radius: 12px; padding: 20px; margin: 24px 0;">
              <p style="color: #f0c040; font-size: 14px; margin: 0 0 8px;">What to expect:</p>
              <ul style="color: #e8d5b5; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>Daily stotram & mantra reminders</li>
                <li>Auspicious festival and muhurat alerts</li>
                <li>New content — prayers, mantras & stotrams</li>
              </ul>
            </div>
            <div style="text-align: center; margin: 28px 0;">
              <a href="https://divyastotram.com" style="background: linear-gradient(to right, #c9922a, #f0c040); color: #0d0000; text-decoration: none; padding: 12px 28px; border-radius: 50px; font-weight: bold; font-size: 14px; letter-spacing: 1px;">
                Start Reading Today →
              </a>
            </div>
            <p style="font-size: 12px; color: #c9922a; text-align: center; margin-top: 24px;">
              You can unsubscribe at any time by replying with "unsubscribe".
            </p>
          </div>
        `,
      });

      // Admin notification
      await resend.emails.send({
        from: 'Divya Stotram <contactdivyastotram@gmail.com>',
        to: 'contactdivyastotram@gmail.com',
        subject: `🔔 New Subscriber — ${email}`,
        html: `<p>New subscriber: <strong>${email}</strong></p><p>Time: ${new Date().toISOString()}</p>`,
      });
    }

    return Response.json({ ok: true, message: 'Subscribed successfully.' });
  } catch (error) {
    console.error('Subscribe API error:', error);
    return Response.json(
      { ok: false, error: 'Unable to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}