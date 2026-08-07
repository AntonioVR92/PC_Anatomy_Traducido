"use client";

// Environment.tsx: Builds a custom lighting environment around the scene
// using glowing "light panels" (Lightformers). These fake a realistic studio
// setting, producing nice reflections and highlights on the metal and plastic
// surfaces of the 3D model.

import { Environment as DreiEnvironment, Lightformer } from "@react-three/drei";

export function Environment() {
  return (
    // Render the environment reflections once into a small 256px map.
    <DreiEnvironment resolution={256} frames={1}>
      {/* Big soft panel shining from the top-front. */}
      <Lightformer intensity={4.2} position={[0, 5, 5]} rotation-x={Math.PI / 3} scale={[10, 3, 1]} />
      {/* Wide cool panel behind at the top. */}
      <Lightformer
        intensity={1.2}
        position={[0, 3, -6]}
        rotation-x={Math.PI / 4}
        scale={[12, 5, 1]}
        color="#bfd4ff"
      />

      {/* Blue panels on the left and right sides. */}
      <Lightformer
        intensity={2}
        position={[-6, 1, 2]}
        rotation-y={Math.PI / 2}
        scale={[8, 3, 1]}
        color="#4d8dff"
      />
      <Lightformer
        intensity={1.6}
        position={[6, 1, 0]}
        rotation-y={-Math.PI / 2}
        scale={[8, 3, 1]}
        color="#6fa4ff"
      />

      {/* Cyan and blue accent panels toward the rear. */}
      <Lightformer
        intensity={2.6}
        position={[-5, 2, -4]}
        rotation-y={Math.PI / 3}
        scale={[6, 2, 1]}
        color="#2fd4ff"
      />
      <Lightformer
        intensity={2.2}
        position={[5, 1, -4]}
        rotation-y={-Math.PI / 3}
        scale={[6, 2, 1]}
        color="#4d8dff"
      />

      {/* A dim panel on the floor for a bit of reflected color. */}
      <Lightformer
        intensity={0.8}
        position={[0, -4, 0]}
        rotation-x={-Math.PI / 2}
        scale={[10, 10, 1]}
        color="#1a2742"
      />
    </DreiEnvironment>
  );
}
