"use client";

// This file is a client component (runs in the browser).
// The Sidebar shows the list of hardware components on the left side,
// with a search box, a logo header, and a hint footer. Clicking a
// component selects it so the Viewer can display its 3D model.
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronRight, Search, Sparkles, X } from "lucide-react";
// COMPONENTS holds the master list of hardware components.
import { COMPONENTS } from "@/lib/components";
// Global explorer store: selectedId + the select action.
import { useExplorer } from "@/lib/store";
import { ComponentIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export function Sidebar() {
  // Local state for the search input text.
  const [query, setQuery] = useState("");
  // Ref to the search input so keyboard shortcuts can focus/clear it.
  const searchRef = useRef<HTMLInputElement>(null);
  // Read the currently selected component id from the store.
  const selectedId = useExplorer((s) => s.selectedId);
  // Action from the store to select a component.
  const select = useExplorer((s) => s.select);

  // Lowercase/trimmed version of the query used for filtering.
  const q = query.trim().toLowerCase();
  // Filter the component list by name, tagline, or index matching the query.
  const filtered = COMPONENTS.filter((c) =>
    `${c.name} ${c.tagline} ${c.index}`.toLowerCase().includes(q)
  );

  // Set up a global keyboard shortcut: "/" focuses the search box and
  // Escape clears/blurs it. Cleanup removes the listener on unmount.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName ?? "").toLowerCase();
      if (e.key === "/" && tag !== "input" && tag !== "textarea") {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === searchRef.current) {
        setQuery("");
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    // The fixed-width left column of the explorer.
    <aside className="flex h-full w-full flex-col border-r border-line bg-surface">
      {/* Header: subtle glow, logo image, app name/subtitle, and version badge. */}
      <div className="relative overflow-hidden px-5 pb-5 pt-6">
        <div
          className="pointer-events-none absolute inset-x-0 -top-10 h-28 opacity-80"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 0%, rgba(77,141,255,0.16), transparent 70%)",
          }}
        />
        <div className="relative flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="absolute -inset-1 rounded-2xl bg-accent/25 blur-md" />
            <Image
              src="/logo.png"
              alt="Computer Anatomy logo"
              width={512}
              height={512}
              priority
              className="relative h-10 w-10 rounded-xl object-cover"
            />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="text-[15px] font-semibold leading-tight tracking-tight text-foreground">
              Computer Anatomy
            </span>
            <span className="truncate text-[11px] leading-tight text-muted-2">
              Learn Computer Hardware Interactively
            </span>
          </div>
          <span className="ml-auto shrink-0 rounded-full border border-line bg-surface-2 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-2">
            v0.1
          </span>
        </div>
      </div>

      {/* Search box: magnifying-glass icon, input, and a clear/x button
          (or the "/" shortcut hint when the input is empty). */}
      <div className="px-4 pb-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-2" />
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search components…"
            className="h-10 w-full rounded-xl border border-line bg-surface-2 pl-9 pr-9 text-[13px] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] outline-none transition-all placeholder:text-muted-2 focus:border-accent/50 focus:bg-surface-2/80 focus:shadow-[0_0_0_3px_rgba(77,141,255,0.12)]"
          />
          {/* Show a clear button when there is text, otherwise show the "/" hint. */}
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-muted-2 transition-colors hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : (
            <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-line bg-surface-3 px-1.5 py-0.5 font-mono text-[10px] leading-none text-muted-2">
              /
            </kbd>
          )}
        </div>
      </div>

      {/* Scrollable list of components filtered by the search query. */}
      <nav className="thin-scroll flex-1 space-y-0.5 overflow-y-auto px-3 pb-6">
        {/* Small section label with a live count of filtered items. */}
        <div className="flex items-center justify-between px-2 pb-2 pt-1">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-2">
            Components
          </p>
          <span className="rounded-full border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] leading-none text-muted-2">
            {filtered.length}
          </span>
        </div>
        {/* Render one button per matching component. */}
        {filtered.map((c) => {
          // True when this component is the currently selected one.
          const active = c.id === selectedId;
          return (
            <button
              key={c.id}
              type="button"
              // Clicking a row selects it in the store.
              onClick={() => select(c.id)}
              className={cn(
                "group relative flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition-all duration-200",
                active
                  ? "bg-linear-to-r from-accent-soft via-accent-soft/40 to-transparent text-foreground"
                  : "text-muted hover:bg-white/[0.035] hover:text-foreground"
              )}
            >
              {/* A left accent bar shows the selection on the active row. */}
              {active && (
                <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full bg-accent shadow-[0_0_8px_rgba(77,141,255,0.8)]" />
              )}
              {/* Icon tile for the component; highlighted when active. */}
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-200",
                  active
                    ? "border-accent/30 bg-surface-3 text-accent shadow-[0_0_12px_rgba(77,141,255,0.18)]"
                    : "border-line bg-surface-2 text-muted group-hover:border-line-strong group-hover:text-foreground"
                )}
              >
                <ComponentIcon name={c.icon} className="h-4 w-4" />
              </span>
              {/* Text: index number, name, and short tagline. */}
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="flex items-baseline gap-2">
                  <span className="shrink-0 font-mono text-[10px] font-medium text-accent/70">
                    {c.index}
                  </span>
                  <span className="truncate text-[13px] font-medium leading-tight">
                    {c.name}
                  </span>
                </span>
                <span className="truncate text-[11px] leading-tight text-muted-2 group-hover:text-muted">
                  {c.tagline}
                </span>
              </span>
              {/* Chevron hint that appears on hover. */}
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-2 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </button>
          );
        })}
        {/* Empty state shown when the search matches nothing. */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-2.5 px-2 pt-8 text-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface-2 text-muted-2">
              <Search className="h-4 w-4" />
            </span>
            <p className="text-[12.5px] text-muted">No components match “{query}”.</p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-[12px] font-medium text-accent transition-colors hover:text-accent-bright"
            >
              Clear search
            </button>
          </div>
        )}
      </nav>

      {/* Footer hint box explaining the 3D explorer feature. */}
      <div className="border-t border-line px-4 py-4">
        <div className="rounded-xl border border-line bg-linear-to-b from-surface-2 to-surface p-3.5">
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-accent/25 bg-accent-soft text-accent">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <div className="flex min-w-0 flex-col gap-1">
              <p className="text-[11px] leading-relaxed text-muted">
                <span className="font-medium text-foreground">Explore in 3D:</span>{" "}
                select a component to frame it in the interactive viewer.
              </p>
              <p className="font-mono text-[10px] text-muted-2">
                {COMPONENTS.length} components · 3D interactive
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
