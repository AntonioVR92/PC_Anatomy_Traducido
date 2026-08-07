"use client";

// MobileDrawer.tsx: A slide-in drawer for tablet/mobile that replaces the
// permanent desktop sidebar. It renders the existing <Sidebar> (search,
// component list, selected state) inside an animated panel. The drawer
// closes when a component is selected, when the user taps the backdrop, or
// presses Escape. Hidden on lg+ where the sidebar is always visible.
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useExplorer } from "@/lib/store";

export function MobileDrawer({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const selectedId = useExplorer((s) => s.selectedId);
  // Track the previous selection so we can detect a *change* (not the mount).
  const prevSelected = useRef(selectedId);

  // Close the drawer the moment a component is picked from the list.
  useEffect(() => {
    if (open && prevSelected.current !== selectedId) {
      prevSelected.current = selectedId;
      onClose();
    } else {
      prevSelected.current = selectedId;
    }
  }, [selectedId, open, onClose]);

  // Close the drawer on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Dimmed backdrop; tapping it closes the drawer. */}
          <motion.button
            type="button"
            aria-label="Close components list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 h-full w-full bg-black/60 backdrop-blur-sm"
          />
          {/* The sliding panel holding the reused sidebar content. */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className="absolute inset-y-0 left-0 flex w-[min(300px,88vw)] overflow-hidden rounded-r-2xl border-r border-line bg-surface shadow-[16px_0_48px_rgba(0,0,0,0.5)]"
          >
            {children}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}