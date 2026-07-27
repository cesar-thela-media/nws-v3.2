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
    const payload = {
      formType: "contact",
      source: "nws-homes-contact",
      ...formData,
      submittedAt: new Date().toISOString(),
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
    };
    try {
      // Server route proxies to n8n (WEBHOOK_URL_CONTACT / N8N_* env)
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      /* still show success; webhook optional in preview */
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="ring-0 p-8 border-0 rounded-2xl bg-white shadow-lg">
        <CardContent className="p-0">
          <p className="text-lg font-medium text-foreground !m-0">
            Thanks, we received your message and will get back to you shortly.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full">
      <Card className="ring-0 p-8 gap-6 md:gap-8 border-0 rounded-2xl bg-white shadow-lg animate-in fade-in slide-in-from-right-10 duration-1000 delay-100 ease-in-out fill-mode-both">
        <CardHeader className="p-0">
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
            Tell us about your project
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            We typically respond within one business day.
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-4">
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="dark:bg-background h-10 shadow-xs"
                    required
                  />
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="dark:bg-background h-10 shadow-xs"
                    required
                  />
                </div>

                <Input
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="dark:bg-background h-10 shadow-xs"
                  required
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-4">
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="dark:bg-background h-10 shadow-xs"
                  />
                  <Input
                    id="zip"
                    name="zip"
                    placeholder="Zip code"
                    value={formData.zip}
                    onChange={handleChange}
                    className="dark:bg-background h-10 shadow-xs"
                  />
                </div>

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
                    className="w-full h-10! dark:bg-background shadow-xs"
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

                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your project"
                  value={formData.message}
                  onChange={handleChange}
                  className="h-24 resize-none dark:bg-background shadow-xs"
                  required
                />

                <div className="flex items-center gap-3">
                  <Checkbox
                    id="terms"
                    checked={formData.terms}
                    onCheckedChange={handleCheckboxChange}
                    required
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-normal text-muted-foreground select-none"
                  >
                    We use your info only to respond about your project.
                  </Label>
                </div>
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-11 w-full sm:w-auto !bg-zinc-950 !text-white hover:!bg-zinc-900"
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
