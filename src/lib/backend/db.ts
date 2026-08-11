import fs from "node:fs";
import path from "node:path";
import type { LeadSubmission, WaitlistSubmission } from "./types";

const DATA_DIR = path.resolve(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const WAITLIST_FILE = path.join(DATA_DIR, "waitlist.json");

// Ensure data directory and storage files exist locally
function ensureStorage() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(LEADS_FILE)) {
      fs.writeFileSync(LEADS_FILE, "[]", "utf-8");
    }
    if (!fs.existsSync(WAITLIST_FILE)) {
      fs.writeFileSync(WAITLIST_FILE, "[]", "utf-8");
    }
  } catch (err) {
    console.error("Local disk storage initialization notice:", err);
  }
}

/** Save a new client lead */
export async function saveLead(lead: LeadSubmission): Promise<void> {
  // 1. Save to local storage file backup
  try {
    ensureStorage();
    let leads: LeadSubmission[] = [];
    if (fs.existsSync(LEADS_FILE)) {
      const content = fs.readFileSync(LEADS_FILE, "utf-8");
      leads = JSON.parse(content || "[]");
    }
    leads.unshift(lead);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write lead to local storage:", err);
  }

  // 2. Sync to Supabase if configured
  await syncToSupabase("leads", lead);

  // 3. Dispatch webhooks (Discord / Slack) if configured
  await dispatchWebhook(lead);

  // 4. Send Instant Email Notification (Web3Forms / FormSubmit / Resend)
  await sendEmailNotification(lead);
}

