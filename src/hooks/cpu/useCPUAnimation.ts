"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  explodeCPU,
  assembleCPU,
  type LayerEntry,
} from "@/animations/cpu/explodeCPU";

export type CPUPhase =
  | "idle"
  | "flying"
  | "exploding"
  | "exploded"
  | "assembling"
  | "assembled";

export function useCPUAnimation(entries: LayerEntry[]) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [phase, setPhase] = useState<CPUPhase>("idle");

  const kill = useCallback(() => {
    timelineRef.current?.kill();
    timelineRef.current = null;
  }, []);

  const runExplode = useCallback(
    (opts?: { duration?: number; stagger?: number }) => {
      kill();
      setPhase("exploding");
      const tl = explodeCPU(entries, opts);
      timelineRef.current = tl;
      tl.eventCallback("onComplete", () => setPhase("exploded"));
    },
    [entries, kill]
  );

  const runAssemble = useCallback(
    (opts?: { duration?: number; stagger?: number }) => {
      kill();
      setPhase("assembling");
      const tl = assembleCPU(entries, opts);
      timelineRef.current = tl;
      tl.eventCallback("onComplete", () => setPhase("assembled"));
    },
    [entries, kill]
  );

  useEffect(() => {
    return () => kill();
  }, [kill]);

  return { phase, setPhase, runExplode, runAssemble, kill };
}
