"use client";

import { ReactNode, useEffect } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useScrollProgress } from "@/hooks/useScrollProgress";

function Trackers() {
  useMousePosition();
  useScrollProgress();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <Trackers />
      {children}
    </>
  );
}
