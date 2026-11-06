'use client';

import { useEffect, useRef } from 'react';

// Decorative themed animation drawn on one canvas laid over a guide page. The canvas never takes clicks.
// Everything is drawn in code (no images). It pauses while the tab is hidden, uses fewer and slightly
// larger particles on phones, and is not rendered at all for visitors who ask for reduced motion.
// A tap on empty space sends a small burst of the theme's own particles.

// The effect plays for DURATION ms, then fades out over FADE ms and stops, so the page is calm for reading.
// Phones get a lighter version: about half the particles, slower spawning and a see-through canvas.
const DURATION = 10000;
const FADE = 1500;

const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const TAU = Math.PI * 2;

function mk(o) {
  return {
    shape: 'petal', x: 0, y: 0, vx: 0, vy: 0, rot: 0, vr: 0, size: 8, color: '#f90',
    age: 0, life: 1e9, sway: 0, swayA: 0, phase: Math.random() * TAU, flip: 0, vflip: 0,
    bob: 0, grow: 0, alpha: 1, fadeTop: false, ...o,
  };
}

// Particles that fall from above the top edge.
function faller(e, shape, colors, o = {}) {
  const s = rand(o.s0 || 6, o.s1 || 11) * e.u;
  return mk({
    shape, x: rand(0, e.w), y: -20, vx: rand(-0.25, 0.25), vy: rand(o.v0 || 0.5, o.v1 || 1.2) * (e.small ? 0.9 : 1),
    rot: rand(0, TAU), vr: rand(-0.03, 0.03), size: s, color: pick(colors), sway: rand(1, 2.6), swayA: rand(0.15, 0.5),
    flip: rand(0, TAU), vflip: rand(0.02, 0.06), ...o.extra,
  });
}

// Particles that rise from below the bottom edge.
function riser(e, shape, colors, o = {}) {
  const s = rand(o.s0 || 6, o.s1 || 11) * e.u;
  return mk({
    shape, x: rand(0, e.w), y: e.h + 20, vx: rand(-0.2, 0.2), vy: -rand(o.v0 || 0.4, o.v1 || 0.9),
    rot: rand(-0.4, 0.4), vr: rand(-0.01, 0.01), size: s, color: pick(colors), sway: rand(0.8, 2), swayA: rand(0.2, 0.6),
    fadeTop: true, ...o.extra,
  });
}

const HOLI = ['#ff2d95', '#ffc400', '#12b5ff', '#8a35ff', '#18c55a', '#ff7a00'];

function holiBurst(e, x, y, list) {
  for (let i = 0; i < 3; i += 1) {
    list.push(mk({ shape: 'puff', x: x + rand(-14, 14), y: y + rand(-14, 14), size: rand(34, 62) * e.u, color: pick(HOLI), life: 1.8, grow: 26 }));
  }
  const n = e.small ? 14 : 22;
  for (let i = 0; i < n; i += 1) {
    const a = rand(0, TAU);
    const sp = rand(1.2, 3.8);
    list.push(mk({ shape: 'mote', x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 0.5, size: rand(2.2, 4.2) * e.u, color: pick(HOLI), life: rand(1, 1.7), drag: 0.96, grav: 0.05 }));
  }
}

