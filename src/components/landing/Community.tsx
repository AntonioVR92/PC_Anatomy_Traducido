"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Cpu, GitPullRequest } from "lucide-react";
import { Reveal, MagneticButton, EASE } from "@/components/landing/ui/primitives";
import { DonateModal } from "@/components/landing/donate/DonateModal";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { GithubIcon } from "@/components/landing/ui/GithubIcon";

// The three core pillars of the community: explore, learn, contribute
const CORE_PILLARS = [
  {
    icon: <Cpu className="h-5 w-5" strokeWidth={1.6} />,
    num: "01",
    title: "Explorar",
    description:
      "Descubre componentes interactivos, modelos 3D y explicaciones detalladas.",
  },
  {
    icon: <BookOpen className="h-5 w-5" strokeWidth={1.6} />,
    num: "02",
    title: "Aprender",
    description:
      "Entiende cómo trabajan juntos los componentes con explicaciones visuales y contenido estructurado.",
  },
  {
    icon: <GitPullRequest className="h-5 w-5" strokeWidth={1.6} />,
    num: "03",
    title: "Contribuir",
    description:
      "Mejora el proyecto aportando modelos, documentación, correcciones, ideas y código.",
  },
];

// Community: introduces the open-source community with three pillar
// cards, then two call-to-action buttons (explore and star on GitHub).
export function Community() {
  return (
    <section id="community" className="relative scroll-mt-24 px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent-bright">
            Código abierto • Hecho para aprender
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Aprende. Explora. Construye juntos.
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
            PC Anatomy es una plataforma de aprendizaje de código abierto para
            entender hardware, sistemas y redes con experiencias interactivas.
          </p>
        </Reveal>

        {/* Three pillar cards that fade up one after another */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {CORE_PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-xl border border-line bg-surface/35 p-6 transition-colors duration-300 hover:border-accent/40"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(240px_160px_at_0%_0%,rgba(77,141,255,0.14),transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-surface-2 text-accent-bright transition-colors duration-300 group-hover:border-accent/40">
                  {pillar.icon}
                </span>
                <span className="font-mono text-xs tracking-widest text-muted-2">
                  {pillar.num}
                </span>
              </div>

              <h3 className="mt-5 text-balance text-lg font-semibold tracking-tight text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-2 text-pretty text-[13.5px] leading-relaxed text-muted">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Row of call-to-action buttons */}
        <Reveal delay={0.15} className="relative mt-12 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton>
            <Link
              href="/explore"
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-7 text-[15px] font-medium text-white backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_32px_rgba(77,141,255,0.15)] transition-all duration-300 hover:scale-[1.03] hover:border-accent/50 hover:bg-white/10 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_10px_44px_rgba(77,141,255,0.25)]"
            >
              Explorar PC Anatomy
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
            </Link>
          </MagneticButton>

          <MagneticButton>
            <a
              href="https://github.com/brickshow/pc-anatomy"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-line bg-surface/60 px-6 text-[15px] font-medium text-foreground backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:border-line-strong hover:bg-surface-2"
            >
              <GithubIcon className="h-4 w-4" />
              Dar estrella en GitHub
              <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
            </a>
          </MagneticButton>
        </Reveal>

        {/* Small footnote reinforcing that it is free and open source */}
        <p
          className={cn(
            "mt-8 text-center text-sm text-muted-2",
            "font-mono tracking-tight"
          )}
        >
          Código abierto. Gratis para explorar.
        </p>

        {/* Buy Me a Coffee trigger + donation modal */}
        <DonateModal />
      </div>
    </section>
  );
}