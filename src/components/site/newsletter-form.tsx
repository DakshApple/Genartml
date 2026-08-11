import { useState } from "react";
import { toast } from "sonner";
import { submitWaitlistForm } from "@/lib/backend/waitlist";

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
    try {
      const res = await submitWaitlistForm({
        data: {
          email,
          source,
          productSlug,
        },
      });

      if (res.success) {
        setSubscribed(true);
        toast.success(res.message || "Thank you for subscribing!");
        setEmail("");
      } else {
        toast.error(res.message || "Failed to subscribe.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
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
