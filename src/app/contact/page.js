'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { LangProvider } from '@/components/LanguageSwitcher';
import { Mail, MapPin, MessageCircle, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LangProvider>
      <div className="min-h-screen bg-[#0d0202]">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">

          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-5xl block mb-5">✉️</span>
            <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#f0c040] mb-3">Contact Us</h1>
            <p className="font-garamond italic text-[#e8d5b5]/60 text-lg">We'd love to hear from you</p>
            <div className="flex items-center justify-center gap-3 mt-4 opacity-40">
              <div className="h-px w-20 bg-[#c9922a]" />
              <span className="text-[#c9922a]">✦</span>
              <div className="h-px w-20 bg-[#c9922a]" />
            </div>
          </div>

          {/* Contact info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { icon: Mail,          label: 'Email',    value: 'contactdivyastotram@gmail.com' },
              { icon: MapPin,        label: 'Location', value: 'India' },
              { icon: MessageCircle, label: 'Response', value: 'Within 48 hours' },
            ].map(({ icon: Icon, label, value }, i) => (
              <div key={i} className="bg-gradient-to-br from-[#1a0505]/90 to-[#0d0202]/95 border border-[#c9922a]/25 rounded-xl p-5 text-center">
                <Icon size={22} className="text-[#c9922a] mx-auto mb-2" />
                <p className="font-cinzel-reg text-[9px] tracking-[3px] uppercase text-[#e8760a]/70 mb-1">{label}</p>
                <p className="font-garamond text-sm text-[#f5e8d0]">{value}</p>
              </div>
            ))}
          </div>

          {/* Contact form */}
          {!sent ? (
            <div className="bg-gradient-to-br from-[#1a0505]/90 to-[#0d0202]/95 border border-[#c9922a]/25 rounded-2xl p-8">
              <p className="font-cinzel-reg text-[10px] tracking-[4px] uppercase text-[#e8760a] mb-6">Send a Message</p>
              
              {/* Error Message */}
              {error && (
                <div className="mb-6 bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-400 font-garamond text-sm">⚠️ {error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-cinzel-reg text-[9px] tracking-[2px] uppercase text-[#c9922a]/70 mb-2">Your Name</label>
                    <input
                      type="text" required
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                      placeholder="Ramesh Kumar"
                      className="w-full bg-[#0d0202] border border-[#c9922a]/25 rounded-lg px-4 py-3 text-[#fdf3e3] font-garamond outline-none focus:border-[#c9922a]/60 placeholder-[#e8d5b5]/20 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-cinzel-reg text-[9px] tracking-[2px] uppercase text-[#c9922a]/70 mb-2">Your Email</label>
                    <input
                      type="email" required
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                      placeholder="you@email.com"
                      className="w-full bg-[#0d0202] border border-[#c9922a]/25 rounded-lg px-4 py-3 text-[#fdf3e3] font-garamond outline-none focus:border-[#c9922a]/60 placeholder-[#e8d5b5]/20 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-cinzel-reg text-[9px] tracking-[2px] uppercase text-[#c9922a]/70 mb-2">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={e => setForm({...form, subject: e.target.value})}
                    placeholder="Suggest a stotram / Report an issue / General query"
                    className="w-full bg-[#0d0202] border border-[#c9922a]/25 rounded-lg px-4 py-3 text-[#fdf3e3] font-garamond outline-none focus:border-[#c9922a]/60 placeholder-[#e8d5b5]/20 transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-cinzel-reg text-[9px] tracking-[2px] uppercase text-[#c9922a]/70 mb-2">Message</label>
                  <textarea
                    required rows={5}
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                    placeholder="Write your message here..."
                    className="w-full bg-[#0d0202] border border-[#c9922a]/25 rounded-lg px-4 py-3 text-[#fdf3e3] font-garamond outline-none focus:border-[#c9922a]/60 placeholder-[#e8d5b5]/20 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#c9922a] hover:bg-[#f0c040] text-[#0d0202] font-cinzel-reg text-xs tracking-[3px] uppercase font-bold py-3.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Sending...
                    </>
                  ) : (
                    <>Send Message 🙏</>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-[#1a0505]/90 to-[#0d0202]/95 border border-[#c9922a]/25 rounded-2xl p-12 text-center">
              <span className="text-5xl block mb-4">🙏</span>
              <p className="font-cinzel text-xl text-[#f0c040] mb-2">Jai Shri Ram!</p>
              <p className="font-garamond text-lg text-[#e8d5b5]/70">Your message has been sent successfully. We'll respond within 48 hours.</p>
              <button onClick={() => setSent(false)} className="mt-6 font-cinzel-reg text-xs tracking-widest uppercase text-[#c9922a] hover:text-[#f0c040] transition-colors">
                Send another message
              </button>
            </div>
          )}

          <div className="text-center mt-8">
            <Link href="/" className="font-cinzel-reg text-xs tracking-widest uppercase text-[#c9922a]/50 hover:text-[#c9922a] transition-colors">
              ← Back to Stotrams
            </Link>
          </div>
        </div>
      </div>
    </LangProvider>
  );
}