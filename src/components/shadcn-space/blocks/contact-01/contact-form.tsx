"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { serviceOptions } from "@/data/site";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zip: string;
  service: string;
  message: string;
  terms: boolean;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zip: "",
    service: "",
    message: "",
    terms: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, terms: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPending(true);
    const payload = {
      formType: "contact",
      source: "nws-homes-contact",
      ...formData,
      submittedAt: new Date().toISOString(),
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
    };
    try {
      // Server route proxies to n8n (WEBHOOK_URL_CONTACT / N8N_* env)
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; delivered?: boolean };
      if (!response.ok || !result.ok) throw new Error("submission_failed");
      setSubmitted(true);
    } catch {
      setError("We couldn’t send your message. Please try again or call (281) 299-2309.");
    } finally {
      setPending(false);
    }
  };

  if (submitted) {
    return (
      <Card className="ring-0 p-5 sm:p-8 border-0 rounded-2xl bg-white shadow-lg w-full max-w-full">
        <CardContent className="p-0">
          <p className="text-lg font-medium text-foreground !m-0">
            Thanks, we received your message and will get back to you shortly.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-full min-w-0">
      {/* No slide-from-right on mobile - that animation left the card visually offset */}
      <Card className="ring-0 p-5 sm:p-7 md:p-8 gap-5 sm:gap-6 md:gap-8 border-0 rounded-2xl bg-white shadow-lg w-full max-w-full min-w-0">
        <CardHeader className="p-0 space-y-1">
          <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight text-foreground !m-0">
            We&apos;re Looking Forward to Work With You
          </CardTitle>
          <p className="text-sm text-muted-foreground !m-0">
            We typically respond within one business day.
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
            <div role="status" aria-live="polite" className="min-h-5 text-sm text-red-700">{error}</div>
            <div className="flex flex-col gap-5 sm:gap-6">
              <div className="flex flex-col gap-4 sm:gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Label htmlFor="firstName" className="sr-only">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="dark:bg-background h-11 sm:h-10 shadow-xs w-full min-w-0"
                    required
                  />
                  <Label htmlFor="lastName" className="sr-only">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="dark:bg-background h-11 sm:h-10 shadow-xs w-full min-w-0"
                    required
                  />
                </div>

                <Label htmlFor="email" className="sr-only">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="dark:bg-background h-11 sm:h-10 shadow-xs w-full min-w-0"
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Label htmlFor="phone" className="sr-only">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="dark:bg-background h-11 sm:h-10 shadow-xs w-full min-w-0"
                  />
                  <Label htmlFor="zip" className="sr-only">Zip Code</Label>
                  <Input
                    id="zip"
                    name="zip"
                    placeholder="Zip code"
                    value={formData.zip}
                    onChange={handleChange}
                    className="dark:bg-background h-11 sm:h-10 shadow-xs w-full min-w-0"
                  />
                </div>

                <Label htmlFor="service" className="sr-only">Service of Interest</Label>
                <Select
                  value={formData.service}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      service: value ?? "",
                    }))
                  }
                >
                  <SelectTrigger
                    id="service"
                    className="w-full min-w-0 h-11! sm:h-10! dark:bg-background shadow-xs"
                  >
                    <SelectValue placeholder="Service of interest" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                    <SelectItem value="Other / Not sure">
                      Other / Not sure
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Label htmlFor="message" className="sr-only">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your project"
                  value={formData.message}
                  onChange={handleChange}
                  className="h-24 resize-none dark:bg-background shadow-xs w-full min-w-0"
                  required
                />

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={formData.terms}
                    onCheckedChange={handleCheckboxChange}
                    required
                    className="mt-0.5 shrink-0"
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-normal text-muted-foreground select-none leading-snug"
                  >
                    We use your info only to respond about your project.
                  </Label>
                </div>
              </div>
              {pending ? <p className="text-sm text-muted-foreground" role="status">Sending…</p> : null}
              <Button
                type="submit"
                size="lg"
                className="h-11 w-full !bg-zinc-950 !text-white hover:!bg-zinc-900"
                disabled={pending}
              >
                Send message
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;
