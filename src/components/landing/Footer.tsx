"use client";

import Link from "next/link";
import { Cpu, Heart } from "lucide-react";
import { GithubIcon } from "@/components/landing/ui/GithubIcon";

const LINK_GROUPS: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Components", href: "/explore" },
      { label: "Roadmap", href: "#roadmap" },
      { label: "Community", href: "#community" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "GitHub", href: "https://github.com/", external: true },
      { label: "Discord", href: "#" },
      { label: "Twitter / X", href: "#" },
      { label: "Email", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line px-6 pb-10 pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <a href="#" className="flex items-center gap-2.5" aria-label="Computer Anatomy home">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-accent-bright/10">
                <Cpu className="h-5 w-5 text-accent-bright" strokeWidth={1.8} />
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-foreground">
                Computer Anatomy
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              The open-source interactive atlas for learning computer hardware in 3D.
            </p>
            <div className="mt-5 flex gap-2.5">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-accent/40 hover:text-foreground"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <h4 className="text-[13px] font-semibold uppercase tracking-wider text-foreground">
                {group.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-muted transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-[13px] text-muted-2">
            © {new Date().getFullYear()} Computer Anatomy. Built in the open under MIT License.
          </p>
          <p className="flex items-center gap-1.5 text-[13px] text-muted-2">
            Made with
            <Heart className="h-3.5 w-3.5 fill-accent text-accent" strokeWidth={1.6} />
            for curious minds
          </p>
        </div>
      </div>
    </footer>
  );
}