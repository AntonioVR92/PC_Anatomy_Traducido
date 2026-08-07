"use client";

import { Sparkle } from "lucide-react";
import { Reveal, EASE } from "@/components/landing/ui/primitives";
import { motion } from "framer-motion";

const ROADMAP = [
  {
    status: "Done",
    title: "Core 3D Viewer",
    time: "Shipped",
    items: ["Interactive CPU & motherboard", "Orbit controls & hotspots", "Component data layer"],
    current: false,
  },
  {
    status: "In progress",
    title: "Full Component Library",
    time: "Active",
    items: ["GPU internals", "PSU & cooling", "Storage & RAM modules"],
    current: true,
  },
  {
    status: "Next",
    title: "Guided Curriculum",
    time: "Planned",
    items: ["Structured learning paths", "Quizzes & progress tracking", "Classroom mode"],
    current: false,
  },
  {
    status: "Later",
    title: "Community Platform",
    time: "Future",
    items: ["User-created models", "Worldwide contributor export", "Localization & i18n"],
    current: false,
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="relative scroll-mt-24 px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent-bright">
            Project Roadmap
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Built in the open, improved constantly
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
            An honest look at where the project is today and where it’s heading. Every release is
            driven by the community.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ROADMAP.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
              className={
                "group relative flex flex-col overflow-hidden rounded-2xl border p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 " +
                (item.current
                  ? "border-accent/40 bg-accent/10 shadow-[0_0_32px_rgba(77,141,255,0.15)]"
                  : "border-line bg-surface/50 hover:border-line-strong hover:bg-surface-2/50")
              }
            >
              <div className="flex items-center gap-2">
                <span
                  className={
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold " +
                    (item.current
                      ? "bg-accent text-white"
                      : "bg-surface-2 text-muted")
                  }
                >
                  {item.current && (
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                  )}
                  {item.status}
                </span>
                <span className="text-[11px] text-muted-2">{item.time}</span>
              </div>
              <h3 className="mt-4 text-[16px] font-semibold tracking-tight text-foreground">
                {item.title}
              </h3>
              <ul className="mt-3 space-y-1.5">
                {item.items.map((li) => (
                  <li key={li} className="flex items-start gap-2 text-[13px] leading-relaxed text-muted">
                    <Sparkle className="mt-0.5 h-3 w-3 shrink-0 text-accent-bright" strokeWidth={2} />
                    {li}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}