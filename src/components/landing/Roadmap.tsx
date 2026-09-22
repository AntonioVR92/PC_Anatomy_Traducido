"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/landing/ui/primitives";

gsap.registerPlugin(ScrollTrigger);

// The status a roadmap milestone can be in
type Phase = "completed" | "in-progress" | "planned" | "future";

// Data for every milestone shown on the roadmap line
const ROADMAP = [
  {
    index: "01",
    phase: "completed" as Phase,
    status: "Completado",
    title: "Base de hardware",
    desc: "El punto de partida: el visor interactivo y la capa de datos que permite explorar cada componente.",
    items: ["Modelos interactivos de CPU y placa base", "Controles de órbita y hotspots clicables", "Capa de datos y etiquetado de componentes"],
  },
  {
    index: "02",
    phase: "completed" as Phase,
    status: "Completado",
    title: "Exploración interactiva",
    desc: "Convertir un modelo 3D en algo que puedas recorrer: seleccionar, desmontar e inspeccionar el hardware.",
    items: ["Selección de componentes y enfoque de cámara", "Vistas por capas de la unidad del sistema", "Explosión e inspección de detalle"],
  },
  {
    index: "03",
    phase: "in-progress" as Phase,
    status: "En curso",
    title: "Biblioteca completa de componentes",
    desc: "Ir más allá de la CPU hacia la anatomía completa de una máquina: cada pieza, función y fallo habitual.",
    items: ["Interior de la GPU", "Fuente y refrigeración", "Almacenamiento y módulos de RAM"],
  },
  {
    index: "04",
    phase: "planned" as Phase,
    status: "Planificado",
    title: "Sistemas de ordenador",
    desc: "Montar sistemas enteros para ver cómo las piezas se conectan y trabajan juntas como una sola máquina.",
    items: ["Despieces de la unidad completa", "Anatomía de placa base e interconexiones", "Periféricos y conectividad"],
  },
  {
    index: "05",
    phase: "planned" as Phase,
    status: "Planificado",
    title: "Fundamentos de redes",
    desc: "Cómo se comunican los ordenadores: cables, switches y protocolos entre las máquinas que montamos.",
    items: ["Módulos de router, switch y NIC", "Topología de red y cableado", "Protocolos y conceptos básicos"],
  },
  {
    index: "06",
    phase: "future" as Phase,
    status: "Futuro",
    title: "Aprendizaje interactivo",
    desc: "Un currículo estructurado que lo une todo: rutas guiadas, progreso y soporte para aulas.",
    items: ["Rutas de aprendizaje estructuradas", "Cuestionarios y seguimiento de progreso", "Modo aula y autoalojado"],
  },
  {
    index: "07",
    phase: "future" as Phase,
    status: "Futuro",
    title: "Comunidad y código abierto",
    desc: "Abrir el proyecto a la gente: contribuciones, contenido creado por usuarios y una comunidad creciente.",
    items: ["Modelos creados por usuarios", "Exportación de colaboradores", "Localización e i18n"],
  },
];

// Border/ring styling for the timeline node, chosen by phase
const NODE_RING: Record<Phase, string> = {
  completed: "border-accent/60",
  "in-progress": "border-accent-bright",
  planned: "border-line-strong",
  future: "border-line",
};

// Core (inner dot) styling for the timeline node, chosen by phase
const NODE_CORE: Record<Phase, string> = {
  completed: "bg-accent shadow-[0_0_14px_rgba(77,141,255,0.55)]",
  "in-progress": "bg-accent-bright shadow-[0_0_18px_rgba(111,164,255,0.7)]",
  planned: "bg-surface-2",
  future: "bg-surface-2/40",
};

// Card background/border styling, chosen by phase
const CARD: Record<Phase, string> = {
  completed: "border-line bg-surface/40",
  "in-progress": "border-accent/50 bg-accent/[0.06] shadow-[0_0_40px_-18px_rgba(77,141,255,0.4)]",
  planned: "border-line bg-surface/35",
  future: "border-line/70 bg-surface/20",
};

// Status badge styling, chosen by phase
const STATUS_BADGE: Record<Phase, string> = {
  completed: "border-line-strong text-accent-bright",
  "in-progress": "border-accent/70 bg-accent/10 text-accent-bright",
  planned: "border-line-strong text-muted",
  future: "border-line text-muted-2",
};

// A single milestone dot on the spine; gentle pulsing when in progress
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

// Roadmap: shows the project plan as a vertical timeline that fills in
// as the user scrolls, revealing each milestone node and its card.
export function Roadmap() {
  // Refs for the timeline wrapper, progress spine, nodes and cards
  const wrapRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Runs once to wire up the scroll-driven reveal of the timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const spine = spineRef.current;
      if (!spine) return;
      // Only use node/card refs that are actually present in the DOM
      const nodes = nodeRefs.current.filter(Boolean) as HTMLElement[];
      const contents = contentRefs.current.filter(Boolean) as HTMLElement[];
      const n = ROADMAP.length;
      const segCount = n - 1;

      // Nodes and cards start hidden
      gsap.set(contents, { autoAlpha: 0, y: 26 });
      gsap.set(nodes, { autoAlpha: 0, scale: 0.2 });

      // The whole reveal is scrubbed against scrolling through the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 55%",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      // The progress spine grows from top to bottom across all segments
      tl.fromTo(
        spine,
        { scaleY: 0 },
        { scaleY: 1, ease: "none", duration: segCount, transformOrigin: "top center" },
        0
      );

      // Each milestone pops in at its own position along the timeline
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

    // Clean up all animations on unmount
    return () => ctx.revert();
  }, []);

  return (
    <section id="roadmap" className="relative scroll-mt-24 px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section heading: eyebrow label, title, and subtitle */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent-bright">
            Hoja de ruta del proyecto
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Empezamos aquí. Estamos construyendo esto. Y vamos a más.
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Una mirada sincera a dónde está el proyecto hoy y hacia dónde va: un
            recorrido continuo por la anatomía del ordenador, hecho en abierto.
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

          {/* The timeline list; each item is a milestone */}
          <ol className="relative">
            {ROADMAP.map((item, i) => {
              const even = i % 2 === 0;
              return (
                <li
                  key={item.index}
                  className="relative mb-10 last:mb-0 md:mb-0 md:py-24 md:first:pt-8 grid grid-cols-[40px_minmax(0,1fr)] items-start md:grid-cols-[minmax(0,1fr)_48px_minmax(0,1fr)]"
                >
                  {/* Node on the spine, registered so GSAP can animate it */}
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

                      {/* Row with the milestone number and its status badge */}
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

                      {/* Bullet list of deliverables for this milestone */}
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