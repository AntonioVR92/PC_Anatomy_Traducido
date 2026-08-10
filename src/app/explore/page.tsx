// The "Explore" page, shown at the /explore URL. It hosts the interactive 3D component explorer.

import type { Metadata } from "next";
import { Explorer } from "@/components/explorer/Explorer";
import { absoluteUrl } from "@/lib/site";

// Next.js metadata for this page (tab title + search engine description).
export const metadata: Metadata = {
  title: "Explore Computer Components in 3D",
  description:
    "Explore computer hardware components in interactive 3D. Rotate, inspect and learn about the CPU, GPU, RAM, motherboard, storage, power supply, and more.",
  alternates: { canonical: absoluteUrl("/explore") },
  openGraph: {
    title: "Explore Computer Components in 3D",
    description:
      "Explore computer hardware components in interactive 3D. Rotate, inspect and learn about the CPU, GPU, RAM, motherboard, and more.",
    url: absoluteUrl("/explore"),
    type: "website",
    images: [
      {
        url: absoluteUrl("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "PC Anatomy — Explore Computer Hardware in 3D",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Computer Components in 3D",
    description:
      "Explore computer hardware components in interactive 3D.",
    images: [absoluteUrl("/og-image.png")],
  },
};

// The page component. It simply renders the Explorer UI.
export default function ExplorePage() {
  return <Explorer />;
}