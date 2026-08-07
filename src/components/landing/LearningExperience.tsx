"use client";

import { Database, Network, Workflow, Bot, BookOpen, Sparkle } from "lucide-react";
import { Reveal, EASE } from "@/components/landing/ui/primitives";
import { motion } from "framer-motion";

const STEPS = [
  {
    icon: <BookOpen className="h-4.5 w-4.5" strokeWidth={1.8} />,
    title: "Start with the basics",
    description: "Learn what each part is and its role in the system before diving deeper.",
  },
  {
    icon: <Network className="h-4.5 w-4.5" strokeWidth={1.8} />,
    title: "See how parts connect",
    description: "Trace signals across the motherboard, buses and ports to understand the flow.",
  },
  {
    icon: <Bot className="h-4.5 w-4.5" strokeWidth={1.8} />,
    title: "Ask the assistant anything",
    description: "Clarify doubts instantly with the built-in AI guide while you explore.",
  },
  {
    icon: <Workflow className="h-4.5 w-4.5" strokeWidth={1.8} />,
    title: "Apply & build",
    description: "Combine your knowledge to understand a full PC as one connected system.",
  },
];

export function LearningExperience() {
  return (
    <section id="learning" className="relative scroll-mt-24 px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent-bright">
            Learning Experience
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            From curiosity to understanding
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
            A thoughtfully ordered journey that takes you from first boot to full fluency in how
            your computer works.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          <Reveal className="relative overflow-hidden rounded-3xl border border-line bg-surface/40 p-8 backdrop-blur-md">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(400px_260px_at_20%_10%,rgba(45,90,190,0.14),transparent_60%)]"
            />
            <div className="relative">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent-bright">
                <Sparkle className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
                Learn by doing
              </h3>
              <p className="mt-3 max-w-md text-pretty text-[15px] leading-relaxed text-muted">
                Passivity is the enemy of retention. Rotate a fan blade, peel a heatspreader,
                unplug a cable — interaction makes concepts stick far longer than reading alone.
              </p>
              <div className="mt-8 flex items-center gap-3 text-[13px] text-muted">
                <Database className="h-4 w-4 text-accent-bright" strokeWidth={1.8} />
                <span>Explore at your own pace</span>
              </div>
            </div>
          </Reveal>

          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface/40 p-8 backdrop-blur-md">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(400px_260px_at_90%_10%,rgba(23,120,200,0.12),transparent_60%)]"
            />
            <div className="relative space-y-0">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                  className="relative flex gap-4 pb-8 last:pb-0"
                >
                  {i < STEPS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-[19px] top-10 h-[calc(100%-1.5rem)] w-px bg-line-strong"
                    />
                  )}
                  <span className="relative mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-2 text-accent-bright">
                    {step.icon}
                  </span>
                  <div>
                    <h4 className="font-semibold tracking-tight text-foreground">{step.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}