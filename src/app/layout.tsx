import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ChatWidget } from "@/components/chat/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://computer-anatomy.example.com"),
  title: {
    default: "Computer Anatomy — Learn Computer Hardware Like Never Before",
    template: "%s — Computer Anatomy",
  },
  description:
    "An open-source, interactive 3D platform that teaches computer hardware. Peel apart the CPU, GPU, RAM, motherboard and more with cinematic WebGL visualizations.",
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Computer Anatomy — Learn Computer Hardware Like Never Before",
    description:
      "Explore the inside of a computer in 3D. An interactive educational platform for learning computer hardware.",
    type: "website",
    images: [{ url: "/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Computer Anatomy — Learn Computer Hardware",
    description: "An interactive 3D atlas for learning computer hardware.",
    images: ["/logo.png"],
  },
  icons: {
    icon: [
      { url: "/logo.png", sizes: "any", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: [{ url: "/logo.png", type: "image/png" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
