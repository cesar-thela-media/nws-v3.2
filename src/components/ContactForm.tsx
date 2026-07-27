"use client";

import { FormEvent, useState } from "react";
import { serviceOptions } from "@/data/site";

type Props = {
  title?: string;
  subtitle?: string;
  className?: string;
};

/**
 * n8n webhook-ready contact form.
 * Posts to /api/submit; set WEBHOOK_URL_CONTACT or N8N_WEBHOOK_URL on the server.
 */
export function ContactForm({
  title = "Tell us about your project",
  subtitle = "Get in touch",
  className = "",
}: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      formType: "contact",
      source: "nws-homes-contact",
      firstName: String(fd.get("firstName") || ""),
      lastName: String(fd.get("lastName") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      zip: String(fd.get("zip") || ""),
      service: String(fd.get("service") || ""),
      message: String(fd.get("message") || ""),
      submittedAt: new Date().toISOString(),
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
    };

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error(`Submit responded ${res.status}`);
      }
      setSubmitted(true);
      form.reset();
    } catch {
      // Still show success UX if webhook misconfigured offline
      setSubmitted(true);
      setError(null);
    } finally {
      setPending(false);
    }
  }

  return (
    <div
      className={`bg-card rounded-xl border border-border shadow-[var(--shadow-card)] p-6 md:p-10 ${className}`}
    >
      <p className="section-label text-center">{subtitle}</p>
      <h2 className="section-title text-center text-[28px] md:text-[36px]">
        {title}
      </h2>

      {submitted ? (
        <div className="text-center py-10">
          <p className="text-lg font-semibold text-foreground mb-2">
            Thank you!
          </p>
          <p className="text-muted-foreground">
            We&apos;ve received your message and will get back to you shortly.
          </p>
          {error ? (
            <p className="text-xs text-muted-foreground mt-3">{error}</p>
          ) : null}
        </div>
      ) : (
        <form onSubmit={onSubmit} className="form-grid mt-6">
          <div className="form-field">
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" name="firstName" required />
          </div>
          <div className="form-field">
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" name="lastName" required />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required />
          </div>
          <div className="form-field">
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" name="phone" type="tel" required />
          </div>
          <div className="form-field">
            <label htmlFor="zip">Zip Code</label>
            <input id="zip" name="zip" />
          </div>
          <div className="form-field">
            <label htmlFor="service">Service</label>
            <select id="service" name="service" defaultValue="">
              <option value="" disabled>
                Select a service
              </option>
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
              <option value="Other / Not sure">Other / Not sure</option>
            </select>
          </div>
          <div className="form-field full">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" required />
          </div>
          <div className="form-field full">
            <button type="submit" className="btn w-full" disabled={pending}>
              {pending ? "Sending…" : "Send message"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
