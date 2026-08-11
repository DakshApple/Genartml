import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { saveLead } from "./db";
import type { ApiResponse, LeadSubmission } from "./types";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  building: z.string().min(3, "Please describe what you are building"),
  problem: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  blueprint: z
    .object({
      where: z.string().optional(),
      what: z.string().optional(),
      scale: z.string().optional(),
      summary: z.string().optional(),
    })
    .optional(),
  source: z.string().optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export const submitContactForm = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    return contactFormSchema.parse(data);
  })
  .handler(async ({ data }): Promise<ApiResponse<LeadSubmission>> => {
    try {
      const lead: LeadSubmission = {
        id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        company: data.company?.trim(),
        building: data.building.trim(),
        problem: data.problem?.trim(),
        budget: data.budget?.trim(),
        timeline: data.timeline?.trim(),
        blueprint: data.blueprint,
        source: data.source || "contact_page",
        createdAt: new Date().toISOString(),
        status: "new",
      };

      await saveLead(lead);

      return {
        success: true,
        message: "Thank you for reaching out! Genartml has received your inquiry and will be in touch shortly.",
        data: lead,
      };
    } catch (err) {
      console.error("Error processing contact form submission:", err);
      return {
        success: false,
        message: "Failed to submit contact form. Please try again.",
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  });
