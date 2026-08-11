import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/layout";
import { Ecosystem } from "@/components/site/ecosystem";
import { Section, SectionHeading, Eyebrow } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { SpotlightCard, trackSpotlight } from "@/components/site/spotlight-card";
import { MagneticLink } from "@/components/site/magnetic";
import { SystemBuilder } from "@/components/site/builder";
import {
  audiences,
  difference,
  process,
  products,
  services,
} from "@/lib/site-data";
import { productLogos } from "@/lib/logos";

const title = "Genartml — AI Products, Automation & Custom Software";
const description =
  "Genartml is an AI-first technology company building its own AI products — Evoluter, Extutor and Cortiva — and custom AI software, agents and automation for businesses.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Genartml",
          description,
          url: "/",
          founder: { "@type": "Person", name: "Daksh Suthar" },
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-20 md:pt-44">
        <div className="hero-glow pointer-events-none absolute inset-0" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-rise">
            <Eyebrow>AI Products · Intelligent Automation · Custom Software</Eyebrow>
            <h1 className="text-sheen mt-6 font-display text-[2.25rem] leading-[1.02] sm:text-[2.75rem] sm:leading-[0.98] font-semibold tracking-tight text-balance md:text-7xl">
              We build what AI makes possible.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
               Genartml builds AI-powered products, intelligent automation
               systems and custom software that help businesses move faster,
               operate smarter and create new possibilities.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <MagneticLink
                to="/products"
                className="w-full rounded-full bg-primary px-5 py-3 text-center text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto sm:px-6"
              >
                Explore Our Products
              </MagneticLink>
              <MagneticLink
                to="/contact"
                className="w-full rounded-full border border-hairline bg-glass px-5 py-3 text-center text-sm font-medium transition-colors hover:bg-glass-strong sm:w-auto sm:px-6"
              >
                Build With Us
              </MagneticLink>
            </div>
          </div>
          <div className="animate-float">
            <Ecosystem />
          </div>
        </div>
        <Marquee />
      </section>

      {/* WHAT IS GENARTML */}
      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <SectionHeading
            eyebrow="What is Genartml?"
            title={<>We don't just talk about AI. We build with it.</>}
          />
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
               Genartml is an AI-first technology company focused on building
               intelligent products and solving real-world problems through
               artificial intelligence, automation and software.
            </p>
            <p>
              We operate across two worlds. We build our own products from the
              ground up, and we work with businesses to design and develop
              custom AI-powered systems.
            </p>
            <p className="text-foreground">
              Find a real problem. Build the right technology. Make it useful.
            </p>
          </div>
        </div>
      </Section>

      {/* TWO SIDES */}
      <Section>
        <Reveal className="grid gap-6 md:grid-cols-2">
          <TwoSideCard
            eyebrow="Side A"
            title="Our Products"
            text="Products built, owned and developed by Genartml."
            to="/products"
            cta="Explore Products →"
          />
          <TwoSideCard
            eyebrow="Side B"
            title="AI Development & Automation"
            text="Custom AI systems, software, automation and intelligent solutions built for businesses."
            to="/solutions"
            cta="Work With Us →"
          />
        </Reveal>
      </Section>

      {/* INTERACTIVE BUILDER */}
      <Section id="builder">
        <Reveal>
          <SectionHeading
            eyebrow="Play with it"
            title="Shape your build in thirty seconds."
            lead="Tell us where the friction is and watch the blueprint assemble itself. Send it over and we'll start from there."
          />
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <SystemBuilder />
        </Reveal>
      </Section>

      {/* PRODUCTS */}
      <Section id="products">
        <SectionHeading
          eyebrow="Built by Genartml"
          title="A growing ecosystem of AI products."
          lead="Built to solve problems across education, communication, productivity and the creator economy."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
            <Link
              to="/products/$slug"
              params={{ slug: p.slug }}
              onMouseMove={trackSpotlight}
              className="glass-panel spotlight group block h-full rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 hover:bg-glass-strong"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <Eyebrow>{p.category}</Eyebrow>
                  {productLogos[p.logo ?? ""] ? (
                    <img
                      src={productLogos[p.logo!]}
                      alt={p.name}
                      className="logo-mono mt-4 h-7 w-auto"
                    />
                  ) : (
                    <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">
                      {p.name}
                    </h3>
                  )}
                  <span
                    className={`mt-4 inline-flex rounded-full border border-hairline px-2.5 py-0.5 font-mono text-[10px] tracking-[0.18em] uppercase ${
                      p.status === "Live"
                        ? "bg-foreground text-background"
                        : "text-muted-foreground"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
                <span className="font-mono text-xs text-muted-foreground transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {p.oneLiner}
              </p>
            </Link>
            <a
              href={p.website}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              {p.website.replace("https://www.", "")}
              <span aria-hidden>↗</span>
            </a>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* WHAT WE BUILD */}
      <Section>
        <SectionHeading
          eyebrow="We build for businesses"
          title="What we build."
          lead="Have a business problem that software or AI could solve? We design, build and deploy the system."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Link
              key={s.id}
              to="/solutions"
              hash={s.id}
              className="bg-background p-7 transition-colors hover:bg-glass"
            >
              <h3 className="font-display text-base font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {s.summary}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      {/* WHO WE WORK WITH */}
      <Section>
        <SectionHeading
          eyebrow="Who we work with"
          title="Built for businesses that want leverage."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, i) => (
            <Reveal key={a.title} delay={i * 60}>
            <SpotlightCard className="h-full rounded-2xl p-6">
              <h3 className="font-display text-sm font-semibold tracking-tight">
                {a.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.text}</p>
            </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* WHY GENARTML */}
      <Section>
        <SectionHeading eyebrow="Why Genartml" title="We build, not just recommend." />
        <div className="mt-12 divide-y divide-hairline border-y border-hairline">
          {difference.map((d, i) => (
            <Reveal key={d.step} delay={i * 70}>
            <div className="group grid gap-4 py-7 transition-colors md:grid-cols-[80px_240px_1fr]">
              <span className="font-mono text-xs text-muted-foreground">{d.step}</span>
              <h3 className="font-display text-lg font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-1">
                {d.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{d.text}</p>
            </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PROCESS */}
      <Section>
        <SectionHeading eyebrow="How we work" title="The Genartml process." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 60}>
            <SpotlightCard className="h-full rounded-2xl p-6">
              <span className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground">
                {p.step}
              </span>
              <h3 className="mt-3 font-display text-base font-semibold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
            </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PHILOSOPHY */}
      <Section>
        <Reveal>
        <div className="glass-panel relative overflow-hidden rounded-3xl p-10 md:p-16">
          <div className="hero-glow pointer-events-none absolute inset-0" />
          <div className="relative z-10 max-w-2xl">
            <Eyebrow>Philosophy</Eyebrow>
            <h2 className="text-sheen mt-4 font-display text-[2rem] leading-[1.1] font-semibold tracking-tight sm:text-4xl md:text-6xl">
              Building &gt; Talking
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                The best way to understand what technology can do is to build
                with it. We ship real products, test real ideas and learn from
                real users.
              </p>
              <p>
                Not every idea will work. That's fine. The goal isn't to predict
                the future — it's to build it.
              </p>
            </div>
          </div>
        </div>
        </Reveal>
      </Section>
    </SiteLayout>
  );
}

const marqueeItems = [
  "AI voice agents",
  "Workflow automation",
  "RAG knowledge systems",
  "Custom AI platforms",
  "Evaluation engines",
  "Idea → MVP",
  "AI agents",
  "Product engineering",
];

function Marquee() {
  return (
    <div className="relative z-10 mt-20 overflow-hidden border-y border-hairline py-4">
      <div className="animate-marquee flex w-max gap-10 pr-10">
        {[...marqueeItems, ...marqueeItems].map((m, i) => (
          <span
            key={`${m}-${i}`}
            className="font-mono text-[11px] tracking-[0.26em] text-muted-foreground uppercase"
          >
            {m} <span className="ml-10 opacity-40">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function TwoSideCard({
  eyebrow,
  title,
  text,
  to,
  cta,
}: {
  eyebrow: string;
  title: string;
  text: string;
  to: "/products" | "/solutions";
  cta: string;
}) {
  return (
    <Link
      to={to}
      className="glass-panel group flex flex-col justify-between rounded-3xl p-10 transition-colors hover:bg-glass-strong"
    >
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight">
          {title}
        </h3>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {text}
        </p>
      </div>
      <span className="mt-10 text-sm font-medium transition-transform group-hover:translate-x-1">
        {cta}
      </span>
    </Link>
  );
}
