import type { BlogPost, BlogSection } from "@/lib/blog-types";
import { posts1 } from "@/lib/blog/posts-1";
import { posts2 } from "@/lib/blog/posts-2";
import { posts3 } from "@/lib/blog/posts-3";
import { posts4 } from "@/lib/blog/posts-4";

export type { BlogPost, BlogSection };

export const blogCategories = [
  "AI Strategy",
  "Automation",
  "AI Agents",
  "Products",
  "Engineering",
  "Business",
] as const;

function wordCount(post: BlogPost) {
  return post.sections.reduce(
    (n, s) =>
      n +
      s.body.join(" ").split(/\s+/).filter(Boolean).length +
      (s.bullets?.join(" ").split(/\s+/).filter(Boolean).length ?? 0),
    0,
  );
}

const all: BlogPost[] = [...posts1, ...posts2, ...posts3, ...posts4];

export const blogPosts: BlogPost[] = all
  .map((post) => ({ ...post, readMinutes: Math.max(6, Math.round(wordCount(post) / 200)) }))
  .sort((a, b) => (a.date < b.date ? 1 : -1));
