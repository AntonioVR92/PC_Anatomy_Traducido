"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Boxes,
  Layers,
  Mouse,
  Workflow,
  GraduationCap,
  Command,
} from "lucide-react";
import { Reveal, EASE } from "@/components/landing/ui/primitives";

const FEATURES: {
  icon: ReactNode;
  title: string;
  description: string;
  accent: string;
}[] = [
  {
    icon: <Boxes className="h-5 w-5" strokeWidth={1.6} />,
    title: "Interactive 3D Models",
    description:
      "Realistic, realtime 3D models of CPUs, GPUs, motherboards, RAM and more — built with React Three Fiber.",
    accent: "from-sky-400/20 to-transparent",
  },
  {
    icon: <Layers className="h-5 w-5" strokeWidth={1.6} />,
    title: "Anatomical Layer Peeling",
    description:
      "Peel a CPU down to its silicon die or strip a GPU to the PCB, revealing how each layer works.",
    accent: "from-accent/20 to-transparent",
  },
  {
    icon: <Mouse className="h-5 w-5" strokeWidth={1.6} />,
    title: "Click-to-Learn Hotspots",
    description:
      "Every component is annotated. Hover a hotspot to reveal name, role, and how it talks to the rest of the machine.",
    accent: "from-cyan-400/20 to-transparent",
  },
  {
    icon: <Workflow className="h-5 w-5" strokeWidth={1.6} />,
    title: "Guided Learning Paths",
    description:
      "Follow curated paths from basics to advanced concepts — BIOS, buses, cooling, power delivery and beyond.",
    accent: "from-indigo-400/20 to-transparent",
  },
  {
    icon: <GraduationCap className="h-5 w-5" strokeWidth={1.6} />,
    title: "Built for Education",
    description:
      "Designed with classrooms and self-learners in mind. Clear, accurate, jargon-aware explanations throughout.",
    accent: "from-sky-400/20 to-transparent",
  },
  {
    icon: <Command className="h-5 w-5" strokeWidth={1.6} />,
    title: "AI Assistant",
    description:
      "Ask questions in plain language and get instant, context-aware answers about any component or concept.",
    accent: "from-accent/20 to-transparent",
  },
];

export function Features() {
  return (
    <section id="features" className="relative scroll-mt-24 px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent-bright">
            Features
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            A new way to see inside your machine
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Computer Anatomy turns abstract hardware knowledge into something you can hold, spin,
            and explore — one component at a time.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE, delay: (i % 3) * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-line bg-surface/50 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:bg-surface-2/50 hover:shadow-[0_16px_48px_rgba(2,6,16,0.5),0_0_32px_rgba(77,141,255,0.08)]"
            >
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${feature.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface-2 text-accent-bright transition-colors duration-300 group-hover:border-accent/40 group-hover:shadow-[0_0_20px_rgba(77,141,255,0.25)]">
                {feature.icon}
              </div>
              <h3 className="relative mt-5 text-[17px] font-semibold tracking-tight text-foreground">
                {feature.title}
              </h3>
              <p className="relative mt-2.5 text-sm leading-relaxed text-muted">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}