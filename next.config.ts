import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/church-clarity",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
