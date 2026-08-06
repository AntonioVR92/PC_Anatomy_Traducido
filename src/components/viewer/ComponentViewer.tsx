"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload, useProgress } from "@react-three/drei";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { Scene, type FrameInfo } from "./Scene";
import { Lights } from "./Lights";
import { Environment } from "./Environment";
import { Controls } from "./Controls";
import { CameraController } from "./CameraController";

export interface ComponentViewerProps {
  component: string;
  mode?: "embedded" | "fullscreen";
  className?: string;
}

function LoadingOverlay() {
  const { active, progress } = useProgress();
  if (!active) return null;
  return (
    <div className="viewer-loading">
      <div className="viewer-loading-spinner" />
      <span>{Math.round(progress)}%</span>
    </div>
  );
}

export function ComponentViewer({
  component,
  mode = "embedded",
  className,
}: ComponentViewerProps) {
  const [frame, setFrame] = useState<FrameInfo | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [resetSeq, setResetSeq] = useState(0);

  return (
    <div
      className={`viewer-root viewer-backdrop viewer-root--${mode}${className ? ` ${className}` : ""}`}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ fov: 40, near: 0.05, far: 100 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Lights />
          <Environment />
          <Scene path={component} onFrame={setFrame} />
          <CameraController frame={frame} resetSeq={resetSeq} component={component} />
          <Controls autoRotate={autoRotate} frame={frame} />
          <EffectComposer>
            <Vignette eskil={false} offset={0.22} darkness={0.25} />
          </EffectComposer>
          <Preload all />
        </Suspense>
      </Canvas>
      <LoadingOverlay />
      <div className="viewer-toolbar">
        <button
          type="button"
          aria-label="Reset camera"
          onClick={() => setResetSeq((n) => n + 1)}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12a9 9 0 1 0 2.6-6.3M3 4v5h5"
            />
          </svg>
          Reset
        </button>
        <button
          type="button"
          aria-label={autoRotate ? "Pause rotation" : "Start rotation"}
          onClick={() => setAutoRotate((v) => !v)}
        >
          {autoRotate ? (
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                fill="currentColor"
                d="M6 5h4v14H6zM14 5h4v14h-4z"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                fill="currentColor"
                d="M8 5l11 7-11 7z"
              />
            </svg>
          )}
          {autoRotate ? "Pause" : "Rotate"}
        </button>
      </div>
    </div>
  );
}
