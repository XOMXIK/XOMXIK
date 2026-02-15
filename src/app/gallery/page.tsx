"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Text, RoundedBox, MeshDistortMaterial, Float } from "@react-three/drei";
import { useRef, useState, useMemo, useEffect } from "react";
import * as THREE from "three";
import Navigation from "@/components/layout/Navigation";

const projects = [
  { id: 1, name: "Project Alpha", color: "#ff6b6b", desc: "First Mission" },
  { id: 2, name: "Deep Dive", color: "#4ecdc4", desc: "Data Ocean" },
  { id: 3, name: "My Blog", color: "#ffe66d", desc: "Personal Log" },
];

const items = [
  { id: 1, title: "DATA CORE", subtitle: "Analysis", color: "#00ffff" },
  { id: 2, title: "SYSTEM", subtitle: "Architecture", color: "#ff00ff" },
  { id: 3, title: "INTERFACE", subtitle: "Design", color: "#ffff00" },
];

// --- 1. Realistic Planet Component (for /projects) ---
function RealisticPlanet({ position, color, name, onClick }: any) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.1;
    if (glowRef.current) glowRef.current.rotation.y -= delta * 0.05;
    
    const targetScale = hovered ? 1.2 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={() => { document.body.style.cursor = "pointer"; setHover(true); }}
        onPointerOut={() => { document.body.style.cursor = "auto"; setHover(false); }}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.2} bumpScale={0.05} />
      </mesh>
      {/* Atmosphere Glow */}
      <mesh ref={glowRef} scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} side={THREE.BackSide} blending={THREE.AdditiveBlending} />
      </mesh>
      <Text position={[0, 1.8, 0]} fontSize={0.25} color="white" anchorX="center" anchorY="middle">
        {name}
      </Text>
    </group>
  );
}

// --- 2. Hologram Card Component (for /gallery) ---
function HologramCard({ position, color, title, subtitle }: any) {
  const [hovered, setHover] = useState(false);
  
  return (
    <Float floatIntensity={2} rotationIntensity={0.5} speed={1.5}>
      <group 
        position={position}
        onPointerOver={() => { document.body.style.cursor = "pointer"; setHover(true); }}
        onPointerOut={() => { document.body.style.cursor = "auto"; setHover(false); }}
      >
        {/* Glass Card Base */}
        <RoundedBox args={[2.2, 3.2, 0.1]} radius={0.1} smoothness={4}>
          <meshPhysicalMaterial
            transparent opacity={0.1} color={hovered ? color : "#ffffff"}
            roughness={0} metalness={0.9} transmission={0.6} thickness={0.5} clearcoat={1}
          />
        </RoundedBox>
        {/* Glowing Edge */}
        <lineSegments>
           <edgesGeometry args={[new THREE.BoxGeometry(2.2, 3.2, 0.1)]} /> 
           <lineBasicMaterial color={hovered ? color : "#444444"} transparent opacity={0.5} linewidth={2} />
        </lineSegments>
        {/* Content */}
        <group position={[0, 0, 0.06]}>
          <Text position={[0, 0.8, 0]} fontSize={0.25} color={hovered ? color : "white"} anchorX="center" anchorY="middle">
            {title}
          </Text>
          <Text position={[0, 0.5, 0]} fontSize={0.12} color="gray" anchorX="center" anchorY="middle">
            {subtitle}
          </Text>
          {/* Animated Core */}
          <mesh position={[0, -0.5, 0]} scale={0.6}>
            <sphereGeometry args={[1, 32, 32]} />
            <MeshDistortMaterial color={color} speed={2} distort={0.4} radius={1} wireframe />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

// --- Exported Page Components ---

export default function GalleryPage() { // This will be /gallery/page.tsx content actually
  return (
    <div className="w-full h-screen bg-black text-white relative overflow-hidden">
      <Navigation />
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-light tracking-[0.5em] text-cyan-400 opacity-80">ARCHIVE</h1>
        <p className="text-xs md:text-sm text-cyan-800 mt-2 font-mono tracking-widest">HOLOGRAPHIC RECORDS</p>
      </div>
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ff00ff" />
        <gridHelper args={[50, 50, "#111111", "#050505"]} position={[0, -4, 0]} />
        <group position={[0, 0, 0]}>
          <HologramCard position={[-2.5, 0, 0]} {...items[0]} />
          <HologramCard position={[0, 0, 0]} {...items[1]} />
          <HologramCard position={[2.5, 0, 0]} {...items[2]} />
        </group>
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
      </Canvas>
    </div>
  );
}
