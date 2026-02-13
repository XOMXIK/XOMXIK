"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/useAppStore";

export function useScrollProgress() {
  const setScrollProgress = useAppStore((s) => s.setScrollProgress);
  const setScrollY = useAppStore((s) => s.setScrollY);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(Math.min(1, Math.max(0, progress)));
      setScrollY(scrollTop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [setScrollProgress, setScrollY]);
}
