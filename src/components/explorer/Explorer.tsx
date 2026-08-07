"use client";

// This file is a client component (runs in the browser).
// The Explorer is the main layout of the interactive hardware learning
// page. It combines the component list (Sidebar), the 3D preview
// (Viewer), and the extra details (DetailPanel) side by side.
import { Sidebar } from "./Sidebar";
import { Viewer } from "./Viewer";
import { DetailPanel } from "./DetailPanel";
import { ExploreLoader } from "./ExploreLoader";

export function Explorer() {
  return (
    // Full-screen flex layout: sidebar on the left, viewer in the middle,
    // detail panel on the right. The loader overlays everything on open.
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      <Sidebar />
      <main className="relative flex min-w-0 flex-1 flex-col">
        <Viewer />
      </main>
      <DetailPanel />
      <ExploreLoader />
    </div>
  );
}
