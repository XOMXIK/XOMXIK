"use client";

import { useEffect, useRef } from "react";

interface TrailPoint {
  x: number;
  y: number;
  age: number;
  vx: number;
  vy: number;
  size: number;
  brightness: number;
}

export default function CometTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<TrailPoint[]>([]);
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const animId = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleDown = (e: MouseEvent) => {
      isDrawing.current = true;
      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleUp = () => {
      isDrawing.current = false;
    };

    const handleMove = (e: MouseEvent) => {
      if (!isDrawing.current) return;

      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Main comet head
      points.current.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
        vx: dx * 0.02,
        vy: dy * 0.02,
        size: 2.5,
        brightness: 1,
      });

      // Sparkle particles spreading from trail
      const count = Math.min(Math.floor(speed * 0.3), 4);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spread = Math.random() * 2.5;
        points.current.push({
          x: e.clientX + Math.cos(angle) * spread,
          y: e.clientY + Math.sin(angle) * spread,
          age: 0,
          vx: Math.cos(angle) * (0.3 + Math.random() * 0.8) + dx * 0.01,
          vy: Math.sin(angle) * (0.3 + Math.random() * 0.8) + dy * 0.01,
          size: 0.5 + Math.random() * 1.5,
          brightness: 0.4 + Math.random() * 0.6,
        });
      }

      // Cap total particles
      if (points.current.length > 500) {
        points.current = points.current.slice(-500);
      }

      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points.current = points.current.filter((p) => p.age < 1);

      for (const p of points.current) {
        p.age += 0.006;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;

        const life = 1 - p.age;
        const alpha = life * life * p.brightness;
        const size = p.size * (0.5 + life * 0.5);

        // Core glow
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, size * 3
        );
        gradient.addColorStop(0, `rgba(240, 235, 255, ${alpha * 0.9})`);
        gradient.addColorStop(0.3, `rgba(200, 195, 255, ${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(170, 165, 255, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Bright center dot
        if (p.size > 1.5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
          ctx.fill();
        }
      }

      animId.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("mousemove", handleMove);

    return () => {
      cancelAnimationFrame(animId.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-30 pointer-events-none"
      aria-hidden="true"
    />
  );
}
