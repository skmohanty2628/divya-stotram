'use client';
import Navbar from '@/components/Navbar';
import { LangProvider } from '@/components/LanguageSwitcher';

// Wraps server-rendered pages (guides, legal pages) with the shared language context and navbar.
export default function SiteShell({ children, background = '#fdf6e3' }) {
  return (
    <LangProvider>
      <div className="min-h-screen" style={{ background }}>
        <Navbar />
        {children}
      </div>
    </LangProvider>
  );
}
