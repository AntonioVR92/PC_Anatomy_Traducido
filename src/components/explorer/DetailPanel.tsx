"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Crosshair,
  Lightbulb,
  MapPin,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import { getComponent, type ComponentInfo } from "@/lib/components";
import { useExplorer, type TabId } from "@/lib/store";
import { TabBar, TabContent } from "./ComponentTabs";
import { ModelCredits } from "@/components/viewer/ModelCredits";

function HotspotContent() {
  const hotspotPart = useExplorer((s) => s.hotspotPart);
  const hotspotIndex = useExplorer((s) => s.hotspotIndex);
  const hotspotTotal = useExplorer((s) => s.hotspotTotal);
  const selectedId = useExplorer((s) => s.selectedId);
  const resetHotspot = useExplorer((s) => s.resetHotspot);
  const closeHotspot = useExplorer((s) => s.closeHotspot);
  const component = getComponent(selectedId) ?? getComponent("cpu")!;

  if (!hotspotPart) return null;

  return (
    <aside className="flex h-full w-[376px] shrink-0 flex-col border-l border-line bg-surface">
      <header className="border-b border-line px-6 pb-5 pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="mt-1 font-mono text-[13px] font-medium tracking-tight text-accent">
              {component.index}
            </span>
            <div className="flex flex-col gap-1">
              <h2 className="text-[26px] font-semibold leading-none tracking-tight text-foreground">
                {hotspotPart.title}
              </h2>
              <p className="text-[13px] text-muted">
                {hotspotIndex + 1} of {hotspotTotal} · {component.name}
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close panel"
            onClick={closeHotspot}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
          >
            <X className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>
      </header>

      <div className="thin-scroll flex-1 space-y-5 overflow-y-auto px-6 py-5">
        <section className="space-y-1.5">
          <h4 className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-2">
            <Sparkles className="h-3 w-3 text-accent" strokeWidth={1.8} />
            Overview
          </h4>
          <p className="text-[13px] leading-relaxed text-foreground/90">
            {hotspotPart.description}
          </p>
        </section>

        <section className="space-y-1.5 rounded-xl border border-line bg-surface-2/60 p-3.5">
          <h4 className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-accent">
            <MapPin className="h-3 w-3" strokeWidth={1.8} />
            Primary Function
          </h4>
          <p className="text-[12.5px] leading-relaxed text-foreground/85">
            {hotspotPart.function}
          </p>
        </section>

        <section className="space-y-1.5">
          <h4 className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-2">
            <Crosshair className="h-3 w-3 text-accent" strokeWidth={1.8} />
            Why It Is Important
          </h4>
          <p className="text-[12.5px] leading-relaxed text-foreground/85">
            {hotspotPart.importance}
          </p>
        </section>

        <section className="space-y-2">
          <h4 className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-2">
            <Lightbulb className="h-3 w-3 text-accent" strokeWidth={1.8} />
            Interesting Facts
          </h4>
          {hotspotPart.facts.map((fact) => (
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

      <footer className="border-t border-line p-3">
        <button
          type="button"
          onClick={resetHotspot}
          className="flex h-9 w-full items-center justify-center gap-1.5 rounded-xl bg-accent text-[12px] font-semibold text-white transition-colors hover:bg-accent-bright"
        >
          <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.8} />
          Reset Camera
        </button>
      </footer>
    </aside>
  );
}

export function DetailPanel() {
  const hotspotActive = useExplorer((s) => s.hotspotActive);
  const selectedId = useExplorer((s) => s.selectedId);
  const tab = useExplorer((s) => s.tab);
  const setTab = useExplorer((s) => s.setTab);
  const component = getComponent(selectedId) ?? getComponent("cpu")!;

  if (hotspotActive) {
    return <HotspotContent />;
  }

  return (
    <aside className="flex h-full w-[376px] shrink-0 flex-col border-l border-line bg-surface">
      <header className="border-b border-line px-6 pb-5 pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="mt-1 font-mono text-[13px] font-medium tracking-tight text-accent">
              {component.index}
            </span>
            <div className="flex flex-col gap-1">
              <h2 className="text-[26px] font-semibold leading-none tracking-tight text-foreground">
                {component.name}
              </h2>
              <p className="text-[13px] text-muted">{component.tagline}</p>
            </div>
          </div>
        </div>
      </header>

      <TabBar tab={tab} onChange={(t: TabId) => setTab(t)} />

      <div className="thin-scroll flex-1 overflow-y-auto px-6 py-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <TabContent tab={tab} component={component as ComponentInfo} />
            <ModelCredits
              key={component.id}
              credit={component.credits}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </aside>
  );
}
