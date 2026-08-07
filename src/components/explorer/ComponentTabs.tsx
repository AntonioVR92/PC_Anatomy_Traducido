"use client";

// This file is a client component (runs in the browser).
// These components provide the tabbed info view in the DetailPanel:
// a TabBar with the tab selector plus TabContent that renders the
// Overview / Functions / Common Issues sections for a component.
import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  CircleDot,
  Info,
  Lightbulb,
  TriangleAlert,
} from "lucide-react";
import type { ComponentInfo } from "@/lib/components";
import type { TabId } from "@/lib/store";
import { cn } from "@/lib/utils";

// Definitions of the available tabs: id and displayed label.
export const TAB_DEFS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "functions", label: "Functions" },
  { id: "issues", label: "Common Issues" },
];

// Horizontal selector row showing the tab buttons.
export function TabBar({
  tab,
  onChange,
}: {
  tab: TabId; // currently active tab id
  onChange: (tab: TabId) => void; // callback fired when a tab is clicked
}) {
  // Track which tab is hovered so we can show a hover indicator.
  const [hoverTab, setHoverTab] = useState<TabId | null>(null);
  return (
    <div className="flex gap-1 border-b border-line px-4 pt-3">
      {TAB_DEFS.map((t) => {
        // True when this tab is the currently active one.
        const active = tab === t.id;
        return (
          <button
            key={t.id}
            onMouseEnter={() => setHoverTab(t.id)}
            onMouseLeave={() => setHoverTab(null)}
            onClick={() => onChange(t.id)}
            className={cn(
              "relative flex-1 rounded-md px-2 pb-2.5 pt-1.5 text-[12px] font-medium transition-colors duration-200",
              active ? "text-foreground" : "text-muted-2 hover:text-muted"
            )}
          >
            <span className="relative z-10">{t.label}</span>
            {/* Animated underline indicator on the active tab. */}
            {active && (
              <motion.span
                layoutId="detail-tab"
                className="absolute inset-x-1 -bottom-px h-[2px] rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
            {/* Muted underline on hover for inactive tabs. */}
            {hoverTab === t.id && !active && (
              <span className="absolute inset-x-1 -bottom-px h-[2px] rounded-full bg-line-strong" />
            )}
          </button>
        );
      })}
    </div>
  );
}

// Selects which tab content component to render based on the current tab.
export function TabContent({
  tab,
  component,
}: {
  tab: TabId; // which info section to show
  component: ComponentInfo; // the component being described
}) {
  if (tab === "overview") return <OverviewTab component={component} />;
  if (tab === "functions") return <FunctionsTab component={component} />;
  return <IssuesTab component={component} />;
}

// Reusable uppercase title/label style used by the tab content sections.
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-2">
      {children}
    </h3>
  );
}

// Overview tab: description, real-world usage, and a highlighted fact.
function OverviewTab({ component }: { component: ComponentInfo }) {
  return (
    <div className="space-y-5">
      <p className="text-[13.5px] leading-relaxed text-muted">{component.overview.description}</p>

      <div>
        <SectionTitle>Real-World Usage</SectionTitle>
        <p className="text-[13px] leading-relaxed text-foreground/90">
          {component.overview.realWorld}
        </p>
      </div>

      {/* Accent box for the interesting fact. */}
      <div className="rounded-xl border border-accent/25 bg-accent-soft p-4">
        <div className="mb-1.5 flex items-center gap-2">
          <Lightbulb className="h-3.5 w-3.5 text-accent" strokeWidth={1.8} />
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
            Interesting Fact
          </span>
        </div>
        <p className="text-[12.5px] leading-relaxed text-foreground/85">
          {component.overview.fact}
        </p>
      </div>
    </div>
  );
}

// Functions tab: list the component's responsibilities in checklist form.
function FunctionsTab({ component }: { component: ComponentInfo }) {
  return (
    <div className="space-y-2.5">
      <SectionTitle>
        <CircleDot className="h-3 w-3" />
        Responsibilities Inside a Computer
      </SectionTitle>
      {component.functions.map((fn) => (
        <div
          key={fn}
          className="flex items-start gap-3 rounded-xl border border-line bg-surface-2/50 px-4 py-3"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.7} />
          <span className="text-[13px] leading-relaxed text-foreground/90">{fn}</span>
        </div>
      ))}
      <p className="pt-2 text-[11.5px] text-muted-2">
        Works alongside every other part — the motherboard routes its signals, RAM feeds
        it data, and the PSU keeps it powered.
      </p>
    </div>
  );
}

// Common issues tab: list failure modes plus a closing maintenance note.
function IssuesTab({ component }: { component: ComponentInfo }) {
  return (
    <div className="space-y-2.5">
      <SectionTitle>
        <TriangleAlert className="h-3 w-3" />
        What Usually Goes Wrong
      </SectionTitle>
      {component.issues.map((issue) => (
        <div
          key={issue}
          className="flex items-start gap-3 rounded-xl border border-line bg-surface-2/50 px-4 py-3"
        >
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-400/90" strokeWidth={1.7} />
          <span className="text-[13px] leading-relaxed text-foreground/90">{issue}</span>
        </div>
      ))}
      {/* Closing information note. */}
      <div className="flex items-start gap-2.5 rounded-xl border border-line-strong bg-surface-2 px-4 py-3">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-2" strokeWidth={1.8} />
        <p className="text-[11.5px] leading-relaxed text-muted">
          Understanding these failure modes helps you diagnose, maintain, and upgrade
          hardware with confidence.
        </p>
      </div>
    </div>
  );
}
