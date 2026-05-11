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

    const isLikelyMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const WIDTH_JITTER_EPSILON_PX = 2;

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
      } else {
        rafId = 0;
      }
    };

    const resize = (forceRebuild = false) => {
      const nextWidth = Math.round(window.visualViewport?.width ?? window.innerWidth);
      const nextHeight = Math.round(window.visualViewport?.height ?? window.innerHeight);

      const prevWidth = width || nextWidth;
      const prevHeight = height || nextHeight;
      const widthDelta = Math.abs(nextWidth - prevWidth);
      const heightDelta = Math.abs(nextHeight - prevHeight);
      const widthChangedMeaningfully = widthDelta > WIDTH_JITTER_EPSILON_PX;
      const isMobileUiJitter =
        !forceRebuild &&
        isLikelyMobile &&
        !widthChangedMeaningfully &&
        heightDelta > 0;

      width = nextWidth;
      height = nextHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      shouldAnimate = !media.matches;

      if (forceRebuild || circles.length === 0) {
        circles = [];
        failedAttempts = 0;
      } else if (!isMobileUiJitter) {
        const sx = width / prevWidth;
        const sy = height / prevHeight;
        const sr = Math.min(sx, sy);
        circles = circles
          .map((c) => ({ ...c, x: c.x * sx, y: c.y * sy, r: c.r * sr }))
          .filter((c) => c.x + c.r >= 0 && c.x - c.r <= width && c.y + c.r >= 0 && c.y - c.r <= height);
      }

      if (shouldAnimate) {
        draw();
        if (!rafId) rafId = window.requestAnimationFrame(tick);
      } else {
        if (rafId) {
          window.cancelAnimationFrame(rafId);
          rafId = 0;
        }
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
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
      resize(true);
    };

    const onResize = () => {
      resize(false);
    };

    window.addEventListener('resize', onResize);
    window.visualViewport?.addEventListener('resize', onResize);
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', onMotionChange);
    } else if (typeof media.addListener === 'function') {
      media.addListener(onMotionChange);
    }

    resize();

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      window.visualViewport?.removeEventListener('resize', onResize);
      if (typeof media.removeEventListener === 'function') {
        media.removeEventListener('change', onMotionChange);
      } else if (typeof media.removeListener === 'function') {
        media.removeListener(onMotionChange);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="bubble-bg" aria-hidden="true" />;
}
