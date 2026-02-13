"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import StarField from "./StarField";
import Nebula from "./Nebula";
import FloatingDust from "./FloatingDust";

export default function SpaceCanvas() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
        }}
        style={{ background: "#000000" }}
      >
        <Suspense fallback={null}>
          <Nebula />
          <StarField count={isMobile ? 3000 : 12000} />
          <FloatingDust count={isMobile ? 200 : 500} />
        </Suspense>
      </Canvas>
    </div>
  );
}
