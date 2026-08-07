"use client";

// Scene.tsx: Renders a loaded 3D model (GLB), sizes it to fit nicely,
// plays any animations it has, and casts a soft contact shadow underneath it.

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, useGLTF } from "@react-three/drei";

export type FrameInfo = {
  // Describes a loaded model so other code can frame the camera around it.
  key: string;
  model: THREE.Object3D;
  center: THREE.Vector3;
  radius: number;
};

// The largest allowed size for the model's biggest dimension (used to scale it).
const MAX_DIM = 1;

// Model file names that count as "fan" parts, so they can be recolored.
const FAN_MODELS = ["case_fans.glb"];
// The color fans are repainted to.
const FAN_COLOR = new THREE.Color("#223a63");

// Resizes and recenters a model so it always fills the view nicely.
function normalizeModel(raw: THREE.Object3D): THREE.Object3D {
  // Measure the model's outer box (its size and center in space).
  const box = new THREE.Box3().setFromObject(raw);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  // Pick the biggest side, and compute a scale so it fits within MAX_DIM.
  const maxDim = Math.max(size.x, size.y, size.z, 1e-6);
  const s = MAX_DIM / maxDim;

  // Clone the model and apply the same scale to every part.
  const clone = raw.clone(true);
  clone.scale.multiplyScalar(s);
  // Move it so its center sits at the origin (0,0,0).
  clone.position.set(-center.x * s, -center.y * s, -center.z * s);
  clone.updateMatrixWorld(true);
  return clone;
}

// Repaints every mesh in a fan model with the same flat blue color.
function recolorFan(root: THREE.Object3D) {
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    const material = mesh.material;
    if (!material) return;
    // A mesh can have one material or a list of them; handle both.
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
  // Load the GLB file from the given path.
  const { scene, animations } = useGLTF(path);
  // Clone the raw scene so we can safely modify it.
  const raw = useMemo(() => scene.clone(true), [scene]);
  // Check whether this file is a fan model.
  const isFan = FAN_MODELS.some((p) => path.includes(p));
  // Prepare the final model: normalize its size/position, and recolor fans.
  const model = useMemo(() => {
    const m = normalizeModel(raw);
    if (isFan) recolorFan(m);
    return m;
  }, [raw, isFan]);

  // Holds the animation player so we can update it every frame.
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  // Set up animation playback once the model and its animations are ready.
  useEffect(() => {
    if (!animations?.length) return;
    const mixer = new THREE.AnimationMixer(model);
    mixerRef.current = mixer;
    // Start playing every animation clip in the model.
    animations.forEach((clip) => mixer.clipAction(clip).play());
    return () => {
      // Clean up when the model changes or unmounts.
      mixer.stopAllAction();
      mixerRef.current = null;
    };
  }, [model, animations]);

  // Advance the animations by the time passed since the last frame.
  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });

  // Compute a bounding sphere (center + radius) that encloses the whole model.
  const sphere = useMemo(() => {
    const box = new THREE.Box3().setFromObject(model);
    return box.getBoundingSphere(new THREE.Sphere());
  }, [model]);

  // Tell the parent about this model so the camera can be aimed at it.
  useEffect(() => {
    onFrame({
      key: path,
      model,
      center: sphere.center.clone(),
      radius: sphere.radius,
    });
  }, [model, path, sphere, onFrame]);

  // Where the shadow should sit: just below the bottom of the model.
  const floor = sphere.center.y - sphere.radius - 0.015;
  // Shadow size grows with the model but stays within a sane range.
  const shadowScale = Math.min(5, Math.max(2, sphere.radius * 4.5));

  return (
    <>
      {/* Draw the model itself. */}
      <group>
        <primitive object={model} />
      </group>
      {/* A soft fake shadow on the ground beneath the model. */}
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
