// PC assembly guide: /assembly — currently a "coming soon" teaser page while
// the full step-by-step build guide is in the works. It is server-rendered and
// kept out of the index (noindex) since the content is placeholder-only.

import type { Metadata } from "next";
import Link from "next/link";
import { ComingSoonAnimation } from "@/components/assembly/ComingSoonAnimation";
import { WaitlistForm } from "@/components/assembly/WaitlistForm";
import { SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "PC Assembly — Coming Soon",
  description:
    "An interactive, step-by-step PC assembly experience is on the way — install components, connect cables, and build a PC from the ground up in 3D. Meanwhile, explore every component in the interactive 3D explorer.",
  alternates: { canonical: absoluteUrl("/assembly") },
  robots: { index: false, follow: true },
  openGraph: {
    title: "PC Assembly — Coming Soon",
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/assembly"),
    siteName: SITE_NAME,
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
    title: "PC Assembly Guide — Coming Soon",
    description: SITE_DESCRIPTION,
    images: [absoluteUrl("/og-image.png")],
  },
};

export default function AssemblyComingSoonPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-20 text-center">
      <ComingSoonAnimation />
      <h1 className="mt-8 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        PC Assembly Is Coming Soon
      </h1>
      <div className="mx-auto mt-5 max-w-2xl space-y-4 text-pretty text-[15px] leading-relaxed text-muted">
        <p>
          I&apos;m currently working on an interactive, step-by-step PC assembly
          experience. Soon, you&apos;ll be able to install components, connect
          cables, and build a PC from the ground up in 3D.
        </p>
        <p>
          While it&apos;s in development, explore every component in the
          interactive 3D explorer.
        </p>
      </div>
      <WaitlistForm />
      <Link
        href="/explore"
        className="group inline-flex items-center gap-1.5 mt-4 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:bg-surface-2"
      >
        Explore Components in 3D
      </Link>
    </main>
  );
}
