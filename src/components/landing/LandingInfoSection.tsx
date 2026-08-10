// Server-rendered homepage content section. Explains what PC Anatomy is in
// crawlable HTML, links to every component page and the assembly guide, and
// hosts a visible FAQ (kept in sync with the FAQPage structured data).

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { GithubIcon } from "@/components/landing/ui/GithubIcon";
import { COMPONENTS } from "@/lib/components";
import { JsonLd } from "@/components/seo/JsonLd";
import { GITHUB_URL } from "@/lib/site";

const FAQS = [
  {
    q: "What is PC Anatomy?",
    a: "PC Anatomy is an open-source, interactive 3D educational platform that teaches computer hardware. You can rotate, zoom, and disassemble realistic 3D models of the CPU, RAM, motherboard, GPU, storage, power supply, and more — with plain-language explanations of how each part works.",
  },
  {
    q: "What can I learn on PC Anatomy?",
    a: "You can learn what each computer component does, how components work together inside a system, how to assemble a PC step by step, and how to identify common hardware problems. Every topic page includes written explanations, so the content is readable even without WebGL.",
  },
  {
    q: "Do I need WebGL to learn from PC Anatomy?",
    a: "No. The 3D viewer is an enhancement — every component page also contains a complete written explanation, key specifications, and FAQs in normal HTML that work on any device.",
  },
  {
    q: "Is PC Anatomy free and open source?",
    a: "Yes. PC Anatomy is 100% open source under the MIT License, and the code is publicly available on GitHub. You can use it, fork it, and contribute to it.",
  },
];

const H2 = "text-2xl font-semibold tracking-tight text-foreground sm:text-3xl";
const P = "mt-4 text-[15px] leading-relaxed text-muted";

export function LandingInfoSection() {
  return (
    <section className="relative border-t border-line bg-background px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2 className={H2}>What Is PC Anatomy?</h2>
          <p className={P}>
            PC Anatomy is an open-source, interactive 3D educational platform
            that teaches computer hardware by letting you explore it directly.
            Instead of static diagrams, you get lifelike 3D models of the CPU,
            RAM, motherboard, GPU, storage drives, power supply, and every
            other part of a desktop computer — rotate them, zoom in, and peel
            them apart while clear explanations describe what each piece does
            and why it matters.
          </p>
          <p className={P}>
            Every topic is explained in plain language as well: what each
            component is, what it does, how it works, and how it connects to
            the rest of the system. Whether you are a student, a first-time
            builder, or a curious user, PC Anatomy makes the inside of a
            computer understandable.
          </p>
        </div>

        <div className="mt-14 max-w-3xl">
          <h2 className={H2}>Learn How PC Components Work</h2>
          <p className={P}>
            Each component page pairs an interactive 3D model with a complete
            written guide: a direct answer to what the part is, what it does,
            how it works, its key specifications, how it behaves in a real PC
            build, and common questions. Use the 3D viewer to inspect the
            hardware from every angle, and read along to understand it.
          </p>
        </div>

        <div className="mt-14">
          <h2 className={H2}>Explore Computer Components</h2>
          <p className={P}>
            Browse every component in the interactive 3D explorer:
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {COMPONENTS.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/components/${c.id}`}
                  className="group flex h-full items-start justify-between gap-3 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent/40 hover:bg-surface-2"
                >
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-[15px] font-medium text-foreground">
                      {c.name}
                    </span>
                    <span className="truncate text-[12.5px] text-muted">
                      {c.tagline}
                    </span>
                  </span>
                  <ChevronRight
                    aria-hidden="true"
                    className="mt-1 h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 max-w-3xl">
          <h2 className={H2}>Explore PC Assembly</h2>
          <p className={P}>
            Ready to put it all together? The{" "}
            <Link
              href="/assembly"
              className="font-medium text-accent transition-colors hover:text-accent-bright"
            >
              step-by-step PC assembly guide
            </Link>{" "}
            walks through the entire build — installing the CPU, RAM, cooler,
            motherboard, storage, GPU, and power supply, connecting the cables,
            and testing the finished computer — with links to each component&apos;s
            3D model along the way.
          </p>
        </div>

        <div className="mt-14 max-w-3xl">
          <h2 className={H2}>Frequently Asked Questions</h2>
          <div className="mt-5 divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[15px] font-medium text-foreground [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="text-muted transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-line-strong hover:bg-surface-2"
          >
            <GithubIcon className="h-4 w-4" />
            Open Source on GitHub
          </a>
        </div>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </section>
  );
}
