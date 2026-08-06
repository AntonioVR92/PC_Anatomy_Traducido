"use client";

import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export type FitOptions = {
  fitFraction?: number;
  maxDistance?: number;
};

export type FitResult = {
  center: THREE.Vector3;
  size: THREE.Vector3;
  radius: number;
};

const DEFAULT_FIT_FRACTION = 0.62;
const DEFAULT_MAX_DISTANCE = 30;

export function fitDistance(
  camera: THREE.PerspectiveCamera,
  radius: number,
  fitFraction: number = DEFAULT_FIT_FRACTION,
  maxDistance: number = DEFAULT_MAX_DISTANCE
): number {
  const halfV = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  const minHalf = Math.min(halfV, halfV * Math.max(camera.aspect, 0.01));
  return Math.min(radius / Math.max(minHalf, 0.05) / fitFraction, maxDistance);
}

export function fitCameraToObject(
  camera: THREE.PerspectiveCamera,
  controls: OrbitControlsImpl,
  object: THREE.Object3D,
  options: FitOptions = {}
): FitResult | null {
  const fitFraction = options.fitFraction ?? DEFAULT_FIT_FRACTION;
  const maxDistance = options.maxDistance ?? DEFAULT_MAX_DISTANCE;

  const box = new THREE.Box3().setFromObject(object);
  if (box.isEmpty()) return null;

  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const radius = box.getBoundingSphere(new THREE.Sphere()).radius;

  const dist = fitDistance(camera, radius, fitFraction, maxDistance);

  camera.position
    .copy(center)
    .addScaledVector(new THREE.Vector3(0.72, 0.6, 0.95).normalize(), dist);
  controls.target.copy(center);
  controls.update();

  return { center, size, radius };
}
