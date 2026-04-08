'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { LangProvider } from '@/components/LanguageSwitcher';

export default function PrivacyPolicyPage() {
  const lastUpdated = 'April 2026';

  return (
    <LangProvider>
      <div className="min-h-screen bg-[#0d0202]">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-12">
            <h1 className="font-cinzel text-3xl font-bold text-[#f0c040] mb-3">
              Privacy Policy
            </h1>
            <p className="font-garamond text-sm text-[#e8d5b5]/50">
              Last updated: {lastUpdated}
            </p>
          </div>

          {[
            {
              title: '1. Introduction',
              content:
                'Welcome to Divya Stotram ("we", "our", or "us"). This Privacy Policy explains how we collect, use and protect information when you visit https://divyastotram.com.',
            },
            {
              title: '2. Information We Collect',
              content:
                'We collect minimal information necessary to operate the website, such as anonymous analytics data, contact form information you choose to provide, and site usage information.',
            },
            {
              title: '3. How We Use Information',
              content:
                'We use information to improve content, understand devotional reading patterns, respond to messages, maintain the website and monitor performance.',
            },
            {
              title: '4. Google Analytics',
              content:
                'We may use Google Analytics to understand anonymous website usage patterns. This may include pages visited, approximate location and time spent on pages.',
            },
            {
              title: '5. Ads and Third-Party Services',
              content:
                'We may use Google AdSense, YouTube embeds, Firebase and hosting providers. These services may process technical data necessary for site functionality, analytics or advertising.',
            },
            {
              title: '6. Cookies',
              content:
                'Cookies may be used for essential site functionality, analytics and advertising. You can manage cookies through your browser settings.',
            },
            {
              title: '7. Contact Information',
              content:
                'If you contact us, we may receive your name, email address and message content solely for responding to your request.',
            },
            {
              title: '8. Data Security',
              content:
                'We take reasonable measures to protect site information, but no internet-based service can guarantee absolute security.',
            },
            {
              title: '9. Changes to This Policy',
              content:
                'We may update this Privacy Policy from time to time. Changes will be reflected by updating the date on this page.',
            },
            {
              title: '10. Contact Us',
              content:
                'For privacy-related questions, contact: contact@divyastotram.com\nWebsite: https://divyastotram.com',
            },
          ].map((section, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-[#1a0505]/90 to-[#0d0202]/95 border border-[#c9922a]/20 rounded-xl p-7 mb-4"
            >
              <h2 className="font-cinzel text-base font-bold text-[#f0c040] mb-3">
                {section.title}
              </h2>
              <p className="font-garamond text-base text-[#e8d5b5]/80 leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}

          <div className="text-center mt-8">
            <Link
              href="/"
              className="font-cinzel-reg text-xs tracking-widest uppercase text-[#c9922a]/50 hover:text-[#c9922a] transition-colors"
            >
              ← Back to Stotrams
            </Link>
          </div>
        </div>
      </div>
    </LangProvider>
  );
}