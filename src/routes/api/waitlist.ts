import { createFileRoute } from "@tanstack/react-router";
import { waitlistSchema } from "@/lib/backend/waitlist";
import { saveWaitlist } from "@/lib/backend/db";
import type { WaitlistSubmission } from "@/lib/backend/types";

export const Route = createFileRoute("/api/waitlist")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const parsed = waitlistSchema.parse(body);

          const item: WaitlistSubmission = {
            id: `waitlist_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            email: parsed.email.trim().toLowerCase(),
            source: parsed.source || "api_waitlist",
            productSlug: parsed.productSlug,
            createdAt: new Date().toISOString(),
          };

          await saveWaitlist(item);

          return new Response(
            JSON.stringify({
              success: true,
              message: "Subscribed to waitlist successfully.",
              data: item,
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
              message: "Invalid waitlist submission payload.",
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
