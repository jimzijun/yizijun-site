'use client';

import { useEffect, useRef } from 'react';

type Circle = {
  x: number;
  y: number;
  r: number;
  growing: boolean;
  color: [number, number, number];
};

const TOTAL_ATTEMPTS_PER_FRAME = 15;
const GLOBAL_ATTEMPT_CAP = 500;
const GROWTH_STEP = 2;

const randomColor = (): [number, number, number] => {
  const colorSca = [0.6 + Math.random() * 0.7, 0.6 + Math.random() * 0.7, 0.6 + Math.random() * 0.7];
  const channels = [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
  ];

  // legacy-ish randomized channel scaling permutation
  const order = [0, 1, 2].sort(() => Math.random() - 0.5);
  return [
    Math.floor(channels[order[0]] * colorSca[0]),
    Math.floor(channels[order[1]] * colorSca[1]),
    Math.floor(channels[order[2]] * colorSca[2]),
  ];
};

export default function BubbleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let rafId = 0;
    let shouldAnimate = true;

    let circles: Circle[] = [];
    let failedAttempts = 0;

    const collidesWithExisting = (x: number, y: number, extraRadius = 0, skipIndex = -1): boolean => {
      for (let i = 0; i < circles.length; i += 1) {
        if (i === skipIndex) continue;
        const c = circles[i];
        const dx = x - c.x;
        const dy = y - c.y;
        const dist = Math.hypot(dx, dy);
        if (dist < c.r + extraRadius + 0.5) return true;
      }
      return false;
    };

    const touchesEdge = (c: Circle): boolean =>
      c.x + c.r >= width || c.x - c.r <= 0 || c.y + c.r >= height || c.y - c.r <= 0;

    const tryCreateCircle = (): Circle | null => {
      const x = Math.random() * width;
      const y = Math.random() * height;

      if (collidesWithExisting(x, y, 1.5)) {
        failedAttempts += 1;
        return null;
      }

      return {
        x,
        y,
        r: Math.random() * 2,
        growing: true,
        color: randomColor(),
      };
    };

    const draw = () => {
      ctx.fillStyle = 'rgb(0,0,0)';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < circles.length; i += 1) {
        const c = circles[i];

        if (c.growing) {
          if (touchesEdge(c) || collidesWithExisting(c.x, c.y, c.r + GROWTH_STEP, i)) {
            c.growing = false;
          } else {
            c.r += GROWTH_STEP;
          }
        }

        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${c.color[0]}, ${c.color[1]}, ${c.color[2]})`;
        ctx.fill();
      }
    };

    const tick = () => {
      for (let i = 0; i < TOTAL_ATTEMPTS_PER_FRAME; i += 1) {
        const circle = tryCreateCircle();
        if (circle) circles.push(circle);
      }

      draw();

      if (shouldAnimate && failedAttempts <= GLOBAL_ATTEMPT_CAP) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      circles = [];
      failedAttempts = 0;
      shouldAnimate = !media.matches;

      draw();
      if (shouldAnimate) {
        if (rafId) window.cancelAnimationFrame(rafId);
        rafId = window.requestAnimationFrame(tick);
      } else {
        // Reduced-motion fallback: build a static packed frame and stop.
        while (failedAttempts <= GLOBAL_ATTEMPT_CAP) {
          for (let i = 0; i < TOTAL_ATTEMPTS_PER_FRAME; i += 1) {
            const circle = tryCreateCircle();
            if (circle) circles.push(circle);
          }
          for (let i = 0; i < circles.length; i += 1) {
            const c = circles[i];
            if (c.growing) {
              if (touchesEdge(c) || collidesWithExisting(c.x, c.y, c.r + GROWTH_STEP, i)) {
                c.growing = false;
              } else {
                c.r += GROWTH_STEP;
              }
            }
          }
        }
        draw();
      }
    };

    const onMotionChange = () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      resize();
    };

    window.addEventListener('resize', resize);
    media.addEventListener('change', onMotionChange);

    resize();

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      media.removeEventListener('change', onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="bubble-bg" aria-hidden="true" />;
}
