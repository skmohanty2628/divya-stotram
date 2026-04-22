'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { LangProvider, useLang } from '@/components/LanguageSwitcher';
import { STOTRAMS_INDEX } from '@/data/stotrams-index';

function StarCanvas() {
  useEffect(() => {
    const canvas = document.getElementById('home-stars');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let raf;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.2 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.008 + 0.003,
    }));

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.01;

      stars.forEach((s) => {
        const a = 0.2 + 0.45 * Math.sin(s.phase + t * s.speed * 10);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,230,170,${a})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas id="home-stars" className="fixed inset-0 z-0 pointer-events-none" />;
}

function SearchBox({ value, onChange }) {
  return (
    <div className="max-w-2xl mx-auto mb-8 sm:mb-10">
      <div className="relative">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c9922a]"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search Hanuman Chalisa, Shiva Tandav, Vishnu Sahasranamam..."
          className="w-full rounded-full border border-[#c9922a]/30 bg-white pl-11 pr-4 py-3 sm:py-4 font-garamond text-sm sm:text-base text-[#3d1a00] shadow-sm outline-none focus:border-[#c9922a] focus:ring-2 focus:ring-[#c9922a]/20"
        />
      </div>
    </div>
  );
}

function getIconStyles(iconText = '') {
  const len = Array.from(iconText).length;

  if (len <= 2) return { fontSize: '24px', lineHeight: '1', letterSpacing: '0' };
  if (len <= 5) return { fontSize: '18px', lineHeight: '1.05', letterSpacing: '0.5px' };
  if (len <= 8) return { fontSize: '14px', lineHeight: '1.05', letterSpacing: '0.3px' };

  return { fontSize: '12px', lineHeight: '1.05', letterSpacing: '0' };
}

function StotramIcon({ s, className = 'h-11 w-11 sm:h-[60px] sm:w-[60px] mb-3 sm:mb-4' }) {
  if (s.deityIcon) {
    return (
      <img
        src={s.deityIcon}
        alt={s.deity}
        className={`${className} object-contain drop-shadow-sm`}
      />
    );
  }

  const iconStyles = getIconStyles(s.deityEmoji || '');

  return (
    <div
      className={`${className} rounded-xl sm:rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#fff7e8] to-[#fff1d1] border border-[#c9922a]/20 shadow-sm overflow-hidden`}
    >
      <span
        className="flex items-center justify-center w-full h-full text-center px-1 break-words select-none"
        style={{
          ...iconStyles,
          whiteSpace: 'normal',
          overflowWrap: 'anywhere',
          wordBreak: 'break-word',
        }}
      >
        {s.deityEmoji}
      </span>
    </div>
  );
}