// Each theme: how often to spawn, the particle cap, a spawn function, and optional per-frame extras.
const THEMES = {
  marigold: {
    every: [260, 480], max: [26, 44], seed: 14,
    spawn: (e) => (Math.random() < 0.28
      ? faller(e, 'bloom', ['#ff8f00', '#ffb300', '#f4511e'], { s0: 7, s1: 11 })
      : faller(e, 'petal', ['#ff8a00', '#ffb300', '#e65100', '#ffa726', '#d84315'])),
  },
  hibiscus: {
    every: [280, 500], max: [24, 40], seed: 12,
    spawn: (e) => (Math.random() < 0.25
      ? faller(e, 'leaf', ['#2e7d32', '#43a047', '#558b2f'], { s0: 7, s1: 11 })
      : faller(e, 'petal', ['#e53935', '#d81b60', '#ff5252', '#c2185b'], { s0: 7, s1: 12 })),
  },
  lotus: {
    every: [300, 520], max: [24, 40], seed: 12,
    spawn: (e) => (Math.random() < 0.2
      ? faller(e, 'mote', ['#e0a800', '#f5c542'], { s0: 2, s1: 3.5 })
      : faller(e, 'petal', ['#ec407a', '#f06292', '#f48fb1', '#e91e8c'], { s0: 7, s1: 12 })),
  },
  lakshmi: {
    every: [300, 520], max: [24, 40], seed: 12,
    spawn: (e) => {
      const r = Math.random();
      if (r < 0.5) return faller(e, 'coin', ['#f5b800', '#e8a400'], { s0: 6, s1: 9, v0: 0.6, v1: 1.3 });
      return faller(e, 'petal', ['#ec407a', '#f48fb1', '#f06292'], { s0: 7, s1: 12 });
    },
  },
  coins: {
    every: [260, 460], max: [26, 42], seed: 12,
    spawn: (e) => (Math.random() < 0.2
      ? faller(e, 'spark', ['#e0a800', '#ffb300'], { s0: 5, s1: 8 })
      : faller(e, 'coin', ['#f5b800', '#e8a400', '#d99a00'], { s0: 6, s1: 10, v0: 0.6, v1: 1.5 })),
  },
  leaves: {
    every: [300, 520], max: [24, 40], seed: 12,
    spawn: (e) => faller(e, 'leaf', ['#2e7d32', '#43a047', '#66bb6a', '#1b5e20'], { s0: 7, s1: 12 }),
  },
  grains: {
    every: [120, 220], max: [50, 90], seed: 30,
    spawn: (e) => (Math.random() < 0.12
      ? faller(e, 'leaf', ['#7cb342', '#9ccc65'], { s0: 6, s1: 9 })
      : faller(e, 'grain', ['#d4a017', '#e0b030', '#c68b00'], { s0: 3.5, s1: 5.5, v0: 0.9, v1: 1.8 })),
  },
  feathers: {
    every: [900, 1500], max: [9, 15], seed: 6,
    spawn: (e) => faller(e, 'feather', ['#1aa6a0'], { s0: 11, s1: 17, v0: 0.4, v1: 0.8, extra: { sway: rand(0.8, 1.6), swayA: rand(0.35, 0.7), vr: rand(-0.012, 0.012) } }),
  },
  hearts: {
    every: [420, 760], max: [16, 28], seed: 10,
    spawn: (e) => riser(e, 'heart', ['#e91e63', '#f06292', '#ff6f61', '#ec407a'], { s0: 7, s1: 12, v0: 0.5, v1: 1 }),
  },
  notes: {
    every: [520, 900], max: [14, 24], seed: 8,
    spawn: (e) => riser(e, 'note', ['#3949ab', '#00897b', '#b8860b', '#7b1fa2'], { s0: 8, s1: 13, v0: 0.5, v1: 1 }),
  },
  vasant: {
    every: [260, 460], max: [26, 42], seed: 12,
    spawn: (e) => (Math.random() < 0.3
      ? riser(e, 'note', ['#3949ab', '#00897b', '#b8860b'], { s0: 8, s1: 13, v0: 0.5, v1: 1 })
      : faller(e, 'petal', ['#f9a825', '#ffc400', '#fbc02d', '#ffb300'])),
  },
  lamps: {
    every: [800, 1400], max: [9, 16], seed: 6,
    spawn: (e) => riser(e, 'diya', ['#ff9d00'], { s0: 9, s1: 13, v0: 0.35, v1: 0.7 }),
  },
  boats: {
    every: [2600, 4200], max: [4, 6], seed: 0,
    spawn: (e) => {
      if (Math.random() < 0.55) {
        return riser(e, 'diya', ['#ff9d00'], { s0: 8, s1: 11, v0: 0.3, v1: 0.55 });
      }
      const dir = Math.random() < 0.5 ? 1 : -1;
      return mk({
        shape: 'boat', x: dir > 0 ? -30 : e.w + 30, y: e.h - rand(70, 120), vx: dir * rand(0.25, 0.5), size: rand(10, 14) * e.u,
        bob: 3, phase: rand(0, TAU), color: '#c2410c', sway: 0, swayA: 0,
      });
    },
    extra: (e) => {
      // a few rows of tiny waves along the bottom
      const { ctx, w, h, t } = e;
      ctx.strokeStyle = 'rgba(14,154,167,0.35)';
      ctx.lineWidth = 1.5;
      for (let row = 0; row < 2; row += 1) {
        ctx.beginPath();
        const y0 = h - 40 - row * 26;
        for (let x = 0; x <= w; x += 6) {
          const y = y0 + Math.sin(x / 26 + t / 700 + row) * 3;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    },
  },
  embers: {
    every: [110, 200], max: [34, 60], seed: 0,
    spawn: (e) => riser(e, 'ember', ['#ff6a00', '#ff3d00', '#ffb300', '#ff8f00'], { s0: 3, s1: 5, v0: 0.8, v1: 2, extra: { life: rand(2, 4), fadeTop: false } }),
    extra: (e) => {
      const { ctx, w, h } = e;
      const g = ctx.createLinearGradient(0, h - 90, 0, h);
      g.addColorStop(0, 'rgba(255,110,0,0)');
      g.addColorStop(1, 'rgba(255,110,0,0.3)');
      ctx.fillStyle = g;
      ctx.fillRect(0, h - 90, w, 90);
    },
  },
  orbs: {
    every: [900, 1600], max: [6, 10], seed: 5,
    spawn: (e) => riser(e, 'orb', ['#f5b800', '#f06292', '#9575cd', '#26a69a'], { s0: 20, s1: 40, v0: 0.2, v1: 0.45, extra: { life: rand(9, 14), fadeTop: false } }),
  },
  smoke: {
    every: [380, 620], max: [14, 18], seed: 0,
    spawn: (e) => {
      const tip = incenseTip(e);
      return mk({ shape: 'smoke', x: tip.x, y: tip.y, vx: 0, vy: -rand(0.35, 0.6), size: 5 * e.u, grow: 7, color: '#6e5f55', life: 6.5, sway: rand(0.9, 1.5), swayA: rand(0.25, 0.45) });
    },
    extra: (e) => {
      const { ctx, h } = e;
      const tip = incenseTip(e);
      ctx.strokeStyle = '#7a4a21';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(tip.x + 4, h - 26);
      ctx.lineTo(tip.x, tip.y);
      ctx.stroke();
      ctx.fillStyle = '#b8860b';
      ctx.beginPath();
      ctx.ellipse(tip.x + 4, h - 24, 14, 5, 0, 0, TAU);
      ctx.fill();
      ctx.fillStyle = '#ff3d00';
      ctx.beginPath();
      ctx.arc(tip.x, tip.y, 2.6, 0, TAU);
      ctx.fill();
    },
  },
  ripples: {
    every: [1300, 2200], max: [5, 7], seed: 0,
    spawn: (e) => mk({ shape: 'ring', x: rand(e.w * 0.15, e.w * 0.85), y: rand(e.h * 0.45, e.h * 0.9), size: rand(60, 110) * e.u, color: pick(['#0e9aa7', '#c9922a', '#0e9aa7']), life: 3 }),
  },
  rain: {
    every: [26, 46], max: [48, 90], seed: 0,
    spawn: (e) => {
      const vy = rand(8, 12) * (e.small ? 0.85 : 1);
      const vx = -1.3;
      return mk({ shape: 'drop', x: rand(0, e.w + 60), y: -20, vx, vy, size: rand(11, 19) * e.u, color: 'rgba(30,110,200,0.55)', rot: Math.atan2(-vx, vy) });
    },
  },
  holi: {
    every: [1100, 2000], max: [140, 220], seed: 0,
    spawnMany: (e, list) => holiBurst(e, rand(e.w * 0.1, e.w * 0.9), rand(e.h * 0.15, e.h * 0.75), list),
  },
  night: {
    every: [3800, 7000], max: [2, 3], seed: 0,
    spawn: (e) => mk({ shape: 'shoot', x: rand(e.w * 0.35, e.w), y: rand(60, e.h * 0.4), vx: -rand(6, 8), vy: rand(2.5, 3.5), size: 46 * e.u, color: '#e0a800', life: 0.9 }),
    extra: (e) => drawNight(e),
  },
  sun: {
    every: [260, 420], max: [20, 34], seed: 12,
    spawn: (e) => riser(e, 'mote', ['#ffb300', '#ff9800', '#f5c542'], { s0: 2, s1: 4, v0: 0.3, v1: 0.8, extra: { fadeTop: true } }),
    extra: (e) => drawSun(e),
  },
  chariot: {
    every: [900, 1500], max: [14, 24], seed: 8,
    spawn: (e) => faller(e, 'petal', ['#ff8a00', '#ffb300', '#e65100'], { s0: 6, s1: 10 }),
    extra: (e) => drawChariot(e),
  },
  mala: {
    every: [800, 1400], max: [8, 14], seed: 5,
    spawn: (e) => riser(e, 'mote', ['#ffb300', '#f5c542'], { s0: 2, s1: 3.5, v0: 0.25, v1: 0.6 }),
    extra: (e) => drawMala(e),
  },
  pulse: {
    every: [1000, 1700], max: [6, 10], seed: 4,
    spawn: (e) => riser(e, 'orb', ['#22c55e', '#34d399', '#f06292'], { s0: 18, s1: 34, v0: 0.2, v1: 0.4, extra: { life: rand(9, 13), fadeTop: false } }),
    extra: (e) => drawPulse(e),
  },
};

function incenseTip(e) {
  return { x: e.w - 38 - (e.small ? 6 : 0), y: e.h - 84 };
}

function drawNight(e) {
  const { ctx, w, t, small, stars } = e;
  const cols = ['#e0a800', '#7b5cff', '#ffb300'];
  stars.forEach((s, i) => {
    const k = 0.55 + 0.45 * Math.sin(t / 700 + s.p);
    ctx.fillStyle = cols[i % 3];
    ctx.globalAlpha = 0.5 + 0.4 * k;
    drawStar(ctx, s.x * w, s.y * e.h, s.r * (0.7 + 0.5 * k) * (small ? 1.2 : 1));
  });
  ctx.globalAlpha = 1;
  // crescent moon, top right under the header
  const R = small ? 17 : 22;
  const cx = w - (small ? 38 : 70);
  const cy = small ? 118 : 118;
  const g = ctx.createRadialGradient(cx, cy, R * 0.4, cx, cy, R * 2.6);
  g.addColorStop(0, 'rgba(255,215,100,0.45)');
  g.addColorStop(1, 'rgba(255,215,100,0)');
  ctx.fillStyle = g;
  ctx.fillRect(cx - R * 2.6, cy - R * 2.6, R * 5.2, R * 5.2);
  const d = R * 0.5;
  const a = Math.atan2(R, -d);
  ctx.fillStyle = '#f2b705';
  ctx.beginPath();
  ctx.arc(cx, cy, R, -Math.PI / 2, Math.PI / 2, true);
  ctx.arc(cx + d, cy, Math.hypot(R, d), a, TAU - a, false);
  ctx.closePath();
  ctx.fill();
}

function drawStar(ctx, x, y, r) {
  ctx.beginPath();
  for (let i = 0; i < 8; i += 1) {
    const rr = i % 2 === 0 ? r : r * 0.28;
    const a = (Math.PI / 4) * i - Math.PI / 2;
    const px = x + Math.cos(a) * rr;
    const py = y + Math.sin(a) * rr;
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
}

function drawSun(e) {
  const { ctx, w, h, t, small } = e;
  const R = small ? 30 : 46;
  const cx = w - (small ? 4 : 10);
  const cy = h - (small ? 4 : 10);
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(t / 9000);
  ctx.strokeStyle = 'rgba(245,158,11,0.85)';
  ctx.lineWidth = small ? 3 : 4;
  ctx.lineCap = 'round';
  for (let i = 0; i < 16; i += 1) {
    const a = (TAU * i) / 16;
    const l0 = R + 6;
    const l1 = R + (i % 2 ? 16 : 26);
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * l0, Math.sin(a) * l0);
    ctx.lineTo(Math.cos(a) * l1, Math.sin(a) * l1);
    ctx.stroke();
  }
  ctx.restore();
  const g = ctx.createRadialGradient(cx, cy, 2, cx, cy, R);
  g.addColorStop(0, '#ffd54a');
  g.addColorStop(1, '#ff8f00');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, TAU);
  ctx.fill();
}

function drawChariot(e) {
  const { ctx, w, h, t, small } = e;
  const sc = small ? 0.5 : 0.8;
  const sp = small ? 16 : 22;
  const span = w + 320;
  const x = ((t / 1000) * sp) % span - 160;
  const y = h - (small ? 74 : 86);
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(sc, sc);
  ctx.globalAlpha = 0.92;
  // rope to the left
  ctx.strokeStyle = '#6b4423';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(52, -6);
  ctx.lineTo(130, -6);
  ctx.stroke();
  // platform and body
  ctx.fillStyle = '#7c2d12';
  ctx.fillRect(-52, -22, 104, 16);
  ctx.fillStyle = '#c62828';
  ctx.fillRect(-36, -56, 72, 34);
  ctx.fillStyle = '#f5b800';
  ctx.fillRect(-36, -40, 72, 4);
  // canopy tiers
  ctx.fillStyle = '#ea580c';
  ctx.beginPath();
  ctx.moveTo(-34, -56); ctx.lineTo(34, -56); ctx.lineTo(20, -84); ctx.lineTo(-20, -84);
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.moveTo(-18, -84); ctx.lineTo(18, -84); ctx.lineTo(9, -108); ctx.lineTo(-9, -108);
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#f5b800';
  ctx.beginPath();
  ctx.arc(0, -112, 4.5, 0, TAU);
  ctx.fill();
  // flag
  ctx.strokeStyle = '#6b4423';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, -116); ctx.lineTo(0, -134); ctx.stroke();
  const wave = Math.sin(t / 200) * 3;
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.moveTo(0, -134); ctx.lineTo(16, -129 + wave); ctx.lineTo(0, -123);
  ctx.closePath(); ctx.fill();
  // wheels
  [-32, 32].forEach((wx) => {
    ctx.save();
    ctx.translate(wx, 0);
    ctx.rotate((x / 20) * 1);
    ctx.fillStyle = '#5b2a0e';
    ctx.beginPath(); ctx.arc(0, 0, 20, 0, TAU); ctx.fill();
    ctx.strokeStyle = '#f5b800';
    ctx.lineWidth = 2;
    for (let i = 0; i < 8; i += 1) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos((TAU * i) / 8) * 18, Math.sin((TAU * i) / 8) * 18);
      ctx.stroke();
    }
    ctx.restore();
  });
  ctx.restore();
}

