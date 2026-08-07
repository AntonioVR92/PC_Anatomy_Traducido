"use client";

import { Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { KeyboardModel } from "@/components/landing/hero/KeyboardModel";

type HeroCanvasProps = {
  modelScale: number;
  modelPosition: [number, number, number];
  modelRef: React.RefObject<THREE.Group | null>;
  keyLightRef?: React.RefObject<THREE.SpotLight | null>;
};

export function HeroCanvas({ modelScale, modelPosition, modelRef, keyLightRef }: HeroCanvasProps) {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 7], fov: 40 }}
      onCreated={({ gl }) => gl.setClearColor("#0b0f17", 0)}
    >

      <Suspense fallback={null}>
        {/* Cinematic lighting */}
        <ambientLight intensity={0.5} />
        <hemisphereLight intensity={0.4} color="#dce9ff" groundColor="#0a1120" />

        {/* Cool white key light */}
        <directionalLight position={[3, 5, 4]} intensity={2.4} color="#ffffff" />
        {/* Blue rim light from behind */}
        <directionalLight position={[-4, 2, -5]} intensity={4} color="#3b82f6" />
        {/* Subtle fill */}
        <directionalLight position={[-2, -1, 3]} intensity={0.4} color="#93b4ff" />

        {/* Stage key light — lights up the keyboard in scene 3 */}
        <spotLight
          ref={keyLightRef}
          position={[0, 5, 4]}
          intensity={0}
          angle={0.6}
          penumbra={0.8}
          decay={0.2}
          color="#dbeafe"
          target-position={[0, 0, 0]}
        />

        {/* Studio reflections for a premium finish */}
        <Environment frames={1} resolution={256}>
          <Lightformer intensity={2} position={[0, 5, 4]} rotation-x={Math.PI / 2} scale={[6, 1, 1]} />
          <Lightformer intensity={1} position={[-5, 0, 0]} rotation-y={Math.PI / 2} scale={[3, 1, 1]} color="#3b82f6" />
          <Lightformer intensity={3} position={[0, 0, -6]} scale={[6, 4, 1]} color="#3b82f6" />
        </Environment>

        <KeyboardModel scale={modelScale} position={modelPosition} modelRef={modelRef} />
      </Suspense>

      
    </Canvas>
  );
}