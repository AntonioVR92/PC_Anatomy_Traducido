"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/landing/ui/primitives";

gsap.registerPlugin(ScrollTrigger);

type Phase = "completed" | "in-progress" | "planned" | "future";

const ROADMAP = [
  {
    index: "01",
    phase: "completed" as Phase,
    status: "Completed",
    title: "Core Hardware Foundation",
    desc: "The ground we started from — the core interactive viewer and the data layer that lets every component be explored.",
    items: ["Interactive CPU & motherboard models", "Orbit controls & clickable hotspots", "Component data layer & labelling"],
  },
  {
    index: "02",
    phase: "completed" as Phase,
    status: "Completed",
    title: "Interactive Exploration",
    desc: "Turning a 3D model into something you can move through — select, break apart and inspect hardware for yourself.",
    items: ["Component selection & camera focus", "Layer-by-layer system unit views", "Explosion & detail inspection"],
  },
  {
    index: "03",
    phase: "in-progress" as Phase,
    status: "In Progress",
    title: "Complete Component Library",
    desc: "Growing past the CPU to the full anatomy of a machine — every part, every function, every common problem.",
    items: ["GPU internals", "PSU & cooling", "Storage & RAM modules"],
  },
  {
    index: "04",
    phase: "planned" as Phase,
    status: "Planned",
    title: "Computer Systems",
    desc: "Assembling whole systems so you can see how individual parts connect and work together as a single machine.",
    items: ["Full system unit breakdowns", "Motherboard & interconnect anatomy", "Peripherals & connectivity"],
  },
  {
    index: "05",
    phase: "planned" as Phase,
    status: "Planned",
    title: "Networking Fundamentals",
    desc: "How computers talk to each other — the wires, switches, and protocols that sit between the machines we build.",
    items: ["Router, switch & NIC modules", "Network topology & cabling", "Protocols & basic concepts"],
  },
  {
    index: "06",
    phase: "future" as Phase,
    status: "Future",
    title: "Interactive Learning",
    desc: "A structured curriculum that brings everything together — guided paths, progress, and classroom support.",
    items: ["Structured learning paths", "Quizzes & progress tracking", "Classroom & self-hosted mode"],
  },
  {
    index: "07",
    phase: "future" as Phase,
    status: "Future",
    title: "Community & Open Source",
    desc: "Handing the project to the people — open contributions, user-built content, and a growing community around it.",
    items: ["User-created models", "Worldwide contributor export", "Localization & i18n"],
  },
];

const NODE_RING: Record<Phase, string> = {
  completed: "border-accent/60",
  "in-progress": "border-accent-bright",
  planned: "border-line-strong",
  future: "border-line",
};

const NODE_CORE: Record<Phase, string> = {
  completed: "bg-accent shadow-[0_0_14px_rgba(77,141,255,0.55)]",
  "in-progress": "bg-accent-bright shadow-[0_0_18px_rgba(111,164,255,0.7)]",
  planned: "bg-surface-2",
  future: "bg-surface-2/40",
};

const CARD: Record<Phase, string> = {
  completed: "border-line bg-surface/40",
  "in-progress": "border-accent/50 bg-accent/[0.06] shadow-[0_0_40px_-18px_rgba(77,141,255,0.4)]",
  planned: "border-line bg-surface/35",
  future: "border-line/70 bg-surface/20",
};

const STATUS_BADGE: Record<Phase, string> = {
  completed: "border-line-strong text-accent-bright",
  "in-progress": "border-accent/70 bg-accent/10 text-accent-bright",
  planned: "border-line-strong text-muted",
  future: "border-line text-muted-2",
};

function Node({ phase }: { phase: Phase }) {
  return (
    <span className="relative flex h-3.5 w-3.5 items-center justify-center">
      {phase === "in-progress" && (
        <span className="absolute inline-flex h-3.5 w-3.5 animate-ping rounded-full bg-accent/50" />
      )}
      <span className={cn("flex h-3.5 w-3.5 items-center justify-center rounded-full border", NODE_RING[phase])}>
        <span className={cn("h-2 w-2 rounded-full", NODE_CORE[phase])} />
      </span>
    </span>
  );
}

