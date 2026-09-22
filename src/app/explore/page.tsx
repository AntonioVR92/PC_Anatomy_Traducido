// The "Explore" page, shown at the /explore URL. It hosts the interactive 3D component explorer.

import type { Metadata } from "next";
import { Explorer } from "@/components/explorer/Explorer";
import { absoluteUrl } from "@/lib/site";

// Next.js metadata for this page (tab title + search engine description).
export const metadata: Metadata = {
  title: "Explora componentes de ordenador en 3D",
  description:
    "Explora componentes de hardware de ordenador en 3D interactivo. Rota, inspecciona y aprende sobre la CPU, GPU, RAM, placa base, almacenamiento, fuente de alimentación y más.",
  alternates: { canonical: absoluteUrl("/explore") },
  openGraph: {
    title: "Explora componentes de ordenador en 3D",
    description:
      "Explora componentes de hardware de ordenador en 3D interactivo. Rota, inspecciona y aprende sobre la CPU, GPU, RAM, placa base y más.",
    url: absoluteUrl("/explore"),
    type: "website",
    images: [
      {
        url: absoluteUrl("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "PC Anatomy — Explora el hardware de ordenador en 3D",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explora componentes de ordenador en 3D",
    description:
      "Explora componentes de hardware de ordenador en 3D interactivo.",
    images: [absoluteUrl("/og-image.png")],
  },
};

// The page component. It simply renders the Explorer UI.
export default function ExplorePage() {
  return <Explorer />;
}