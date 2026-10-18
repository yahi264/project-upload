import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 90],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2048],
  },
};

export default nextConfig;
