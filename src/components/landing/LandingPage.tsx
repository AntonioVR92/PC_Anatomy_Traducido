"use client";

import { Starfield } from "@/components/landing/Starfield";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HardwarePreview } from "@/components/landing/HardwarePreview";
import { LearningExperience } from "@/components/landing/LearningExperience";
import { Roadmap } from "@/components/landing/Roadmap";
import { Community } from "@/components/landing/Community";
import { Footer } from "@/components/landing/Footer";

export function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div aria-hidden="true" className="fixed inset-0 z-0">
        <Starfield />
      </div>

      <div className="relative z-10">
        <Navbar />
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