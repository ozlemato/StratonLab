'use client';

import { useEffect, useRef } from 'react';
import { paintHeroEclipse } from '@/lib/hero-eclipse';

const DRAW_SECONDS = 2.4;
const ROTATION_INTERVAL = 1.25;
const END_SECONDS = 5.4;
const TAU = Math.PI * 2;
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => value ** 3 * (value * (value * 6 - 15) + 10);

type Point = { x: number; y: number };

// P + uT : le point de contact P appartient au cercle et T est perpendiculaire au rayon.
function tangent(cx: number, cy: number, radius: number, angle: number, width: number, height: number) {
  const point = { x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius };
  const direction = { x: -Math.sin(angle), y: Math.cos(angle) };
  let low = -Infinity;
  let high = Infinity;
  for (const [position, delta, limit] of [[point.x, direction.x, width], [point.y, direction.y, height]]) {
    if (Math.abs(delta) < 1e-8) {
      if (position < -40 || position > limit + 40) return null;
    } else {
      const a = (-40 - position) / delta;
      const b = (limit + 40 - position) / delta;
      low = Math.max(low, Math.min(a, b));
      high = Math.min(high, Math.max(a, b));
    }
  }
  if (low >= high) return null;
  return [
    { x: point.x + low * direction.x, y: point.y + low * direction.y },
    { x: point.x + high * direction.x, y: point.y + high * direction.y },
  ];
}

export function HeroOrbit() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !parent || !ctx) return;
    const background = document.createElement('canvas');
    const backgroundContext = background.getContext('2d');
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let start = 0;
    let width = 0;
    let height = 0;
    let disposed = false;
    let visible = true;
    let ready = false;

    function render(now: number) {
      frame = 0;
      if (!ctx || !canvas || !ready || !width || !height) return;
      const elapsed = preference.matches ? END_SECONDS : Math.min(END_SECONDS, (now - start) / 1000);
      const progress = smooth(clamp(elapsed / DRAW_SECONDS));
      const rotating = Math.max(0, elapsed - DRAW_SECONDS);
      const step = Math.min(2, Math.floor(rotating / ROTATION_INTERVAL));
      const fraction = clamp((rotating - step * ROTATION_INTERVAL) / ROTATION_INTERVAL);
      const rotation = (step + (step < 2 ? 1 - 2 ** (-10 * fraction) : 0)) * Math.PI / 8;
      const cx = width / 2;
      const cy = height * .95;
      const baseRadius = Math.min(width, height) * 1.25;
      const outerRadius = baseRadius * .6;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(background, 0, 0, width, height);
      const fade = ctx.createLinearGradient(0, 0, 0, height);
      fade.addColorStop(0, 'rgba(17,18,16,.15)');
      fade.addColorStop(.58, 'rgba(17,18,16,.15)');
      fade.addColorStop(.9, 'rgba(248,248,244,.08)');
      fade.addColorStop(1, 'rgba(248,248,244,0)');
      ctx.strokeStyle = fade;
      ctx.lineWidth = 2;

      // Trois origines de tracé par anneau, synchronisées avec les deux moitiés des tangentes.
      for (const ratio of [.14, .22, .6]) {
        for (let segment = 0; segment < 3; segment++) {
          const angle = segment * TAU / 3;
          ctx.beginPath();
          ctx.arc(cx, cy, baseRadius * ratio, angle, angle + TAU / 3 * progress);
          ctx.stroke();
        }
      }
      const stroke = (a: Point, b: Point, from: number, to: number) => {
        ctx.beginPath();
        ctx.moveTo(a.x + (b.x - a.x) * from, a.y + (b.y - a.y) * from);
        ctx.lineTo(a.x + (b.x - a.x) * to, a.y + (b.y - a.y) * to);
        ctx.stroke();
      };
      for (let side = 0; side < 4; side++) {
        const endpoints = tangent(cx, cy, outerRadius, Math.PI / 4 + rotation + side * Math.PI / 2, width, height);
        if (!endpoints) continue;
        stroke(endpoints[0], endpoints[1], 0, progress / 2);
        stroke(endpoints[0], endpoints[1], 1 - progress / 2, 1);
      }

      const inset = Math.max(48, width * .09);
      const left = -Math.acos(Math.max(-1, Math.min(1, (inset - cx) / outerRadius)));
      const right = -Math.PI - left;
      // À partir de 1920 px : angles fixes demandés, mesurés depuis le haut.
      // Sur écran étroit, rapprocher seulement les points qui sortiraient du cadre.
      const wide = clamp((width - 900) / 1020);
      const edgeAngle = -Math.acos(Math.max(-1, Math.min(1, (48 - cx) / outerRadius)));
      const leftAngle = Math.max(edgeAngle, left + (-160 * Math.PI / 180 - left) * wide);
      const rightAngle = Math.min(-Math.PI - edgeAngle, right + (-45 * Math.PI / 180 - right) * wide);
      const points = [
        { angle: leftAngle, radius: outerRadius, label: 'agent.active' },
        { angle: rightAngle, radius: outerRadius, label: 'task_001' },
        { angle: -Math.PI / 2, radius: baseRadius * .22, label: 'workflow_ready' },
      ];
      ctx.font = '9px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      for (const point of points) {
        const x = cx + Math.cos(point.angle) * point.radius;
        const y = cy + Math.sin(point.angle) * point.radius;
        ctx.globalAlpha = progress;
        ctx.fillStyle = '#171717';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, TAU);
        ctx.fill();
        ctx.fillStyle = point.label === 'workflow_ready' ? '#000000' : '#444537';
        ctx.fillText(point.label, x, y - 12);
      }
      ctx.globalAlpha = 1;
      canvas.dataset.phase = elapsed < DRAW_SECONDS ? 'drawing' : elapsed < 4.9 ? 'rotating' : 'complete';
      if (elapsed < END_SECONDS && !preference.matches && visible && !document.hidden) frame = requestAnimationFrame(render);
    }
    function redraw() {
      cancelAnimationFrame(frame);
      if (!disposed) frame = requestAnimationFrame(render);
    }
    function resize() {
      if (!canvas || !parent || !ctx) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = width <= 768 ? 1 : Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      background.width = canvas.width;
      background.height = canvas.height;
      if (backgroundContext) {
        backgroundContext.setTransform(dpr, 0, 0, dpr, 0, 0);
        paintHeroEclipse(backgroundContext, width, height);
      }
      redraw();
    }
    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) redraw(); else cancelAnimationFrame(frame);
    });
    intersection.observe(parent);
    const onVisibility = () => { if (document.hidden) cancelAnimationFrame(frame); else redraw(); };
    document.addEventListener('visibilitychange', onVisibility);
    preference.addEventListener('change', redraw);
    document.fonts.ready.then(() => {
      if (disposed) return;
      start = performance.now();
      ready = true;
      canvas.dataset.ready = 'true';
      resize();
    });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      preference.removeEventListener('change', redraw);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);
  return <canvas ref={ref} className="hero-orbit-canvas" aria-hidden="true" />;
}

