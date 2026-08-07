"use client";

import * as THREE from "three";

// A part of a 3D object described by its center point, size, and meshes.
export type MeshRegion = {
  center: THREE.Vector3; // Middle point of this region.
  radius: number; // Approximate size of the region.
  meshes: THREE.Mesh[]; // All the meshes that make up this region.
};

// Find a node in the scene graph by its index when traversing breadth-first.
export function findNodeByIndex(root: THREE.Object3D, targetIndex: number): THREE.Object3D | null {
  let counter = 0;
  let found: THREE.Object3D | null = null;
  // Use a stack to walk through children (depth-first).
  const stack: THREE.Object3D[] = [...root.children];
  while (stack.length) {
    const node = stack.pop()!;
    // Stop once we've reached the node at the requested index.
    if (counter === targetIndex) {
      found = node;
      break;
    }
    counter++;
    // Push this node's children so we keep walking the tree.
    for (let i = node.children.length - 1; i >= 0; i--) {
      stack.push(node.children[i]);
    }
  }
  return found;
}

// Collect every mesh found under the given object (including nested ones).
export function collectMeshes(root: THREE.Object3D): THREE.Mesh[] {
  const out: THREE.Mesh[] = [];
  root.traverse((obj) => {
    // Only keep objects that are actual meshes.
    if ((obj as THREE.Mesh).isMesh) out.push(obj as THREE.Mesh);
  });
  return out;
}

// Build a region (center + radius + meshes) that covers the given list of nodes.
export function regionForNodes(root: THREE.Object3D, nodeIndexes: number[]): MeshRegion | null {
  // Grab the actual objects for each requested node index.
  const objects: THREE.Object3D[] = [];
  for (const idx of nodeIndexes) {
    const obj = findNodeByIndex(root, idx);
    if (obj) objects.push(obj);
  }
  // Couldn't find any of the nodes.
  if (!objects.length) return null;

  // Gather up every mesh from all the found objects.
  const meshes: THREE.Mesh[] = [];
  for (const obj of objects) meshes.push(...collectMeshes(obj));

  // Compute a bounding box that contains all the meshes.
  const box = new THREE.Box3();
  for (const mesh of meshes) {
    mesh.updateWorldMatrix(true, true);
    box.expandByObject(mesh);
  }
  // No meshes found means we can't compute a region.
  if (box.isEmpty()) return null;

  // Use the box's center as the region center and its radius as the region size.
  const center = box.getCenter(new THREE.Vector3());
  const radius = box.getBoundingSphere(new THREE.Sphere()).radius;
  return { center, radius, meshes };
}

// Pick a point slightly above and away from a region, scaled to its size.
export function floatOffset(region: MeshRegion, offset?: [number, number, number]): THREE.Vector3 {
  // Use the caller-supplied offset, or a default floating point since.
  const o = new THREE.Vector3();
  if (offset) {
    o.set(offset[0], offset[1], offset[2]);
  } else {
    o.set(0, 1, 0.4);
  }
  // Scale the offset by the region's size so bigger parts float further out.
  const scale = region.radius || 1;
  return region.center.clone().add(o.multiplyScalar(scale * 0.5));
}
