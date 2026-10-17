import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { clientIp, rateLimit } from '@/lib/rateLimit';

const esc = (v) =>
  String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Initialize Resend with API key
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    if (!rateLimit(`contact:${clientIp(request)}`, { limit: 4, windowMs: 10 * 60_000 })) {
      return NextResponse.json({ error: 'Too many messages. Please try again later.' }, { status: 429 });
    }
    const body = await request.json();
    const name = String(body.name || '').trim().slice(0, 100);
    const email = String(body.email || '').trim().slice(0, 200);
    const subjectRaw = String(body.subject || '').replace(/[\r\n]+/g, ' ').trim().slice(0, 150);
    const message = String(body.message || '').trim().slice(0, 5000);
    const subject = subjectRaw;
    if (email && !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 503 }
      );
    }

    // Send email using Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    const data = await resend.emails.send({
      from: 'Divya Stotram Contact <onboarding@resend.dev>',
      to: 'contactdivyastotram@gmail.com',
      replyTo: email,
      subject: subject || 'New message from Divya Stotram',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #c9922a; padding-bottom: 20px;">
              <h1 style="color: #c9922a; margin: 0; font-size: 24px;">🕉️ New Message from Divya Stotram</h1>
            </div>
            
            <!-- Sender Info -->
            <div style="background-color: #fef8f0; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
              <h2 style="color: #333; font-size: 18px; margin-top: 0;">Sender Details</h2>
              <p style="margin: 8px 0; color: #555;"><strong>Name:</strong> ${esc(name)}</p>
              <p style="margin: 8px 0; color: #555;"><strong>Email:</strong> <a href="mailto:${esc(email)}" style="color: #c9922a; text-decoration: none;">${esc(email)}</a></p>
              ${subject ? `<p style="margin: 8px 0; color: #555;"><strong>Subject:</strong> ${esc(subject)}</p>` : ''}
            </div>
            
            <!-- Message -->
            <div style="background-color: #fff; padding: 20px; border-left: 4px solid #c9922a; margin-bottom: 20px;">
              <h3 style="color: #333; font-size: 16px; margin-top: 0;">Message</h3>
              <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${esc(message)}</p>
            </div>
            
            <!-- Quick Reply Button -->
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${esc(email)}?subject=Re: ${encodeURIComponent(subject || 'Your message to Divya Stotram')}" 
                 style="display: inline-block; background-color: #c9922a; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Reply to ${esc(name)}
              </a>
            </div>
            
            <!-- Footer -->
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #999; font-size: 12px;">
              <p>This message was sent from the Divya Stotram contact form</p>
              <p>🕉️ <a href="https://divyastotram.com" style="color: #c9922a; text-decoration: none;">divyastotram.com</a></p>
            </div>
            
          </div>
        </div>
      `,
    });

    console.log('✅ Email sent successfully:', data.id);

    return NextResponse.json(
      { success: true, messageId: data.id },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Error sending email:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send email', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}