'use client';

import { useEffect, useRef, useState } from 'react';

// Decorative Diwali fireworks drawn on a canvas laid over the whole page. The canvas never takes clicks.
// Fountain crackers spray from the right edge. Rockets rise from the bottom and burst at random heights, and a tap or click on empty space sets off a burst there.
// It pauses when the tab is hidden, uses fewer particles on small screens, and starts switched off for visitors
// who ask their device for reduced motion. A couple with sparklers stands in the free space on the left on wide screens.
const COLORS = ['#ffb300', '#ff7a00', '#ff3d2e', '#e91e8c', '#19b34a', '#1e9bff', '#8e44ff', '#f5c000'];
const GRAVITY = 0.045;
// Plays for DURATION ms, then fades out over FADE ms and stops. Phones get a lighter, see-through version.
const DURATION = 10000;
const FADE = 1500;
// Fountain crackers (anaar) stand in the free space on the right edge and spray sparks in cycles.
const FOUNTAIN_COLORS = ['#ffb300', '#ff9100', '#ff7a00', '#f5c000', '#ffcc33'];

function rand(a, b) {
  return a + Math.random() * (b - a);
}

export default function Fireworks() {
  const canvasRef = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setOn(!reduce);
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
    let el = 0;
    const rockets = [];
    const sparks = [];
    const small = () => w < 640;
    const SPARK_COLORS = ['#ffb300', '#ff8f00', '#f5c000', '#ff6d00'];
    const drawPerson = (x, baseY, woman, face, t, phase) => {
      const bob = Math.sin(t / 380 + phase) * 3;
      const skin = '#d9a066';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      // lower body
      if (woman) {
        ctx.fillStyle = '#b3261e';
        ctx.beginPath();
        ctx.moveTo(x - 13, baseY - 82);
        ctx.lineTo(x + 13, baseY - 82);
        ctx.lineTo(x + 26, baseY);
        ctx.lineTo(x - 26, baseY);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#e6b43c';
        ctx.fillRect(x - 26, baseY - 7, 52, 5);
      } else {
        ctx.fillStyle = '#f1e6d2';
        ctx.fillRect(x - 11, baseY - 48, 9, 48);
        ctx.fillRect(x + 2, baseY - 48, 9, 48);
      }
      // torso
      ctx.fillStyle = woman ? '#7a1410' : '#e0733a';
      ctx.beginPath();
      ctx.roundRect(x - 14, baseY - 112, 28, woman ? 32 : 68, 7);
      ctx.fill();
      // head and hair
      ctx.fillStyle = '#2a1810';
      ctx.beginPath();
      ctx.arc(x - face * 2, baseY - 126, 12.5, 0, Math.PI * 2);
      ctx.fill();
      if (woman) {
        ctx.beginPath();
        ctx.arc(x - face * 11, baseY - 133, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#c0392b';
        ctx.fillRect(x - 1, baseY - 140, 2, 3);
      }
      ctx.fillStyle = skin;
      ctx.beginPath();
      ctx.arc(x + face * 2, baseY - 124, 10.5, 0, Math.PI * 2);
      ctx.fill();
      // arm and sparkler
      const hx = x + face * 36;
      const hy = baseY - 118 + bob;
      ctx.strokeStyle = woman ? '#7a1410' : '#e0733a';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(x + face * 6, baseY - 104);
      ctx.lineTo(x + face * 22, baseY - 106 + bob * 0.5);
      ctx.stroke();
      ctx.strokeStyle = skin;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(x + face * 22, baseY - 106 + bob * 0.5);
      ctx.lineTo(hx, hy);
      ctx.stroke();
      const tx = hx + face * 6;
      const ty = hy - 30;
      ctx.strokeStyle = '#6b6b6b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(hx, hy);
      ctx.lineTo(tx, ty);
      ctx.stroke();
      return { tx, ty };
    };
    const showCouple = () => w >= 1200;
    const fountainSpots = () => (w >= 1100 ? [w - 70, w - 150] : [w - 36]);

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
          size: rand(1.2, 2.2) * (small() ? 1.7 : 1.25),
          drag: willow ? 0.985 : 0.97,
          grav: willow ? GRAVITY * 1.5 : GRAVITY,
        });
      }
      while (sparks.length > 520) sparks.shift();
    };

    const launch = () => {
      const x = rand(w * 0.08, w * 0.92);
      rockets.push({ x, y: h + 10, vx: rand(-0.4, 0.4), vy: -rand(h * 0.011, h * 0.016), peak: rand(h * 0.12, h * 0.55) });
    };

    const onPointer = (e) => {
      if (el > DURATION) return;
      if (e.target && e.target.closest && e.target.closest('a, button, input, textarea, select, summary, label')) return;
      burst(e.clientX, e.clientY);
    };

    const finish = () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', onPointer);
      ctx.clearRect(0, 0, w, h);
      canvas.style.display = 'none';
    };

    const frame = (t) => {
      raf = requestAnimationFrame(frame);
      if (document.visibilityState !== 'visible') {
        last = t;
        return;
      }
      const dt = Math.min(2.5, (t - (last || t)) / 16.67);
      last = t;
      el += dt * 16.67;
      if (el > DURATION + FADE) {
        finish();
        return;
      }
      canvas.style.opacity = String((small() ? 0.75 : 1) * (el > DURATION ? 1 - (el - DURATION) / FADE : 1));
      if (el < DURATION - 1200 && t > nextLaunch) {
        launch();
        if (!small() && Math.random() < 0.35) launch();
        nextLaunch = t + rand(900, 1900) * (small() ? 1.4 : 1);
      }
      ctx.clearRect(0, 0, w, h);
      const tips = [];
      if (showCouple()) {
        const free = (w - 848) / 2;
        const baseY = h - 90;
        tips.push(drawPerson(free * 0.3, baseY, false, 1, t, 0));
        tips.push(drawPerson(free * 0.78, baseY, true, -1, t, 1.7));
      }
      ctx.globalCompositeOperation = 'source-over';
      tips.forEach((tp) => {
        const glow = ctx.createRadialGradient(tp.tx, tp.ty, 1, tp.tx, tp.ty, 22);
        glow.addColorStop(0, 'rgba(255,236,160,0.8)');
        glow.addColorStop(1, 'rgba(255,200,90,0)');
        ctx.fillStyle = glow;
        ctx.fillRect(tp.tx - 22, tp.ty - 22, 44, 44);
        for (let k = 0; k < (el < DURATION ? 3 : 0); k += 1) {
          const a = rand(0, Math.PI * 2);
          const sp = rand(0.8, 3.2);
          sparks.push({
            x: tp.tx,
            y: tp.ty,
            vx: Math.cos(a) * sp,
            vy: Math.sin(a) * sp,
            life: rand(0.3, 0.7),
            age: 0,
            color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
            size: rand(0.8, 1.6) * 1.5,
            drag: 0.96,
            grav: 0.05,
          });
        }
      });
      fountainSpots().forEach((fx, idx) => {
        const cycle = ((t / 1000 + idx * 3.5) % 9);
        if (cycle > 5.5 || el >= DURATION) return;
        const glow = ctx.createRadialGradient(fx, h, 2, fx, h, 46);
        glow.addColorStop(0, 'rgba(255,190,80,0.55)');
        glow.addColorStop(1, 'rgba(255,190,80,0)');
        ctx.fillStyle = glow;
        ctx.fillRect(fx - 46, h - 46, 92, 46);
        const n = Math.round((small() ? 2 : 4) * dt);
        for (let k = 0; k < n; k += 1) {
          const a = -Math.PI / 2 + rand(-0.3, 0.3);
          const speed = small() ? rand(3.4, 6) : rand(4.2, 7.6);
          sparks.push({
            x: fx + rand(-3, 3),
            y: h - 4,
            vx: Math.cos(a) * speed,
            vy: Math.sin(a) * speed,
            life: rand(0.5, 1.1),
            age: 0,
            color: FOUNTAIN_COLORS[Math.floor(Math.random() * FOUNTAIN_COLORS.length)],
            size: rand(1, 1.9) * (small() ? 1.9 : 1.4),
            drag: 0.99,
            grav: 0.09,
          });
        }
      });
      while (sparks.length > 520) sparks.shift();
      for (let i = rockets.length - 1; i >= 0; i -= 1) {
        const r = rockets[i];
        r.x += r.vx * dt;
        r.y += r.vy * dt;
        r.vy += 0.012 * dt;
        ctx.fillStyle = '#ff8f00';
        ctx.fillRect(r.x - 1.5, r.y, 3, 9);
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
        ctx.globalAlpha = Math.min(1, k * 1.6);
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

  if (!on) return null;
  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-30" />;
}
