"use client";

import { useEffect, useState } from "react";

// useViewport: a small hook that tells components which device size
// they are being viewed on, reacting to window resizes.
export function useViewport() {
  // Starts assuming desktop until we measure the real width
  const [viewport, setViewport] = useState<"mobile" | "tablet" | "desktop">("desktop");

  // Runs once to set the initial value and keep it in sync on resize
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setViewport("mobile");
      else if (w < 1024) setViewport("tablet");
      else setViewport("desktop");
    };
    // Measure once at first load
    update();
    // Listen for future resizes
    window.addEventListener("resize", update);
    // Clean up the listener on unmount
    return () => window.removeEventListener("resize", update);
  }, []);

  return viewport;
}