"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import { Reveal, MagneticButton, AnimatedCounter } from "@/components/landing/ui/primitives";
import { GithubIcon } from "@/components/landing/ui/GithubIcon";

const TECH_BADGES = [
  "Open Source",
  "Next.js",
  "React Three Fiber",
  "Three.js",
  "TypeScript",
  "Tailwind CSS",
];

const STATS = [
  { value: 12, suffix: "+", label: "Interactive Components" },
  { value: 50, suffix: "+", label: "Educational Animations" },
  { value: 100, suffix: "%", label: "Open Source" },
  { value: 0, prefix: "", label: "Modern Web Technologies", custom: true },
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_560px_at_50%_6%,rgba(45,90,190,0.16),transparent_60%),radial-gradient(700px_420px_at_50%_100%,rgba(20,50,110,0.2),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(900px,90%)] -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 text-[13px] font-medium text-muted backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open-source education for computer hardware
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-8 text-balance text-[2.6rem] font-semibold leading-[1.08] tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Learn Computer Hardware{" "}
            <span className="hero-gradient">Like Never Before.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-muted sm:text-lg">
            An interactive 3D atlas of the machine on your desk. Rotate, peel apart, and explore
            every component — from the silicon heart of the CPU to the cooling fans keeping it
            alive — all in your browser.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton>
            <Link
              href="/explore"
              className="group inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-b from-accent-bright to-accent px-6 text-[15px] font-medium text-white shadow-[0_8px_32px_rgba(77,141,255,0.35),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all hover:shadow-[0_10px_44px_rgba(77,141,255,0.5),inset_0_1px_0_rgba(255,255,255,0.25)]"
            >
              <Cpu className="h-4.5 w-4.5" strokeWidth={1.8} />
              Explore Components
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
            </Link>
          </MagneticButton>

          <MagneticButton>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-line bg-surface/60 px-6 text-[15px] font-medium text-foreground backdrop-blur-md transition-all hover:border-line-strong hover:bg-surface-2"
            >
              <GithubIcon className="h-4.5 w-4.5" />
              GitHub Repository
            </a>
          </MagneticButton>
        </Reveal>

        <Reveal delay={0.4} className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {TECH_BADGES.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center rounded-full border border-line bg-surface/50 px-3.5 py-1.5 text-[12.5px] font-medium text-muted backdrop-blur-md transition-colors hover:border-accent/40 hover:text-foreground"
            >
              {badge}
            </span>
          ))}
        </Reveal>

        <Reveal delay={0.5} className="mt-16 w-full">
          <div className="mx-auto grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="group flex flex-col items-center gap-1.5 bg-surface/50 px-4 py-7 text-center backdrop-blur-md transition-colors hover:bg-surface-2/60"
              >
                <span className="text-3xl font-semibold tracking-tight text-foreground sm:text-[2.1rem]">
                  {stat.custom ? (
                    <span className="font-mono text-2xl text-accent-bright sm:text-3xl">3D</span>
                  ) : (
                    <AnimatedCounter to={stat.value} suffix={stat.suffix ?? ""} prefix={stat.prefix ?? ""} />
                  )}
                </span>
                <span className="text-[12.5px] font-medium leading-snug text-muted">{stat.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-line p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-accent-bright"
          />
        </div>
      </motion.div>
    </section>
  );
}