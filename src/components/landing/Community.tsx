"use client";

import { GitFork, Heart, Star, Users } from "lucide-react";
import { Reveal, MagneticButton, EASE } from "@/components/landing/ui/primitives";
import { motion } from "framer-motion";
import { GithubIcon } from "@/components/landing/ui/GithubIcon";

const COMMUNITY_POINTS = [
  {
    icon: <GitFork className="h-5 w-5" strokeWidth={1.6} />,
    title: "Built in the open",
    description: "Every line of code, model, and lesson is public and licensed for everyone.",
  },
  {
    icon: <Users className="h-5 w-5" strokeWidth={1.6} />,
    title: "Made by the community",
    description: "Contributors from around the world shape the models, content and features.",
  },
  {
    icon: <Heart className="h-5 w-5" strokeWidth={1.6} />,
    title: "Free forever",
    description: "Education should not be locked behind a paywall. It stays open and accessible.",
  },
];

export function Community() {
  return (
    <section id="community" className="relative scroll-mt-24 px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-b from-surface-2/80 to-surface/60 p-8 backdrop-blur-md sm:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_420px_at_50%_0%,rgba(45,90,190,0.18),transparent_60%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
          />

          <Reveal className="relative mx-auto max-w-2xl text-center">
            <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent-bright">
              Open Source Community
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Knowledge, built together
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Computer Anatomy is a community project. Star the repo, contribute a model, or share
              your knowledge — every hand helps.
            </p>
          </Reveal>

          <div className="relative mt-12 grid gap-5 sm:grid-cols-3">
            {COMMUNITY_POINTS.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
                className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface/50 px-6 py-8 text-center backdrop-blur-md transition-colors hover:border-accent/30"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-surface-2 text-accent-bright">
                  {point.icon}
                </span>
                <h3 className="text-[16px] font-semibold tracking-tight text-foreground">
                  {point.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-muted">{point.description}</p>
              </motion.div>
            ))}
          </div>

          <Reveal delay={0.2} className="relative mt-12 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-b from-accent-bright to-accent px-6 text-[15px] font-medium text-white shadow-[0_8px_32px_rgba(77,141,255,0.35)] transition-all hover:shadow-[0_10px_44px_rgba(77,141,255,0.5)]"
              >
                <Star className="h-4.5 w-4.5" strokeWidth={1.8} />
                Star on GitHub
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-line bg-surface/60 px-6 text-[15px] font-medium text-foreground backdrop-blur-md transition-all hover:border-line-strong hover:bg-surface-2"
              >
                <GithubIcon className="h-4.5 w-4.5" />
                Contribute
              </a>
            </MagneticButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}