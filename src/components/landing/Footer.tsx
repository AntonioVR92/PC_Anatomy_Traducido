"use client";

import { Heart } from "lucide-react";
import { UPSTREAM_GITHUB_URL } from "@/lib/site";

// Footer: the page ending. Shows the copyright line, a small "made with
// love" message, and a credit for the open-source keyboard model.
export function Footer() {
  return (
    <footer className="relative border-t border-line px-6 pb-10 pt-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />
      {/* Copyright and license info, plus the friendly tagline */}
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-[13px] text-muted-2">
          © {new Date().getFullYear()} PC Anatomy. Hecho en abierto bajo licencia MIT.
        </p>
        <p className="flex items-center gap-1.5 text-[13px] text-muted-2">
          Hecho con
          <Heart className="h-3.5 w-3.5 fill-accent text-accent" strokeWidth={1.6} />
          para mentes curiosas
        </p>
      </div>

      {/* Educational use + MIT attribution for the Spanish fork */}
      <p className="mx-auto mt-6 max-w-3xl text-center text-[12px] leading-relaxed text-muted-2">
        Uso educativo — versión en español para enseñar las partes de un PC.
        Basado en{" "}
        <a
          href={UPSTREAM_GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="text-muted underline decoration-line underline-offset-2 transition-colors hover:text-foreground"
        >
          PC Anatomy
        </a>{" "}
        de brickshow, publicado bajo{" "}
        <a
          href="https://opensource.org/licenses/MIT"
          target="_blank"
          rel="noreferrer"
          className="text-muted underline decoration-line underline-offset-2 transition-colors hover:text-foreground"
        >
          licencia MIT
        </a>
        .
      </p>

      {/* Attribution required by the keyboard model's Creative Commons license */}
      <p className="mt-8 text-center text-[12px] leading-relaxed text-muted-2">
        &ldquo;Keyboard&rdquo;
        <a
          href="https://skfb.ly/oCTyv"
          target="_blank"
          rel="noreferrer"
          className="text-muted underline decoration-line underline-offset-2 transition-colors hover:text-foreground"
        >
          (https://skfb.ly/oCTyv)
        </a>
        {" "}de Umut Calim está licenciado bajo Creative Commons Attribution (
        <a
          href="http://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noreferrer"
          className="text-muted underline decoration-line underline-offset-2 transition-colors hover:text-foreground"
        >
          http://creativecommons.org/licenses/by/4.0/
        </a>
        ).
      </p>
    </footer>
  );
}
