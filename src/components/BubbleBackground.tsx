'use client';

import { useEffect, useRef } from 'react';

type Bubble = {
  x: number;
  y: number;
  r: number;
  vy: number;
  drift: number;
  alpha: number;
};

const BUBBLE_COLOR = '147, 197, 253';

export default function BubbleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let rafId = 0;
    let width = 0;
    let height = 0;

    const bubbles: Bubble[] = [];

    const densityForWidth = (w: number) => {
      if (media.matches) return 12;
      if (w < 640) return 26;
      return 42;
    };

    const spawnBubble = (fromBottom = false): Bubble => ({
      x: Math.random() * width,
      y: fromBottom ? height + Math.random() * 60 : Math.random() * height,
      r: 5 + Math.random() * 22,
      vy: 0.18 + Math.random() * 0.38,
      drift: (Math.random() - 0.5) * 0.18,
      alpha: 0.08 + Math.random() * 0.22,
    });

    const rebuildBubbles = () => {
      const target = densityForWidth(width);
      bubbles.length = 0;
      for (let i = 0; i < target; i += 1) bubbles.push(spawnBubble(false));
    };

    const resize = () => {
      width = window.innerWidth;
      height = Math.max(window.innerHeight, document.body.scrollHeight);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuildBubbles();
      drawFrame(false);
    };

    const drawFrame = (animate = true) => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < bubbles.length; i += 1) {
        const b = bubbles[i];
        if (animate) {
          b.y -= b.vy;
          b.x += b.drift;

          if (b.y + b.r < -20 || b.x + b.r < -20 || b.x - b.r > width + 20) {
            bubbles[i] = spawnBubble(true);
            continue;
          }
        }

        const grad = ctx.createRadialGradient(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.1, b.x, b.y, b.r);
        grad.addColorStop(0, `rgba(${BUBBLE_COLOR}, ${Math.min(b.alpha + 0.12, 0.35)})`);
        grad.addColorStop(1, `rgba(${BUBBLE_COLOR}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!media.matches) {
        rafId = window.requestAnimationFrame(() => drawFrame(true));
      }
    };

    const onMotionChange = () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      resize();
      if (!media.matches) drawFrame(true);
    };

    window.addEventListener('resize', resize);
    media.addEventListener('change', onMotionChange);

    resize();
    if (!media.matches) drawFrame(true);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      media.removeEventListener('change', onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="bubble-bg" aria-hidden="true" />;
}
