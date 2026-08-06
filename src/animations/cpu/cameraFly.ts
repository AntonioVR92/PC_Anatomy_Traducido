import * as THREE from "three";
import gsap from "gsap";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { focusDistance } from "@/utils/focusCamera";

export type FlyTarget = {
  center: THREE.Vector3;
  radius: number;
  direction: THREE.Vector3;
};

export type CameraFlight = {
  promise: Promise<void>;
  kill: () => void;
};

/**
 * Smoothly flies the camera to frame a target using GSAP.
 * OrbitControls are temporarily disabled for the duration of the flight and
 * restored (to their previous enabled state) once the flight completes.
 */
export function flyCamera({
  camera,
  controls,
  target,
  duration = 1.4,
  fitFraction = 0.42,
  onStart,
  onComplete,
}: {
  camera: THREE.PerspectiveCamera;
  controls: OrbitControlsImpl;
  target: FlyTarget;
  duration?: number;
  fitFraction?: number;
  onStart?: () => void;
  onComplete?: () => void;
}): CameraFlight {
  const dist = focusDistance(camera, target.radius, fitFraction);
  const dir = target.direction.clone().normalize();
  const endPos = target.center.clone().addScaledVector(dir, dist);

  const startPos = camera.position.clone();
  const startTarget = controls.target.clone();
  const wasEnabled = controls.enabled;
  if (wasEnabled) controls.enabled = false;
  onStart?.();

  const props = { t: 0 };
  let settled = false;
  let resolve: () => void = () => {};
  const promise = new Promise<void>((res) => {
    resolve = res;
  });

  const settle = () => {
    if (settled) return;
    settled = true;
    if (wasEnabled) controls.enabled = true;
    onComplete?.();
  };

  const tween = gsap.to(props, {
    t: 1,
    duration,
    ease: "power2.inOut",
    onUpdate: () => {
      camera.position.lerpVectors(startPos, endPos, props.t);
      controls.target.lerpVectors(startTarget, target.center, props.t);
      camera.lookAt(controls.target);
      controls.update();
    },
    onComplete: () => {
      settle();
      resolve();
    },
  });

  return {
    promise,
    kill: () => {
      tween.kill();
      settle();
    },
  };
}
