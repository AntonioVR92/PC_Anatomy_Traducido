"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { MeshRegion } from "@/utils/getMeshCenter";

const HIGHLIGHT_COLOR = new THREE.Color("#4d8dff");
const TARGET_INTENSITY = 1.15;
const DECAY_STOP = 0.02;

type Entry = {
  original: THREE.Material | null;
  state: "ramp" | "decay";
};

function activateMesh(mesh: THREE.Mesh): Entry | null {
  const base = Array.isArray(mesh.material)
    ? mesh.material[0]
    : mesh.material;
  if (!base || !("emissive" in base)) return null;
  const std = base as THREE.MeshStandardMaterial;
  const mat = std.clone();
  mat.emissive.copy(HIGHLIGHT_COLOR);
  mat.emissiveIntensity = 0;
  mesh.material = mat;
  return { original: base, state: "ramp" };
}

function stepMesh(mesh: THREE.Mesh, entry: Entry, k: number): boolean {
  const mat = mesh.material as THREE.MeshStandardMaterial;
  if (!mat || !("emissiveIntensity" in mat)) return true;
  const target = entry.state === "ramp" ? TARGET_INTENSITY : 0;
  mat.emissiveIntensity += (target - mat.emissiveIntensity) * k;
  if (entry.state === "decay" && mat.emissiveIntensity < DECAY_STOP) {
    if (entry.original) mesh.material = entry.original;
    return true;
  }
  return false;
}

export function HighlightManager({ region }: { region: MeshRegion | null }) {
  const entriesRef = useRef<Map<THREE.Mesh, Entry>>(new Map());

  useEffect(() => {
    const next = region ? region.meshes : [];
    const nextSet = new Set(next);

    for (const [mesh, entry] of entriesRef.current) {
      if (!nextSet.has(mesh)) entry.state = "decay";
    }

    for (const mesh of next) {
      if (entriesRef.current.has(mesh)) continue;
      const entry = activateMesh(mesh);
      if (entry) entriesRef.current.set(mesh, entry);
    }
  }, [region]);

  useFrame((_, delta) => {
    const k = 1 - Math.exp(-delta * 9);
    const toRemove: THREE.Mesh[] = [];

    for (const [mesh, entry] of entriesRef.current) {
      if (stepMesh(mesh, entry, k)) toRemove.push(mesh);
    }

    for (const mesh of toRemove) entriesRef.current.delete(mesh);
  });

  return null;
}
