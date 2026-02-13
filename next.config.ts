import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  async redirects() {
    return [
      {
        source: "/ko",
        destination: "/",
        permanent: true,
      },
      {
        source: "/ko/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
