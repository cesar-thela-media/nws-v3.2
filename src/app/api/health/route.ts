import { NextResponse } from "next/server";

/**
 * Railway / load-balancer healthcheck.
 * Always 200 when the Node process is up - no secret env required.
 */
export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: "nws-homes",
      ts: new Date().toISOString(),
    },
    { status: 200 },
  );
}
