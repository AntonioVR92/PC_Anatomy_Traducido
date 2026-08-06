"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Crosshair,
  Lightbulb,
  MapPin,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";

export type SidebarComponent = {
  id: string;
  title: string;
  description: string;
  function: string;
  importance: string;
  facts: string[];
};

export function Sidebar({
  component,
  index,
  total,
  mode = "fullscreen",
  name,
  onClose,
  onPrev,
  onNext,
  onReset,
}: {
  component: SidebarComponent | null;
  index: number;
  total: number;
  mode?: "fullscreen" | "embedded";
  name: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onReset: () => void;
}) {
  return (
    <AnimatePresence>
      {component && (
        <motion.aside
          key={component.id}
          initial={{ x: 420, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 420, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 38 }}
          className={`pointer-events-auto absolute right-3 top-3 bottom-3 z-30 flex flex-col overflow-hidden rounded-2xl border border-line-strong bg-surface/70 shadow-[0_24px_70px_rgba(2,6,16,0.55)] backdrop-blur-xl ${
            mode === "embedded" ? "w-[300px]" : "w-[340px]"
          }`}
        >
          <header className="flex items-center gap-3 border-b border-line px-5 py-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-[15px] font-bold text-accent ring-1 ring-accent/30">
              {index + 1}
            </span>
            <div className="flex min-w-0 flex-col gap-0.5">
              <p className="truncate text-[15px] font-semibold tracking-tight text-foreground">
                {component.title}
              </p>
              <p className="text-[11px] text-muted">
                {index + 1} of {total} · {name}
              </p>
            </div>
            <button
              type="button"
              aria-label="Close panel"
              onClick={onClose}
              className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              <X className="h-4 w-4" strokeWidth={1.8} />
            </button>
          </header>

          <div className="thin-scroll flex-1 space-y-5 overflow-y-auto px-5 py-5">
            <section className="space-y-1.5">
              <h4 className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-2">
                <Sparkles className="h-3 w-3 text-accent" strokeWidth={1.8} />
                Overview
              </h4>
              <p className="text-[13px] leading-relaxed text-foreground/90">
                {component.description}
              </p>
            </section>

            <section className="space-y-1.5 rounded-xl border border-line bg-surface-2/60 p-3.5">
              <h4 className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-accent">
                <MapPin className="h-3 w-3" strokeWidth={1.8} />
                Primary Function
              </h4>
              <p className="text-[12.5px] leading-relaxed text-foreground/85">
                {component.function}
              </p>
            </section>

            <section className="space-y-1.5">
              <h4 className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-2">
                <Crosshair className="h-3 w-3 text-accent" strokeWidth={1.8} />
                Why It Is Important
              </h4>
              <p className="text-[12.5px] leading-relaxed text-foreground/85">
                {component.importance}
              </p>
            </section>

            <section className="space-y-2">
              <h4 className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-2">
                <Lightbulb className="h-3 w-3 text-accent" strokeWidth={1.8} />
                Interesting Facts
              </h4>
              {component.facts.map((fact) => (
                <div
                  key={fact}
                  className="flex items-start gap-2.5 rounded-xl border border-line bg-surface-2/50 px-3.5 py-2.5"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <p className="text-[12.5px] leading-relaxed text-muted">{fact}</p>
                </div>
              ))}
            </section>
          </div>

          <footer className="grid grid-cols-4 gap-2 border-t border-line p-3">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous component"
              className="flex h-9 items-center justify-center rounded-xl border border-line bg-surface-2 text-muted transition-colors hover:border-accent/40 hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.8} />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Next component"
              className="flex h-9 items-center justify-center rounded-xl border border-line bg-surface-2 text-muted transition-colors hover:border-accent/40 hover:text-foreground"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
            </button>
            <button
              type="button"
              onClick={onReset}
              className="col-span-2 flex h-9 items-center justify-center gap-1.5 rounded-xl bg-accent text-[12px] font-semibold text-white transition-colors hover:bg-accent-bright"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.8} />
              Reset Camera
            </button>
          </footer>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
