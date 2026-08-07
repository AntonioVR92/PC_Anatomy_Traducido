"use client";

// Controls.tsx: Sets up mouse orbit controls for the 3D view. The user can
// drag to rotate and zoom around the model, and optionally the camera
// auto-rotates on its own. Zoom distance is limited to what's sensible
// for the size of the current model.

import { useMemo } from "react";
import { OrbitControls } from "@react-three/drei";
import type { FrameInfo } from "./Scene";

export function Controls({ autoRotate, frame }: { autoRotate: boolean; frame: FrameInfo | null }) {
  // Compute the allowed zoom range based on the current model's size.
  const limits = useMemo(() => {
    // Use the model radius (or a fallback if no model yet) as the base zoom unit.
    const base = frame ? Math.max(frame.radius, 0.4) : 1.2;
    // You can zoom in to 20% or out to 500% of that base distance.
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
