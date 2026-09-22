"use client";

import { motion } from "framer-motion";

// The technology stack shown as small pill badges in the hero
const TECH_BADGES = [
  "Código abierto",
  "Next.js",
  "React Three Fiber",
  "Three.js",
  "TypeScript",
  "Tailwind CSS",
];

// Badges: a row of tech badges that fades in, each popping in after the previous
export function Badges() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.7 }}
      className="mt-9 flex flex-wrap items-center justify-start gap-2"
    >
      {/* One pill per tech, each with a slightly longer delay */}
      {TECH_BADGES.map((badge) => (
        <motion.span
          key={badge}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 + 0.08 * TECH_BADGES.indexOf(badge) }}
          className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[12px] font-medium text-neutral-400 backdrop-blur-md transition-all duration-300 hover:border-blue-400/30 hover:text-white hover:shadow-[0_0_20px_rgba(93,163,255,0.15)]"
        >
          {badge}
        </motion.span>
      ))}
    </motion.div>
  );
}