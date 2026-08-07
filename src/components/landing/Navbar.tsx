"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Cpu, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { GithubIcon } from "@/components/landing/ui/GithubIcon";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Components", href: "#preview" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "GitHub", href: "https://github.com/", external: true },
  { label: "Documentation", href: "#", external: false },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
          "flex w-full max-w-6xl items-center justify-between gap-4 rounded-2xl border px-4 py-3 transition-all duration-300 sm:px-5",
          scrolled
            ? "border-line-strong bg-surface/70 shadow-[0_10px_40px_rgba(2,6,16,0.5)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <a href="#" className="group flex items-center gap-2.5" aria-label="Computer Anatomy home">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-line-strong bg-accent-soft transition-colors group-hover:border-accent/40">
            <Cpu className="h-5 w-5 text-accent-bright" strokeWidth={1.8} />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent opacity-70 blur-[1px]" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-foreground">
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
                className="group inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
                <GithubIcon className="h-3.5 w-3.5 text-muted transition-colors group-hover:text-accent-bright" />
              </a>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            )
          )}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/explore"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-accent-bright transition-all hover:border-accent/60 hover:bg-accent/15 hover:shadow-[0_0_24px_rgba(77,141,255,0.25)]"
          >
            <Sparkles className="h-4 w-4" strokeWidth={1.8} />
            Explore Project
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface text-foreground md:hidden"
        >
          <span className="sr-only">Open menu</span>
          <div className="space-y-1.5">
            <span
              className={cn(
                "block h-0.5 w-4 rounded-full bg-foreground transition-transform",
                mobileOpen && "translate-y-2 rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-4 rounded-full bg-foreground transition-transform",
                mobileOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-4 rounded-full bg-foreground transition-transform",
                mobileOpen && "-translate-y-2 -rotate-45"
              )}
            />
          </div>
        </button>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-2 w-full max-w-6xl rounded-2xl border border-line bg-surface/90 p-2 backdrop-blur-xl md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/explore"
            onClick={() => setMobileOpen(false)}
            className="mt-1 flex items-center justify-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm font-medium text-accent-bright"
          >
            <Sparkles className="h-4 w-4" strokeWidth={1.8} />
            Explore Project
          </Link>
        </motion.div>
      )}
    </motion.header>
  );
}