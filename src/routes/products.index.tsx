import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/layout";
import { Section, SectionHeading, Eyebrow, Pill } from "@/components/site/primitives";
import { products, otherProjects } from "@/lib/site-data";
import { productLogos } from "@/lib/logos";

const title = "Products — Evoluter, Extutor, Cortiva | Genartml";
const description =
  "A growing ecosystem of AI products built and owned by Genartml: Evoluter AI evaluation and Extutor AI learning are live, with Cortiva voice agents coming soon.";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsIndex,
});

function ProductsIndex() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-44">
        <div className="hero-glow pointer-events-none absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeading
             eyebrow="Built by Genartml"
             title="Products we own and build."
             lead="A growing ecosystem of AI-powered products built to solve problems across education, communication, productivity and the creator economy."
            className="animate-rise"
          />
        </div>
      </section>

      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {products.map((p) => (
            <article
              key={p.slug}
              className="glass-panel flex flex-col justify-between rounded-3xl p-9"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <Eyebrow>{p.category}</Eyebrow>
                  <span
                    className={`rounded-full border border-hairline px-3 py-1 font-mono text-[10px] tracking-[0.18em] uppercase ${
                      p.status === "Live"
                        ? "bg-foreground text-background"
                        : "text-muted-foreground"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
                {productLogos[p.logo ?? ""] ? (
                  <img
                    src={productLogos[p.logo!]}
                    alt={p.name}
                    className="logo-mono mt-6 h-9 w-auto"
                  />
                ) : (
                  <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight">
                    {p.name}
                  </h2>
                )}
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {p.oneLiner}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.capabilities.slice(0, 4).map((c) => (
                    <Pill key={c}>{c}</Pill>
                  ))}
                </div>
              </div>
              <div className="mt-9 flex flex-wrap gap-2.5">
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="inline-flex w-fit rounded-full border border-hairline bg-glass px-5 py-2.5 text-sm font-medium transition-colors hover:bg-glass-strong"
                >
                  {p.cta} →
                </Link>
                <a
                  href={p.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {p.website.replace("https://www.", "")}
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Also from the lab"
          title="Other projects and custom builds."
          lead="Genartml operates like a technology lab. Alongside our core products, we've explored and built other projects and client systems."
        />
        <div className="mt-8 flex flex-wrap gap-2">
          {otherProjects.map((o) => (
            <Pill key={o}>{o}</Pill>
          ))}
          <Pill>Custom client AI &amp; software projects</Pill>
        </div>
      </Section>
    </SiteLayout>
  );
}
