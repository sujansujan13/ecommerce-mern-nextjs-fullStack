import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // used env.local instead
  // async rewrites() {
  //   return [
  //     {
  //       // Jaba frontend le '/api/:path*' ma request garchha
  //       source: "/api/:path*",
  //       // Teslai backend port 5000 ma पठाइदिने (Forward garcha)
  //       destination: "http://localhost:4000/api/:path*",
  //     },
  //   ];
  // },
};

export default nextConfig;
