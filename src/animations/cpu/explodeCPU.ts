import gsap from "gsap";
import * as THREE from "three";

export type LayerEntry = {
  object: THREE.Object3D;
  fromY: number;
  toY: number;
  material?: THREE.Material | null;
  fadeTo?: number;
};

export function explodeCPU(
  entries: LayerEntry[],
  { duration = 2.4, stagger = 0.1 }: { duration?: number; stagger?: number } = {}
): gsap.core.Timeline {
  const tl = gsap.timeline();
  entries.forEach((entry, i) => {
    const delay = i * stagger;
    tl.to(
      entry.object.position,
      { y: entry.toY, duration, ease: "power2.inOut" },
      delay
    );
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

export function assembleCPU(
  entries: LayerEntry[],
  { duration = 2.0, stagger = 0.06 }: { duration?: number; stagger?: number } = {}
): gsap.core.Timeline {
  const tl = gsap.timeline();
  entries.forEach((entry, i) => {
    const delay = (entries.length - 1 - i) * stagger;
    tl.to(
      entry.object.position,
      { y: entry.fromY, duration, ease: "power3.inOut" },
      delay
    );
    if (entry.fadeTo !== undefined && entry.material) {
      tl.to(entry.material, { opacity: 0, duration: Math.min(0.7, duration * 0.35), ease: "power1.in" }, delay + duration * 0.5);
    }
  });
  return tl;
}
