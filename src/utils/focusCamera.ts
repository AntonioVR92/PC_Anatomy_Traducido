"use client";

import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export type FocusTarget = {
  center: THREE.Vector3;
  radius: number;
  direction?: THREE.Vector3;
};

const DEFAULT_FIT_FRACTION = 0.42;

export function focusDistance(
  camera: THREE.PerspectiveCamera,
  radius: number,
  fitFraction: number = DEFAULT_FIT_FRACTION,
  minDistance = 0.35,
  maxDistance = 12
): number {
  const halfV = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  const minHalf = Math.min(halfV, halfV * Math.max(camera.aspect, 0.01));
  const dist = radius / Math.max(minHalf, 0.05) / fitFraction;
  return Math.min(Math.max(dist, minDistance), maxDistance);
}

export function resetCameraPosition(
  camera: THREE.PerspectiveCamera,
  controls: OrbitControlsImpl,
  target: FocusTarget
): void {
  const dist = focusDistance(camera, target.radius, 0.62);
  const dir = new THREE.Vector3(0.72, 0.55, 0.95).normalize();
  camera.position.copy(target.center).addScaledVector(dir, dist);
  controls.target.copy(target.center);
  controls.update();
}
