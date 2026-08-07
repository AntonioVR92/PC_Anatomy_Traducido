"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  explodeCPU,
  assembleCPU,
  type LayerEntry,
} from "@/animations/cpu/explodeCPU";

// The different states a CPU animation can be in.
export type CPUPhase =
  | "idle"
  | "flying"
  | "exploding"
  | "exploded"
  | "assembling"
  | "assembled";

// Hook that runs and tracks the CPU explode / assemble animations.
export function useCPUAnimation(entries: LayerEntry[]) {
  // The currently active GSAP timeline (null when none is running).
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  // What stage of the animation we're currently in.
  const [phase, setPhase] = useState<CPUPhase>("idle");

  // Stop any running animation and forget about it.
  const kill = useCallback(() => {
    timelineRef.current?.kill();
    timelineRef.current = null;
  }, []);

  // Play the explode animation, then mark the phase as "exploded" when done.
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

  // Play the assemble animation, then mark the phase as "assembled" when done.
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

  // Clean up any running animation when the component using this hook unmounts.
  useEffect(() => {
    return () => kill();
  }, [kill]);

  return { phase, setPhase, runExplode, runAssemble, kill };
}
