import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/layout";
import { Section, SectionHeading, Eyebrow, Pill } from "@/components/site/primitives";
import { products, type Product } from "@/lib/site-data";
import { productLogos } from "@/lib/logos";
import { NewsletterForm } from "@/components/site/newsletter-form";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product not found — Genartml" }, { name: "robots", content: "noindex" }],
      };
    }
    const t = `${loaderData.product.name} — ${loaderData.product.category} | Genartml`;
    const d = loaderData.product.oneLiner;
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/products/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/products/${params.slug}` }],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };

  return (
    <SiteLayout>
      <section className="relative overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-44">
        <div className="hero-glow pointer-events-none absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
          <Link
            to="/products"
            className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase hover:text-foreground"
          >
            ← All products
          </Link>
          <div className="mt-6 animate-rise">
            <Eyebrow>{product.category}</Eyebrow>
            {productLogos[product.logo ?? ""] ? (
              <>
                <img
                  src={productLogos[product.logo!]}
                  alt={product.name}
                  className="logo-mono mt-6 h-14 w-auto md:h-20"
                />
                <h1 className="sr-only">{product.name}</h1>
              </>
            ) : (
              <h1 className="mt-4 font-display text-[2.25rem] leading-[1.05] font-semibold tracking-tight sm:text-5xl md:text-7xl">
                {product.name}
              </h1>
            )}
            <span
              className={`mt-6 inline-flex rounded-full border border-hairline px-3 py-1 font-mono text-[10px] tracking-[0.18em] uppercase ${
                product.status === "Live"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground"
              }`}
            >
              {product.status}
            </span>
            <p className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground">
              {product.oneLiner}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/contact"
                className="inline-flex w-full justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto sm:px-6"
              >
                {product.cta} →
              </Link>
              <a
                href={product.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full flex-wrap items-center justify-center gap-2 rounded-full border border-hairline bg-glass px-5 py-3 text-center text-sm font-medium transition-colors hover:bg-glass-strong sm:w-auto sm:px-6"
              >
                {product.status === "Live" ? "Visit Website" : "Preview Site"}
                <span className="text-muted-foreground">
                  {product.website.replace("https://www.", "")}
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <SectionHeading eyebrow="Overview" title={`What is ${product.name}?`} />
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            {product.description.map((d) => (
              <p key={d}>{d}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <SectionHeading eyebrow="The problem" title="Why it exists." />
          <p className="text-base leading-relaxed text-muted-foreground">
            {product.problem}
          </p>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="How it works" title="From setup to outcome." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {product.how.map((h) => (
            <div key={h.step} className="glass-panel rounded-2xl p-6">
              <span className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground">
                {h.step}
              </span>
              <p className="mt-3 text-sm leading-relaxed">{h.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Capabilities" title="What it does." />
            <div className="mt-8 flex flex-wrap gap-2">
              {product.capabilities.map((c) => (
                <Pill key={c}>{c}</Pill>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Use cases" title="Who it's for." />
            <ul className="mt-8 divide-y divide-hairline border-y border-hairline">
              {product.useCases.map((u) => (
                <li key={u} className="py-4 text-sm text-muted-foreground">
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {product.extra ? (
        <Section>
          <SectionHeading eyebrow={product.extra.label} title={`${product.name} focus.`} />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {product.extra.items.map((i) => (
              <span
                key={i}
                className="glass-panel rounded-2xl px-5 sm:px-6 py-4 font-display text-lg font-semibold tracking-tight"
              >
                {i}
              </span>
            ))}
          </div>
        </Section>
      ) : null}

      <Section>
        <div className="glass-panel rounded-3xl p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <Eyebrow>Early Access & Updates</Eyebrow>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                Get early updates for {product.name}.
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Enter your email to receive product release notes, private beta invites, and custom setup guides.
              </p>
            </div>
            <div>
              <NewsletterForm
                source={`product_${product.slug}`}
                productSlug={product.slug}
                buttonText="Request Early Access"
                placeholder="Enter your work email..."
              />
            </div>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
