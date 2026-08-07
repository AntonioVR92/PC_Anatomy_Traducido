"use client";

type FeatureProgressProps = {
  total: number;
  active: number;
};

// FeatureProgress: a vertical number list on the right of the features
// section. Each dot highlights to show which feature is currently in view.
export function FeatureProgress({ total, active }: FeatureProgressProps) {
  return (
    <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-2 md:flex lg:right-10">
      {/* One numbered step per feature */}
      {Array.from({ length: total }).map((_, i) => {
        // Highlight the current step, dim ones already passed, grey the rest
        const isActive = i === active;
        const isPast = i < active;
        return (
          <div key={i} className="flex flex-col items-center">
            <span
              className={`font-mono text-[11px] tracking-widest transition-colors duration-500 ${
                isActive ? "text-accent-bright" : isPast ? "text-neutral-500" : "text-neutral-600"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            {/* The little dot below the number */}
            <span
              className={`mt-2 h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                isActive
                  ? "bg-accent-bright shadow-[0_0_12px_rgba(77,141,255,0.9)]"
                  : isPast
                    ? "bg-neutral-500"
                    : "bg-neutral-700"
              }`}
            />
            {/* Connector line between steps (except after the last) */}
            {i < total - 1 && <span className="my-2 h-8 w-px bg-neutral-700/60" />}
          </div>
        );
      })}
    </div>
  );
}