"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-[5] w-[600px] h-[600px] rounded-full opacity-100 hidden md:block"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(circle, rgba(108, 99, 255, 0.035) 0%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
