"use client";

import { useCallback, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { FocusTarget } from "@/utils/focusCamera";
import { focusDistance } from "@/utils/focusCamera";

export function useCameraFocus(
  getCamera: () => THREE.PerspectiveCamera | null,
  getControls: () => OrbitControlsImpl | null
) {
  const [isMoving, setIsMoving] = useState(false);
  const tweensRef = useRef<gsap.core.Tween[]>([]);

  const killTweens = useCallback(() => {
    tweensRef.current.forEach((t) => t.kill());
    tweensRef.current = [];
  }, []);

  const focusOn = useCallback(
    (target: FocusTarget, duration = 1.25) => {
      const camera = getCamera();
      const controls = getControls();
      if (!camera || !controls) return Promise.resolve();
      killTweens();
      setIsMoving(true);

      const dist = focusDistance(camera, target.radius);
      const dir = (target.direction ?? new THREE.Vector3(0.62, 0.42, 1.15)).clone().normalize();
      const targetPos = target.center.clone().addScaledVector(dir, dist);

      const startPos = camera.position.clone();
      const startTarget = controls.target.clone();

      return new Promise<void>((resolve) => {
        const props = { t: 0 };
        const tween = gsap.to(props, {
          t: 1,
          duration,
          ease: "power2.inOut",
          onUpdate: () => {
            const k = props.t;
            camera.position.lerpVectors(startPos, targetPos, k);
            controls.target.lerpVectors(startTarget, target.center, k);
            camera.lookAt(controls.target);
            controls.update();
          },
          onComplete: () => {
            setIsMoving(false);
            resolve();
          },
        });
        tweensRef.current.push(tween);
      });
    },
    [getCamera, getControls, killTweens]
  );

  const reset = useCallback(
    (target: FocusTarget, duration = 1.25) => {
      const camera = getCamera();
      const controls = getControls();
      if (!camera || !controls) return Promise.resolve();
      killTweens();
      setIsMoving(true);

      const dist = focusDistance(camera, target.radius, 0.62);
      const dir = new THREE.Vector3(0.72, 0.55, 0.95).normalize();
      const targetPos = target.center.clone().addScaledVector(dir, dist);

      const startPos = camera.position.clone();
      const startTarget = controls.target.clone();

      return new Promise<void>((resolve) => {
        const props = { t: 0 };
        const tween = gsap.to(props, {
          t: 1,
          duration,
          ease: "power2.inOut",
          onUpdate: () => {
            const k = props.t;
            camera.position.lerpVectors(startPos, targetPos, k);
            controls.target.lerpVectors(startTarget, target.center, k);
            camera.lookAt(controls.target);
            controls.update();
          },
          onComplete: () => {
            setIsMoving(false);
            resolve();
          },
        });
        tweensRef.current.push(tween);
      });
    },
    [getCamera, getControls, killTweens]
  );

  return { isMoving, focusOn, reset, killTweens };
}
