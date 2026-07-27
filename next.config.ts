import type { NextConfig } from "next";

/**
 * Vercel sets VERCEL=1 and uses its own Next runtime — do not force standalone there.
 * Docker / Railway still need standalone (server.js in the image).
 */
const nextConfig: NextConfig = {
  trailingSlash: true,
  ...(!process.env.VERCEL ? { output: "standalone" as const } : {}),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.nws-homes.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
