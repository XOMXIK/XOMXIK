"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Navigation() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const y = useTransform(scrollY, [0, 100], [-60, 0]);

  return (
    <motion.nav
      style={{ opacity, y }}
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-[#0a0a12]/70 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-montserrat font-bold text-lg tracking-wider">
          <span className="text-[#6c63ff]">X</span>
          <span className="text-white">OM</span>
          <span className="text-[#6c63ff]">X</span>
          <span className="text-white">IK</span>
        </span>

        <div className="hidden sm:flex gap-8 text-xs font-light tracking-[0.3em] uppercase text-white/50">
          <a
            href="#hero"
            className="hover:text-white transition-colors duration-300"
          >
            Home
          </a>
          <a
            href="#about"
            className="hover:text-white transition-colors duration-300"
          >
            About
          </a>
          <a
            href="#services"
            className="hover:text-white transition-colors duration-300"
          >
            Services
          </a>
          <a
            href="#contact"
            className="hover:text-white transition-colors duration-300"
          >
            Contact
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
