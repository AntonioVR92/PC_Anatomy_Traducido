"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Cpu, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Components", href: "#preview" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "GitHub", href: "https://github.com/", external: true },
  { label: "Documentation", href: "#", external: false },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-6xl items-center justify-between gap-4 rounded-full border px-5 py-2.5 transition-all duration-300",
          scrolled
            ? "border-white/10 bg-[#0a0d14]/70 shadow-[0_8px_40px_rgba(0,0,0,0.55)] backdrop-blur-xl"
            : "border-white/5 bg-white/[0.02]"
        )}
      >
        <a href="#" className="flex items-center gap-2.5" aria-label="Computer Anatomy home">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5">
            <Cpu className="h-4.5 w-4.5 text-accent-bright" strokeWidth={1.8} />
          </span>
          <span className="text-[14px] font-semibold tracking-tight text-white">
            Computer Anatomy
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-3.5 py-2 text-[13.5px] text-neutral-400 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-[13.5px] text-neutral-400 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            )
          )}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/explore"
            className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-[#5ea2ff] to-[#2f6fe0] px-4.5 py-2.5 text-[13.5px] font-medium text-white shadow-[0_4px_20px_rgba(47,111,224,0.4)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_4px_32px_rgba(47,111,224,0.6)]"
          >
            Explore Project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden"
        >
          <div className="space-y-1.5">
            <span className={cn("block h-0.5 w-4 rounded-full bg-white transition-transform", open && "translate-y-2 rotate-45")} />
            <span className={cn("block h-0.5 w-4 rounded-full bg-white transition-transform", open && "opacity-0")} />
            <span className={cn("block h-0.5 w-4 rounded-full bg-white transition-transform", open && "-translate-y-2 -rotate-45")} />
          </div>
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-2 w-full max-w-6xl rounded-2xl border border-white/10 bg-[#0a0d14]/90 p-2 backdrop-blur-xl md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/explore"
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-b from-blue-500 to-blue-700 px-4 py-3 text-sm font-medium text-white"
          >
            Explore Project
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </motion.div>
      )}
    </motion.header>
  );
}