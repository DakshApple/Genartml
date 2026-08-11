import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/layout";
import { Section, SectionHeading, Eyebrow, Pill } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { blogPosts } from "@/lib/blog-data";

const title = "Blog — AI Products, Automation & Business Insight | Genartml";
const description =
  "Practical writing from Genartml on AI automation, AI agents, LLM engineering, product design and the business case for AI. 20+ in-depth articles.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blog" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Genartml Blog",
          description,
          publisher: { "@type": "Organization", name: "Genartml" },
          blogPost: blogPosts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            description: p.description,
            datePublished: p.date,
            url: `/blog/${p.slug}`,
          })),
        }),
      },
    ],
  }),
  component: BlogIndex,
});

const sorted = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));

function BlogIndex() {
  const [active, setActive] = useState<string>("All");
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(sorted.map((p) => p.category)))],
    [],
  );
  const posts = active === "All" ? sorted : sorted.filter((p) => p.category === active);
  const [featured, ...rest] = posts;

  return (
    <SiteLayout>
      <section className="relative overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-44">
        <div className="hero-glow pointer-events-none absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeading
            eyebrow="Journal"
            title="Notes from building AI systems."
            lead="Field notes on AI automation, agents, evaluation and the business decisions around them — written from work we've actually shipped."
            className="animate-rise"
          />
          <div className="mt-10 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={`rounded-full border border-hairline px-4 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase transition-colors ${
                  active === c
                    ? "bg-foreground text-background"
                    : "bg-glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <Section>
        {featured ? (
          <Reveal>
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              className="glass-panel group relative block overflow-hidden rounded-3xl p-9 transition-colors hover:bg-glass-strong md:p-14"
            >
              <div className="hero-glow pointer-events-none absolute inset-0" />
              <div className="relative z-10 max-w-3xl">
                <div className="flex flex-wrap items-center gap-4">
                  <Eyebrow>{featured.category}</Eyebrow>
                  <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                    {formatDate(featured.date)} · {featured.readMinutes} min read
                  </span>
                </div>
                <h2 className="mt-5 font-display text-[1.75rem] leading-[1.1] font-semibold tracking-tight text-balance sm:text-3xl sm:leading-[1.05] md:text-5xl">
                  {featured.title}
                </h2>
                <p className="mt-5 text-pretty text-muted-foreground md:text-lg">
                  {featured.lead}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
                  Read article
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          </Reveal>
        ) : null}

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 40}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="glass-panel group flex h-full flex-col justify-between rounded-3xl p-8 transition-colors hover:bg-glass-strong"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <Eyebrow>{p.category}</Eyebrow>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {p.readMinutes} min
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl leading-snug font-semibold tracking-tight text-balance">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {p.tags.slice(0, 2).map((t) => (
                      <Pill key={t}>{t}</Pill>
                    ))}
                  </div>
                  <span className="text-sm transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
