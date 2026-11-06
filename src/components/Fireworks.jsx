'use client';

import { useEffect, useRef, useState } from 'react';

// Decorative Diwali fireworks drawn on a canvas laid over the whole page. The canvas never takes clicks.
// Rockets rise from the bottom and burst at random heights, and a tap or click on empty space sets off a burst there.
// It pauses when the tab is hidden, uses fewer particles on small screens, and starts switched off for visitors
// who ask their device for reduced motion. A button lets anyone turn it off or on, and the choice is remembered.
const COLORS = ['#ffd45a', '#ff9d2e', '#ff5a3c', '#ff7bb0', '#7cf0a6', '#6fd8ff', '#c79bff', '#fff2b8'];
const GRAVITY = 0.045;

function rand(a, b) {
  return a + Math.random() * (b - a);
}

export default function Fireworks() {
  const canvasRef = useRef(null);
  const [on, setOn] = useState(null);

  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem('ds_fireworks');
    } catch {
      saved = null;
    }
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setOn(saved === 'on' ? true : saved === 'off' ? false : !reduce);
  }, []);

  useEffect(() => {
    if (!on) return undefined;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let last = 0;
    let nextLaunch = 0;
    const rockets = [];
    const sparks = [];
    const small = () => w < 640;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const burst = (x, y) => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const alt = COLORS[Math.floor(Math.random() * COLORS.length)];
      const kind = Math.random();
      const count = small() ? 34 : 60;
      for (let i = 0; i < count; i += 1) {
        const a = (Math.PI * 2 * i) / count + rand(-0.04, 0.04);
        let speed = rand(1.2, 3.6);
        if (kind < 0.35) speed = 3.2; // ring
        const willow = kind > 0.8;
        sparks.push({
          x,
          y,
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed,
          life: willow ? rand(1.8, 2.6) : rand(0.9, 1.6),
          age: 0,
          color: i % 3 === 0 ? alt : color,
          size: rand(1.2, 2.2),
          drag: willow ? 0.985 : 0.97,
          grav: willow ? GRAVITY * 1.5 : GRAVITY,
        });
      }
      while (sparks.length > 420) sparks.shift();
    };

    const launch = () => {
      const x = rand(w * 0.08, w * 0.92);
      rockets.push({ x, y: h + 10, vx: rand(-0.4, 0.4), vy: -rand(h * 0.011, h * 0.016), peak: rand(h * 0.12, h * 0.55) });
    };

    const onPointer = (e) => {
      if (e.target && e.target.closest && e.target.closest('a, button, input, textarea, select, summary, label')) return;
      burst(e.clientX, e.clientY);
    };

    const frame = (t) => {
      raf = requestAnimationFrame(frame);
      if (document.visibilityState !== 'visible') {
        last = t;
        return;
      }
      const dt = Math.min(2.5, (t - (last || t)) / 16.67);
      last = t;
      if (t > nextLaunch) {
        launch();
        if (!small() && Math.random() < 0.35) launch();
        nextLaunch = t + rand(900, 1900);
      }
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      for (let i = rockets.length - 1; i >= 0; i -= 1) {
        const r = rockets[i];
        r.x += r.vx * dt;
        r.y += r.vy * dt;
        r.vy += 0.012 * dt;
        ctx.fillStyle = 'rgba(255,230,160,0.9)';
        ctx.fillRect(r.x - 1, r.y, 2, 6);
        if (r.y <= r.peak || r.vy > -1) {
          burst(r.x, r.y);
          rockets.splice(i, 1);
        }
      }
      for (let i = sparks.length - 1; i >= 0; i -= 1) {
        const s = sparks[i];
        s.age += dt / 60;
        if (s.age >= s.life) {
          sparks.splice(i, 1);
          continue;
        }
        s.vx *= s.drag;
        s.vy = s.vy * s.drag + s.grav * dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        const k = 1 - s.age / s.life;
        ctx.globalAlpha = Math.min(1, k * 1.4) * 0.9;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * (0.5 + k * 0.7), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    resize();
    nextLaunch = 600;
    window.addEventListener('resize', resize);
    window.addEventListener('pointerdown', onPointer);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', onPointer);
      ctx.clearRect(0, 0, w, h);
    };
  }, [on]);

  const toggle = () => {
    const next = !on;
    setOn(next);
    try {
      localStorage.setItem('ds_fireworks', next ? 'on' : 'off');
    } catch {
      // Storage may be blocked; the choice then lasts for this visit only.
    }
  };

  if (on === null) return null;
  return (
    <>
      {on ? <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-30" /> : null}
      <button
        type="button"
        onClick={toggle}
        aria-pressed={on}
        className="fixed bottom-20 left-4 z-40 rounded-full border border-[#c9922a]/50 bg-[#1a0505]/90 px-3.5 py-2 font-cinzel-reg text-[10px] uppercase tracking-[1.5px] text-[#f0c040] shadow-lg backdrop-blur hover:bg-[#2a0a0a]"
      >
        {on ? 'Fireworks: on' : 'Fireworks: off'}
      </button>
    </>
  );
}
