import * as THREE from "three";
import gsap from "gsap";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { focusDistance } from "@/utils/focusCamera";

// Describes where the camera should fly to.
export type FlyTarget = {
  center: THREE.Vector3; // Point we want in the middle of the view.
  radius: number; // Size of the object, used to pick distance.
  direction: THREE.Vector3; // Which direction the camera comes from.
};

// Result returned by flyCamera: a promise that resolves when done + a way to cancel.
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
  // Where the camera should end up = target center + direction * distance.
  const dist = focusDistance(camera, target.radius, fitFraction);
  const dir = target.direction.clone().normalize();
  const endPos = target.center.clone().addScaledVector(dir, dist);

  // Remember where we started so we can animate from here.
  const startPos = camera.position.clone();
  const startTarget = controls.target.clone();
  // Disable the user's orbit controls while flying so they can't fight the animation.
  const wasEnabled = controls.enabled;
  if (wasEnabled) controls.enabled = false;
  onStart?.();

  // "t" goes from 0 (start) to 1 (end) during the animation.
  const props = { t: 0 };
  // Make sure cleanup like restoring controls only runs once.
  let settled = false;
  let resolve: () => void = () => {};
  const promise = new Promise<void>((res) => {
    resolve = res;
  });

  // Re-enable the controls and call onComplete. Safe to call multiple times.
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
      // Move the camera and controls toward their targets based on progress.
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
      // Stop the animation and clean up immediately.
      tween.kill();
      settle();
    },
  };
}
