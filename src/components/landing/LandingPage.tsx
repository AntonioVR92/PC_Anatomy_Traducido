"use client";

import { Suspense, useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

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
    }, 100);

    return () => {
      window.clearInterval(timer);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const renderScene = useCallback(
    () => (
      <HeroCanvas
        modelScale={modelScale}
        modelPosition={modelPosition}
        modelRef={modelRef}
        keyLightRef={keyLightRef}
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
          <HardwarePreview />
          <LearningExperience />
          <Roadmap />
          <Community />
        </main>
        <Footer />
      </div>
    </div>
  );
}