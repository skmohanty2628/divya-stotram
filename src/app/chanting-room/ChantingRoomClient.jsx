'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// ─── Mantra definitions ───────────────────────────────────────────────────────
const MANTRAS = [
  {
    id: 'jai-shree-ram',
    label: '🚩 Jai Shree Ram',
    display: 'जय श्री राम',
    keywords: ['jai shree ram', 'jai shri ram', 'jay shree ram', 'jai ram', 'shri ram', 'जय श्री राम'],
    lang: 'hi-IN',
  },
  {
    id: 'om-namah-shivaya',
    label: '🔱 Om Namah Shivaya',
    display: 'ॐ नमः शिवाय',
    keywords: ['om namah shivaya', 'namah shivaya', 'shivaya', 'नमः शिवाय'],
    lang: 'hi-IN',
  },
  {
    id: 'hare-krishna',
    label: '🪷 Hare Krishna',
    display: 'हरे कृष्ण',
    keywords: ['hare krishna', 'hare rama', 'hare hare', 'हरे कृष्ण'],
    lang: 'hi-IN',
  },
  {
    id: 'om',
    label: '☀️ Om / Aum',
    display: 'ॐ',
    keywords: ['om', 'aum', 'ohm'],
    lang: 'hi-IN',
  },
  {
    id: 'gayatri',
    label: '☀️ Gayatri Mantra',
    display: 'गायत्री मन्त्र',
    keywords: ['gayatri', 'tat savitur', 'savitur', 'bhargo', 'गायत्री'],
    lang: 'hi-IN',
  },
  {
    id: 'jai-mata-di',
    label: '🌸 Jai Mata Di',
    display: 'जय माता दी',
    keywords: ['jai mata di', 'jai durge', 'durga', 'sherawali', 'माता दी'],
    lang: 'hi-IN',
  },
  {
    id: 'ganesh',
    label: '🐘 Ganesh Mantra',
    display: 'ॐ गं गणपतये',
    keywords: ['om gam ganapataye', 'ganesh', 'ganapati', 'गणपतये'],
    lang: 'hi-IN',
  },
  {
    id: 'jai-hanuman',
    label: '🚩 Jai Hanuman',
    display: 'जय हनुमान',
    keywords: ['jai hanuman', 'bajrang bali', 'hanuman', 'जय हनुमान'],
    lang: 'hi-IN',
  },
  {
    id: 'radhe-radhe',
    label: '💛 Radhe Radhe',
    display: 'राधे राधे',
    keywords: ['radhe radhe', 'radhe shyam', 'radhe krishna', 'राधे'],
    lang: 'hi-IN',
  },
  {
    id: 'om-namo-narayanaya',
    label: '🪷 Om Namo Narayanaya',
    display: 'ॐ नमो नारायणाय',
    keywords: ['om namo narayanaya', 'narayana', 'narayanaya', 'नारायणाय'],
    lang: 'hi-IN',
  },
];

const TARGETS = [11, 21, 54, 108, 1008];

// ─── Audio helpers ────────────────────────────────────────────────────────────
function playClick() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.type = 'sine'; o.frequency.value = 660;
    g.gain.setValueAtTime(0.12, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.12);
  } catch (_) {}
}

function playBell() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [528, 792, 1056].forEach((freq, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = 'sine'; o.frequency.value = freq;
      const t = ctx.currentTime + i * 0.08;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.35, t + 0.05);
      g.gain.exponentialRampToValueAtTime(0.001, t + 2.5);
      o.start(t); o.stop(t + 2.6);
    });
  } catch (_) {}
}

