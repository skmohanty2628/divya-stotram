'use client';
import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { watchLiveTotal } from '@/lib/firebase';

export default function LiveVisitorCard() {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    let cleanup = () => {};

    try {
      cleanup = watchLiveTotal((liveCount) => {
        setCount(liveCount);
      });
    } catch (error) {
      console.error('Live visitor watch error:', error);
      setCount(0);
    }

    return () => cleanup();
  }, []);

  if (!mounted) return null;

  return (
    <div className="hidden sm:block fixed bottom-6 left-6 z-30 bg-[#1a0505] border border-[#c9922a]/35 rounded-xl p-4 shadow-xl shadow-black/60 min-w-[150px]">
      <div className="flex items-center justify-between mb-3">
        <Users size={15} className="text-[#e8760a]" />
        <span className="font-cinzel-reg text-[8px] tracking-[2.5px] uppercase text-[#e8d5b5]/35">
          Live Visitors
        </span>
      </div>

      <p className="font-cinzel text-4xl font-bold text-[#f0c040] leading-none mb-2">
        {count.toLocaleString()}
      </p>

      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#e8760a] animate-pulse flex-shrink-0" />
        <span className="font-garamond text-xs text-[#e8d5b5]/45">Right now</span>
      </div>
    </div>
  );
}