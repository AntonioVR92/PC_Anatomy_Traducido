"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";

type MeshExplodeData = {
  mesh: THREE.Mesh;
  baseX: number;
  baseY: number;
  baseZ: number;
  dirX: number;
  dirY: number;
  dirZ: number;
};

type ModelProps = {
  scale: number;
  position: [number, number, number];
  modelRef: React.RefObject<THREE.Group | null>;
  meshesRef?: React.RefObject<MeshExplodeData[] | null>;
};

export function KeyboardModel({ scale, position, modelRef, meshesRef }: ModelProps) {
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

  const explodeData = useMemo(() => {
    const out: MeshExplodeData[] = [];

    normalized.updateMatrixWorld(true);

    normalized.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        const local = mesh.position.clone();
        const normalizedLocal =
          local.lengthSq() > 1e-6 ? local.clone().normalize() : new THREE.Vector3(1, 0, 0);
        out.push({
          mesh,
          baseX: local.x,
          baseY: local.y,
          baseZ: local.z,
          dirX: normalizedLocal.x,
          dirY: normalizedLocal.y,
          dirZ: normalizedLocal.z,
        });
      }
    });

    return out;
  }, [normalized]);

  useEffect(() => {
    if (meshesRef) meshesRef.current = explodeData;
    return () => {
      if (meshesRef) meshesRef.current = null;
    };
  }, [explodeData, meshesRef]);

  return (
    <group ref={modelRef} position={position} rotation={[0.6, 0.4, 0.1]}>
      <primitive object={normalized} />
    </group>
  );
}

useGLTF.preload("/models/keyboard_hero.glb");