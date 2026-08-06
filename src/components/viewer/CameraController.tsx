"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { FrameInfo } from "./Scene";
import { fitCameraToObject, fitDistance } from "./fitCameraToObject";

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
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const controls = useThree((s) => s.controls) as OrbitControlsImpl | null;
  const size = useThree((s) => s.size);

  const lastKey = useRef<string | null>(null);
  const lastSizeKey = useRef("");

  const isActive = frame !== null && frame.key === component;

  useEffect(() => {
    if (!isActive || !controls) return;
    if (lastKey.current === frame.key) return;
    lastKey.current = frame.key;
    fitCameraToObject(camera, controls, frame.model, {
      fitFraction: FIT_FRACTION,
      maxDistance: MAX_DIST,
    });
  }, [isActive, frame, controls, camera]);

  useEffect(() => {
    if (resetSeq === 0 || !isActive || !controls) return;
    lastKey.current = frame.key;
    fitCameraToObject(camera, controls, frame.model, {
      fitFraction: FIT_FRACTION,
      maxDistance: MAX_DIST,
    });
  }, [resetSeq, isActive, frame, controls, camera]);

  useEffect(() => {
    if (!isActive || !controls) return;
    const key = `${Math.round(size.width)}x${Math.round(size.height)}`;
    if (lastSizeKey.current === key) return;
    lastSizeKey.current = key;
    const dist = fitDistance(camera, frame.radius, FIT_FRACTION, MAX_DIST);
    const dir = camera.position.clone().sub(controls.target);
    if (dir.lengthSq() < 1e-8) return;
    camera.position.copy(controls.target).addScaledVector(dir.normalize(), dist);
    controls.update();
  }, [isActive, frame, controls, camera, size.width, size.height]);

  return null;
}
