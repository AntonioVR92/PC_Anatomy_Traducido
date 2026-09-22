"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import { GithubIcon } from "@/components/landing/ui/GithubIcon";
import { MagneticButton } from "@/components/landing/ui/primitives";

// Buttons: the two main call-to-action buttons in the hero —
// "Explore Components" and a link to the GitHub repository.
export function Buttons() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="mt-10 flex flex-wrap items-center justify-start gap-4"
    >
      {/* Primary button that navigates to the interactive explorer */}
      <MagneticButton>
        <Link
          href="/explore"
          className="group inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-7 text-[15px] font-medium text-white backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_32px_rgba(77,141,255,0.15)] transition-all duration-300 hover:scale-[1.03] hover:border-accent/50 hover:bg-white/10 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_10px_44px_rgba(77,141,255,0.25)]"
        >
          <Cpu className="h-4 w-4" strokeWidth={1.8} />
          Explorar componentes
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
        </Link>
      </MagneticButton>

      {/* Secondary button that opens the GitHub repo in a new tab */}
      <MagneticButton>
        <a
          href="https://github.com/brickshow/pc-anatomy"
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-12 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 text-[15px] font-medium text-neutral-100 backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_24px_rgba(93,163,255,0.15)]"
        >
          <GithubIcon className="h-4 w-4" />
          Repositorio en GitHub
        </a>
      </MagneticButton>
    </motion.div>
  );
}