function drawMala(e) {
  const { ctx, w, h, t, small } = e;
  const r = small ? 26 : 36;
  const cx = w - r - (small ? 16 : 40);
  const cy = h - r - (small ? 120 : 110);
  const n = 14;
  const active = Math.floor(t / 1100) % n;
  ctx.strokeStyle = 'rgba(160,110,50,0.8)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, TAU);
  ctx.stroke();
  for (let i = 0; i < n; i += 1) {
    const a = (TAU * i) / n - Math.PI / 2;
    const bx = cx + Math.cos(a) * r;
    const by = cy + Math.sin(a) * r;
    const on = i === active;
    if (on) {
      const g = ctx.createRadialGradient(bx, by, 1, bx, by, 14);
      g.addColorStop(0, 'rgba(255,200,60,0.8)');
      g.addColorStop(1, 'rgba(255,200,60,0)');
      ctx.fillStyle = g;
      ctx.fillRect(bx - 14, by - 14, 28, 28);
    }
    ctx.fillStyle = on ? '#e0a800' : '#7a3e1d';
    ctx.beginPath();
    ctx.arc(bx, by, (small ? 3.6 : 4.6) * (on ? 1.3 : 1), 0, TAU);
    ctx.fill();
  }
  // meru bead and tassel
  ctx.fillStyle = '#c0392b';
  ctx.beginPath();
  ctx.arc(cx, cy - r - 7, small ? 4.5 : 6, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = '#c0392b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy - r - 12);
  ctx.lineTo(cx, cy - r - 26);
  ctx.stroke();
}

function drawPulse(e) {
  const { ctx, w, h, t, small } = e;
  const P = 190;
  const amp = small ? 13 : 18;
  const y0 = h - (small ? 78 : 84);
  const pts = [[0, 0], [0.28, 0], [0.33, -0.18], [0.38, 0], [0.45, 0], [0.47, 0.25], [0.5, -1], [0.53, 0.45], [0.56, 0], [0.68, 0], [0.74, -0.28], [0.8, 0], [1, 0]];
  const f = (x) => {
    const r = (((x % P) + P) % P) / P;
    for (let i = 1; i < pts.length; i += 1) {
      if (r <= pts[i][0]) {
        const [a0, b0] = pts[i - 1];
        const [a1, b1] = pts[i];
        return b0 + ((b1 - b0) * (r - a0)) / (a1 - a0);
      }
    }
    return 0;
  };
  const phase = (t * 0.1) % P;
  ctx.strokeStyle = 'rgba(22,163,74,0.8)';
  ctx.lineWidth = 2.2;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  for (let x = 0; x <= w; x += 3) {
    const y = y0 + f(x + phase) * amp;
    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

const SHAPES = {
  petal(ctx, p) {
    const s = p.size;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, s * 0.5, s, 0, 0, TAU);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.28)';
    ctx.beginPath();
    ctx.ellipse(0, -s * 0.2, s * 0.18, s * 0.5, 0, 0, TAU);
    ctx.fill();
  },
  bloom(ctx, p) {
    const s = p.size;
    ctx.fillStyle = p.color;
    for (let i = 0; i < 8; i += 1) {
      ctx.save();
      ctx.rotate((Math.PI / 4) * i);
      ctx.beginPath();
      ctx.ellipse(0, -s * 0.55, s * 0.22, s * 0.5, 0, 0, TAU);
      ctx.fill();
      ctx.restore();
    }
    ctx.fillStyle = '#8d4a00';
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.2, 0, TAU);
    ctx.fill();
  },
  leaf(ctx, p) {
    const s = p.size;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.quadraticCurveTo(s * 0.8, -s * 0.2, 0, s);
    ctx.quadraticCurveTo(-s * 0.8, -s * 0.2, 0, -s);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.9);
    ctx.lineTo(0, s * 0.9);
    ctx.stroke();
  },
  coin(ctx, p) {
    const s = p.size;
    ctx.scale(Math.abs(Math.cos(p.flip)) * 0.9 + 0.1, 1);
    ctx.fillStyle = p.color;
    ctx.strokeStyle = '#a86e00';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(0, 0, s, 0, TAU);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.62, 0, TAU);
    ctx.stroke();
  },
  heart(ctx, p) {
    const s = p.size;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.moveTo(0, s * 0.35);
    ctx.bezierCurveTo(-s * 0.9, -s * 0.3, -s * 0.4, -s * 0.95, 0, -s * 0.4);
    ctx.bezierCurveTo(s * 0.4, -s * 0.95, s * 0.9, -s * 0.3, 0, s * 0.35);
    ctx.fill();
  },
  feather(ctx, p) {
    const s = p.size;
    ctx.strokeStyle = '#1b5e20';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(0, -s * 1.1);
    ctx.lineTo(0, s * 1.5);
    ctx.stroke();
    ctx.fillStyle = '#1aa6a0';
    ctx.beginPath();
    ctx.ellipse(0, -s * 0.2, s * 0.5, s, 0, 0, TAU);
    ctx.fill();
    ctx.fillStyle = '#1f5fbf';
    ctx.beginPath();
    ctx.ellipse(0, -s * 0.35, s * 0.3, s * 0.52, 0, 0, TAU);
    ctx.fill();
    ctx.fillStyle = '#e8b923';
    ctx.beginPath();
    ctx.ellipse(0, -s * 0.35, s * 0.12, s * 0.22, 0, 0, TAU);
    ctx.fill();
  },
  note(ctx, p) {
    const s = p.size;
    ctx.fillStyle = p.color;
    ctx.save();
    ctx.rotate(-0.4);
    ctx.beginPath();
    ctx.ellipse(0, 0, s * 0.5, s * 0.35, 0, 0, TAU);
    ctx.fill();
    ctx.restore();
    ctx.fillRect(s * 0.38, -s * 1.4, Math.max(1.6, s * 0.14), s * 1.4);
    ctx.beginPath();
    ctx.moveTo(s * 0.52, -s * 1.4);
    ctx.quadraticCurveTo(s * 1.15, -s * 1.1, s * 0.9, -s * 0.6);
    ctx.quadraticCurveTo(s * 0.9, -s * 0.95, s * 0.52, -s * 1.0);
    ctx.fill();
  },
  grain(ctx, p) {
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size * 0.35, p.size, 0, 0, TAU);
    ctx.fill();
  },
  drop(ctx, p) {
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -p.size);
    ctx.stroke();
  },
  spark(ctx, p) {
    ctx.fillStyle = p.color;
    drawStar(ctx, 0, 0, p.size * (0.7 + 0.3 * Math.sin(p.age * 6 + p.phase)));
  },
  mote(ctx, p) {
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(0, 0, p.size, 0, TAU);
    ctx.fill();
  },
  ember(ctx, p) {
    ctx.fillStyle = p.color;
    ctx.globalAlpha *= 0.7 + 0.3 * Math.sin(p.age * 20 + p.phase);
    ctx.beginPath();
    ctx.arc(0, 0, p.size * (1 - 0.5 * (p.age / p.life)), 0, TAU);
    ctx.fill();
  },
  diya(ctx, p) {
    const s = p.size;
    const g = ctx.createRadialGradient(0, -s * 0.6, 1, 0, -s * 0.6, s * 1.6);
    g.addColorStop(0, 'rgba(255,190,60,0.6)');
    g.addColorStop(1, 'rgba(255,190,60,0)');
    ctx.fillStyle = g;
    ctx.fillRect(-s * 1.6, -s * 2.2, s * 3.2, s * 3.2);
    ctx.fillStyle = '#a8481a';
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.6, 0, Math.PI);
    ctx.fill();
    const fl = 1 + 0.12 * Math.sin(p.age * 14 + p.phase);
    ctx.fillStyle = '#ff8f00';
    ctx.beginPath();
    ctx.moveTo(0, -s * 1.3 * fl);
    ctx.quadraticCurveTo(s * 0.5, -s * 0.7, 0, -s * 0.2);
    ctx.quadraticCurveTo(-s * 0.5, -s * 0.7, 0, -s * 1.3 * fl);
    ctx.fill();
    ctx.fillStyle = '#fff1a8';
    ctx.beginPath();
    ctx.ellipse(0, -s * 0.55, s * 0.15, s * 0.3, 0, 0, TAU);
    ctx.fill();
  },
  boat(ctx, p) {
    const s = p.size;
    ctx.fillStyle = '#fff4d6';
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(-s, 0); ctx.lineTo(s, 0); ctx.lineTo(s * 0.65, s * 0.45); ctx.lineTo(-s * 0.65, s * 0.45);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#ffb74d';
    ctx.beginPath();
    ctx.moveTo(0, -s * 1.1); ctx.lineTo(s * 0.7, -s * 0.1); ctx.lineTo(0, -s * 0.1);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ff8f00';
    ctx.beginPath();
    ctx.arc(-s * 0.35, -s * 0.2, s * 0.17, 0, TAU);
    ctx.fill();
  },
  orb(ctx, p) {
    const g = ctx.createRadialGradient(0, 0, 1, 0, 0, p.size);
    g.addColorStop(0, p.color);
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.globalAlpha *= 0.42;
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, p.size, 0, TAU);
    ctx.fill();
  },
  smoke(ctx, p) {
    const g = ctx.createRadialGradient(0, 0, 1, 0, 0, p.size);
    g.addColorStop(0, 'rgba(110,95,85,0.28)');
    g.addColorStop(1, 'rgba(110,95,85,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, p.size, 0, TAU);
    ctx.fill();
  },
  puff(ctx, p) {
    const g = ctx.createRadialGradient(0, 0, 1, 0, 0, p.size);
    g.addColorStop(0, p.color);
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.globalAlpha *= 0.5;
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, p.size, 0, TAU);
    ctx.fill();
  },
  ring(ctx, p) {
    const k = p.age / p.life;
    ctx.globalAlpha *= 0.75 * (1 - k);
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, p.size * k, 0, TAU);
    ctx.stroke();
  },
  shoot(ctx, p) {
    ctx.globalAlpha *= 1 - p.age / p.life;
    const l = Math.hypot(p.vx, p.vy);
    const g = ctx.createLinearGradient(0, 0, (-p.vx / l) * p.size, (-p.vy / l) * p.size);
    g.addColorStop(0, p.color);
    g.addColorStop(1, 'rgba(224,168,0,0)');
    ctx.strokeStyle = g;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo((-p.vx / l) * p.size, (-p.vy / l) * p.size);
    ctx.stroke();
  },
};

