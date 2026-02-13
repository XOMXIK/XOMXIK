"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import XomxikLogo from "@/components/ui/XomxikLogo";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const logoY = useTransform(scrollY, [0, 600], [0, -80]);
  const sloganY = useTransform(scrollY, [0, 600], [0, -40]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen flex flex-col items-center justify-center z-10"
    >
      <motion.div style={{ y: logoY, opacity }}>
        <XomxikLogo />
      </motion.div>

      <motion.p
        className="mt-6 font-montserrat font-extralight tracking-[0.35em] text-white/55 whitespace-nowrap"
        style={{
          fontSize: "clamp(10px, 1.4vw, 24px)",
          y: sloganY,
          opacity,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1.0 }}
      >
        The&nbsp;&nbsp;End,&nbsp;&nbsp;and&nbsp;&nbsp;Begins.
      </motion.p>

      <ScrollIndicator />
    </section>
  );
}
