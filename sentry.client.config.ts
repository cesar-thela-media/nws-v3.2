/**
 * Sentry browser config — active only when NEXT_PUBLIC_SENTRY_DSN is set.
 * Do not put production secrets in git; configure DSN in Vercel/Railway env.
 */
import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || process.env.NODE_ENV,
    tracesSampleRate: Number(process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE || "0.1"),
    enabled: true,
  });
}
