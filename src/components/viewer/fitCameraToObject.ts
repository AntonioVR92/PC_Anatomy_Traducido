"use client";

// fitCameraToObject.ts: Helper functions that move the camera so it auto-frames
// (fits) a given 3D object on screen — figuring out how far away to stand
// and where to point the camera.

import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

// Options that tweak how close the camera gets / how much of the object fills the view.
export type FitOptions = {
  fitFraction?: number;
  maxDistance?: number;
};

// Result describing the fitted object's bounds.
export type FitResult = {
  center: THREE.Vector3;
  size: THREE.Vector3;
  radius: number;
};

// Defaults: fill 62% of the view, and never back up more than 30 units.
const DEFAULT_FIT_FRACTION = 0.62;
const DEFAULT_MAX_DISTANCE = 30;

// Computes how far the camera must be from an object of a given radius
// so the object appears at the desired fill fraction of the viewport.
export function fitDistance(
  camera: THREE.PerspectiveCamera,
  radius: number,
  fitFraction: number = DEFAULT_FIT_FRACTION,
  maxDistance: number = DEFAULT_MAX_DISTANCE
): number {
  // How wide the camera sees, based on its vertical field of view and aspect ratio.
  const halfV = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  const minHalf = Math.min(halfV, halfV * Math.max(camera.aspect, 0.01));
  // Place the camera so the radius fills the requested fraction, capped at maxDistance.
  return Math.min(radius / Math.max(minHalf, 0.05) / fitFraction, maxDistance);
}

// Positions the camera to frame `object`, and points the orbit controls at it.
export function fitCameraToObject(
  camera: THREE.PerspectiveCamera,
  controls: OrbitControlsImpl,
  object: THREE.Object3D,
  options: FitOptions = {}
): FitResult | null {
  // Fall back to default values when options are not provided.
  const fitFraction = options.fitFraction ?? DEFAULT_FIT_FRACTION;
  const maxDistance = options.maxDistance ?? DEFAULT_MAX_DISTANCE;

  // Measure the object's bounding box to learn its center, size, and radius.
  const box = new THREE.Box3().setFromObject(object);
  if (box.isEmpty()) return null;

  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const radius = box.getBoundingSphere(new THREE.Sphere()).radius;

  // Work out how far away the camera should be.
  const dist = fitDistance(camera, radius, fitFraction, maxDistance);

  // Move the camera to sit that distance away on a nice angle from the center.
  camera.position
    .copy(center)
    .addScaledVector(new THREE.Vector3(0.72, 0.6, 0.95).normalize(), dist);
  // Tell the orbit controls to keep looking at the object's center.
  controls.target.copy(center);
  controls.update();

  return { center, size, radius };
}
