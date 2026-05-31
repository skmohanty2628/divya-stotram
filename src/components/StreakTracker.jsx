'use client';

import { useEffect, useState } from 'react';
import { Flame } from 'lucide-react';

function getTodayStr() {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
}

function getYesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

export default function StreakTracker() {
  const [streak, setStreak] = useState(0);
  const [isNew, setIsNew] = useState(false); // true if streak incremented today
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const today = getTodayStr();
    const yesterday = getYesterdayStr();
    const lastVisit = localStorage.getItem('divya_last_visit');
    const currentStreak = parseInt(localStorage.getItem('divya_streak') || '0', 10);

    let newStreak = currentStreak;
    let updatedToday = false;

    if (lastVisit === today) {
      // Already visited today — just show existing streak
      newStreak = currentStreak;
    } else if (lastVisit === yesterday) {
      // Visited yesterday — increment streak
      newStreak = currentStreak + 1;
      updatedToday = true;
      localStorage.setItem('divya_streak', String(newStreak));
      localStorage.setItem('divya_last_visit', today);
    } else {
      // Missed a day (or first visit) — reset streak to 1
      newStreak = 1;
      updatedToday = lastVisit !== today;
      localStorage.setItem('divya_streak', '1');
      localStorage.setItem('divya_last_visit', today);
    }

    setStreak(newStreak);
    setIsNew(updatedToday);
    setShow(true);
  }, []);

  if (!show || streak < 1) return null;

  const flameColor =
    streak >= 30 ? '#ff3b00' : streak >= 14 ? '#f0c040' : streak >= 7 ? '#fb923c' : '#c9922a';

  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-[#c9922a]/20 bg-[#1a0505]/90 px-3 py-1.5 shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
      title={`You've visited ${streak} day${streak === 1 ? '' : 's'} in a row!`}
    >
      <Flame
        size={16}
        style={{ color: flameColor }}
        className={isNew ? 'animate-pulse' : ''}
      />
      <span
        className="font-cinzel text-sm font-bold"
        style={{ color: flameColor }}
      >
        {streak}
      </span>
      <span className="font-cinzel-reg text-[9px] uppercase tracking-[1.5px] text-[#e8d5b5]/55">
        {streak === 1 ? 'day streak' : 'day streak'}
      </span>
      {isNew && streak > 1 && (
        <span className="rounded-full bg-[#f0c040]/15 px-1.5 py-0.5 font-cinzel-reg text-[8px] uppercase tracking-wider text-[#f0c040]">
          +1
        </span>
      )}
    </div>
  );
}

// Larger card version for the stotram page header
export function StreakCard() {
  const [streak, setStreak] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const today = getTodayStr();
    const yesterday = getYesterdayStr();
    const lastVisit = localStorage.getItem('divya_last_visit');
    const currentStreak = parseInt(localStorage.getItem('divya_streak') || '0', 10);

    let newStreak = currentStreak;

    if (lastVisit === today) {
      newStreak = currentStreak;
    } else if (lastVisit === yesterday) {
      newStreak = currentStreak + 1;
      localStorage.setItem('divya_streak', String(newStreak));
      localStorage.setItem('divya_last_visit', today);
    } else {
      newStreak = 1;
      localStorage.setItem('divya_streak', '1');
      localStorage.setItem('divya_last_visit', today);
    }

    setStreak(newStreak);
    setShow(true);
  }, []);

  if (!show) return null;

  const label =
    streak >= 30 ? '🏆 Legend!' :
    streak >= 14 ? '⚡ On Fire!' :
    streak >= 7  ? '🔥 Devotee!' :
    streak >= 3  ? '✨ Rising!' :
    '🙏 Welcome!';

  return (
    <div className="rounded-2xl border border-[#c9922a]/20 bg-[#1a0505]/90 p-4 text-center">
      <div className="flex items-center justify-center gap-2 mb-1">
        <Flame size={20} className="text-[#f0c040]" />
        <span className="font-cinzel text-2xl font-bold text-[#f0c040]">{streak}</span>
      </div>
      <p className="font-cinzel-reg text-[10px] uppercase tracking-[2px] text-[#e8d5b5]/50">
        Day Streak
      </p>
      <p className="mt-1 font-garamond text-sm text-[#e8d5b5]/70">{label}</p>
    </div>
  );
}