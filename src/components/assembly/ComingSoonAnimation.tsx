"use client";

// Client wrapper around the "coming soon" Lottie animation so the page can
// stay a server component (metadata + SSR) while the animation runs in the
// browser. The animation file is self-hosted under /animations.
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function ComingSoonAnimation({ className }: { className?: string }) {
  return (
    <div className={`${className ?? "h-80 w-80 sm:h-[30rem] sm:w-[30rem]"}`}>
      <DotLottieReact
        src="/animations/assembly-coming-soon.lottie"
        loop
        autoplay
        className="h-full w-full"
      />
    </div>
  );
}
