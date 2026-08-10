"use client";

// This file is a client component (runs in the browser).

// Imports for dynamically loading 3D viewers on demand.
import dynamic from "next/dynamic";
import { ChevronLeft, ChevronRight } from "lucide-react";
// Helpers/utilities and global state store for the explorer.
import { FALLBACK_MODEL, getComponent } from "@/lib/components";
import { useExplorer } from "@/lib/store";

// Renders the prev/next hotspot navigation bar shown at the bottom of
// the viewer for components with numbered hotspots.
function HotspotHint({ label }: { label: string }) {
  // Pull the store actions that skip to the previous/next hotspot.
  const nextHotspot = useExplorer((s) => s.nextHotspot);
  const prevHotspot = useExplorer((s) => s.prevHotspot);

  return (
    <div className="absolute inset-x-0 bottom-[128px] z-20 flex items-center justify-center gap-2 lg:bottom-4">
      <button
        type="button"
        aria-label="Previous hotspot"
        onClick={prevHotspot}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface/80 text-muted backdrop-blur-sm transition-colors hover:border-accent/40 hover:text-foreground lg:h-9 lg:w-9"
      >
        <ChevronLeft className="h-5 w-5 lg:h-4 lg:w-4" strokeWidth={1.8} />
      </button>
      {/* Text label passed in from the parent explaining the hotspots. */}
      <span className="rounded-full border border-line bg-surface/70 px-3.5 py-2 text-[11.5px] text-muted backdrop-blur-sm lg:py-1.5">
        {label}
      </span>
      <button
        type="button"
        aria-label="Next hotspot"
        onClick={nextHotspot}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface/80 text-muted backdrop-blur-sm transition-colors hover:border-accent/40 hover:text-foreground lg:h-9 lg:w-9"
      >
        <ChevronRight className="h-5 w-5 lg:h-4 lg:w-4" strokeWidth={1.8} />
      </button>
    </div>
  );
}

// Each viewer is lazy-loaded (dynamic import) so the 3D code only loads
// when its model is actually shown. ssr:false keeps them client-only,
// and a loading spinner/text is shown while the model is downloading.
const ComponentViewer = dynamic(
  () =>
    import("@/components/viewer/ComponentViewer").then((m) => m.ComponentViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-line-strong border-t-accent" />
          <p className="text-[12px] text-muted-2">Loading interactive 3D model…</p>
        </div>
      </div>
    ),
  }
);

const MotherboardViewer = dynamic(
  () =>
    import("@/components/motherboard/MotherboardViewer").then(
      (m) => m.MotherboardViewer
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-line-strong border-t-accent" />
          <p className="text-[12px] text-muted-2">Loading interactive model…</p>
        </div>
      </div>
    ),
  }
);

const MouseViewer = dynamic(
  () => import("@/components/mouse/MouseViewer").then((m) => m.MouseViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-line-strong border-t-accent" />
          <p className="text-[12px] text-muted-2">Loading interactive model…</p>
        </div>
      </div>
    ),
  }
);

const SystemUnitViewer = dynamic(
  () =>
    import("@/components/systemunit/SystemUnitViewer").then(
      (m) => m.SystemUnitViewer
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-line-strong border-t-accent" />
          <p className="text-[12px] text-muted-2">Loading interactive model…</p>
        </div>
      </div>
    ),
  }
);

const MonitorViewer = dynamic(
  () => import("@/components/monitor/MonitorViewer").then((m) => m.MonitorViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-line-strong border-t-accent" />
          <p className="text-[12px] text-muted-2">Loading interactive model…</p>
        </div>
      </div>
    ),
  }
);

// Main viewer. Renders the 3D model for whichever component is selected
// in the explorer, choosing the right viewer + hotspot hint per component.
export function Viewer() {
  // Read the currently selected component id from the global store.
  const selectedId = useExplorer((s) => s.selectedId);
  // Resolve the model path for the selected component, falling back to a default.
  const path = getComponent(selectedId)?.model ?? FALLBACK_MODEL;

  // The system unit/case model uses its own dedicated viewer with hotspots.
  if (selectedId === "pc-case") {
    return (
      <div className="relative h-full w-full overflow-hidden">
        <SystemUnitViewer mode="embedded" />
        <HotspotHint label="Click a numbered hotspot to explore the system unit." />
      </div>
    );
  }

  // The motherboard model uses its own dedicated viewer with hotspots.
  if (selectedId === "motherboard") {
    return (
      <div className="relative h-full w-full overflow-hidden">
        <MotherboardViewer mode="embedded" />
        <HotspotHint label="Click a numbered hotspot to explore the motherboard." />
      </div>
    );
  }

  // The mouse model uses its own dedicated viewer with hotspots.
  if (selectedId === "mouse") {
    return (
      <div className="relative h-full w-full overflow-hidden">
        <MouseViewer mode="embedded" />
        <HotspotHint label="Click a numbered hotspot to explore the mouse." />
      </div>
    );
  }

  // The monitor model uses its own dedicated viewer with hotspots.
  if (selectedId === "monitor") {
    return (
      <div className="relative h-full w-full overflow-hidden">
        <MonitorViewer mode="embedded" />
        <HotspotHint label="Click a numbered hotspot to explore the monitor." />
      </div>
    );
  }

  // Default case: use the generic component viewer for any other selection.
  return (
    <div className="relative h-full w-full overflow-hidden">
      <ComponentViewer component={path} mode="embedded" />
      <div className="pointer-events-none absolute inset-x-0 bottom-[128px] z-20 flex justify-center lg:bottom-4">
        <span className="rounded-full border border-line bg-surface/70 px-3.5 py-2 text-[11.5px] text-muted backdrop-blur-sm lg:py-1.5">
          Select a component from the sidebar to explore it.
        </span>
      </div>
    </div>
  );
}
