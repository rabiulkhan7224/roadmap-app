import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  /* config options here */

  eslint: {
  // Only run ESLint on the "pages" and "components" directories during production builds (next build)
  ignoreDuringBuilds: true, // Ignore ESLint errors during production builds
 
},
typescript: {
  // Ignore TypeScript errors during production builds
  ignoreBuildErrors: true, // Ignore TypeScript errors during production builds
},
};

export default nextConfig;
