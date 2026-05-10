"use client";

import { useEffect, useRef, useState } from 'react';

type Point = { x: number; y: number };
const CELL = 20;
const SIZE = 20;

export default function SnakePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let snake: Point[] = [{ x: 8, y: 8 }];
    let dir: Point = { x: 1, y: 0 };
    let food: Point = { x: 14, y: 10 };
    let alive = true;

    const randomCell = (): Point => ({
      x: Math.floor(Math.random() * SIZE),
      y: Math.floor(Math.random() * SIZE),
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && dir.y !== 1) dir = { x: 0, y: -1 };
      if (e.key === 'ArrowDown' && dir.y !== -1) dir = { x: 0, y: 1 };
      if (e.key === 'ArrowLeft' && dir.x !== 1) dir = { x: -1, y: 0 };
      if (e.key === 'ArrowRight' && dir.x !== -1) dir = { x: 1, y: 0 };
    };

    window.addEventListener('keydown', onKey);

    const tick = setInterval(() => {
      if (!alive) return;
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
      if (head.x < 0 || head.y < 0 || head.x >= SIZE || head.y >= SIZE || snake.some((p) => p.x === head.x && p.y === head.y)) {
        alive = false;
        return;
      }
      snake = [head, ...snake];
      if (head.x === food.x && head.y === food.y) {
        setScore((s) => s + 1);
        food = randomCell();
      } else {
        snake.pop();
      }

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#f43f5e';
      ctx.fillRect(food.x * CELL, food.y * CELL, CELL - 2, CELL - 2);

      ctx.fillStyle = '#22c55e';
      snake.forEach((p) => ctx.fillRect(p.x * CELL, p.y * CELL, CELL - 2, CELL - 2));

      if (!alive) {
        ctx.fillStyle = 'white';
        ctx.font = '24px sans-serif';
        ctx.fillText('Game Over', 130, 200);
      }
    }, 110);

    return () => {
      clearInterval(tick);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <section className="page">
      <h1>Snake</h1>
      <p>Use arrow keys to play. Score: {score}</p>
      <canvas ref={canvasRef} width={400} height={400} className="snake-canvas" />
    </section>
  );
}
