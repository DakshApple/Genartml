import { useState } from "react";
import { toast } from "sonner";
import { submitWaitlistForm } from "@/lib/backend/waitlist";

const WEB3FORMS_KEY = "653ea76b-fbc1-4ebb-a13b-58712e49ccd9";

interface NewsletterFormProps {
  source?: string;
  productSlug?: string;
  buttonText?: string;
  placeholder?: string;
  className?: string;
}

export function NewsletterForm({
  source = "footer_newsletter",
  productSlug,
  buttonText = "Subscribe →",
  placeholder = "Enter your work email...",
  className = "",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    let success = false;

    // 1. Try server function
    try {
      const res = await submitWaitlistForm({
        data: {
          email,
          source,
          productSlug,
        },
      });

      if (res && res.success) {
        success = true;
      }
    } catch (err) {
      console.warn("Server waitlist notice (falling back to direct API):", err);
    }

    // 2. Fallback to direct Web3Forms API
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
            subject: `New Newsletter/Waitlist Subscriber: ${email}`,
            email: email,
            source: source,
            productSlug: productSlug || "N/A",
          }),
        });

        const data = await web3Res.json();
        if (data.success) {
          success = true;
        }
      } catch (err) {
        console.error("Web3Forms waitlist error:", err);
      }
    }

    if (success) {
      setSubscribed(true);
      toast.success("Thank you for subscribing!");
      setEmail("");
    } else {
      toast.error("Failed to subscribe. Please try again.");
    }

    setLoading(false);
  };

  if (subscribed) {
    return (
      <div className={`rounded-2xl border border-hairline bg-glass/60 p-4 text-center text-sm font-medium text-foreground transition-all animate-rise ${className}`}>
        ✓ You are on the early access list! We will reach out soon.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-2.5 sm:flex-row sm:items-center ${className}`}>
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        disabled={loading}
        className="w-full min-w-0 flex-1 rounded-full border border-hairline bg-glass px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:bg-glass-strong focus:ring-1 focus:ring-ring disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={loading}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <>
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            Submitting...
          </>
        ) : (
          buttonText
        )}
      </button>
    </form>
  );
}
