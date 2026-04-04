'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { LangProvider } from '@/components/LanguageSwitcher';

export default function AboutPage() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-[#0d0202]">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">

          {/* Header */}
          <div className="text-center mb-14">
            <span className="text-5xl block mb-5">🕉️</span>
            <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#f0c040] mb-3">About Divya Stotram</h1>
            <div className="flex items-center justify-center gap-3 opacity-40">
              <div className="h-px w-20 bg-[#c9922a]" />
              <span className="text-[#c9922a]">✦</span>
              <div className="h-px w-20 bg-[#c9922a]" />
            </div>
          </div>

          {/* Mission card */}
          <div className="bg-gradient-to-br from-[#1a0505]/90 to-[#0d0202]/95 border border-[#c9922a]/25 rounded-2xl p-8 mb-8">
            <p className="font-cinzel-reg text-[10px] tracking-[4px] uppercase text-[#e8760a] mb-4">Our Mission</p>
            <p className="font-garamond text-xl text-[#f5e8d0] leading-relaxed italic">
              "Divya Stotram was created with devotion to preserve and share the sacred Hindu prayers, stotrams and mantras — making them accessible to devotees worldwide in their own language."
            </p>
          </div>

          {/* Story */}
          <div className="bg-gradient-to-br from-[#1a0505]/90 to-[#0d0202]/95 border border-[#c9922a]/25 rounded-2xl p-8 mb-8">
            <p className="font-cinzel-reg text-[10px] tracking-[4px] uppercase text-[#e8760a] mb-4">Our Story</p>
            <p className="font-garamond text-lg text-[#f5e8d0] leading-relaxed mb-4">
              Hindu prayers and stotrams are some of the most powerful spiritual texts ever written. Yet for many devotees — especially those living outside India or those who grew up speaking regional languages like Odia and Telugu — accessing these prayers in their native language has always been difficult.
            </p>
            <p className="font-garamond text-lg text-[#f5e8d0] leading-relaxed">
              Divya Stotram was built to solve exactly this problem. Every stotram on this site is available in English, Hindi, Odia and Telugu — so that every devotee can connect with the divine in the language closest to their heart.
            </p>
          </div>

          {/* What we offer */}
          <div className="bg-gradient-to-br from-[#1a0505]/90 to-[#0d0202]/95 border border-[#c9922a]/25 rounded-2xl p-8 mb-8">
            <p className="font-cinzel-reg text-[10px] tracking-[4px] uppercase text-[#e8760a] mb-5">What We Offer</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: '📿', title: 'Sacred Stotrams', desc: 'Hanuman Chalisa, Durga Stotram, Shiva Tandav and more' },
                { icon: '🌐', title: 'Multiple Languages', desc: 'English, Hindi, Odia and Telugu' },
                { icon: '🤖', title: 'Ask the Pandit', desc: 'AI-powered answers about any stotram' },
                { icon: '🎵', title: 'Devotional Music', desc: 'Listen to bhajans while you read' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-[#c9922a]/5 rounded-xl border border-[#c9922a]/15">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-cinzel-reg text-xs tracking-wider text-[#f0c040] mb-1">{item.title}</p>
                    <p className="font-garamond text-sm text-[#e8d5b5]/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="bg-gradient-to-br from-[#1a0505]/90 to-[#0d0202]/95 border border-[#c9922a]/25 rounded-2xl p-8 mb-10">
            <p className="font-cinzel-reg text-[10px] tracking-[4px] uppercase text-[#e8760a] mb-4">The Team</p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#c9922a]/20 border border-[#c9922a]/40 flex items-center justify-center text-2xl">🙏</div>
              <div>
                <p className="font-cinzel text-base font-bold text-[#f0c040]">Team Divya Stotram</p>
                <p className="font-garamond text-sm text-[#e8d5b5]/60">India · Built with devotion</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="font-cinzel text-lg text-[#f0c040] mb-2">🕉️ Jai Shri Ram 🕉️</p>
            <p className="font-garamond text-sm text-[#e8d5b5]/50 italic mb-6">May these prayers bring peace and blessings to all who read them.</p>
            <Link href="/" className="font-cinzel-reg text-xs tracking-widest uppercase bg-[#c9922a] hover:bg-[#f0c040] text-[#0d0202] font-bold px-8 py-3 rounded-full transition-all">
              Read Stotrams
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#c9922a]/15 py-6 text-center">
          <p className="font-cinzel-reg text-[10px] tracking-[3px] uppercase text-[#e8d5b5]/30">
            Divya Stotram · Made with devotion in India
          </p>
        </div>
      </div>
    </LangProvider>
  );
}