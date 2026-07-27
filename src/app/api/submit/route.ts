import { NextResponse } from "next/server";

export const runtime = "nodejs";

type SubmitBody = {
  formType?: string;
  source?: string;
  [key: string]: unknown;
};

/**
 * Server-side form proxy → n8n webhooks.
 * Keeps webhook URLs off the client when using server env vars.
 *
 * Env (first match wins per form type):
 * - contact: WEBHOOK_URL_CONTACT | N8N_WEBHOOK_URL | N8N_CONTACT_WEBHOOK_URL
 * - schedule: WEBHOOK_URL_SCHEDULE
 * - newsletter: WEBHOOK_URL_NEWSLETTER
 * - also accepts NEXT_PUBLIC_* aliases for local/preview convenience
 */
function resolveWebhookUrl(formType: string): string | undefined {
  const t = (formType || "contact").toLowerCase();
  const candidates =
    t === "schedule"
      ? [
          process.env.WEBHOOK_URL_SCHEDULE,
          process.env.N8N_WEBHOOK_URL_SCHEDULE,
        ]
      : t === "newsletter"
        ? [
            process.env.WEBHOOK_URL_NEWSLETTER,
            process.env.N8N_WEBHOOK_URL_NEWSLETTER,
          ]
        : [
            process.env.WEBHOOK_URL_CONTACT,
            process.env.N8N_WEBHOOK_URL,
            process.env.N8N_CONTACT_WEBHOOK_URL,
            process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL,
            process.env.NEXT_PUBLIC_N8N_CONTACT_WEBHOOK_URL,
          ];

  return candidates.find((u) => typeof u === "string" && u.trim().length > 0);
}

export async function POST(req: Request) {
  let body: SubmitBody;
  try {
    body = (await req.json()) as SubmitBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const formType = String(body.formType || "contact");
  const webhookUrl = resolveWebhookUrl(formType);

  const payload = {
    ...body,
    formType,
    source: body.source || "nws-homes",
    submittedAt: new Date().toISOString(),
  };

  if (!webhookUrl) {
    // Ready for credentials: succeed in preview so UI works without n8n yet
    console.warn("[api/submit] no webhook env for formType=", formType);
    return NextResponse.json({
      ok: true,
      delivered: false,
      reason: "webhook_not_configured",
    });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[api/submit] n8n status", res.status, text.slice(0, 200));
      return NextResponse.json(
        { ok: false, error: "webhook_failed", status: res.status },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[api/submit] n8n error", err);
    return NextResponse.json({ ok: false, error: "webhook_error" }, { status: 502 });
  }
}
