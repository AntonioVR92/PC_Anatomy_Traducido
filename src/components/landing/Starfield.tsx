"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 2200;

function StarLayer() {
  const ref = useRef<THREE.Points>(null);
  const { pointer } = useThree();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const phases = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 14 + Math.random() * 26;
      positions[i * 3] = Math.sin(phi) * Math.cos(theta) * radius;
      positions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * radius;
      positions[i * 3 + 2] = Math.cos(phi) * radius;
      sizes[i] = 0.15 + Math.random() * 0.55;
      phases[i] = Math.random() * Math.PI * 2;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    return geo;
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          attribute float aSize;
          attribute float aPhase;
          varying float vTwinkle;
          uniform float uTime;
          void main() {
            vTwinkle = 0.55 + 0.45 * sin(uTime * (1.2 + aPhase * 0.4) + aPhase * 2.0);
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = aSize * (320.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          varying float vTwinkle;
          void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float d = length(uv);
            float glow = smoothstep(0.5, 0.0, d);
            vec3 color = mix(vec3(0.45, 0.6, 0.9), vec3(0.85, 0.92, 1.0), vTwinkle);
            gl_FragColor = vec4(color, glow * vTwinkle);
          }
        `,
      }),
    []
  );

  useFrame((_, delta) => {
    material.uniforms.uTime.value += delta;
    const { x, y } = pointer;
    ref.current!.rotation.y = x * 0.5;
    ref.current!.rotation.x = -y * 0.3;
    ref.current!.rotation.z += delta * 0.004;
  });

  return <points ref={ref} geometry={geometry} material={material} />;
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const COUNT_P = 46;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(COUNT_P * 3);
    const sizes = new Float32Array(COUNT_P);
    for (let i = 0; i < COUNT_P; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      sizes[i] = 0.3 + Math.random() * 0.8;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          attribute float aSize;
          uniform float uTime;
          varying float vAlpha;
          void main() {
            vec3 p = position;
            p.y += sin(uTime * 0.3 + position.x * 0.5) * 1.2;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = aSize * (240.0 / -mv.z);
            vAlpha = 0.18;
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          varying float vAlpha;
          void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float d = length(uv);
            float glow = smoothstep(0.5, 0.0, d);
            gl_FragColor = vec4(0.55, 0.72, 1.0, glow * vAlpha);
          }
        `,
      }),
    []
  );

  useFrame((_, delta) => {
    material.uniforms.uTime.value += delta;
    if (ref.current) ref.current.rotation.y += delta * 0.01;
  });

  return <points ref={ref} geometry={geometry} material={material} />;
}

function Glow() {
  return (
    <mesh>
      <sphereGeometry args={[10, 32, 32]} />
      <meshBasicMaterial
        color="#0b1f3f"
        transparent
        opacity={0.28}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

export function Starfield() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 60 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <fog attach="fog" args={["#05070d", 12, 42]} />
      <StarLayer />
      <ParticleField />
      <Glow />
    </Canvas>
  );
}