"use client";

import { Suspense, useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import * as THREE from "three";
import { Header } from "@/components/landing/hero/Header";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HardwarePreview } from "@/components/landing/HardwarePreview";
import { LearningExperience } from "@/components/landing/LearningExperience";
import { Roadmap } from "@/components/landing/Roadmap";
import { Community } from "@/components/landing/Community";
import { Footer } from "@/components/landing/Footer";
import { HeroCanvas } from "@/components/landing/hero/HeroCanvas";

gsap.registerPlugin(ScrollTrigger);

export function LandingPage() {
  const modelScale = 18;
  const modelPosition: [number, number, number] = [3, 1.5, -0.9];
  const modelRef = useRef<THREE.Group>(null);
  const keyLightRef = useRef<THREE.SpotLight>(null);
  const meshesRef = useRef<
    | Array<{
        mesh: THREE.Mesh;
        baseX: number;
        baseY: number;
        baseZ: number;
        dirX: number;
        dirY: number;
        dirZ: number;
      }>
    | null
  >(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Smooth scrolling via Lenis, synced with GSAP ScrollTrigger
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const timer = window.setInterval(() => {
      if (!modelRef.current || !pageRef.current) return;
      window.clearInterval(timer);

      const model = modelRef.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      // Scene 1 — zoom out over the first quarter of the scroll
      tl.to(
        model.scale,
        {
          x: 0.35,
          y: 0.35,
          z: 0.35,
          duration: 1,
          ease: "none",
        },
        0
      );

      // Scene 2 — rotate the model and move it to center
      tl.to(
        model.position,
        {
          x: 0,
          y: 0,
          duration: 1,
          ease: "none",
        },
        1
      );
      tl.to(
        model.rotation,
        {
          y: Math.PI * 2,
          duration: 1,
          ease: "none",
        },
        1
      );

      // Scene 3 — light the model with the stage key light and face it front
      tl.to(
        model.rotation,
        {
          y: 0,
          z: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        2
      );
      if (keyLightRef.current) {
        tl.fromTo(
          keyLightRef.current,
          { intensity: 0 },
          {
            intensity: 6,
            duration: 1,
            ease: "power2.inOut",
          },
          2
        );
      }

      // Scene 4 — explode: every mesh flies outward from the model center
      const meshes = meshesRef.current;
      if (meshes && meshes.length) {
        const targets = meshes.map((m) => {
          const rand = 0.35;
          const dist = Math.hypot(m.baseX, m.baseY, m.baseZ);
          const explode = dist * 2.5 + 0.6;
          const dir = new THREE.Vector3(m.dirX, m.dirY, m.dirZ).lerp(
            new THREE.Vector3(
              (Math.random() - 0.5) * rand,
              (Math.random() - 0.5) * rand,
              (Math.random() - 0.5) * rand
            ),
            0.35
          );
          return {
            mesh: m.mesh,
            x: m.baseX + dir.x * explode,
            y: m.baseY + dir.y * explode,
            z: m.baseZ + dir.z * explode,
            rx: (Math.random() - 0.5) * 2,
            ry: (Math.random() - 0.5) * 2,
            rz: (Math.random() - 0.5) * 2,
          };
        });

        tl.to(
          targets.map((t) => t.mesh.position),
          {
            x: (i) => targets[i].x,
            y: (i) => targets[i].y,
            z: (i) => targets[i].z,
            duration: 1,
            ease: "power3.inOut",
          },
          3
        );

        tl.to(
          targets.map((t) => t.mesh.rotation),
          {
            x: (i) => targets[i].rx,
            y: (i) => targets[i].ry,
            z: (i) => targets[i].rz,
            duration: 1,
            ease: "power3.inOut",
          },
          3
        );
      }
    }, 100);

    return () => {
      window.clearInterval(timer);
      gsap.ticker.remove(raf);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      lenis.destroy();
    };
  }, []);

  const renderScene = useCallback(
    () => (
      <HeroCanvas
        modelScale={modelScale}
        modelPosition={modelPosition}
        modelRef={modelRef}
        keyLightRef={keyLightRef}
        meshesRef={meshesRef}
      />
    ),
    []
  );

  return (
    <div ref={pageRef} className="relative min-h-screen bg-background text-foreground">
      {/* Fixed global 3D background */}
      <div aria-hidden="true" className="fixed inset-0 z-0">
        {renderScene()}
      </div>

      {/* Global legibility gradient — black on the left, transparent on the right */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[5] bg-gradient-to-r from-black/80 via-black/35 to-transparent"
      />

      {/* Scrollable content above the 3D scene */}
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Features />
          <Roadmap />
          <Community />
        </main>
        <Footer />
      </div>
    </div>
  );
}