"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Buttons } from "@/components/landing/hero/Buttons";
import { useViewport } from "@/components/landing/hooks/useViewport";

// Hero: the first section visitors see when the page loads.
// It fades in a big headline, a tagline, and call-to-action buttons.
export function Hero() {
  // Tracks the current viewport size (used for responsive behavior)
  const viewport = useViewport();

  return (
    // Full-height intro section, pushed down so it sits below the header
    <section className="relative flex min-h-screen items-center px-6 pb-24 pt-32">
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start text-left">
        {/* Headline that fades and slides up into place on load */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-balance text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          Learn Computer Hardware{" "}
          <span className="hero-gradient">Like Never Before.</span>
        </motion.h1>

        {/* Tagline describing what the platform offers */}
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

        {/* Call-to-action buttons */}
        <Buttons />

        {/* Disclaimer about third-party 3D models */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 max-w-2xl border-t border-white/10 pt-5 text-[12px] leading-relaxed text-neutral-500"
        >
          Disclaimer: All 3D models featured in Computer Anatomy are sourced from third-party
          creators and remain the property of their respective creators, subject to their original
          licenses.
        </motion.p>
      </div>
    </section>
  );
}