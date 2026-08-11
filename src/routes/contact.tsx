import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/layout";
import { Eyebrow } from "@/components/site/primitives";
import { submitContactForm } from "@/lib/backend/contact";

const title = "Contact — Let's Build Something | Genartml";
const description =
  "Tell Genartml what you're trying to solve. We'll figure out where AI, automation or software can help.";

const WEB3FORMS_KEY = "653ea76b-fbc1-4ebb-a13b-58712e49ccd9";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const field =
  "w-full rounded-xl border border-hairline bg-glass px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:bg-glass-strong focus:ring-1 focus:ring-ring disabled:opacity-50";

function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    building: "",
    problem: "",
    budget: "",
    timeline: "",
  });

  const [blueprintText, setBlueprintText] = useState("");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("genartml:brief");
      if (saved) {
        setBlueprintText(saved);
        setFormData((prev) => ({ ...prev, building: saved }));
        window.localStorage.removeItem("genartml:brief");
      }
    } catch {
      /* storage unavailable */
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!formData.building.trim()) {
      toast.error("Please tell us what you are building.");
      return;
    }

    setLoading(true);

    const payload = {
      name: formData.name.trim(),
      company: formData.company.trim(),
      email: formData.email.trim().toLowerCase(),
      building: formData.building.trim(),
      problem: formData.problem.trim(),
      budget: formData.budget.trim(),
      timeline: formData.timeline.trim(),
      blueprint: blueprintText ? { summary: blueprintText } : undefined,
      source: "contact_page",
    };

    let success = false;

    // 1. Attempt server function
    try {
      const res = await submitContactForm({ data: payload });
      if (res && res.success) {
        success = true;
      }
    } catch (err) {
      console.warn("Server function notice (falling back to direct API):", err);
    }

    // 2. Direct Web3Forms API dispatch fallback
    if (!success) {
      try {
        const web3Res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: `New Lead: ${payload.name} (${payload.company || payload.email})`,
            name: payload.name,
            email: payload.email,
            company: payload.company || "N/A",
            building: payload.building,
            problem: payload.problem || "N/A",
            budget: payload.budget || "N/A",
            timeline: payload.timeline || "N/A",
            blueprint: payload.blueprint?.summary || "N/A",
          }),
        });

        const data = await web3Res.json();
        if (data.success) {
          success = true;
        }
      } catch (err) {
        console.error("Web3Forms direct dispatch error:", err);
      }
    }

    if (success) {
      setSent(true);
      toast.success("Thanks — we'll get back to you shortly!");
    } else {
      toast.error("Submission failed. Please try again or email hello@genartml.com directly.");
    }

    setLoading(false);
  };

  return (
    <SiteLayout>
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 md:pt-44">
        <div className="hero-glow pointer-events-none absolute inset-0" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-16 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="animate-rise">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-5 font-display text-[2.25rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
              Let's build something.
            </h1>
            <p className="mt-6 max-w-md text-lg text-pretty text-muted-foreground">
              Tell us what you're trying to solve. We'll figure out where AI,
              automation or software can help.
            </p>

            {blueprintText ? (
              <div className="mt-8 rounded-2xl border border-hairline bg-glass p-5">
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                  Selected Blueprint Specs
                </span>
                <p className="mt-2 text-sm text-foreground font-medium">"{blueprintText}"</p>
              </div>
            ) : null}

            <div className="mt-10 space-y-2 font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
              <p>hello@genartml.com</p>
              <p>Projects · Partnerships · Careers</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass-panel space-y-4 rounded-3xl p-8 md:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={loading || sent}
                placeholder="Name"
                className={field}
              />
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                disabled={loading || sent}
                placeholder="Company"
                className={field}
              />
            </div>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading || sent}
              placeholder="Email"
              className={field}
            />
            <textarea
              required
              name="building"
              rows={3}
              value={formData.building}
              onChange={handleChange}
              disabled={loading || sent}
              placeholder="What are you building?"
              className={field}
            />
            <textarea
              name="problem"
              rows={3}
              value={formData.problem}
              onChange={handleChange}
              disabled={loading || sent}
              placeholder="What problem are you trying to solve?"
              className={field}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                disabled={loading || sent}
                placeholder="Budget / project range"
                className={field}
              />
              <input
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                disabled={loading || sent}
                placeholder="Timeline"
                className={field}
              />
            </div>

            <button
              type="submit"
              disabled={loading || sent}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 sm:px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Sending Inquiry...
                </>
              ) : sent ? (
                "Sent ✓ — We'll be in touch!"
              ) : (
                "Talk to Genartml →"
              )}
            </button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
