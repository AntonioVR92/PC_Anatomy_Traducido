import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";

export const metadata: Metadata = {
  title: "Computer Anatomy — Learn Computer Hardware Like Never Before",
  description:
    "An open-source, interactive educational platform that teaches computer hardware in 3D. Explore the CPU, GPU, RAM, motherboard and more with cinematic WebGL visualizations built on Next.js, React Three Fiber and TypeScript.",
};

export default function Home() {
  return <LandingPage />;
}