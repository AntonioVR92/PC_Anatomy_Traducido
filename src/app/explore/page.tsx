import type { Metadata } from "next";
import { Explorer } from "@/components/explorer/Explorer";

export const metadata: Metadata = {
  title: "Explore Components — Computer Anatomy",
  description:
    "Explore computer hardware components in interactive 3D. Rotate, inspect and learn about the CPU, GPU, RAM, motherboard and more.",
};

export default function ExplorePage() {
  return <Explorer />;
}