function StotramCard({ s, index }) {
  const { lang } = useLang();

  return (
    <Link
      href={`/${s.slug}`}
      className="group relative bg-white border border-[#c9922a]/30 rounded-xl sm:rounded-2xl p-3 sm:p-5 lg:p-6 hover:border-[#c9922a] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden min-h-[240px] sm:min-h-[310px] lg:min-h-[340px] flex flex-col"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#c9922a]/0 to-transparent group-hover:via-[#c9922a] transition-all duration-300" />

      {s.featured && (
        <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 font-cinzel-reg text-[7px] sm:text-[9px] tracking-[1.5px] sm:tracking-[2px] uppercase bg-[#e8760a]/10 text-[#e8760a] border border-[#e8760a]/30 rounded-full px-1.5 sm:px-2 py-0.5">
          Featured
        </span>
      )}

      <StotramIcon s={s} />

      <h2 className="font-cinzel text-[13px] sm:text-[15px] lg:text-base font-bold text-[#8b1a00] mb-1 leading-tight min-h-[40px] sm:min-h-[48px]">
        {s.title?.[lang] || s.title?.en}
      </h2>

      <p className="font-cinzel-reg text-[9px] sm:text-[11px] text-[#e8760a] tracking-[1.8px] sm:tracking-widest mb-2 sm:mb-3 uppercase min-h-[16px] sm:min-h-[20px]">
        {s.deity}
      </p>

      <p className="font-garamond text-[11px] sm:text-[13px] lg:text-sm text-[#3d1a00]/70 leading-relaxed mb-3 sm:mb-4 line-clamp-3 min-h-[54px] sm:min-h-[64px] lg:min-h-[72px]">
        {s.description?.[lang] || s.description?.en}
      </p>

      <div className="flex items-center justify-between mt-auto gap-2">
        <span className="font-cinzel-reg text-[8px] sm:text-[9px] lg:text-[10px] tracking-[1.2px] sm:tracking-widest text-[#c9922a]/70 uppercase">
          {s.verseCount} {s.verseCount === 1 ? 'Verse' : 'Verses'}
        </span>
        <span className="font-cinzel-reg text-[8px] sm:text-[9px] lg:text-[10px] tracking-[1.2px] sm:tracking-widest text-[#c9922a]/70 uppercase text-right">
          {s.language}
        </span>
      </div>

      <div className="mt-2.5 sm:mt-3 flex items-center gap-1 text-[#c9922a] group-hover:gap-2.5 transition-all">
        <span className="font-cinzel-reg text-[10px] sm:text-[11px] lg:text-xs tracking-[1.5px] sm:tracking-widest uppercase font-bold">
          Read Now
        </span>
        <span className="text-xs sm:text-sm">→</span>
      </div>
    </Link>
  );
}

function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-8">
      <div className="h-px flex-1 bg-gradient-to-r from-[#c9922a]/30 to-transparent" />
      <span className="font-cinzel-reg text-[9px] sm:text-[11px] tracking-[3px] sm:tracking-[5px] uppercase text-[#e8760a] text-center">
        {title}
      </span>
      <div className="h-px flex-1 bg-gradient-to-l from-[#c9922a]/30 to-transparent" />
    </div>
  );
}

