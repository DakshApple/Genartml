import { createFileRoute } from "@tanstack/react-router";
import { contactFormSchema } from "@/lib/backend/contact";
import { saveLead } from "@/lib/backend/db";
import type { LeadSubmission } from "@/lib/backend/types";

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const parsed = contactFormSchema.parse(body);

          const lead: LeadSubmission = {
            id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            name: parsed.name.trim(),
            email: parsed.email.trim().toLowerCase(),
            company: parsed.company?.trim(),
            building: parsed.building.trim(),
            problem: parsed.problem?.trim(),
            budget: parsed.budget?.trim(),
            timeline: parsed.timeline?.trim(),
            blueprint: parsed.blueprint,
            source: parsed.source || "api_contact",
            createdAt: new Date().toISOString(),
            status: "new",
          };

          await saveLead(lead);

          return new Response(
            JSON.stringify({
              success: true,
              message: "Inquiry received successfully.",
              data: lead,
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        } catch (err) {
          return new Response(
            JSON.stringify({
              success: false,
              message: "Invalid contact submission payload.",
              error: err instanceof Error ? err.message : String(err),
            }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            },
          );
        }
      },
    },
  },
});
