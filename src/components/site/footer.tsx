import { Link } from "@tanstack/react-router";
import { products, services } from "@/lib/site-data";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { GenartmlLogo } from "./brand-logo";

export function Footer() {
  return (
    <footer className="border-t border-hairline pt-20 pb-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="glass-panel relative overflow-hidden rounded-3xl p-10 text-center md:p-20">
          <div className="hero-glow pointer-events-none absolute inset-0" />
          <h2 className="relative z-10 font-display text-3xl font-semibold tracking-tight text-balance md:text-5xl">
            Have something worth building?
          </h2>
          <p className="relative z-10 mx-auto mt-5 max-w-xl text-pretty text-muted-foreground">
            Tell us what you're trying to solve. We'll figure out where AI,
            automation or software can help.
          </p>
          <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="rounded-full bg-primary px-5 sm:px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start a Project →
            </Link>
            <Link
              to="/products"
              className="rounded-full border border-hairline bg-glass px-5 sm:px-6 py-3 text-sm font-medium transition-colors hover:bg-glass-strong"
            >
              Explore Our Products →
            </Link>
          </div>

          <div className="relative z-10 mx-auto mt-12 max-w-md border-t border-hairline pt-8">
            <p className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
              Subscribe to AI & Engineering Dispatches
            </p>
            <NewsletterForm
              source="footer_dispatches"
              buttonText="Subscribe"
              placeholder="Your work email address..."
              className="mt-4"
            />
          </div>
        </div>

        <div className="mt-20 grid gap-10 border-t border-hairline pt-12 md:grid-cols-4">
          <div>
            <GenartmlLogo className="h-7 w-auto" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              AI Products.
              <br />
              Intelligent Automation.
              <br />
              Custom Software.
            </p>
          </div>

          <FooterCol title="Products">
            {products.map((p) => (
              <Link
                key={p.slug}
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="block hover:text-foreground"
              >
                {p.name}
              </Link>
            ))}
          </FooterCol>

          <FooterCol title="Services">
            {services.slice(0, 6).map((s) => (
              <Link
                key={s.id}
                to="/solutions"
                hash={s.id}
                className="block hover:text-foreground"
              >
                {s.title}
              </Link>
            ))}
          </FooterCol>

          <FooterCol title="Company">
            <Link to="/about" className="block hover:text-foreground">
              About
            </Link>
            <Link to="/work" className="block hover:text-foreground">
              Work
            </Link>
            <Link to="/blog" className="block hover:text-foreground">
              Blog
            </Link>
            <Link to="/contact" className="block hover:text-foreground">
              Contact
            </Link>
          </FooterCol>
        </div>

        <p className="mt-12 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          © {new Date().getFullYear()} Genartml — Building Intelligence.
        </p>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
        {title}
      </p>
      <div className="mt-4 space-y-2 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}