/** Save a waitlist / newsletter submission */
export async function saveWaitlist(item: WaitlistSubmission): Promise<void> {
  // 1. Save to local storage
  try {
    ensureStorage();
    let list: WaitlistSubmission[] = [];
    if (fs.existsSync(WAITLIST_FILE)) {
      const content = fs.readFileSync(WAITLIST_FILE, "utf-8");
      list = JSON.parse(content || "[]");
    }
    // Prevent duplicate emails
    if (!list.some((w) => w.email.toLowerCase() === item.email.toLowerCase())) {
      list.unshift(item);
      fs.writeFileSync(WAITLIST_FILE, JSON.stringify(list, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Failed to write waitlist to local storage:", err);
  }

  // 2. Sync to Supabase if configured
  await syncToSupabase("waitlist", item);

  // 3. Email notification for new waitlist subscriber if NOTIFICATION_EMAIL is set
  await sendWaitlistNotification(item);
}

/** Get all recorded leads (for admin route) */
export async function getLeads(): Promise<LeadSubmission[]> {
  try {
    ensureStorage();
    if (fs.existsSync(LEADS_FILE)) {
      const content = fs.readFileSync(LEADS_FILE, "utf-8");
      return JSON.parse(content || "[]");
    }
  } catch (err) {
    console.error("Failed to read leads:", err);
  }
  return [];
}

/** Supabase REST API Client Sync */
async function syncToSupabase(table: string, payload: Record<string, unknown>): Promise<void> {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) return;

  try {
    const endpoint = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/${table}`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      console.warn(`Supabase insert to ${table} failed: ${res.status} ${text}`);
    }
  } catch (err) {
    console.warn(`Supabase sync error for ${table}:`, err);
  }
}

/** Discord or Slack Webhook Live Alert */
async function dispatchWebhook(lead: LeadSubmission): Promise<void> {
  const discordUrl = process.env.DISCORD_WEBHOOK_URL;
  const slackUrl = process.env.SLACK_WEBHOOK_URL;

  const summary = `🚨 **New Lead Received — Genartml**
• **Name:** ${lead.name}
• **Email:** ${lead.email}
• **Company:** ${lead.company || "N/A"}
• **What building:** ${lead.building}
• **Problem to solve:** ${lead.problem || "N/A"}
• **Budget:** ${lead.budget || "N/A"}
• **Timeline:** ${lead.timeline || "N/A"}
${lead.blueprint?.summary ? `• **Blueprint Specs:** ${lead.blueprint.summary}` : ""}`;

  if (discordUrl) {
    try {
      await fetch(discordUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: summary }),
      });
    } catch (err) {
      console.warn("Discord webhook dispatch failed:", err);
    }
  }

  if (slackUrl) {
    try {
      await fetch(slackUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: summary }),
      });
    } catch (err) {
      console.warn("Slack webhook dispatch failed:", err);
    }
  }
}

/** Instant Email Dispatch (Web3Forms / FormSubmit / Resend) */
async function sendEmailNotification(lead: LeadSubmission): Promise<void> {
  const notificationEmail = process.env.NOTIFICATION_EMAIL || "hello@genartml.com";
  const web3Key = process.env.WEB3FORMS_ACCESS_KEY || process.env.WEB3FORMS_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;

  // Option A: Web3Forms (Free instant email forwarding)
  if (web3Key) {
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: web3Key,
          subject: `New Lead: ${lead.name} (${lead.company || lead.email})`,
          name: lead.name,
          email: lead.email,
          company: lead.company || "N/A",
          building: lead.building,
          problem: lead.problem || "N/A",
          budget: lead.budget || "N/A",
          timeline: lead.timeline || "N/A",
          blueprint: lead.blueprint?.summary || "N/A",
        }),
      });
      return;
    } catch (err) {
      console.warn("Web3Forms email dispatch failed:", err);
    }
  }

  // Option B: Resend API
  if (resendApiKey) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Genartml Lead Bot <notifications@genartml.com>",
          to: [notificationEmail],
          subject: `New Lead: ${lead.name} (${lead.company || lead.email})`,
          html: `
            <h2>New Contact Inquiry</h2>
            <p><strong>Name:</strong> ${lead.name}</p>
            <p><strong>Email:</strong> ${lead.email}</p>
            <p><strong>Company:</strong> ${lead.company || "N/A"}</p>
            <p><strong>What they are building:</strong> ${lead.building}</p>
            <p><strong>Problem to solve:</strong> ${lead.problem || "N/A"}</p>
            <p><strong>Budget:</strong> ${lead.budget || "N/A"}</p>
            <p><strong>Timeline:</strong> ${lead.timeline || "N/A"}</p>
            ${lead.blueprint?.summary ? `<p><strong>Blueprint:</strong> ${lead.blueprint.summary}</p>` : ""}
          `,
        }),
      });
      return;
    } catch (err) {
      console.warn("Resend email notification failed:", err);
    }
  }

  // Option C: FormSubmit AJAX Fallback (100% Free, zero config if notification email is present)
  if (notificationEmail) {
    try {
      await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(notificationEmail)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `New Lead: ${lead.name}`,
          Name: lead.name,
          Email: lead.email,
          Company: lead.company || "N/A",
          Building: lead.building,
          Problem: lead.problem || "N/A",
          Budget: lead.budget || "N/A",
          Timeline: lead.timeline || "N/A",
          Blueprint: lead.blueprint?.summary || "N/A",
        }),
      });
    } catch (err) {
      console.warn("FormSubmit email notification failed:", err);
    }
  }
}

/** Email notification for waitlist subscribers */
async function sendWaitlistNotification(item: WaitlistSubmission): Promise<void> {
  const notificationEmail = process.env.NOTIFICATION_EMAIL || "hello@genartml.com";
  const web3Key = process.env.WEB3FORMS_ACCESS_KEY || process.env.WEB3FORMS_KEY;

  if (web3Key) {
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: web3Key,
          subject: `New Newsletter/Waitlist Subscriber: ${item.email}`,
          email: item.email,
          source: item.source || "website",
          productSlug: item.productSlug || "N/A",
        }),
      });
    } catch {
      /* ignore */
    }
  } else if (notificationEmail) {
    try {
      await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(notificationEmail)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `New Waitlist Subscriber: ${item.email}`,
          Email: item.email,
          Source: item.source || "website",
          Product: item.productSlug || "N/A",
        }),
      });
    } catch {
      /* ignore */
    }
  }
}
