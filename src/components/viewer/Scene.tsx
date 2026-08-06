"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, useGLTF } from "@react-three/drei";

export type FrameInfo = {
  key: string;
  model: THREE.Object3D;
  center: THREE.Vector3;
  radius: number;
};

const MAX_DIM = 1;
const FAN_MODELS = ["case_fans.glb"];
const FAN_COLOR = new THREE.Color("#223a63");

function normalizeModel(raw: THREE.Object3D): THREE.Object3D {
  const box = new THREE.Box3().setFromObject(raw);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z, 1e-6);
  const s = MAX_DIM / maxDim;

  const clone = raw.clone(true);
  clone.scale.multiplyScalar(s);
  clone.position.set(-center.x * s, -center.y * s, -center.z * s);
  clone.updateMatrixWorld(true);
  return clone;
}

function recolorFan(root: THREE.Object3D) {
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    const material = mesh.material;
    if (!material) return;
    const materials = Array.isArray(material) ? material : [material];
    materials.forEach((m) => {
      const mat = m as THREE.MeshStandardMaterial;
      if (!mat || !("color" in mat)) return;
      mat.color.copy(FAN_COLOR);
      mat.metalness = 0;
      mat.roughness = 0.85;
      mat.envMapIntensity = 0.35;
    });
  });
}

export function Scene({ path, onFrame }: { path: string; onFrame: (f: FrameInfo) => void }) {
  const { scene, animations } = useGLTF(path);
  const raw = useMemo(() => scene.clone(true), [scene]);
  const isFan = FAN_MODELS.some((p) => path.includes(p));
  const model = useMemo(() => {
    const m = normalizeModel(raw);
    if (isFan) recolorFan(m);
    return m;
  }, [raw, isFan]);

  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    if (!animations?.length) return;
    const mixer = new THREE.AnimationMixer(model);
    mixerRef.current = mixer;
    animations.forEach((clip) => mixer.clipAction(clip).play());
    return () => {
      mixer.stopAllAction();
      mixerRef.current = null;
    };
  }, [model, animations]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });

  const sphere = useMemo(() => {
    const box = new THREE.Box3().setFromObject(model);
    return box.getBoundingSphere(new THREE.Sphere());
  }, [model]);

  useEffect(() => {
    onFrame({
      key: path,
      model,
      center: sphere.center.clone(),
      radius: sphere.radius,
    });
  }, [model, path, sphere, onFrame]);

  const floor = sphere.center.y - sphere.radius - 0.015;
  const shadowScale = Math.min(5, Math.max(2, sphere.radius * 4.5));

  return (
    <>
      <group>
        <primitive object={model} />
      </group>
      <ContactShadows
        position={[0, floor, 0]}
        opacity={0.55}
        scale={shadowScale}
        blur={2.2}
        far={2}
        resolution={512}
        color="#04070c"
      />
    </>
  );
}
