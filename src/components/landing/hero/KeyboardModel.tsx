"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";

type ModelProps = {
  scale: number;
  position: [number, number, number];
  modelRef: React.RefObject<THREE.Group | null>;
};

export function KeyboardModel({ scale, position, modelRef }: ModelProps) {
  const { scene } = useGLTF("/models/keyboard_hero.glb") as GLTF;

  const normalized = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z, 1e-6);
    const unit = 1 / maxDim;
    clone.scale.multiplyScalar(unit * scale);
    clone.position.set(
      -center.x * unit * scale,
      -center.y * unit * scale,
      -center.z * unit * scale
    );
    clone.updateMatrixWorld(true);
    return clone;
  }, [scene, scale]);

  return (
    <group ref={modelRef} position={position} rotation={[0.6, 0.4, 0.1]}>
      <primitive object={normalized} />
    </group>
  );
}

useGLTF.preload("/models/keyboard_hero.glb");