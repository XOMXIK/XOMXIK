"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ShaderMaterial, Vector2 } from "three";
import { useAppStore } from "@/stores/useAppStore";
import { nebulaVertexShader, nebulaFragmentShader } from "./shaders";

export default function Nebula() {
  const materialRef = useRef<ShaderMaterial>(null);
  const currentMouse = useRef({ x: 0, y: 0 });
  const currentReveal = useRef(0);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new Vector2(0, 0) },
      uResolution: {
        value: new Vector2(window.innerWidth, window.innerHeight),
      },
      uReveal: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (!materialRef.current) return;

    const { mousePosition, scrollY } = useAppStore.getState();

    // Reveal: 0→1 over first 1800px of scroll (slow, cinematic)
    const targetReveal = Math.min(1, scrollY / 5000);
    currentReveal.current += (targetReveal - currentReveal.current) * 0.12;

    currentMouse.current.x +=
      (mousePosition.x - currentMouse.current.x) * 0.03;
    currentMouse.current.y +=
      (mousePosition.y - currentMouse.current.y) * 0.03;

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uMouse.value.set(
      currentMouse.current.x,
      currentMouse.current.y
    );
    materialRef.current.uniforms.uReveal.value = currentReveal.current;
  });

  return (
    <mesh position={[0, 0, -15]}>
      <planeGeometry args={[viewport.width * 4, viewport.height * 4]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={nebulaVertexShader}
        fragmentShader={nebulaFragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
