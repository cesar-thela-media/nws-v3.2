/**
 * Client instrumentation - loads browser Sentry when NEXT_PUBLIC_SENTRY_DSN is set.
 */
import * as Sentry from "@sentry/nextjs";
import "../sentry.client.config";

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
