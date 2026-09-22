"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FeatureItem } from "@/components/landing/features/FeatureItem";
import { FeatureProgress } from "@/components/landing/features/FeatureProgress";

gsap.registerPlugin(ScrollTrigger);

// Data for each feature shown in this section
const FEATURES = [
  {
    title: "Explora en 3D",
    description:
      "Explora el hardware del ordenador en un entorno 3D interactivo. Selecciona componentes, muévete por el sistema y ve dónde encaja cada pieza.",
  },
  {
    title: "Descubre cada componente",
    description:
      "Explora 16 componentes esenciales: desde la CPU y la placa base hasta el almacenamiento, la refrigeración, los periféricos y la protección eléctrica.",
  },
  {
    title: "Aprende los detalles",
    description:
      "Entiende qué hace cada componente, cómo funciona y qué fallos suelen asociarse a él.",
  },
  {
    title: "Conéctalo con el mundo real",
    description:
      "Aprende cómo se usan los componentes en sistemas reales con explicaciones prácticas y datos curiosos de hardware.",
  },
  {
    title: "Encuentra lo que buscas",
    description:
      "Busca en la biblioteca de componentes y salta directamente al hardware que quieres explorar.",
  },
];

// Features: shows a scrolling, layered list of features. On desktop the
// section is pinned and cycles through each feature; on mobile it simply
// stacks the features as tall blocks.
export function Features() {
  // Refs to the section, the pinned stage, and each feature card
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  // Which feature is currently shown (highlights the side progress)
  const [active, setActive] = useState(0);

  // Listen for changes to the "desktop" (768px) breakpoint
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

  // Build the scroll timeline, but only in the desktop layout
  useEffect(() => {
    if (typeof window === "undefined" || !isDesktop) return;
    const section = sectionRef.current;
    const stage = stageRef.current;
    const items = itemRefs.current;
    if (!section || !stage || items.length === 0) return;

    const ctx = gsap.context(() => {
      // Pinned scroll timeline: one "chapter" per feature
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + stage.offsetHeight * (items.length - 1),
          pin: stage,
          scrub: 0.8,
          anticipatePin: 1,
          // As the user scrolls, decide which feature is active
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

    // Clean up all animations on unmount or when switching layouts
    return () => {
      ctx.revert();
    };
  }, [isDesktop]);

  // Mobile layout: stack every feature as a full-height block
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

      {/* Pinned stage: all features are stacked on top of each other */}
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