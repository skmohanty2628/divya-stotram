'use client';
import { useState } from 'react';
import { Music, X, ChevronDown, ChevronUp } from 'lucide-react';

export default function MusicPlayer({ youtubeId, title }) {
  const [open, setOpen]     = useState(false);
  const [minimized, setMin] = useState(false);

  if (!youtubeId) return null;

  return (
    <>
      {/* Floating trigger button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-24 right-4 z-40 flex items-center gap-2 bg-[#1a0505] border border-[#c9922a]/50 text-[#f0c040] px-4 py-3 rounded-full shadow-lg shadow-black/50 hover:border-[#c9922a] hover:scale-105 transition-all"
        >
          <Music size={16} className="animate-pulse" />
          <span className="font-cinzel-reg text-xs tracking-wider">Play Bhajan</span>
        </button>
      )}

      {/* Player panel — responsive */}
      {open && (
        <div className={`fixed right-2 left-2 sm:left-auto z-40 bg-[#0d0202] border border-[#c9922a]/40 rounded-2xl shadow-2xl shadow-black/70 overflow-hidden transition-all ${
          minimized ? 'bottom-2 sm:w-64' : 'bottom-2 sm:w-80'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#c9922a]/20 bg-[#150303]">
            <div className="flex items-center gap-2">
              <Music size={14} className="text-[#e8760a] flex-shrink-0" />
              <span className="font-cinzel-reg text-xs tracking-widest text-[#f0c040] truncate max-w-[180px] sm:max-w-[140px]">
                {title}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMin(m => !m)}
                className="text-[#c9922a]/60 hover:text-[#c9922a] p-1"
                title={minimized ? 'Expand' : 'Minimize'}
              >
                {minimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="text-[#c9922a]/60 hover:text-[#c9922a] p-1"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* YouTube iframe */}
          {!minimized && (
            <div className="p-2">
              <iframe
                width="100%"
                height="200"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&controls=1&modestbranding=1`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              />
              <p className="mt-2 font-garamond text-[11px] text-[#e8d5b5]/40 text-center">
                🎵 Devotional music · Copyright-safe
              </p>
            </div>
          )}

          {minimized && (
            <div className="px-4 py-2 font-garamond text-xs text-[#c9922a]/60 flex items-center gap-2">
              <Music size={12} className="animate-pulse" />
              Playing in background...
            </div>
          )}
        </div>
      )}
    </>
  );
}