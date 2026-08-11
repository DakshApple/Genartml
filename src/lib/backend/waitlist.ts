import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { saveWaitlist } from "./db";
import type { ApiResponse, WaitlistSubmission } from "./types";

export const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  source: z.string().optional(),
  productSlug: z.string().optional(),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

export const submitWaitlistForm = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    return waitlistSchema.parse(data);
  })
  .handler(async ({ data }): Promise<ApiResponse<WaitlistSubmission>> => {
    try {
      const item: WaitlistSubmission = {
        id: `waitlist_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        email: data.email.trim().toLowerCase(),
        source: data.source || "footer_newsletter",
        productSlug: data.productSlug,
        createdAt: new Date().toISOString(),
      };

      await saveWaitlist(item);

      return {
        success: true,
        message: "You're on the list! We'll keep you updated on new releases.",
        data: item,
      };
    } catch (err) {
      console.error("Error processing waitlist submission:", err);
      return {
        success: false,
        message: "Failed to subscribe. Please try again.",
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  });
