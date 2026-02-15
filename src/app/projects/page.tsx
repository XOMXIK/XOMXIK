"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, Text, useTexture } from "@react-three/drei";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import Navigation from "@/components/layout/Navigation";

const projects = [
  { id: 1, name: "Project Alpha", color: "#ff6b6b", desc: "First Mission" },
  { id: 2, name: "Deep Dive", color: "#4ecdc4", desc: "Data Ocean" },
  { id: 3, name: "My Blog", color: "#ffe66d", desc: "Personal Log" },
];

function RealisticPlanet({ position, color, name, onClick }: any) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.1;
    if (glowRef.current) glowRef.current.rotation.y -= delta * 0.05;
    
    if (hovered) {
      meshRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1);
      glowRef.current.scale.lerp(new THREE.Vector3(1.3, 1.3, 1.3), 0.1);
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      glowRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
    }
  });

  return (
    <group position={position}>
      {/* Planet Surface */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
          setHover(true);
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
          setHover(false);
        }}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color={color}
          roughness={0.7}
          metalness={0.1}
          bumpScale={0.05}
        />
      </mesh>

      {/* Atmosphere Glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Label */}
      <Text
        position={[0, 1.8, 0]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {name}
      </Text>
    </group>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<any>(null);

  return (
    <div className="w-full h-screen bg-black text-white relative overflow-hidden">
      <Navigation />
      
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-light tracking-[0.5em] opacity-80">
          PLANETARY
        </h1>
        <p className="text-xs md:text-sm text-gray-400 mt-2 font-mono tracking-widest">
          SYSTEM OVERVIEW
        </p>
      </div>

      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#4444ff" />
        
        <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={0.5} />
        
        <group position={[0, -0.5, 0]}>
          <RealisticPlanet position={[-2.5, 0, 0]} {...projects[0]} onClick={() => setSelected(projects[0])} />
          <RealisticPlanet position={[0, 0, 0]} {...projects[1]} onClick={() => setSelected(projects[1])} />
          <RealisticPlanet position={[2.5, 0, 0]} {...projects[2]} onClick={() => setSelected(projects[2])} />
        </group>
        
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
      </Canvas>

      {/* Project Detail Modal */}
      {selected && (
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-md z-20 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="text-center" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-4xl font-bold mb-4" style={{ color: selected.color }}>{selected.name}</h2>
            <p className="text-xl text-gray-300 mb-8">{selected.desc}</p>
            <button 
              onClick={() => setSelected(null)}
              className="px-6 py-2 border border-white/20 hover:bg-white/10 transition-colors rounded-full text-sm tracking-widest"
            >
              RETURN TO ORBIT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
