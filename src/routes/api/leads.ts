import { createFileRoute } from "@tanstack/react-router";
import { getLeads } from "@/lib/backend/db";

export const Route = createFileRoute("/api/leads")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const authHeader = request.headers.get("x-admin-key") || request.headers.get("authorization");
        const adminSecret = process.env.ADMIN_SECRET_KEY;

        // Protection check if ADMIN_SECRET_KEY is defined in environment
        if (adminSecret && authHeader !== adminSecret && authHeader !== `Bearer ${adminSecret}`) {
          return new Response(
            JSON.stringify({
              success: false,
              message: "Unauthorized access to leads endpoint.",
            }),
            {
              status: 401,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        const leads = await getLeads();
        return new Response(
          JSON.stringify({
            success: true,
            count: leads.length,
            leads,
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        );
      },
    },
  },
});
