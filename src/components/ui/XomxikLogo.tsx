"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const letters = [
  { char: "X", isUV: true },
  { char: "O", isUV: false },
  { char: "M", isUV: false },
  { char: "X", isUV: true },
  { char: "I", isUV: false },
  { char: "K", isUV: false },
];

export default function XomxikLogo() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Shrink the hover zone inward by 20% on each side
    const insetX = rect.width * 0.2;
    const insetY = rect.height * 0.2;
    const inside =
      e.clientX >= rect.left + insetX &&
      e.clientX <= rect.right - insetX &&
      e.clientY >= rect.top + insetY &&
      e.clientY <= rect.bottom - insetY;
    setIsHovered(inside);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="flex items-baseline cursor-default select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="font-montserrat font-black tracking-[0.08em] leading-none transition-all duration-700 ease-out"
          style={{
            fontSize: "clamp(48px, 10vw, 200px)",
            color: letter.isUV
              ? isHovered
                ? "#6c63ff"
                : "rgba(255, 255, 255, 0.08)"
              : "#ffffff",
            textShadow: letter.isUV
              ? isHovered
                ? "0 0 30px rgba(108, 99, 255, 0.6), 0 0 60px rgba(108, 99, 255, 0.3)"
                : "0 0 1px rgba(255, 255, 255, 0.1), 0 0 40px rgba(255, 255, 255, 0.02)"
              : "0 0 1px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.08), 0 2px 4px rgba(0, 0, 0, 0.3)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.15 + i * 0.06,
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          {letter.char}
        </motion.span>
      ))}
    </motion.div>
  );
}