export default function ThemeCanvas({ theme }) {
  const ref = useRef(null);

  useEffect(() => {
    const cfg = THEMES[theme];
    const canvas = ref.current;
    if (!cfg || !canvas) return undefined;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = canvas.getContext('2d');
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let last = 0;
    let nextSpawn = 0;
    let el = 0;
    let stars = [];
    const list = [];
    const env = () => ({ ctx, w, h, t: last, small: w < 640, u: 1, stars });

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (theme === 'night') {
        const n = w < 640 ? 14 : 26;
        stars = Array.from({ length: n }, () => ({ x: Math.random(), y: Math.random() * 0.85, r: rand(3.2, 5.6), p: rand(0, TAU) }));
      }
    };

    const maxCount = () => (w < 640 ? Math.max(3, Math.ceil(cfg.max[0] * 0.5)) : cfg.max[1]);

    const add = () => {
      const e = env();
      if (cfg.spawnMany) {
        cfg.spawnMany(e, list);
      } else if (list.length < maxCount()) {
        list.push(cfg.spawn(e));
      }
    };

    const onPointer = (ev) => {
      if (ev.target && ev.target.closest && ev.target.closest('a, button, input, textarea, select, summary, label')) return;
      const e = env();
      if (el > DURATION) return;
      if (cfg.spawnMany) {
        holiBurst(e, ev.clientX, ev.clientY, list);
        return;
      }
      if (!cfg.spawn) return;
      for (let i = 0; i < 7; i += 1) {
        const p = cfg.spawn(e);
        if (p.shape === 'boat' || p.shape === 'drop' || p.shape === 'shoot' || p.shape === 'smoke') continue;
        const a = rand(0, TAU);
        const sp = rand(1, 3);
        p.x = ev.clientX;
        p.y = ev.clientY;
        p.vx = Math.cos(a) * sp;
        p.vy = Math.sin(a) * sp - 0.6;
        p.drag = 0.96;
        p.fadeTop = false;
        p.life = rand(1.2, 2.2);
        list.push(p);
      }
      if (theme === 'ripples') {
        list.push(mk({ shape: 'ring', x: ev.clientX, y: ev.clientY, size: 80 * e.u, color: '#0e9aa7', life: 2.4 }));
      }
      while (list.length > 260) list.shift();
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
      const base = w < 640 ? 0.6 : 1;
      canvas.style.opacity = String(base * (el > DURATION ? 1 - (el - DURATION) / FADE : 1));
      if (el < DURATION && t > nextSpawn) {
        add();
        nextSpawn = t + rand(cfg.every[0], cfg.every[1]) * (w < 640 ? 1.5 : 1);
      }
      ctx.clearRect(0, 0, w, h);
      const e = env();
      e.t = t;
      if (cfg.extra) {
        ctx.save();
        cfg.extra(e);
        ctx.restore();
      }
      for (let i = list.length - 1; i >= 0; i -= 1) {
        const p = list[i];
        p.age += dt / 60;
        if (p.drag) {
          p.vx *= p.drag;
          p.vy = p.vy * p.drag + (p.grav || 0) * dt;
        }
        p.x += (p.vx + (p.swayA ? Math.cos(p.age * p.sway + p.phase) * p.swayA : 0)) * dt;
        p.y += p.vy * dt;
        p.rot += p.vr * dt;
        p.flip += p.vflip * dt;
        if (p.grow) p.size += (p.grow * dt) / 60;
        const off = p.y > h + 40 || p.y < -60 || p.x < -60 || p.x > w + 60;
        if (p.age >= p.life || off) {
          list.splice(i, 1);
          continue;
        }
        let a = Math.min(1, p.age / 0.8);
        if (p.life < 1e8) a *= Math.min(1, (p.life - p.age) / 0.8);
        if (p.fadeTop) a *= Math.min(1, Math.max(0, (p.y + 20) / (h * 0.3)));
        ctx.save();
        ctx.translate(p.x, p.y + (p.bob ? Math.sin(p.age * 1.6 + p.phase) * p.bob : 0));
        ctx.rotate(p.rot);
        ctx.globalAlpha = a * (p.alpha || 1);
        SHAPES[p.shape](ctx, p);
        ctx.restore();
      }
    };

    resize();
    const e0 = env();
    if (cfg.spawn) {
      for (let i = 0; i < Math.round((cfg.seed || 0) * (w < 640 ? 0.5 : 1)); i += 1) {
        const p = cfg.spawn(e0);
        if (p.shape !== 'boat') p.y = rand(0, h * 0.95);
        p.age = rand(0.8, 2);
        list.push(p);
      }
    }
    nextSpawn = 400;
    window.addEventListener('resize', resize);
    window.addEventListener('pointerdown', onPointer);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', onPointer);
      ctx.clearRect(0, 0, w, h);
    };
  }, [theme]);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-30" />;
}
