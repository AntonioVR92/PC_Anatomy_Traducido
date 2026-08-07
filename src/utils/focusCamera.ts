"use client";

import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

// Describes a 3D point we want the camera to look at.
export type FocusTarget = {
  center: THREE.Vector3; // The point we're focusing on.
  radius: number; // How big the object is, used to pick the camera distance.
  direction?: THREE.Vector3; // Optional preferred direction the camera looks from.
};

// Default how much of the scene should be visible in frame.
const DEFAULT_FIT_FRACTION = 0.42;

// Work out how far away the camera should sit to frame an object of the given radius.
export function focusDistance(
  camera: THREE.PerspectiveCamera,
  radius: number,
  fitFraction: number = DEFAULT_FIT_FRACTION,
  minDistance = 0.35,
  maxDistance = 12
): number {
  // Half-height of the camera's view angle (in radians).
  const halfV = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  // Use the narrower of the vertical and horizontal view to make sure everything fits.
  const minHalf = Math.min(halfV, halfV * Math.max(camera.aspect, 0.01));
  // Distance so the object fills about fitFraction of the frame.
  const dist = radius / Math.max(minHalf, 0.05) / fitFraction;
  // Clamp the result so the camera is never too close or too far.
  return Math.min(Math.max(dist, minDistance), maxDistance);
}

// Immediately place the camera at the default view looking at the target (no animation).
export function resetCameraPosition(
  camera: THREE.PerspectiveCamera,
  controls: OrbitControlsImpl,
  target: FocusTarget
): void {
  // Use the fixed fit fraction to get a good framing distance.
  const dist = focusDistance(camera, target.radius, 0.62);
  // Fixed camera direction for a consistent default view.
  const dir = new THREE.Vector3(0.72, 0.55, 0.95).normalize();
  // Position the camera at target center offset by direction * distance.
  camera.position.copy(target.center).addScaledVector(dir, dist);
  // Point the orbit controls at the target center.
  controls.target.copy(target.center);
  controls.update();
}
