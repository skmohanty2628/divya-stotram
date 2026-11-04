import crypto from 'crypto';

export const SITE_URL = 'https://divyastotram.com';
// The sender must be on a domain that is verified in Resend (SPF and DKIM). Gmail addresses are rejected by Resend.
export const EMAIL_FROM = process.env.EMAIL_FROM || 'Divya Stotram <noreply@divyastotram.com>';
export const REPLY_TO = process.env.EMAIL_REPLY_TO || 'contactdivyastotram@gmail.com';

// Server-only secret used to sign unsubscribe links, so nobody can unsubscribe another person by guessing an address.
function secret() {
  return process.env.UNSUBSCRIBE_SECRET || process.env.CRON_SECRET || process.env.RESEND_API_KEY || '';
}

export function unsubToken(email) {
  const s = secret();
  if (!s) return '';
  return crypto.createHmac('sha256', s).update(String(email).trim().toLowerCase()).digest('hex').slice(0, 40);
}

export function verifyUnsubToken(email, token) {
  const expected = unsubToken(email);
  if (!expected || !token || expected.length !== String(token).length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(String(token)));
  } catch {
    return false;
  }
}

export function unsubscribeUrl(email) {
  const e = String(email).trim().toLowerCase();
  return `${SITE_URL}/api/unsubscribe?email=${encodeURIComponent(e)}&token=${unsubToken(e)}`;
}

// Headers that let Gmail and Yahoo show their own one-click unsubscribe button.
export function unsubscribeHeaders(email) {
  return {
    'List-Unsubscribe': `<${unsubscribeUrl(email)}>, <mailto:${REPLY_TO}?subject=unsubscribe>`,
    'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
  };
}