function HomeContent() {
  const [query, setQuery] = useState('');

  const krishnaSlug = 'krishna-vasudevaya-mantra';
  const krishnaItem = STOTRAMS_INDEX.find((s) => s.slug === krishnaSlug);

  const featured = useMemo(() => {
    const items = STOTRAMS_INDEX.filter((s) => s.featured);
    const hasKrishna = items.some((s) => s.slug === krishnaSlug);
    const merged = hasKrishna || !krishnaItem ? items : [krishnaItem, ...items];

    return merged
      .sort((a, b) => {
        if (a.slug === krishnaSlug) return -1;
        if (b.slug === krishnaSlug) return 1;
        return 0;
      })
      .slice(0, 9);
  }, [krishnaItem]);

  const matchesQuery = (s, q) => {
    const fields = [
      s.slug,
      s.deity,
      s.language,
      s.title?.en,
      s.title?.hi,
      s.title?.od,
      s.title?.or,
      s.title?.te,
      s.description?.en,
      s.description?.hi,
      s.description?.od,
      s.description?.or,
      s.description?.te,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return fields.includes(q);
  };

  const filteredFeatured = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return featured;
    return featured.filter((s) => matchesQuery(s, q));
  }, [query, featured]);

  const faqItems = [
    {
      q: 'What is a stotram?',
      a: 'A stotram is a devotional hymn of praise dedicated to a Hindu deity. It is usually recited for devotion, peace, protection, gratitude, and spiritual focus.',
    },
    {
      q: 'Can I read these prayers in English?',
      a: 'Yes. Divya Stotram provides Hindu prayers and stotrams in English, and many pages also include Hindi, Odia, and Telugu for easier reading.',
    },
    {
      q: 'What is the difference between a mantra and a stotram?',
      a: 'A mantra is usually shorter and repeated many times, while a stotram is a longer devotional hymn with verses praising a deity or divine quality.',
    },
    {
      q: 'Which prayer can I read daily?',
      a: 'Many devotees read Hanuman Chalisa, Shiva Tandav, Gayatri Mantra, Vishnu Sahasranamam, or Lakshmi prayers daily depending on devotion and purpose.',
    },
  ];

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-16 sm:pb-24">
      <div className="text-center pt-20 pb-10 sm:py-20 lg:py-28">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-[#c9922a]" />
          <span className="font-cinzel-reg text-[9px] sm:text-[11px] tracking-[3px] sm:tracking-[5px] uppercase text-[#e8760a]">
            Welcome to
          </span>
          <div className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-[#c9922a]" />
        </div>

        <div className="flex justify-center mb-4 sm:mb-6">
          <img
            src="/logo.svg"
            alt="Divya Stotram"
            width="82"
            height="82"
            className="sm:w-[100px] sm:h-[100px]"
            style={{ borderRadius: '18px' }}
          />
        </div>

        <h1
          className="font-cinzel text-[34px] leading-none sm:text-5xl lg:text-7xl font-bold text-[#8b1a00] mb-2 sm:mb-4"
          style={{ textShadow: '0 2px 8px rgba(139,26,0,0.15)' }}
        >
          दिव्य स्तोत्रम्
        </h1>

        <p className="font-cinzel text-lg sm:text-xl lg:text-2xl text-[#c9922a] tracking-[2px] sm:tracking-widest mb-4 sm:mb-6">
          DIVYA STOTRAM
        </p>

        <p className="font-garamond text-sm sm:text-lg lg:text-xl text-[#3d1a00]/70 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed italic px-2">
          Read sacred Hindu prayers, stotrams, mantras and devotional lyrics in
          English, Hindi, Odia and Telugu with meaning, benefits and chanting guidance.
        </p>

        <SearchBox value={query} onChange={setQuery} />

        {query.trim() && (
          <p className="font-cinzel-reg text-[10px] sm:text-[11px] tracking-[2px] sm:tracking-[3px] uppercase text-[#c9922a]/80 mb-4 sm:mb-6">
            {filteredFeatured.length} result{filteredFeatured.length === 1 ? '' : 's'} found
          </p>
        )}
      </div>

      {!query.trim() && (
        <section className="mb-10 sm:mb-14">
          <div className="bg-white border border-[#c9922a]/20 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm">
            <h2 className="font-cinzel text-lg sm:text-2xl text-[#8b1a00] font-bold mb-3 sm:mb-4">
              Hindu Prayers, Stotrams and Mantras with Meaning
            </h2>
            <div className="space-y-3 font-garamond text-[13px] sm:text-base leading-relaxed text-[#3d1a00]/80">
              <p>
                Divya Stotram is a devotional reading platform where you can explore Hindu
                stotrams, mantras and prayers with clean reading pages and easy navigation.
                Read Hanuman Chalisa, Shiva Tandav Stotram, Vishnu Sahasranamam, Durga
                Stotram, Lakshmi prayers, Krishna mantra and more in English, Hindi,
                Odia and Telugu.
              </p>
              <p>
                Whether you are looking for daily prayer, devotional hymns for peace,
                protection, courage, study, success or spiritual focus, this site helps
                you find sacred Hindu prayers in a simple and beautiful format. Browse
                featured prayers or open the full library of stotrams
                to continue your daily reading and chanting.
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="mb-10 sm:mb-14">
        <div className="bg-white border border-[#c9922a]/20 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm">
          <h2 className="font-cinzel text-lg sm:text-2xl text-[#8b1a00] font-bold mb-3 sm:mb-4">
            What you can read on Divya Stotram
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-left">
            {[
              'Hanuman Chalisa in English, Hindi, Odia and Telugu',
              'Shiva Tandav Stotram lyrics with meaning',
              'Vishnu Sahasranamam with structured reading format',
              'Durga Stotram, Aigiri Nandini and more devotional prayers',
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-[#c9922a]/15 p-3 sm:p-4 bg-[#fffaf1]"
              >
                <p className="font-garamond text-[11px] sm:text-base leading-snug text-[#3d1a00]/80">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {!!filteredFeatured.length && (
        <section className="mb-12 sm:mb-16">
          <SectionHeader title="Featured Prayers" />

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {filteredFeatured.map((s, index) => {
              const isLast = index === filteredFeatured.length - 1;
              const isOdd = filteredFeatured.length % 2 !== 0;

              return (
                <div
                  key={s.slug}
                  className={isOdd && isLast ? 'col-span-2 flex justify-center lg:col-span-1 lg:block' : ''}
                >
                  <div className={isOdd && isLast ? 'w-[85%] sm:w-full lg:w-full' : 'w-full'}>
                    <StotramCard s={s} index={index} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {!query.trim() && (
        <section className="mb-12 sm:mb-16">
          <SectionHeader title="Mantras for Life Situations" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            {[
              { label: 'Best Mantra for Anxiety', href: '/best-mantra-for-anxiety' },
              { label: 'Best Mantra for Confidence', href: '/best-mantra-for-confidence' },
              { label: 'Best Mantra for Study', href: '/best-mantra-for-study-focus' },
              { label: 'Best Mantra for Money', href: '/best-mantra-for-money' },
              { label: 'Best Prayer for Inner Peace', href: '/best-prayer-for-inner-peace' },
              { label: 'Best Mantra for Sleep', href: '/best-mantra-for-sleep' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-[#c9922a]/20 bg-white px-3 sm:px-5 py-3 sm:py-4 font-garamond text-[11px] sm:text-base text-[#3d1a00]/85 hover:border-[#c9922a]/40 hover:shadow-sm transition-all"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>
      )}

      {!query.trim() && (
        <section className="mb-12 sm:mb-16">
          <SectionHeader title="Frequently Asked Questions" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-5">
            {faqItems.map((item) => (
              <div
                key={item.q}
                className="bg-white border border-[#c9922a]/20 rounded-2xl p-4 sm:p-5 shadow-sm"
              >
                <h3 className="font-cinzel text-[13px] sm:text-base text-[#8b1a00] font-bold mb-2">
                  {item.q}
                </h3>
                <p className="font-garamond text-[12px] sm:text-[15px] leading-relaxed text-[#3d1a00]/75">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {!query.trim() && (
        <section className="mb-8 sm:mb-12">
          <div className="bg-gradient-to-r from-[#fff7e8] to-[#fff1d1] border border-[#c9922a]/20 rounded-2xl p-5 sm:p-7 text-center">
            <h2 className="font-cinzel text-lg sm:text-2xl text-[#8b1a00] font-bold mb-3">
              Continue Reading Sacred Hindu Prayers
            </h2>
            <p className="font-garamond text-sm sm:text-lg text-[#3d1a00]/75 max-w-2xl mx-auto mb-5">
              Start with featured stotrams or open the full library to explore all
              devotional prayers, mantras and hymns in one place.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/all-stotrams"
                className="rounded-full bg-[#8b1a00] text-white px-6 py-3 font-cinzel-reg text-xs tracking-[2px] uppercase hover:bg-[#6f1400] transition-colors"
              >
                View All Stotrams
              </Link>
              <Link
                href="/hanuman-chalisa"
                className="rounded-full border border-[#c9922a]/30 bg-white text-[#8b1a00] px-6 py-3 font-cinzel-reg text-xs tracking-[2px] uppercase hover:border-[#c9922a]/55 transition-colors"
              >
                Read Hanuman Chalisa
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default function HomePageClient() {
  return (
    <LangProvider>
      <div className="min-h-screen" style={{ background: '#fdf6e3' }}>
        <StarCanvas />

        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.03]">
          <div
            className="w-[700px] h-[700px] border border-[#c9922a] rounded-full"
            style={{ animation: 'spin 120s linear infinite' }}
          />
          <div
            className="absolute w-[500px] h-[500px] border border-[#c9922a] rounded-full"
            style={{ animation: 'spin 80s linear infinite reverse' }}
          />
          <div className="absolute w-[300px] h-[300px] border border-[#c9922a] rounded-full" />
        </div>

        <Navbar />
        <HomeContent />
      </div>
    </LangProvider>
  );
}