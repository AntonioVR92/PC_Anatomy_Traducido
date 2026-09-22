"use client";

// Global error boundary — shows a friendly message without exposing stack
// traces or internal implementation details. The page is marked noindex via
// metadata in the layout so temporary error pages are not indexed.

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error for debugging without displaying it to users.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-20 text-center">
      <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Algo salió mal
      </h1>
      <p className="mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-muted">
        Ha ocurrido un error inesperado al cargar esta página. Inténtalo de
        nuevo: si el problema continúa, recarga la página o vuelve más tarde.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-full border border-line bg-surface px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:bg-surface-2"
      >
        Reintentar
      </button>
    </div>
  );
}
