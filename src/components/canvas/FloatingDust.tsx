"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Points,
  BufferGeometry,
  Float32BufferAttribute,
  PointsMaterial,
  AdditiveBlending,
  CanvasTexture,
} from "three";
import { useAppStore } from "@/stores/useAppStore";

function createCircleTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.3, "rgba(255,255,255,0.6)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  return new CanvasTexture(canvas);
}

interface FloatingDustProps {
  count?: number;
}

export default function FloatingDust({ count = 300 }: FloatingDustProps) {
  const pointsRef = useRef<Points>(null);
  const materialRef = useRef<PointsMaterial>(null);
  const currentReveal = useRef(0);

  const { geometry, circleMap } = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }

    const geo = new BufferGeometry();
    geo.setAttribute("position", new Float32BufferAttribute(positions, 3));

    const map = createCircleTexture();

    return { geometry: geo, circleMap: map };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current || !materialRef.current) return;

    const { scrollY } = useAppStore.getState();

    // Reveal: 0→1 over first 1800px of scroll (slow, cinematic)
    const targetReveal = Math.min(1, scrollY / 5000);
    currentReveal.current += (targetReveal - currentReveal.current) * 0.12;

    const time = state.clock.elapsedTime;
    pointsRef.current.rotation.y = time * 0.005;
    pointsRef.current.rotation.x = Math.sin(time * 0.003) * 0.02;

    materialRef.current.opacity = 0.4 * currentReveal.current;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        ref={materialRef}
        size={0.15}
        color="#8b7bb8"
        map={circleMap}
        transparent
        opacity={0}
        depthWrite={false}
        blending={AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}
