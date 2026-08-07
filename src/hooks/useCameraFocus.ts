"use client";

import { useCallback, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { FocusTarget } from "@/utils/focusCamera";
import { focusDistance } from "@/utils/focusCamera";

// Hook that smoothly flies the camera to focus on a given target (like a CPU part).
export function useCameraFocus(
  getCamera: () => THREE.PerspectiveCamera | null,
  getControls: () => OrbitControlsImpl | null
) {
  // True while a camera animation is running.
  const [isMoving, setIsMoving] = useState(false);
  // Keep track of all running tweens so we can stop them if needed.
  const tweensRef = useRef<gsap.core.Tween[]>([]);

  // Stop any currently running camera animations immediately.
  const killTweens = useCallback(() => {
    tweensRef.current.forEach((t) => t.kill());
    tweensRef.current = [];
  }, []);

  // Fly the camera to look at the given target from its preferred direction.
  const focusOn = useCallback(
    (target: FocusTarget, duration = 1.25) => {
      const camera = getCamera();
      const controls = getControls();
      // Nothing to do if the camera or controls aren't ready yet.
      if (!camera || !controls) return Promise.resolve();
      killTweens();
      setIsMoving(true);

      // Work out how far away the camera should sit, and in which direction.
      const dist = focusDistance(camera, target.radius);
      // Use the target's requested direction, or a default diagonal if none given.
      const dir = (target.direction ?? new THREE.Vector3(0.62, 0.42, 1.15)).clone().normalize();
      // Where the camera should end up = target center + direction * distance.
      const targetPos = target.center.clone().addScaledVector(dir, dist);

      // Remember where we started so we can animate from here.
      const startPos = camera.position.clone();
      const startTarget = controls.target.clone();

      // Animate the camera from its start position to the target position.
      return new Promise<void>((resolve) => {
        // "t" goes from 0 (start) to 1 (end) during the animation.
        const props = { t: 0 };
        const tween = gsap.to(props, {
          t: 1,
          duration,
          ease: "power2.inOut",
          onUpdate: () => {
            // k is the current progress (0..1). Interpolate between start and end.
            const k = props.t;
            camera.position.lerpVectors(startPos, targetPos, k);
            controls.target.lerpVectors(startTarget, target.center, k);
            camera.lookAt(controls.target);
            controls.update();
          },
          onComplete: () => {
            // Animation finished; we're no longer moving.
            setIsMoving(false);
            resolve();
          },
        });
        tweensRef.current.push(tween);
      });
    },
    [getCamera, getControls, killTweens]
  );

  // Fly the camera back to a fixed default view of the target.
  const reset = useCallback(
    (target: FocusTarget, duration = 1.25) => {
      const camera = getCamera();
      const controls = getControls();
      // Nothing to do if the camera or controls aren't ready yet.
      if (!camera || !controls) return Promise.resolve();
      killTweens();
      setIsMoving(true);

      // Use a fixed distance and a fixed camera direction for the default view.
      const dist = focusDistance(camera, target.radius, 0.62);
      const dir = new THREE.Vector3(0.72, 0.55, 0.95).normalize();
      // Where the camera should end up = target center + direction * distance.
      const targetPos = target.center.clone().addScaledVector(dir, dist);

      // Remember where we started so we can animate from here.
      const startPos = camera.position.clone();
      const startTarget = controls.target.clone();

      // Animate the camera back to the default position.
      return new Promise<void>((resolve) => {
        // "t" goes from 0 (start) to 1 (end) during the animation.
        const props = { t: 0 };
        const tween = gsap.to(props, {
          t: 1,
          duration,
          ease: "power2.inOut",
          onUpdate: () => {
            // k is the current progress (0..1). Interpolate between start and end.
            const k = props.t;
            camera.position.lerpVectors(startPos, targetPos, k);
            controls.target.lerpVectors(startTarget, target.center, k);
            camera.lookAt(controls.target);
            controls.update();
          },
          onComplete: () => {
            // Animation finished; we're no longer moving.
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
