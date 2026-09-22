"use client";

// This file is a client component (runs in the browser).
// The DetailPanel is the right-hand info column. When no hotspot is
// active it shows the selected component's tabs (overview, spec, etc.).
// When a hotspot is clicked it (HotspotContent) shows details about that
// specific part of the model.
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

// Panel shown when a hotspot on a model has been clicked. It displays
// all the educational info about that specific hotspot part.
function HotspotContent() {
  // Read hotspot state + the reset/close actions from the store.
  const hotspotPart = useExplorer((s) => s.hotspotPart);
  const hotspotIndex = useExplorer((s) => s.hotspotIndex);
  const hotspotTotal = useExplorer((s) => s.hotspotTotal);
  const selectedId = useExplorer((s) => s.selectedId);
  const resetHotspot = useExplorer((s) => s.resetHotspot);
  const closeHotspot = useExplorer((s) => s.closeHotspot);
  // Component for the selected id, defaulting to the CPU if none.
  const component = getComponent(selectedId) ?? getComponent("cpu")!;

  // Nothing to show if no hotspot part has been selected.
  if (!hotspotPart) return null;

  return (
    <aside className="flex h-full w-[376px] shrink-0 flex-col border-l border-line bg-surface">
      {/* Panel header with the hotspot title, position "x of y", and close. */}
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
                {hotspotIndex + 1} de {hotspotTotal} · {component.name}
              </p>
            </div>
          </div>
          {/* Dismisses the hotspot panel. */}
          <button
            type="button"
            aria-label="Cerrar panel"
            onClick={closeHotspot}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
          >
            <X className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>
      </header>

      {/* Scrollable educational content sections. */}
      <div className="thin-scroll flex-1 space-y-5 overflow-y-auto px-6 py-5">
        {/* Overview — general description of the part. */}
        <section className="space-y-1.5">
          <h4 className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-2">
            <Sparkles className="h-3 w-3 text-accent" strokeWidth={1.8} />
            Resumen
          </h4>
          <p className="text-[13px] leading-relaxed text-foreground/90">
            {hotspotPart.description}
          </p>
        </section>

        {/* Primary function — highlighted box. */}
        <section className="space-y-1.5 rounded-xl border border-line bg-surface-2/60 p-3.5">
          <h4 className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-accent">
            <MapPin className="h-3 w-3" strokeWidth={1.8} />
            Función principal
          </h4>
          <p className="text-[12.5px] leading-relaxed text-foreground/85">
            {hotspotPart.function}
          </p>
        </section>

        {/* Why it is important. */}
        <section className="space-y-1.5">
          <h4 className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-2">
            <Crosshair className="h-3 w-3 text-accent" strokeWidth={1.8} />
            Por qué es importante
          </h4>
          <p className="text-[12.5px] leading-relaxed text-foreground/85">
            {hotspotPart.importance}
          </p>
        </section>

        {/* Interesting facts — one card per fact. */}
        <section className="space-y-2">
          <h4 className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-2">
            <Lightbulb className="h-3 w-3 text-accent" strokeWidth={1.8} />
            Datos interesantes
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

      {/* Footer button to reset the 3D camera view. */}
      <footer className="border-t border-line p-3">
        <button
          type="button"
          onClick={resetHotspot}
          className="flex h-9 w-full items-center justify-center gap-1.5 rounded-xl bg-accent text-[12px] font-semibold text-white transition-colors hover:bg-accent-bright"
        >
          <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.8} />
          Resetear cámara
        </button>
      </footer>
    </aside>
  );
}

// Main exported panel shown for the selected component (no hotspot).
export function DetailPanel() {
  // Whether a hotspot is active decides what we render.
  const hotspotActive = useExplorer((s) => s.hotspotActive);
  const selectedId = useExplorer((s) => s.selectedId);
  // Current tab selection and the action to change it.
  const tab = useExplorer((s) => s.tab);
  const setTab = useExplorer((s) => s.setTab);
  // The component to show details for, defaulting to CPU.
  const component = getComponent(selectedId) ?? getComponent("cpu")!;

  // When a hotspot is active, show the hotspot info panel instead.
  if (hotspotActive) {
    return <HotspotContent />;
  }

  return (
    <aside className="flex h-full w-[376px] shrink-0 flex-col border-l border-line bg-surface">
      {/* Header with the component index, name, and tagline. */}
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

      {/* Tab switcher for the different info sections. */}
      <TabBar tab={tab} onChange={(t: TabId) => setTab(t)} />

      {/* Scrollable content with a subtle fade/slide animation between tabs. */}
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
            {/* Model credits shown for the current component. */}
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
