"use client";

// Full-screen loading overlay shown for a short moment when the /explore
// page opens. It sits above the whole explorer UI, plays a quick fade-in
// with a spinner + "Preparing workspace" label, then fades out and unmounts.
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function ExploreLoader() {
  // Whether the overlay is still mounted. We hide it after a short delay,
  // then let AnimatePresence unmount it once the exit animation finishes.
  const [visible, setVisible] = useState(true);

  // Start hiding the loader shortly after the page has mounted/loaded.
  useEffect(() => {
    const t = window.setTimeout(() => setVisible(false), 900);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="explore-loader"
          // Fade the whole overlay in and out.
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-background text-foreground"
        >
          {/* The brand logo, gently bobbing up and down. */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="relative"
          >
            <Image
              src="/logo.png"
              alt="Computer Anatomy logo"
              width={64}
              height={64}
              className="h-16 w-16 rounded-xl"
            />
            {/* Soft glow behind the logo. */}
            <div className="absolute inset-0 -z-10 rounded-full bg-accent/25 blur-2xl" />
          </motion.div>

          {/* A thin spinning ring to indicate ongoing loading. */}
          <div className="mt-1 h-8 w-8 rounded-full border-2 border-line-strong border-t-accent animate-spin" />

          {/* Label + animated dots. */}
          <p className="text-sm text-muted">
            Preparing workspace
            <span className="animate-pulse">…</span>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}