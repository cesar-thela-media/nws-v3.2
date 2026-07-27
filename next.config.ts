import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

/**
 * Vercel sets VERCEL=1 and uses its own Next runtime - do not force standalone there.
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

const sentryEnabled = Boolean(
  process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,
);

export default withSentryConfig(nextConfig, {
  // Silent when no org/project - safe without credentials
  silent: true,
  org: process.env.SENTRY_ORG || undefined,
  project: process.env.SENTRY_PROJECT || undefined,
  // Only upload source maps when auth token present
  authToken: process.env.SENTRY_AUTH_TOKEN || undefined,
  widenClientFileUpload: false,
  disableLogger: !sentryEnabled,
});
