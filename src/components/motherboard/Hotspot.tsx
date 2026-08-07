"use client";

// Hotspot.tsx: A clickable marker placed in 3D space above a part of the
// motherboard. It uses an HTML overlay (drei's <Html>) so it can show styled
// text that always faces the screen, and clicking it selects that part.

import type { Vector3 } from "three";
import { Html } from "@react-three/drei";
import { cn } from "@/lib/utils";

export function Hotspot({
  position,
  index,
  label,
  active,
  hidden,
  onSelect,
}: {
  position: Vector3;
  index: number;
  label: string;
  active: boolean;
  hidden: boolean;
  onSelect: () => void;
}) {
  return (
    // Anchor the HTML button to a position in 3D space.
    <Html
      position={position}
      center
      zIndexRange={[20, 0]}
      style={{
        // Fade the hotspot out while the camera is flying to a part.
        opacity: hidden ? 0 : 1,
        transition: "opacity 0.3s ease",
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      {/* The clickable hotspot button with a ring, number, and label. */}
      <button
        type="button"
        className={cn("mobo-hotspot", active && "is-active")}
        onClick={onSelect}
        aria-label={label}
      >
        <span className="mobo-hotspot__ring" />
        <span className="mobo-hotspot__num">{index}</span>
        <span className="mobo-hotspot__label">{label}</span>
      </button>
    </Html>
  );
}
