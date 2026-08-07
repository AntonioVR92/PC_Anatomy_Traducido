// The "Explore" page, shown at the /explore URL. It hosts the interactive 3D component explorer.

import type { Metadata } from "next";
import { Explorer } from "@/components/explorer/Explorer";

// Next.js metadata for this page (tab title + search engine description).
export const metadata: Metadata = {
  title: "Explore Components — Computer Anatomy",
  description:
    "Explore computer hardware components in interactive 3D. Rotate, inspect and learn about the CPU, GPU, RAM, motherboard and more.",
};

// The page component. It simply renders the Explorer UI.
export default function ExplorePage() {
  return <Explorer />;
}