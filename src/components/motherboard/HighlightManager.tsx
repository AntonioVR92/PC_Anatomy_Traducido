"use client";

// HighlightManager.tsx: Makes the meshes of the currently selected part glow.
// When a part is selected, its meshes smoothly fade in a blue highlight;
// when it's deselected, the highlight smoothly fades back out and the
// original material is restored.

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { MeshRegion } from "@/utils/getMeshCenter";

// The highlight color and how strong the glow gets.
const HIGHLIGHT_COLOR = new THREE.Color("#4d8dff");
const TARGET_INTENSITY = 1.15;
// Below this glow value the highlight is considered fully faded out.
const DECAY_STOP = 0.02;

// Tracks the highlight state of a single mesh.
type Entry = {
  original: THREE.Material | null; // material to restore after highlighting
  state: "ramp" | "decay"; // ramping up (fade in) or down (fade out)
};

// Prepares a mesh for highlighting: clone its material and start it unlit.
function activateMesh(mesh: THREE.Mesh): Entry | null {
  // Grab the mesh's first material (handles single or multi-material meshes).
  const base = Array.isArray(mesh.material)
    ? mesh.material[0]
    : mesh.material;
  // Only standard materials can glow, so skip anything else.
  if (!base || !("emissive" in base)) return null;
  const std = base as THREE.MeshStandardMaterial;
  // Clone so we don't permanently alter the original material.
  const mat = std.clone();
  mat.emissive.copy(HIGHLIGHT_COLOR);
  mat.emissiveIntensity = 0;
  mesh.material = mat;
  return { original: base, state: "ramp" };
}

// Moves a mesh's highlight one step toward its target. Returns true when done.
function stepMesh(mesh: THREE.Mesh, entry: Entry, k: number): boolean {
  const mat = mesh.material as THREE.MeshStandardMaterial;
  if (!mat || !("emissiveIntensity" in mat)) return true;
  // Target glow is full intensity when ramping, zero when decaying.
  const target = entry.state === "ramp" ? TARGET_INTENSITY : 0;
  // Ease the glow toward the target (k is the smoothing amount per frame).
  mat.emissiveIntensity += (target - mat.emissiveIntensity) * k;
  // Once fully faded, give the mesh back its original material.
  if (entry.state === "decay" && mat.emissiveIntensity < DECAY_STOP) {
    if (entry.original) mesh.material = entry.original;
    return true;
  }
  return false;
}

export function HighlightManager({ region }: { region: MeshRegion | null }) {
  // Keeps track of every mesh currently being highlighted.
  const entriesRef = useRef<Map<THREE.Mesh, Entry>>(new Map());

  // When the selected region changes, update which meshes to highlight.
  useEffect(() => {
    const next = region ? region.meshes : [];
    const nextSet = new Set(next);

    // Meshes no longer in the selection start fading out.
    for (const [mesh, entry] of entriesRef.current) {
      if (!nextSet.has(mesh)) entry.state = "decay";
    }

    // Newly selected meshes start fading in.
    for (const mesh of next) {
      if (entriesRef.current.has(mesh)) continue;
      const entry = activateMesh(mesh);
      if (entry) entriesRef.current.set(mesh, entry);
    }
  }, [region]);

  // Every frame, advance all active highlight animations by the elapsed time.
  useFrame((_, delta) => {
    // Smoothing factor so the glow eases rather than jumps.
    const k = 1 - Math.exp(-delta * 9);
    const toRemove: THREE.Mesh[] = [];

    for (const [mesh, entry] of entriesRef.current) {
      // Finished entries (fully faded) are collected for cleanup.
      if (stepMesh(mesh, entry, k)) toRemove.push(mesh);
    }

    for (const mesh of toRemove) entriesRef.current.delete(mesh);
  });

  return null;
}
