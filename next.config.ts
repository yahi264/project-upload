import type { NextConfig } from "next";

// GITHUB_PAGES=true builds a static copy of the site for GitHub Pages (see scripts/deploy-pages.mjs).
const pages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = pages
  ? {
      output: "export",
      basePath,
      trailingSlash: true,
      distDir: ".next-pages",
      images: { loader: "custom", loaderFile: "./lib/image-loader.ts" },
    }
  : {
      images: {
        formats: ["image/avif", "image/webp"],
        qualities: [75, 85, 90],
        deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2048],
      },
    };

export default nextConfig;