// ─── Rudraksha Mala SVG ───────────────────────────────────────────────────────
function MalaSvg({ count, target }) {
  const beads = [];
  const cx = 150, cy = 150, r = 120;
  const n = Math.min(target, 108);
  const filled = count % target;
  const allDone = count > 0 && count % target === 0;

  for (let i = 0; i < n; i++) {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2 + (2 * Math.PI / n) * 0.5;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    const prog = filled / n;
    const isFilled = (i / n) < prog || allDone;
    const radius = n <= 21 ? 10 : n <= 54 ? 7 : 5.5;

    beads.push(
      <g key={i}>
        <circle
          cx={x.toFixed(2)}
          cy={y.toFixed(2)}
          r={radius}
          fill={isFilled ? 'url(#bead_full)' : 'url(#bead_empty)'}
          stroke={isFilled ? '#c9922a66' : '#4a2a0844'}
          strokeWidth="0.8"
        />
        {/* Rudraksha texture lines on larger filled beads */}
        {isFilled && radius >= 7 && [0, 1, 2, 3, 4].map((l) => {
          const la = (l / 5) * Math.PI + angle;
          const x1 = x + radius * 0.3 * Math.cos(la + Math.PI / 2);
          const y1 = y + radius * 0.3 * Math.sin(la + Math.PI / 2);
          const x2 = x - radius * 0.3 * Math.cos(la + Math.PI / 2);
          const y2 = y - radius * 0.3 * Math.sin(la + Math.PI / 2);
          return (
            <line
              key={l}
              x1={x1.toFixed(1)} y1={y1.toFixed(1)}
              x2={x2.toFixed(1)} y2={y2.toFixed(1)}
              stroke="#1a080855" strokeWidth="0.5"
            />
          );
        })}
      </g>
    );
  }

  return (
    <svg width="300" height="300" viewBox="0 0 300 300">
      <defs>
        <radialGradient id="bead_full" cx="38%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#c9922a" />
          <stop offset="60%" stopColor="#8b5a1a" />
          <stop offset="100%" stopColor="#4a2a08" />
        </radialGradient>
        <radialGradient id="bead_empty" cx="38%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#4a2a10" />
          <stop offset="60%" stopColor="#2a1206" />
          <stop offset="100%" stopColor="#1a0800" />
        </radialGradient>
        <radialGradient id="bead_guru" cx="38%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#f0c040" />
          <stop offset="60%" stopColor="#c9922a" />
          <stop offset="100%" stopColor="#8b5a1a" />
        </radialGradient>
      </defs>
      {/* Thread */}
      <circle cx="150" cy="150" r="120" fill="none" stroke="#4a2a0855" strokeWidth="1.5" strokeDasharray="3,3" />
      {/* Beads */}
      {beads}
      {/* Guru bead */}
      <ellipse cx="150" cy="34" rx="14" ry="14" fill="url(#bead_guru)" stroke="#f0c04066" strokeWidth="1.5" />
      <text x="150" y="39" textAnchor="middle" fontSize="13" fill="#1a0800" fontFamily="Georgia,serif">🕉</text>
    </svg>
  );
}

