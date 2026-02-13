"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import Navigation from "@/components/layout/Navigation";
import GrainOverlay from "@/components/ui/GrainOverlay";
import CursorGlow from "@/components/ui/CursorGlow";
import CometTrail from "@/components/ui/CometTrail";

const SpaceCanvas = dynamic(
  () => import("@/components/canvas/SpaceCanvas"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <SpaceCanvas />
      <GrainOverlay />
      <CursorGlow />
      <CometTrail />
      <Navigation />
      <main>
        <Hero />
        {/* Transition space for slow cinematic background reveal */}
        <section className="relative z-10" style={{ height: "800vh" }} />
      </main>
    </>
  );
}
