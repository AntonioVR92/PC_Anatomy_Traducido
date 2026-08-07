// The home page of the site. It shows the opening / landing view.

import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";

// Metadata is special Next.js information (title, description) used by the browser tab and search engines.
export const metadata: Metadata = {
  title: "Computer Anatomy — Learn Computer Hardware Like Never Before",
  description:
    "An open-source, interactive educational platform that teaches computer hardware in 3D. Explore the CPU, GPU, RAM, motherboard and more with cinematic WebGL visualizations built on Next.js, React Three Fiber and TypeScript.",
};

// This is the main component Next.js renders for the "/" URL. It just displays the LandingPage.
export default function Home() {
  return <LandingPage />;
}