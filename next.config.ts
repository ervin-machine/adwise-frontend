import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export - Hostinger (and shared hosting generally) just serves
  // files, there's no Node server to run `next start` or middleware.ts on.
  output: "export",
  // Shared hosts generally serve /page/index.html for a request to /page/,
  // not /page.html for a request to /page - this matches that convention.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
