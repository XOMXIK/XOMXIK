"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Points,
  BufferGeometry,
  Float32BufferAttribute,
  ShaderMaterial,
  Vector2,
  AdditiveBlending,
} from "three";
import { useAppStore } from "@/stores/useAppStore";
import { starsVertexShader, starsFragmentShader } from "./shaders";

interface StarFieldProps {
  count?: number;
}

export default function StarField({ count = 2000 }: StarFieldProps) {
  const pointsRef = useRef<Points>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const currentMouse = useRef({ x: 0, y: 0 });
  const currentReveal = useRef(0);

  const { geometry, uniforms } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const brightness = new Float32Array(count);
    const twinkleSpeeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Flat spread in front of camera (x, y wide, z layered behind)
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = -Math.random() * 50 - 2;

      sizes[i] = 0.1 + Math.random() * 0.5;
      brightness[i] = 0.3 + Math.random() * 0.7;
      twinkleSpeeds[i] = 0.5 + Math.random() * 2.5;
    }

    const geo = new BufferGeometry();
    geo.setAttribute("position", new Float32BufferAttribute(positions, 3));
    geo.setAttribute("aSize", new Float32BufferAttribute(sizes, 1));
    geo.setAttribute("aBrightness", new Float32BufferAttribute(brightness, 1));
    geo.setAttribute(
      "aTwinkleSpeed",
      new Float32BufferAttribute(twinkleSpeeds, 1)
    );

    const u = {
      uTime: { value: 0 },
      uMouse: { value: new Vector2(0, 0) },
      uScrollY: { value: 0 },
      uReveal: { value: 0 },
    };

    return { geometry: geo, uniforms: u };
  }, [count]);

  useFrame((state) => {
    if (!materialRef.current) return;

    const { mousePosition, scrollY, scrollProgress } = useAppStore.getState();

    // Reveal: 0→1 over first 1800px of scroll (slow, cinematic)
    const targetReveal = Math.min(1, scrollY / 5000);
    currentReveal.current += (targetReveal - currentReveal.current) * 0.12;

    currentMouse.current.x +=
      (mousePosition.x - currentMouse.current.x) * 0.025;
    currentMouse.current.y +=
      (mousePosition.y - currentMouse.current.y) * 0.025;

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uMouse.value.set(
      currentMouse.current.x,
      currentMouse.current.y
    );
    materialRef.current.uniforms.uScrollY.value = scrollProgress;
    materialRef.current.uniforms.uReveal.value = currentReveal.current;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={starsVertexShader}
        fragmentShader={starsFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}
