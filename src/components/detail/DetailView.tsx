"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowLeft } from "lucide-react";
import { FALLBACK_MODEL, type ComponentInfo } from "@/lib/components";
import type { TabId } from "@/lib/store";
import { TabBar, TabContent } from "@/components/explorer/ComponentTabs";
import { ComponentIcon } from "@/components/icons";
import { ModelCredits } from "@/components/viewer/ModelCredits";
import { MotherboardViewer } from "@/components/motherboard/MotherboardViewer";

const ComponentViewer = dynamic(
  () =>
    import("@/components/viewer/ComponentViewer").then((m) => m.ComponentViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-line-strong border-t-accent" />
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
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-line-strong border-t-accent" />
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
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-line-strong border-t-accent" />
      </div>
    ),
  }
);

export function DetailView({ component }: { component: ComponentInfo }) {
  const [tab, setTab] = useState<TabId>("overview");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex items-center justify-between border-b border-line bg-surface px-6 py-4">
        <Link
          href="/"
          className="group flex items-center gap-2 text-[13px] font-medium text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          Back to Explorer
        </Link>
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Computer Anatomy logo"
            width={512}
            height={512}
            priority
            className="h-8 w-8 rounded-lg object-cover"
          />
          <span className="text-[14px] font-semibold tracking-tight">Computer Anatomy</span>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-5 p-6 xl:flex-row">
        {component.id === "motherboard" ? (
          <section className="min-h-[560px] flex-[3] overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_20px_60px_rgba(2,6,16,0.45)]">
            <MotherboardViewer mode="fullscreen" />
          </section>
        ) : component.id === "mouse" ? (
          <section className="min-h-[560px] flex-[3] overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_20px_60px_rgba(2,6,16,0.45)]">
            <MouseViewer mode="fullscreen" />
          </section>
        ) : component.id === "monitor" ? (
          <section className="min-h-[560px] flex-[3] overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_20px_60px_rgba(2,6,16,0.45)]">
            <MonitorViewer mode="fullscreen" />
          </section>
        ) : (
          <section className="min-h-[440px] flex-[3] overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_20px_60px_rgba(2,6,16,0.45)]">
            <ComponentViewer component={component.model ?? FALLBACK_MODEL} mode="fullscreen" />
          </section>
        )}

        <section className="flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-surface xl:max-w-[520px]">
          <div className="border-b border-line px-6 py-5">
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-2">
                <ComponentIcon name={component.icon} className="h-5 w-5 text-accent" />
              </span>
              <div className="flex flex-col gap-0.5">
                <h1 className="text-[22px] font-semibold leading-tight tracking-tight text-foreground">
                  {component.name}
                </h1>
                <p className="text-[12.5px] text-muted">{component.tagline}</p>
              </div>
              <span className="ml-auto font-mono text-[13px] font-medium text-accent">
                {component.index}
              </span>
            </div>
          </div>

          <TabBar tab={tab} onChange={setTab} />

          <div className="thin-scroll max-h-[520px] flex-1 overflow-y-auto px-6 py-5">
            <TabContent tab={tab} component={component} />
            <ModelCredits
              key={component.id}
              credit={component.credits}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
