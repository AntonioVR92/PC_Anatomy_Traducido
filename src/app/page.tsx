// The home page of the site. It shows the opening / landing view.

import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, absoluteUrl } from "@/lib/site";

// Metadata is special Next.js information (title, description) used by the browser tab and search engines.
export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: absoluteUrl("/") },
  keywords: [
    "anatomía del PC",
    "PC anatomy",
    "componentes de ordenador",
    "piezas de PC",
    "componentes de PC",
    "hardware de ordenador",
    "montaje de PC",
    "armar un PC",
    "aprender hardware",
  ],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: absoluteUrl("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "PC Anatomy — Explora el hardware del PC en 3D",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [absoluteUrl("/og-image.png")],
  },
};

// This is the main component Next.js renders for the "/" URL. It just displays the LandingPage.
// (Global structured data — WebSite, Organization, EducationalApplication — lives in layout.tsx.)
export default function Home() {
  return <LandingPage />;
}
