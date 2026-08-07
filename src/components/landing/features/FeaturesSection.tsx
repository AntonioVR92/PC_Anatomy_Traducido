"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FeatureItem } from "@/components/landing/features/FeatureItem";
import { FeatureProgress } from "@/components/landing/features/FeatureProgress";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    title: "Explore in 3D",
    description:
      "Explore computer hardware in an interactive 3D environment. Select components, move around the system, and see where everything belongs.",
  },
  {
    title: "Discover Every Component",
    description:
      "Explore 16 essential computer components, from the CPU and motherboard to storage, cooling, peripherals, and power protection.",
  },
  {
    title: "Learn the Details",
    description:
      "Understand what each component does, how it functions, and the common issues associated with it.",
  },
  {
    title: "Connect It to the Real World",
    description:
      "Learn how computer components are used in real systems through practical explanations and interesting hardware facts.",
  },
  {
    title: "Find What You're Looking For",
    description:
      "Search through the component library and jump directly into the hardware you want to explore.",
  },
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState(0);

  const subscribe = (cb: () => void) => {
    const mq = window.matchMedia("(min-width: 768px)");
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  };
  const isDesktop = useSyncExternalStore(
    subscribe,
    () => window.matchMedia("(min-width: 768px)").matches,
    () => false
  );

  useEffect(() => {
    if (typeof window === "undefined" || !isDesktop) return;
    const section = sectionRef.current;
    const stage = stageRef.current;
    const items = itemRefs.current;
    if (!section || !stage || items.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + stage.offsetHeight * (items.length - 1),
          pin: stage,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(
              items.length - 1,
              Math.floor(self.progress * items.length)
            );
            setActive(idx);
          },
        },
      });

      items.forEach((item, i) => {
        // Enter — quick fade in, then hold
        tl.fromTo(
          item,
          { opacity: 0, y: 40, scale: 0.96, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.3,
            ease: "power2.out",
          },
          i
        );
        // Pause — feature stays fully visible until the exit begins
        tl.to(
          item,
          {
            opacity: 1,
            duration: 0.4,
            ease: "none",
          },
          i + 0.3
        );
        // Exit (except last) — fade out just before the next enters
        if (i < items.length - 1) {
          tl.to(
            item,
            {
              opacity: 0,
              y: -40,
              scale: 0.98,
              filter: "blur(6px)",
              duration: 0.3,
              ease: "power2.in",
            },
            i + 0.7
          );
        }
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, [isDesktop]);

  // Mobile: stacked one-per-viewport flow
  if (!isDesktop) {
    return (
      <section id="features" ref={sectionRef} className="relative px-6 py-24">
        <div className="flex flex-col gap-16">
          {FEATURES.map((feature, i) => (
            <div key={feature.title} className="min-h-[70vh] content-center">
              <FeatureItem
                index={i}
                title={feature.title}
                description={feature.description}
                active={true}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="features" ref={sectionRef} className="relative">
      {/* Subtle blue radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[60vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.1),transparent_70%)]"
      />

      <div
        ref={stageRef}
        className="relative flex h-screen items-center overflow-hidden"
      >
        <FeatureProgress total={FEATURES.length} active={active} />

        {FEATURES.map((feature, i) => (
          <div
            key={feature.title}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="absolute inset-0 flex items-center opacity-0"
          >
            <FeatureItem
              index={i}
              title={feature.title}
              description={feature.description}
              active={active === i}
            />
          </div>
        ))}
      </div>
    </section>
  );
}