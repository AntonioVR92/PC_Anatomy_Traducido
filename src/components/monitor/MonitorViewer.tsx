"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ContactShadows, useGLTF, useProgress } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { Lights } from "@/components/viewer/Lights";
import { Environment } from "@/components/viewer/Environment";
import { Controls } from "@/components/viewer/Controls";
import { Hotspot } from "@/components/motherboard/Hotspot";
import { Sidebar } from "@/components/motherboard/Sidebar";
import { HighlightManager } from "@/components/motherboard/HighlightManager";
import { useSelectedComponent } from "@/hooks/useSelectedComponent";
import { useCameraFocus } from "@/hooks/useCameraFocus";
import { useExplorer } from "@/lib/store";
import { regionForNodes, floatOffset, type MeshRegion } from "@/utils/getMeshCenter";
import { focusDistance } from "@/utils/focusCamera";
import { MONITOR_PARTS } from "@/data/monitorComponents";

const MAX_DIM = 1;
const MONITOR_MODEL = "/models/monitor.glb";
const MONITOR_OVERVIEW_DIR = new THREE.Vector3(0.55, -0.35, -1).normalize();

type ModelInfo = {
  model: THREE.Object3D;
  radius: number;
};

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

function MonitorScene({ onReady }: { onReady: (info: ModelInfo) => void }) {
  const { scene } = useGLTF(MONITOR_MODEL);
  const raw = useMemo(() => scene.clone(true), [scene]);
  const model = useMemo(() => normalizeModel(raw), [raw]);

  useEffect(() => {
    const radius = new THREE.Box3()
      .setFromObject(model)
      .getBoundingSphere(new THREE.Sphere()).radius;
    onReady({ model, radius });
  }, [model, onReady]);

  const { floor, shadowScale } = useMemo(() => {
    const sphere = new THREE.Box3()
      .setFromObject(model)
      .getBoundingSphere(new THREE.Sphere());
    return {
      floor: sphere.center.y - sphere.radius - 0.015,
      shadowScale: Math.min(5, Math.max(2, sphere.radius * 4.5)),
    };
  }, [model]);

  return (
    <>
      <primitive object={model} />
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

function SelectionRing({ position, radius }: { position: THREE.Vector3; radius: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * 3) * 0.09;
    ref.current.scale.setScalar(pulse);
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.5 + Math.sin(t * 3) * 0.22;
  });
  return (
    <mesh ref={ref} position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius * 0.82, radius * 0.94, 48]} />
      <meshBasicMaterial
        color="#2fd4ff"
        transparent
        opacity={0.55}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function MonitorRig({
  modelInfo,
  selectedId,
  onSelect,
  autoRotate,
  resetSeq,
}: {
  modelInfo: ModelInfo;
  selectedId: string | null;
  onSelect: (id: string) => void;
  autoRotate: boolean;
  resetSeq: number;
}) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const controls = useThree((s) => s.controls) as OrbitControlsImpl | null;

  const cameraRef = useRef(camera);
  useEffect(() => {
    cameraRef.current = camera;
  }, [camera]);

  const controlsRef = useRef<OrbitControlsImpl | null>(controls);
  useEffect(() => {
    controlsRef.current = controls;
  }, [controls]);

  const getCamera = useCallback(() => cameraRef.current, []);
  const getControls = useCallback(() => controlsRef.current, []);

  const { isMoving, focusOn, reset: resetCamera } = useCameraFocus(
    getCamera,
    getControls
  );

  const regions = useMemo(() => {
    const map = new Map<string, MeshRegion>();
    for (const part of MONITOR_PARTS) {
      const region = regionForNodes(modelInfo.model, part.nodes);
      if (region) map.set(part.id, region);
    }
    return map;
  }, [modelInfo]);

  const overview = useMemo(
    () => ({ center: new THREE.Vector3(), radius: modelInfo.radius }),
    [modelInfo]
  );

  const didInitRef = useRef(false);
  useEffect(() => {
    if (didInitRef.current || !controls || regions.size === 0) return;
    didInitRef.current = true;
    const dist = focusDistance(camera, overview.radius, 0.62);
    camera.position.copy(overview.center).addScaledVector(MONITOR_OVERVIEW_DIR, dist);
    controls.target.copy(overview.center);
    controls.update();
  }, [controls, regions, camera, overview]);

  useEffect(() => {
    if (resetSeq === 0) return;
    resetCamera({
      center: overview.center,
      radius: overview.radius,
      direction: MONITOR_OVERVIEW_DIR,
    });
  }, [resetSeq, resetCamera, overview]);

  const prevSelectedRef = useRef<string | null>(null);
  useEffect(() => {
    if (regions.size === 0) return;
    const prev = prevSelectedRef.current;
    if (selectedId && selectedId !== prev) {
      const region = regions.get(selectedId);
      const part = MONITOR_PARTS.find((p) => p.id === selectedId);
      if (region) {
        focusOn({
          center: region.center,
          radius: part?.focusRadius ?? region.radius,
          direction: part?.view ? new THREE.Vector3(...part.view) : undefined,
        });
      }
    } else if (!selectedId && prev) {
      resetCamera({
        center: overview.center,
        radius: overview.radius,
        direction: MONITOR_OVERVIEW_DIR,
      });
    }
    prevSelectedRef.current = selectedId;
  }, [selectedId, regions, focusOn, resetCamera, overview]);

  const hotspots = useMemo(
    () =>
      MONITOR_PARTS.map((part, index) => {
        const region = regions.get(part.id);
        if (!region) return null;
        return {
          id: part.id,
          label: part.name,
          position: floatOffset(region, part.offset),
          index: index + 1,
        };
      }).filter(Boolean) as {
        id: string;
        label: string;
        position: THREE.Vector3;
        index: number;
      }[],
    [regions]
  );

  const selectedRegion = selectedId ? (regions.get(selectedId) ?? null) : null;

  const frame = useMemo(
    () => ({
      key: "monitor",
      model: modelInfo.model,
      center: new THREE.Vector3(),
      radius: modelInfo.radius,
    }),
    [modelInfo]
  );

  return (
    <>
      {hotspots.map((hotspot) => (
        <Hotspot
          key={hotspot.id}
          position={hotspot.position}
          index={hotspot.index}
          label={hotspot.label}
          active={hotspot.id === selectedId}
          hidden={isMoving}
          onSelect={() => onSelect(hotspot.id)}
        />
      ))}
      <HighlightManager region={selectedRegion} />
      {selectedRegion && (
        <SelectionRing position={selectedRegion.center} radius={selectedRegion.radius * 0.5} />
      )}
      <Controls autoRotate={autoRotate && !selectedId && !isMoving} frame={frame} />
    </>
  );
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

