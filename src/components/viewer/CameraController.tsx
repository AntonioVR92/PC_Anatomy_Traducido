"use client";

// CameraController.tsx: A non-rendering component that adjusts the camera.
// It frames the model when it first loads, re-frames the model when the user
// presses "Reset", and keeps the zoom correct when the window is resized.

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { FrameInfo } from "./Scene";
import { fitCameraToObject, fitDistance } from "./fitCameraToObject";

// How much of the view the model should fill, and the max zoom-out distance.
const FIT_FRACTION = 0.75;
const MAX_DIST = 30;

export function CameraController({
  frame,
  resetSeq,
  component,
}: {
  frame: FrameInfo | null;
  resetSeq: number;
  component: string;
}) {
  // Grab the active camera, orbit controls, and canvas size from the R3F context.
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const controls = useThree((s) => s.controls) as OrbitControlsImpl | null;
  const size = useThree((s) => s.size);

  // Remember the last model and window size so we don't re-frame unnecessarily.
  const lastKey = useRef<string | null>(null);
  const lastSizeKey = useRef("");

  // Only act when the frame shown matches the current component.
  const isActive = frame !== null && frame.key === component;

  // When a new model loads, frame the camera around it once.
  useEffect(() => {
    if (!isActive || !controls) return;
    if (lastKey.current === frame.key) return;
    lastKey.current = frame.key;
    fitCameraToObject(camera, controls, frame.model, {
      fitFraction: FIT_FRACTION,
      maxDistance: MAX_DIST,
    });
  }, [isActive, frame, controls, camera]);

  // When the user clicks "Reset", move the camera back to frame the model again.
  useEffect(() => {
    if (resetSeq === 0 || !isActive || !controls) return;
    lastKey.current = frame.key;
    fitCameraToObject(camera, controls, frame.model, {
      fitFraction: FIT_FRACTION,
      maxDistance: MAX_DIST,
    });
  }, [resetSeq, isActive, frame, controls, camera]);

  // When the window/view is resized, adjust the zoom distance so the model still fits.
  useEffect(() => {
    if (!isActive || !controls) return;
    const key = `${Math.round(size.width)}x${Math.round(size.height)}`;
    if (lastSizeKey.current === key) return;
    lastSizeKey.current = key;
    // Compute the new distance needed for the new aspect ratio.
    const dist = fitDistance(camera, frame.radius, FIT_FRACTION, MAX_DIST);
    // Keep the current viewing direction, just move to the new distance.
    const dir = camera.position.clone().sub(controls.target);
    if (dir.lengthSq() < 1e-8) return;
    camera.position.copy(controls.target).addScaledVector(dir.normalize(), dist);
    controls.update();
  }, [isActive, frame, controls, camera, size.width, size.height]);

  return null;
}
