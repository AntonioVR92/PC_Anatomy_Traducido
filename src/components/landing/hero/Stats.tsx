"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/landing/ui/primitives";

const STATS = [
  { value: 12, suffix: "+", label: "Interactive Components" },
  { value: 50, suffix: "+", label: "Educational Animations" },
  { value: 100, suffix: "%", label: "Open Source" },
  { value: 0, custom: true, label: "Modern Web Technologies" },
];

export function Stats() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.85 } } }}
      className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
    >
      {STATS.map((stat) => (
        <motion.div
          key={stat.label}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
          }}
          whileHover={{ y: -4 }}
          className="group flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-6 text-center backdrop-blur-md transition-colors hover:border-blue-400/25"
        >
          <span className="text-[1.9rem] font-bold tracking-tight text-white">
            {stat.custom ? (
              <span className="font-mono text-[1.5rem] text-accent-bright">3D</span>
            ) : (
              <AnimatedCounter to={stat.value} suffix={stat.suffix ?? ""} />
            )}
          </span>
          <span className="text-[11.5px] font-medium leading-snug text-neutral-400">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}