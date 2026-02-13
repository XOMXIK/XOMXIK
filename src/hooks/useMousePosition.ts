"use client";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/stores/useAppStore";

export function useMousePosition() {
  const setMousePosition = useAppStore((s) => s.setMousePosition);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;
        setMousePosition({ x, y });
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const x = (touch.clientX / window.innerWidth) * 2 - 1;
        const y = -(touch.clientY / window.innerHeight) * 2 + 1;
        setMousePosition({ x, y });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [setMousePosition]);
}
