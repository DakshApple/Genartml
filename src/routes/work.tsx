import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/layout";
import { Section, SectionHeading, Pill, Eyebrow } from "@/components/site/primitives";
import { caseStudies } from "@/lib/site-data";

const title = "Work — Case Studies | Genartml";
const description =
  "Selected AI voice automation, knowledge system and workflow automation builds by Genartml. Problem, solution, technology and result.";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/work" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-44">
        <div className="hero-glow pointer-events-none absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeading
            eyebrow="Work"
            title="What we've built."
            lead="Client names and metrics are shared only with permission. Here's the shape of the work."
            className="animate-rise"
          />
        </div>
      </section>

      {caseStudies.map((c, i) => (
        <Section key={c.title}>
          <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Eyebrow>{String(i + 1).padStart(2, "0")}</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                {c.title}
              </h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {c.technology.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
            </div>
            <dl className="divide-y divide-hairline border-y border-hairline">
              <Row label="Problem" value={c.problem} />
              <Row label="Solution" value={c.solution} />
              <Row label="Result" value={c.result} />
            </dl>
          </div>
        </Section>
      ))}
    </SiteLayout>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-2 py-5 md:grid-cols-[140px_1fr]">
      <dt className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="text-sm leading-relaxed text-muted-foreground">{value}</dd>
    </div>
  );
}
