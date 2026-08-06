"use client";

import * as THREE from "three";

export type MeshRegion = {
  center: THREE.Vector3;
  radius: number;
  meshes: THREE.Mesh[];
};

export function findNodeByIndex(root: THREE.Object3D, targetIndex: number): THREE.Object3D | null {
  let counter = 0;
  let found: THREE.Object3D | null = null;
  const stack: THREE.Object3D[] = [...root.children];
  while (stack.length) {
    const node = stack.pop()!;
    if (counter === targetIndex) {
      found = node;
      break;
    }
    counter++;
    for (let i = node.children.length - 1; i >= 0; i--) {
      stack.push(node.children[i]);
    }
  }
  return found;
}

export function collectMeshes(root: THREE.Object3D): THREE.Mesh[] {
  const out: THREE.Mesh[] = [];
  root.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) out.push(obj as THREE.Mesh);
  });
  return out;
}

export function regionForNodes(root: THREE.Object3D, nodeIndexes: number[]): MeshRegion | null {
  const objects: THREE.Object3D[] = [];
  for (const idx of nodeIndexes) {
    const obj = findNodeByIndex(root, idx);
    if (obj) objects.push(obj);
  }
  if (!objects.length) return null;

  const meshes: THREE.Mesh[] = [];
  for (const obj of objects) meshes.push(...collectMeshes(obj));

  const box = new THREE.Box3();
  for (const mesh of meshes) {
    mesh.updateWorldMatrix(true, true);
    box.expandByObject(mesh);
  }
  if (box.isEmpty()) return null;

  const center = box.getCenter(new THREE.Vector3());
  const radius = box.getBoundingSphere(new THREE.Sphere()).radius;
  return { center, radius, meshes };
}

export function floatOffset(region: MeshRegion, offset?: [number, number, number]): THREE.Vector3 {
  const o = new THREE.Vector3();
  if (offset) {
    o.set(offset[0], offset[1], offset[2]);
  } else {
    o.set(0, 1, 0.4);
  }
  const scale = region.radius || 1;
  return region.center.clone().add(o.multiplyScalar(scale * 0.5));
}
