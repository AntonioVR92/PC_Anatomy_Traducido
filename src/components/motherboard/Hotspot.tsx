"use client";

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
    <Html
      position={position}
      center
      zIndexRange={[20, 0]}
      style={{
        opacity: hidden ? 0 : 1,
        transition: "opacity 0.3s ease",
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
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
