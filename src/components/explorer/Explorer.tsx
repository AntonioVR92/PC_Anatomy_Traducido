"use client";

import { Sidebar } from "./Sidebar";
import { Viewer } from "./Viewer";
import { DetailPanel } from "./DetailPanel";

export function Explorer() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      <Sidebar />
      <main className="relative flex min-w-0 flex-1 flex-col">
        <Viewer />
      </main>
      <DetailPanel />
    </div>
  );
}
