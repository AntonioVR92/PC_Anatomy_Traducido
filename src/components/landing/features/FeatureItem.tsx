"use client";

import { motion } from "framer-motion";
import { EASE } from "@/components/landing/ui/primitives";

type FeatureItemProps = {
  index: number;
  title: string;
  description: string;
  active: boolean;
};

// FeatureItem: shows one feature's number, title, and description.
// When "active", the text animates in; otherwise it stays faded out.
export function FeatureItem({ index, title, description, active }: FeatureItemProps) {
  // Split the title into words so each can be animated separately
  const words = title.split(" ");

  return (
    <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 md:grid-cols-1 lg:px-0">
      <div>
        {/* Feature number */}
{/* Feature number, e.g. "Feature 01", fades in when active */}
        <motion.p
          initial={false}
          animate={{ opacity: active ? 1 : 0, y: active ? 0 : 14 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-[13px] font-semibold uppercase tracking-[0.28em] text-accent-bright"
        >
          Feature {String(index + 1).padStart(2, "0")}
        </motion.p>

        {/* Heading — word by word */}
        {/* Title, with each word sliding up in sequence when active */}
        <h2 className="mt-6 max-w-xl text-balance text-3xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-1 align-top">
              <motion.span
                initial={false}
                animate={{ opacity: active ? 1 : 0, y: active ? 0 : 28 }}
                transition={{ duration: 0.7, ease: EASE, delay: active ? 0.15 + i * 0.07 : 0 }}
                className="inline-block"
              >
                {word}
              </motion.span>
              {i < words.length - 1 && <span>&nbsp;</span>}
            </span>
          ))}
        </h2>

        {/* Description, fades in after the title */}
        <motion.p
          initial={false}
          animate={{ opacity: active ? 1 : 0, y: active ? 0 : 20 }}
          transition={{ duration: 0.7, ease: EASE, delay: active ? 0.45 : 0 }}
          className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted sm:text-lg"
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
}