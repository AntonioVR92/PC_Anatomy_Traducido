"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Buttons } from "@/components/landing/hero/Buttons";
import { Stats } from "@/components/landing/hero/Stats";
import { useViewport } from "@/components/landing/hooks/useViewport";

export function Hero() {
  const viewport = useViewport();

  return (
    <section className="relative flex min-h-screen items-center px-6 pb-24 pt-32">
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start text-left">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-balance text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          Learn Computer Hardware{" "}
          <span className="hero-gradient">Like Never Before.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-neutral-400 sm:text-lg"
        >
          Computer Anatomy is an open-source educational platform that helps students explore
          computer hardware through immersive 3D visualization, educational animations, and
          interactive learning experiences.
        </motion.p>

        <Buttons />
        <Stats />
      </div>
    </section>
  );
}