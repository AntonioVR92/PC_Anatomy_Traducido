"use client";

import { useMemo } from "react";
import { OrbitControls } from "@react-three/drei";
import type { FrameInfo } from "./Scene";

export function Controls({ autoRotate, frame }: { autoRotate: boolean; frame: FrameInfo | null }) {
  const limits = useMemo(() => {
    const base = frame ? Math.max(frame.radius, 0.4) : 1.2;
    return { min: base * 0.2, max: base * 5 };
  }, [frame]);

  return (
    <OrbitControls
      makeDefault
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      autoRotate={autoRotate}
      autoRotateSpeed={1.6}
      minDistance={limits.min}
      maxDistance={limits.max}
    />
  );
}
