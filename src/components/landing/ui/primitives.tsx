"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  type Variants,
} from "framer-motion";
import { cn } from "@/lib/utils";

// Common smooth easing curve used across landing animations
export const EASE = [0.22, 1, 0.36, 1] as const;

// Standard fade-up variants; accepts an index to stagger items
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.08 },
  }),
};

// Reveal: wraps children and fades them up the first time they scroll into view
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// MagneticButton: a button wrapper that gently pulls toward the cursor,
// then springs back to place when the mouse leaves.
export function MagneticButton({
  children,
  className,
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Cursor offset in pixels, smoothed by a spring
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.6 });

  // On mouse move, push the button toward the cursor from its center
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  // When the mouse leaves, snap the button back to the center
  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x: sx, y: sy }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}

// AnimatedCounter: counts from 0 to `to` when it scrolls into view,
// showing the animated number with optional prefix/suffix text.
export function AnimatedCounter({
  to,
  prefix = "",
  suffix = "",
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Only start counting once the number becomes visible
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const spring = useSpring(count, { stiffness: 70, damping: 24 });
  const displayed = useTransform(spring, (v) => String(Math.round(v)));

  // Kick off the animation when the element enters the viewport
  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [inView, to, count]);

  // Push each changing value into the DOM as text
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const unsub = displayed.on("change", (v) => {
      el.textContent = `${prefix}${v}${suffix}`;
    });
    return unsub;
  }, [displayed, prefix, suffix]);

  return (
    <span ref={ref} className={cn("font-mono tabular-nums", className)}>
      {/* Live number (updated by JS) */}
      <span aria-hidden="true">
        {prefix}
        {Math.round(count.get())}
        {suffix}
      </span>
      {/* Screen-reader friendly final value */}
      <span className="sr-only">
        {prefix}
        {to}
        {suffix}
      </span>
    </span>
  );
}