export function Roadmap() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const spine = spineRef.current;
      if (!spine) return;
      const nodes = nodeRefs.current.filter(Boolean) as HTMLElement[];
      const contents = contentRefs.current.filter(Boolean) as HTMLElement[];
      const n = ROADMAP.length;
      const segCount = n - 1;

      gsap.set(contents, { autoAlpha: 0, y: 26 });
      gsap.set(nodes, { autoAlpha: 0, scale: 0.2 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 55%",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      tl.fromTo(
        spine,
        { scaleY: 0 },
        { scaleY: 1, ease: "none", duration: segCount, transformOrigin: "top center" },
        0
      );

      ROADMAP.forEach((_, i) => {
        const at = i * (segCount / Math.max(segCount, 1));
        tl.fromTo(
          nodes[i],
          { autoAlpha: 0, scale: 0.2 },
          { autoAlpha: 1, scale: 1, ease: "power2.out", duration: 0.5 },
          at
        );
        tl.fromTo(
          contents[i],
          { autoAlpha: 0, y: 26 },
          { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.7 },
          at + 0.2
        );
      });

      ScrollTrigger.refresh();
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="roadmap" className="relative scroll-mt-24 px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent-bright">
            Project Roadmap
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            We started here. We&rsquo;re building this. And we&rsquo;re going further.
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
            An honest look at where the project is today and where it&rsquo;s heading — a continuous
            descent through the anatomy of the computer, built in the open.
          </p>
        </Reveal>

        <div ref={wrapRef} className="relative mx-auto mt-16 max-w-5xl sm:mt-24">
          {/* Soft radial glow behind the journey */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-[60vh] w-[70vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.12),transparent_70%)]"
          />

          {/* Spine track + progress fill */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-5 -translate-x-1/2 w-[2px] bg-line-strong/70 md:left-1/2"
          />
          <div
            ref={spineRef}
            aria-hidden="true"
            className="absolute inset-y-0 left-5 -translate-x-1/2 w-[2px] origin-top scale-y-0 bg-gradient-to-b from-accent-bright via-accent to-accent-bright shadow-[0_0_12px_rgba(111,164,255,0.55)] md:left-1/2"
          />

          <ol className="relative">
            {ROADMAP.map((item, i) => {
              const even = i % 2 === 0;
              return (
                <li
                  key={item.index}
                  className="relative mb-10 last:mb-0 md:mb-0 md:py-24 md:first:pt-8 grid grid-cols-[40px_minmax(0,1fr)] items-start md:grid-cols-[minmax(0,1fr)_48px_minmax(0,1fr)]"
                >
                  {/* Node on the spine */}
                  <span
                    ref={(el) => {
                      nodeRefs.current[i] = el;
                    }}
                    className="col-start-1 flex flex-col items-center pt-[9px] md:col-start-2"
                  >
                    <Node
                      phase={item.phase}
                    />
                  </span>

                  {/* Milestone card */}
                  <div
                    ref={(el) => {
                      contentRefs.current[i] = el;
                    }}
                    className={cn(
                      "col-start-2 min-w-0",
                      even ? "md:col-start-1 md:pr-12" : "md:col-start-3 md:pl-12"
                    )}
                  >
                    <div
                      className={cn(
                        "group relative overflow-hidden rounded-xl border p-5 transition-colors duration-300 sm:p-6",
                        CARD[item.phase]
                      )}
                    >
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-xs tracking-widest text-muted-2">
                          {item.index}
                        </span>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold",
                            STATUS_BADGE[item.phase]
                          )}
                        >
                          {item.phase === "in-progress" && (
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-bright opacity-70" />
                              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-bright" />
                            </span>
                          )}
                          {item.status}
                        </span>
                      </div>

                      <h3 className="mt-4 text-balance text-[17px] font-semibold tracking-tight text-foreground sm:text-lg">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-pretty text-[13.5px] leading-relaxed text-muted">
                        {item.desc}
                      </p>

                      <ul className="mt-4 space-y-1.5">
                        {item.items.map((li) => (
                          <li key={li} className="flex items-start gap-2 text-[13px] leading-relaxed text-muted">
                            <Sparkle
                              className="mt-0.5 h-3 w-3 shrink-0 text-accent-bright"
                              strokeWidth={2}
                            />
                            <span>{li}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}