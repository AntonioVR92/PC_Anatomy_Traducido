"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MousePointer2, RotateCw, Sparkles } from "lucide-react";
import { Reveal, MagneticButton, EASE } from "@/components/landing/ui/primitives";

const HARDWARE = [
  { name: "CPU", detail: "The brain", emoji: "processor" },
  { name: "GPU", detail: "Visual firepower" },
  { name: "RAM", detail: "Working memory" },
  { name: "Motherboard", detail: "The nervous system" },
  { name: "Storage", detail: "Long-term memory" },
  { name: "Cooling", detail: "Thermal control" },
];

export function HardwarePreview() {
  return (
    <section id="preview" className="relative scroll-mt-24 px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent-bright">
              Interactive Preview
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Spin, zoom, and take hardware apart
            </h2>
            <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Choose a component and manipulate it in realtime. Orbit the camera, split it into
              layers, and trace the path of data through silicon, board, and bus.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface/60 px-3.5 py-2 text-[13px] text-muted">
                <MousePointer2 className="h-4 w-4 text-accent-bright" strokeWidth={1.8} />
                Click to select
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface/60 px-3.5 py-2 text-[13px] text-muted">
                <RotateCw className="h-4 w-4 text-accent-bright" strokeWidth={1.8} />
                Drag to orbit
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface/60 px-3.5 py-2 text-[13px] text-muted">
                <Sparkles className="h-4 w-4 text-accent-bright" strokeWidth={1.8} />
                Peel layers apart
              </div>
            </div>

            <Reveal delay={0.2} className="mt-10">
              <MagneticButton>
                <Link
                  href="/explore"
                  className="group inline-flex h-12 items-center gap-2 rounded-xl border border-line bg-surface/60 px-6 text-[15px] font-medium text-foreground backdrop-blur-md transition-all hover:border-accent/40 hover:bg-surface-2"
                >
                  Explore Components
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                </Link>
              </MagneticButton>
            </Reveal>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-surface/40 p-2 backdrop-blur-md">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(500px_320px_at_50%_20%,rgba(45,90,190,0.14),transparent_60%)]"
              />
              <div className="grid grid-cols-3 gap-2">
                {HARDWARE.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
                    className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface-2/60 p-3 transition-all hover:border-accent/40 hover:shadow-[0_0_24px_rgba(77,141,255,0.15)]"
                  >
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="text-[13px] font-medium text-accent-bright">0{i + 1}</div>
                      <div className="text-center text-[13px] font-semibold leading-tight text-foreground">
                        {item.name}
                      </div>
                      <div className="text-center text-[11px] leading-tight text-muted">
                        {item.detail}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}