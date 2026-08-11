import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/layout";
import { Section, SectionHeading, Eyebrow } from "@/components/site/primitives";
import { difference } from "@/lib/site-data";

const title = "About — An AI Product Lab | Genartml";
const description =
  "Genartml is an AI-first technology company building its own AI products while helping businesses automate workflows, build software and ship new products.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-44">
        <div className="hero-glow pointer-events-none absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeading
            eyebrow="About"
            title="Started with curiosity. Built through execution."
            className="animate-rise"
          />
        </div>
      </section>

      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <SectionHeading eyebrow="Company" title="An AI product lab." />
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              Genartml started with a simple belief: artificial intelligence
              would fundamentally change how products and businesses are built.
              Instead of waiting for that future, we decided to build toward it.
            </p>
            <p>
              Today, Genartml develops its own AI-powered products while helping
              businesses use AI to automate workflows, develop software and
              create new products.
            </p>
            <p>
              We operate like a technology lab — experimenting with new ideas,
              building products, testing emerging technologies and turning
              promising concepts into usable systems.
            </p>
            <p className="text-foreground">
              We're still early. And that's exactly what makes it exciting.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Why Genartml" title="We build, not just recommend." />
        <div className="mt-12 divide-y divide-hairline border-y border-hairline">
          {difference.map((d) => (
            <div key={d.step} className="grid gap-4 py-7 md:grid-cols-[80px_240px_1fr]">
              <span className="font-mono text-xs text-muted-foreground">{d.step}</span>
              <h3 className="font-display text-lg font-semibold tracking-tight">
                {d.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{d.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="glass-panel grid gap-10 rounded-3xl p-10 md:grid-cols-[0.8fr_1.2fr] md:p-14">
          <div>
            <Eyebrow>Founder</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
              Built by builders.
            </h2>
          </div>
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight">
              Daksh Suthar
            </p>
            <p className="mt-1 font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
              Founder, Genartml
            </p>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Daksh is a product-focused founder interested in artificial
              intelligence, software, business and building products from the
              ground up. His focus is simple: build useful things, learn
              quickly, keep moving.
            </p>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
