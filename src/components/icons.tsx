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

export function ComponentIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? Cpu;
  return <Icon className={className} strokeWidth={1.6} />;
}