export function MonitorViewer({
  mode = "fullscreen",
}: {
  mode?: "fullscreen" | "embedded";
}) {
  const [modelInfo, setModelInfo] = useState<ModelInfo | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [resetSeq, setResetSeq] = useState(0);
  const { selectedId, selected, select, clear, next, prev } =
    useSelectedComponent(MONITOR_PARTS);
  const index = selected ? MONITOR_PARTS.findIndex((p) => p.id === selected.id) : -1;
  const openHotspot = useExplorer((s) => s.openHotspot);
  const closeHotspot = useExplorer((s) => s.closeHotspot);
  const setHotspotNav = useExplorer((s) => s.setHotspotNav);

  const handleReady = useCallback((info: ModelInfo) => setModelInfo(info), []);
  const handleReset = useCallback(() => clear(), [clear]);

  useEffect(() => {
    if (selectedId && selected) {
      openHotspot(selected, index, MONITOR_PARTS.length);
    } else {
      closeHotspot();
    }
  }, [selectedId, selected, index, openHotspot, closeHotspot]);

  useEffect(() => {
    setHotspotNav({ next, prev, reset: handleReset, close: handleReset });
  }, [next, prev, handleReset, setHotspotNav]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ fov: 40, near: 0.05, far: 100 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Lights />
          <Environment />
          <MonitorScene onReady={handleReady} />
          {modelInfo && (
            <MonitorRig
              modelInfo={modelInfo}
              selectedId={selectedId}
              onSelect={select}
              autoRotate={autoRotate}
              resetSeq={resetSeq}
            />
          )}
        </Suspense>
      </Canvas>
      <LoadingOverlay />
      {!selectedId && (
        <div className="viewer-toolbar">
          <button
            type="button"
            aria-label={autoRotate ? "Pause rotation" : "Start rotation"}
            onClick={() => setAutoRotate((v) => !v)}
          >
            {autoRotate ? (
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path fill="currentColor" d="M6 5h4v14H6zM14 5h4v14h-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path fill="currentColor" d="M8 5l11 7-11 7z" />
              </svg>
            )}
            {autoRotate ? "Pause" : "Rotate"}
          </button>
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
        </div>
      )}
      {mode === "fullscreen" && (
        <Sidebar
          component={selected}
          index={index}
          total={MONITOR_PARTS.length}
          mode={mode}
          name="Monitor"
          onClose={handleReset}
          onPrev={prev}
          onNext={next}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
