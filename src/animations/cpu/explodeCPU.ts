import gsap from "gsap";
import * as THREE from "three";

// One CPU layer that will be moved or faded during the animation.
export type LayerEntry = {
  object: THREE.Object3D; // The 3D object representing this layer.
  fromY: number; // Starting Y position (its assembled spot).
  toY: number; // Target Y position (its exploded spot).
  material?: THREE.Material | null; // Optional material to fade.
  fadeTo?: number; // If set, fade the material to this opacity.
};

// Move the CPU layers apart from each other, top-first, and fade them in.
export function explodeCPU(
  entries: LayerEntry[],
  { duration = 2.4, stagger = 0.1 }: { duration?: number; stagger?: number } = {}
): gsap.core.Timeline {
  const tl = gsap.timeline();
  entries.forEach((entry, i) => {
    // Each layer starts slightly after the previous one for a cascading effect.
    const delay = i * stagger;
    // Move the layer up to its exploded position.
    tl.to(
      entry.object.position,
      { y: entry.toY, duration, ease: "power2.inOut" },
      delay
    );
    // If we should fade this layer, fade it in partway through its move.
    if (entry.fadeTo !== undefined && entry.material) {
      tl.fromTo(
        entry.material,
        { opacity: 0 },
        { opacity: entry.fadeTo, duration: Math.min(0.9, duration * 0.4), ease: "power1.out" },
        delay + duration * 0.35
      );
    }
  });
  return tl;
}

// Move every CPU layer back to its original assembled spot and fade them out.
export function assembleCPU(
  entries: LayerEntry[],
  { duration = 2.0, stagger = 0.06 }: { duration?: number; stagger?: number } = {}
): gsap.core.Timeline {
  const tl = gsap.timeline();
  entries.forEach((entry, i) => {
    // Bring layers back in reverse order (last one first) for a stacking effect.
    const delay = (entries.length - 1 - i) * stagger;
    // Move the layer back down to its assembled position.
    tl.to(
      entry.object.position,
      { y: entry.fromY, duration, ease: "power3.inOut" },
      delay
    );
    // If we faded this layer, fade it back out during the return.
    if (entry.fadeTo !== undefined && entry.material) {
      tl.to(entry.material, { opacity: 0, duration: Math.min(0.7, duration * 0.35), ease: "power1.in" }, delay + duration * 0.5);
    }
  });
  return tl;
}
