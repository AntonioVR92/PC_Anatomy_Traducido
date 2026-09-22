// PC assembly guide: /assembly — currently a "coming soon" teaser page while
// the full step-by-step build guide is in the works. It is server-rendered and
// kept out of the index (noindex) since the content is placeholder-only.

import type { Metadata } from "next";
import Link from "next/link";
import { ComingSoonAnimation } from "@/components/assembly/ComingSoonAnimation";
import { WaitlistForm } from "@/components/assembly/WaitlistForm";
import { SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Montaje de PC — Próximamente",
  description:
    "Una experiencia interactiva de montaje de PC paso a paso está en camino: instala componentes, conecta cables y construye un PC desde cero en 3D. Mientras tanto, explora cada componente en el explorador 3D interactivo.",
  alternates: { canonical: absoluteUrl("/assembly") },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Montaje de PC — Próximamente",
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/assembly"),
    siteName: SITE_NAME,
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
    title: "Guía de montaje de PC — Próximamente",
    description: SITE_DESCRIPTION,
    images: [absoluteUrl("/og-image.png")],
  },
};

export default function AssemblyComingSoonPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-20 text-center">
      <ComingSoonAnimation />
      <h1 className="mt-8 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        El montaje de PC llega pronto
      </h1>
      <div className="mx-auto mt-5 max-w-2xl space-y-4 text-pretty text-[15px] leading-relaxed text-muted">
        <p>
          Estoy trabajando en una experiencia interactiva de montaje de PC
          paso a paso. Pronto podrás instalar componentes, conectar
          cables y construir un PC desde cero en 3D.
        </p>
        <p>
          Mientras está en desarrollo, explora cada componente en el
          explorador 3D interactivo.
        </p>
      </div>
      <WaitlistForm />
      <Link
        href="/explore"
        className="group inline-flex items-center gap-1.5 mt-4 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:bg-surface-2"
      >
        Explorar componentes en 3D
      </Link>
    </main>
  );
}
