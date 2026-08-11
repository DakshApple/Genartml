import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/layout";
import { Section, SectionHeading, Eyebrow, Pill } from "@/components/site/primitives";
import { services, process, caseStudies, technology } from "@/lib/site-data";

const title = "Solutions — AI Automation, Agents & Custom Software | Genartml";
const description =
  "Genartml builds AI automation, AI agents, custom AI software, integrations, knowledge systems, product engineering and MVPs for businesses.";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/solutions" },
    ],
    links: [{ rel: "canonical", href: "/solutions" }],
  }),
  component: SolutionsPage,
});

function SolutionsPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-44">
        <div className="hero-glow pointer-events-none absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeading
            eyebrow="AI & Software Development"
            title="Tell us the problem. We'll build the system."
            lead="Have a business problem that software or AI could solve? We design, build and deploy the system end to end."
            className="animate-rise"
          />
          <Link
            to="/contact"
            className="mt-8 inline-flex rounded-full bg-primary px-5 sm:px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Start a Project →
          </Link>
        </div>
      </section>

      {services.map((s, i) => (
        <Section key={s.id} id={s.id}>
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Eyebrow>{String(i + 1).padStart(2, "0")}</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl">
                {s.title}
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                {s.summary}
              </p>
            </div>
            <div className="flex flex-wrap content-start gap-2">
              {s.items.map((item) => (
                <Pill key={item}>{item}</Pill>
              ))}
            </div>
          </div>
        </Section>
      ))}

      <Section>
        <SectionHeading eyebrow="How we work" title="Our process." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p) => (
            <div key={p.step} className="glass-panel rounded-2xl p-6">
              <span className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground">
                {p.step}
              </span>
              <h3 className="mt-3 font-display text-base font-semibold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Technology" title="What we work with." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {technology.map((t) => (
            <div key={t.group} className="glass-panel rounded-3xl p-8">
              <h3 className="font-display text-lg font-semibold tracking-tight">
                {t.group}
              </h3>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                {t.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Work" title="What we've built." />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {caseStudies.map((c) => (
            <article key={c.title} className="glass-panel rounded-3xl p-8">
              <h3 className="font-display text-lg font-semibold tracking-tight">
                {c.title}
              </h3>
              <p className="mt-4 text-sm text-muted-foreground">{c.problem}</p>
              <p className="mt-3 text-sm">{c.solution}</p>
            </article>
          ))}
        </div>
        <Link
          to="/work"
          className="mt-8 inline-flex rounded-full border border-hairline bg-glass px-5 sm:px-6 py-3 text-sm font-medium transition-colors hover:bg-glass-strong"
        >
          See all work →
        </Link>
      </Section>
    </SiteLayout>
  );
}
