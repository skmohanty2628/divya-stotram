'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { LangProvider } from '@/components/LanguageSwitcher';
import { Mail, MapPin, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Opens user's email client with pre-filled message
    const mailto = `mailto:contact@divyastotram.com?subject=${encodeURIComponent(form.subject || 'Message from Divya Stotram')}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)}`;
    window.open(mailto);
    setSent(true);
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
              { icon: Mail,          label: 'Email',    value: 'contact@divyastotram.com' },
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
                  className="w-full bg-[#c9922a] hover:bg-[#f0c040] text-[#0d0202] font-cinzel-reg text-xs tracking-[3px] uppercase font-bold py-3.5 rounded-lg transition-colors"
                >
                  Send Message 🙏
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-[#1a0505]/90 to-[#0d0202]/95 border border-[#c9922a]/25 rounded-2xl p-12 text-center">
              <span className="text-5xl block mb-4">🙏</span>
              <p className="font-cinzel text-xl text-[#f0c040] mb-2">Jai Shri Ram!</p>
              <p className="font-garamond text-lg text-[#e8d5b5]/70">Your message has been opened in your email client. We'll respond within 48 hours.</p>
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