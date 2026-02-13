"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 1 }}
    >
      <motion.span
        className="text-[10px] font-montserrat font-light tracking-[0.4em] uppercase text-white/30"
      >
        Scroll
      </motion.span>
      <motion.div
        className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent"
        animate={{ scaleY: [1, 0.5, 1], opacity: [0.4, 0.15, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
