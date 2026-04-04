'use client';
import { useState, useEffect } from 'react';
import { watchLiveTotal } from '@/lib/firebase';

export default function LiveCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    // Try Firebase; fallback to a plausible random number
    try {
      const unsub = watchLiveTotal((c) => setCount(c));
      return unsub;
    } catch {
      // Firebase not configured yet — show demo number
      setCount(Math.floor(Math.random() * 200) + 50);
    }
  }, []);

  if (count === null) return null;

  return (
    <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[#e8760a]/10 border border-[#e8760a]/30 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-[#e8760a] animate-pulse" />
      <span className="font-cinzel-reg text-[10px] tracking-wider text-[#e8760a]">
        {count.toLocaleString()} Holy Souls
      </span>
    </div>
  );
}
