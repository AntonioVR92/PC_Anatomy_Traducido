// icons.tsx: Maps a component's icon name to a Lucide icon component and
// renders it. Every component (CPU, motherboard, etc.) has a
// matching icon here so the UI can display a small symbol for it.

import {
  BatteryCharging,
  Box,
  CircuitBoard,
  Cpu,
  Disc3,
  Fan,
  HardDrive,
  Keyboard,
  Layers,
  MemoryStick,
  Monitor,
  MousePointer2,
  Usb,
  Wind,
  Zap,
  type LucideIcon,
} from "lucide-react";

// Lookup table: icon name (string) -> the Lucide icon component for it.
const ICONS: Record<string, LucideIcon> = {
  Cpu,
  CircuitBoard,
  MemoryStick,
  Layers,
  HardDrive,
  Disc3,
  Zap,
  BatteryCharging,
  Fan,
  Wind,
  Box,
  Usb,
  Keyboard,
  MousePointer2,
  Monitor,
};

// Renders the icon for the given name; falls back to a CPU icon if unknown.
export function ComponentIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? Cpu;
  return <Icon className={className} strokeWidth={1.6} />;
}
