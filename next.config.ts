import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  images: {
    qualities: [75, 90],
  },
};

export default nextConfig;
