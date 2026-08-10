import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      // Old slugs that moved to SEO-friendly canonical URLs. Handled at the
      // routing layer so crawlers receive a real 307 HTTP redirect (redirect()
      // in the page body would be inlined client-side on static pages).
      { source: "/components/psu", destination: "/components/power-supply", permanent: false },
      { source: "/components/case", destination: "/components/pc-case", permanent: false },
    ];
  },
};

export default nextConfig;
