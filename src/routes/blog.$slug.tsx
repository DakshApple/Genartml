import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/layout";
import { Section, Eyebrow, Pill } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { blogPosts, type BlogPost } from "@/lib/blog-data";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article not found | Genartml" }, { name: "robots", content: "noindex" }],
      };
    }
    const post = loaderData.post as BlogPost;
    const title = `${post.title} | Genartml`;
    const url = `/blog/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: post.description },
        { name: "keywords", content: post.tags.join(", ") },
        { name: "author", content: "Genartml" },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "article:published_time", content: post.date },
        { property: "article:section", content: post.category },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.date,
            articleSection: post.category,
            keywords: post.tags.join(", "),
            wordCount: post.sections.reduce(
              (n, s) => n + s.body.join(" ").split(/\s+/).length,
              0,
            ),
            author: { "@type": "Organization", name: "Genartml" },
            publisher: { "@type": "Organization", name: "Genartml" },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "/blog" },
              { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: PostNotFound,
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData() as { post: BlogPost };
  const related = blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => score(b, post) - score(a, post))
    .slice(0, 3);

  return (
    <SiteLayout>
      <article>
        <section className="relative overflow-hidden pt-28 pb-10 sm:pt-36 sm:pb-14 md:pt-44">
          <div className="hero-glow pointer-events-none absolute inset-0" />
          <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-6">
            <nav
              aria-label="Breadcrumb"
              className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase"
            >
              <Link to="/blog" className="hover:text-foreground">
                Journal
              </Link>
              <span className="px-2">/</span>
              <span>{post.category}</span>
            </nav>
            <h1 className="animate-rise mt-6 font-display text-[2rem] leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl sm:leading-[1.05] md:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-pretty text-muted-foreground">
              {post.lead}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-hairline pt-6 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              <span>Genartml</span>
              <span>·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>·</span>
              <span>{post.readMinutes} min read</span>
            </div>
          </div>
        </section>

        <section className="border-t border-hairline py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-5 sm:px-6">
            {post.sections.map((s, i) => (
              <Reveal key={s.heading} delay={i * 30}>
                <div className="mb-12">
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-balance md:text-3xl">
                    {s.heading}
                  </h2>
                  {s.body.map((p) => (
                    <p
                      key={p.slice(0, 32)}
                      className="mt-5 leading-[1.85] text-pretty text-muted-foreground"
                    >
                      {p}
                    </p>
                  ))}
                  {s.bullets ? (
                    <ul className="glass-panel mt-6 space-y-3 rounded-2xl p-6">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-sm text-muted-foreground">
                          <span className="mt-2 size-1 shrink-0 rounded-full bg-foreground" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </Reveal>
            ))}

            <div className="flex flex-wrap gap-2 border-t border-hairline pt-8">
              {post.tags.map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>

            <div className="glass-panel mt-12 rounded-3xl p-8 md:p-10">
              <Eyebrow>Work with us</Eyebrow>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-balance">
                Have a problem this applies to?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We build AI automation, agents and custom software for teams who
                want a system in production, not a pilot.
              </p>
              <Link
                to="/contact"
                className="mt-6 inline-flex rounded-full bg-primary px-5 sm:px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Start a Project →
              </Link>
            </div>
          </div>
        </section>
      </article>

      <Section>
        <Eyebrow>Keep reading</Eyebrow>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {related.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="glass-panel group flex h-full flex-col justify-between rounded-3xl p-8 transition-colors hover:bg-glass-strong"
            >
              <div>
                <Eyebrow>{p.category}</Eyebrow>
                <h3 className="mt-4 font-display text-lg leading-snug font-semibold tracking-tight text-balance">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
              </div>
              <span className="mt-6 text-sm transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}

function PostNotFound() {
  return (
    <SiteLayout>
      <section className="pt-32 pb-20 sm:pt-44 sm:pb-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 text-center">
          <h1 className="font-display text-4xl font-semibold tracking-tight">
            Article not found
          </h1>
          <p className="mt-4 text-muted-foreground">
            That piece doesn't exist, or it moved.
          </p>
          <Link
            to="/blog"
            className="mt-8 inline-flex rounded-full border border-hairline bg-glass px-5 sm:px-6 py-3 text-sm font-medium"
          >
            Back to the journal →
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}

function score(candidate: BlogPost, post: BlogPost) {
  let n = candidate.category === post.category ? 2 : 0;
  n += candidate.tags.filter((t) => post.tags.includes(t)).length;
  return n;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