// ─── Wave visualizer ──────────────────────────────────────────────────────────
function WaveBar({ listening }) {
  const [heights, setHeights] = useState([6, 10, 16, 22, 16, 10, 6]);

  useEffect(() => {
    if (!listening) {
      setHeights([6, 10, 16, 22, 16, 10, 6]);
      return;
    }
    const base = [6, 10, 16, 22, 16, 10, 6];
    const id = setInterval(() => {
      setHeights(base.map(h => Math.round(Math.min(h * (0.5 + Math.random() * 1.5), 28))));
    }, 120);
    return () => clearInterval(id);
  }, [listening]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '28px', justifyContent: 'center', marginBottom: '16px' }}>
      {heights.map((h, i) => (
        <div key={i} style={{
          width: '4px', borderRadius: '2px',
          height: `${h}px`,
          background: listening ? '#e8760a' : '#c9922a44',
          transition: 'height 0.1s, background 0.3s',
        }} />
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ChantingRoomClient() {
  const [mantraIdx, setMantraIdx]     = useState(0);
  const [target, setTarget]           = useState(108);
  const [count, setCount]             = useState(0);
  const [rounds, setRounds]           = useState(0);
  const [totalAll, setTotalAll]       = useState(0);
  const [listening, setListening]     = useState(false);
  const [heardText, setHeardText]     = useState('say the mantra aloud · it will count automatically');
  const [flash, setFlash]             = useState(false);
  const [showDone, setShowDone]       = useState(false);
  const [doneMsg, setDoneMsg]         = useState('');
  const [sessionLog, setSessionLog]   = useState([]);
  const [unsupported, setUnsupported] = useState(false);

  const recogRef      = useRef(null);
  const lastCountRef  = useRef(0);
  const listeningRef  = useRef(false);
  const countRef      = useRef(0);
  const roundsRef     = useRef(0);
  const totalRef      = useRef(0);
  const targetRef     = useRef(108);
  const mantraIdxRef  = useRef(0);

  // Keep refs in sync
  useEffect(() => { countRef.current = count; }, [count]);
  useEffect(() => { roundsRef.current = rounds; }, [rounds]);
  useEffect(() => { totalRef.current = totalAll; }, [totalAll]);
  useEffect(() => { targetRef.current = target; }, [target]);
  useEffect(() => { mantraIdxRef.current = mantraIdx; }, [mantraIdx]);

  const addCount = useCallback(() => {
    const newCount = countRef.current + 1;
    const newTotal = totalRef.current + 1;
    setCount(newCount);
    setTotalAll(newTotal);
    countRef.current = newCount;
    totalRef.current = newTotal;

    setFlash(true);
    setTimeout(() => setFlash(false), 300);
    playClick();

    if (newCount % targetRef.current === 0) {
      const newRounds = roundsRef.current + 1;
      setRounds(newRounds);
      roundsRef.current = newRounds;
      const t = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const mantra = MANTRAS[mantraIdxRef.current];
      setSessionLog(prev => [...prev, {
        label: `Round ${newRounds} · ${targetRef.current} × ${mantra.label.split(' ').slice(1).join(' ')}`,
        time: t,
      }]);
      playBell();
      setDoneMsg(`${targetRef.current} chants complete · Round ${newRounds}`);
      setShowDone(true);
      setTimeout(() => setShowDone(false), 4000);
    }
  }, []);

  // ── Voice recognition ──────────────────────────────────
  const initRecognition = useCallback(() => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) { setUnsupported(true); return false; }

    const rec = new SpeechRec();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = MANTRAS[mantraIdxRef.current].lang;

    rec.onresult = (e) => {
      let heard = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        heard += e.results[i][0].transcript.toLowerCase().trim() + ' ';
      }
      heard = heard.trim();
      if (heard) setHeardText(`"${heard}"`);

      const keywords = MANTRAS[mantraIdxRef.current].keywords;
      const now = Date.now();
      const matched = keywords.some(kw => heard.includes(kw.toLowerCase()));
      if (matched && now - lastCountRef.current > 900) {
        lastCountRef.current = now;
        addCount();
      }
    };

    rec.onerror = (e) => { if (e.error !== 'no-speech') stopListening(); };
    rec.onend   = () => { if (listeningRef.current) { try { rec.start(); } catch (_) {} } };

    recogRef.current = rec;
    return true;
  }, [addCount]);

  const startListening = useCallback(() => {
    if (!recogRef.current && !initRecognition()) return;
    try {
      recogRef.current.lang = MANTRAS[mantraIdxRef.current].lang;
      recogRef.current.start();
      listeningRef.current = true;
      setListening(true);
      setHeardText('listening… say the mantra aloud');
    } catch (_) {}
  }, [initRecognition]);

  const stopListening = useCallback(() => {
    listeningRef.current = false;
    setListening(false);
    try { recogRef.current?.stop(); } catch (_) {}
    setHeardText('say the mantra aloud · it will count automatically');
  }, []);

  const toggleListen = () => { listening ? stopListening() : startListening(); };

  // Stop recognition on unmount
  useEffect(() => () => { try { recogRef.current?.stop(); } catch (_) {} }, []);

  const resetAll = () => {
    if (listening) stopListening();
    setCount(0); setRounds(0); setTotalAll(0);
    setSessionLog([]); setShowDone(false);
    countRef.current = 0; roundsRef.current = 0; totalRef.current = 0;
  };

  const changeMantra = (idx) => {
    setMantraIdx(idx);
    mantraIdxRef.current = idx;
    resetAll();
    // Reset recognition so lang updates
    try { recogRef.current?.stop(); } catch (_) {}
    recogRef.current = null;
  };

  const changeTarget = (t) => {
    setTarget(t); targetRef.current = t;
    resetAll();
  };

  const cur    = count % target || (count > 0 && count % target === 0 ? target : 0);
  const left   = target - (count % target);
  const mantra = MANTRAS[mantraIdx];

  return (
    <div style={{ minHeight: '100vh', background: '#1a0800' }}>
      <Navbar />

      {/* Ambient glow */}
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '400px', height: '400px', borderRadius: '50%',
        background: listening
          ? 'radial-gradient(circle,#c9922a25 0%,transparent 70%)'
          : 'radial-gradient(circle,#c9922a10 0%,transparent 70%)',
        pointerEvents: 'none', transition: 'background 0.5s', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '480px', margin: '0 auto', padding: '24px 16px 60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '28px', marginBottom: '4px' }}>🕉️</div>
          <h1 className="font-cinzel" style={{ fontSize: '22px', color: '#f0c040', fontWeight: 'normal', letterSpacing: '2px' }}>
            Chanting Room
          </h1>
          <p className="font-cinzel-reg" style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: '#c9922a88', marginTop: '2px' }}>
            Divya Stotram · Voice Japa Mala
          </p>
        </div>

        {/* Mantra dropdown */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '340px', marginBottom: '20px' }}>
          <select
            value={mantraIdx}
            onChange={e => changeMantra(Number(e.target.value))}
            style={{
              width: '100%', background: '#2a0e00', border: '1px solid #c9922a55',
              borderRadius: '12px', padding: '12px 40px 12px 18px',
              color: '#f0c040', fontFamily: 'Georgia,serif', fontSize: '16px',
              outline: 'none', cursor: 'pointer', appearance: 'none', textAlign: 'center',
            }}
          >
            {MANTRAS.map((m, i) => (
              <option key={m.id} value={i} style={{ background: '#2a0e00', color: '#f0c040' }}>
                {m.label}
              </option>
            ))}
          </select>
          <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#c9922a', pointerEvents: 'none', fontSize: '12px' }}>▾</div>
        </div>

        {/* Target selector */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '22px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {TARGETS.map(t => (
            <button
              key={t}
              onClick={() => changeTarget(t)}
              style={{
                background: target === t ? '#c9922a' : 'transparent',
                border: '1px solid ' + (target === t ? '#c9922a' : '#c9922a44'),
                borderRadius: '20px', padding: '5px 14px',
                fontSize: '13px', color: target === t ? '#1a0800' : '#c9922a',
                cursor: 'pointer', fontFamily: 'Georgia,serif', transition: 'all 0.2s',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Mala + mic button */}
        <div style={{ position: 'relative', width: '300px', height: '300px', marginBottom: '20px' }}>
          <MalaSvg count={count} target={target} />
          <button
            onClick={toggleListen}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              width: '110px', height: '110px', borderRadius: '50%',
              border: `2.5px solid ${listening ? '#e8760a' : '#c9922a'}`,
              background: listening ? '#3a1200' : '#2a0e00',
              cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
              boxShadow: listening ? '0 0 0 8px #e8760a22, 0 0 0 16px #e8760a0a' : 'none',
              animation: listening ? 'malaPulse 1.5s infinite' : 'none',
              zIndex: 5,
            }}
          >
            <span style={{ fontSize: '28px', marginBottom: '2px' }}>🎙️</span>
            <span className="font-cinzel-reg" style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: listening ? '#e8760a' : '#c9922a' }}>
              {listening ? 'Listening' : 'Start'}
            </span>
          </button>
        </div>

        <style>{`
          @keyframes malaPulse {
            0%   { box-shadow: 0 0 0 4px #e8760a22, 0 0 0 8px #e8760a0a; }
            50%  { box-shadow: 0 0 0 12px #e8760a22, 0 0 0 24px #e8760a0a; }
            100% { box-shadow: 0 0 0 4px #e8760a22, 0 0 0 8px #e8760a0a; }
          }
        `}</style>

        {/* Unsupported warning */}
        {unsupported && (
          <div style={{ background: '#3a0a00', border: '1px solid #e8760a44', borderRadius: '10px', padding: '10px 16px', color: '#e8760a', fontSize: '12px', textAlign: 'center', marginBottom: '12px', maxWidth: '320px' }}>
            Voice recognition requires Chrome (Android or desktop). Use the +1 Manual button instead.
          </div>
        )}

        {/* Chant display */}
        <div className="font-garamond" style={{ fontSize: '26px', color: flash ? '#f0c040' : '#f5e8d0', letterSpacing: '3px', marginBottom: '4px', textAlign: 'center', transition: 'color 0.2s', minHeight: '38px' }}>
          {mantra.display}
        </div>
        <div className="font-cinzel-reg" style={{ fontSize: '11px', color: '#c9922a66', letterSpacing: '1px', marginBottom: '16px', textAlign: 'center', minHeight: '16px' }}>
          {heardText}
        </div>

        {/* Voice wave */}
        <WaveBar listening={listening} />

        {/* Count display */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div className="font-cinzel" style={{ fontSize: '56px', color: '#f0c040', lineHeight: 1 }}>{cur}</div>
          <div className="font-cinzel-reg" style={{ fontSize: '12px', color: '#c9922a88', letterSpacing: '2px', marginTop: '4px' }}>
            of {target} · {rounds} round{rounds !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          {[['Rounds', rounds], ['Total', totalAll], ['Left', left === target ? target : left]].map(([lbl, val]) => (
            <div key={lbl} style={{ background: '#2a0e00', border: '1px solid #c9922a22', borderRadius: '12px', padding: '10px 18px', textAlign: 'center', minWidth: '80px' }}>
              <div className="font-cinzel" style={{ fontSize: '20px', color: '#f0c040' }}>{val}</div>
              <div className="font-cinzel-reg" style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#c9922a66', marginTop: '2px' }}>{lbl}</div>
            </div>
          ))}
        </div>

        {/* Completion banner */}
        {showDone && (
          <div style={{ background: '#c9922a', borderRadius: '14px', padding: '14px 28px', textAlign: 'center', marginBottom: '14px', width: '100%', maxWidth: '320px' }}>
            <p className="font-cinzel" style={{ fontSize: '18px', color: '#fff' }}>🙏 {mantra.label.split(' ').slice(1).join(' ')}!</p>
            <p className="font-cinzel-reg" style={{ fontSize: '10px', letterSpacing: '2px', color: '#fff9', textTransform: 'uppercase', marginTop: '4px' }}>{doneMsg}</p>
          </div>
        )}

        {/* Controls */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { label: '+1 Manual', action: addCount },
            { label: '↩ Undo', action: () => { if (count > 0) { setCount(c => c - 1); countRef.current--; setTotalAll(t => Math.max(0, t - 1)); totalRef.current = Math.max(0, totalRef.current - 1); } } },
            { label: 'Reset', action: resetAll },
          ].map(({ label, action }) => (
            <button
              key={label}
              onClick={action}
              className="font-cinzel-reg"
              style={{ background: 'transparent', border: '1px solid #c9922a33', borderRadius: '8px', padding: '7px 16px', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#c9922a88', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Session log */}
        <div style={{ width: '100%', maxWidth: '340px', background: '#2a0e00', border: '1px solid #c9922a22', borderRadius: '12px', padding: '14px 18px' }}>
          <p className="font-cinzel-reg" style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#c9922a', marginBottom: '10px' }}>Session Log</p>
          {sessionLog.length === 0 ? (
            <p className="font-garamond" style={{ fontSize: '12px', color: '#c9922a33', fontStyle: 'italic' }}>No rounds completed yet</p>
          ) : (
            <div>
              {[...sessionLog].reverse().slice(0, 6).map((entry, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#f5e8d088', padding: '4px 0', borderBottom: '1px solid #c9922a11' }}>
                  <span className="font-garamond">{entry.label}</span>
                  <span style={{ color: '#c9922a55' }}>{entry.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Back to prayers */}
        <Link href="/" className="font-cinzel-reg" style={{ marginTop: '24px', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#c9922a44', textDecoration: 'none' }}>
          ← Back to Prayers
        </Link>

      </div>
    </div>
  );
}