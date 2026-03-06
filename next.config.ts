import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/church-clarity",
  images: { unoptimized: true },
};

export default nextConfig;
