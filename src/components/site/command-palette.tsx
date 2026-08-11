import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { products, services } from "@/lib/site-data";
import { blogPosts } from "@/lib/blog-data";

type Item = { label: string; hint: string; to: string; params?: { slug: string } };

/** ⌘K / Ctrl+K jump-to-anything. Keyboard-first navigation for the whole site. */
export function CommandPalette() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);

  const items = useMemo<Item[]>(
    () => [
      { label: "Home", hint: "Page", to: "/" },
      { label: "Products", hint: "Page", to: "/products" },
      { label: "Solutions", hint: "Page", to: "/solutions" },
      { label: "Work", hint: "Page", to: "/work" },
      { label: "About", hint: "Page", to: "/about" },
      { label: "Blog", hint: "Page", to: "/blog" },
      { label: "Contact", hint: "Start a project", to: "/contact" },
      ...products.map((p) => ({
        label: p.name,
        hint: p.status,
        to: "/products/$slug",
        params: { slug: p.slug },
      })),
      ...services.map((s) => ({ label: s.title, hint: "Service", to: "/solutions" })),
      ...blogPosts.map((b) => ({
        label: b.title,
        hint: "Article",
        to: "/blog/$slug",
        params: { slug: b.slug },
      })),
    ],
    [],
  );

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = term
      ? items.filter((i) => i.label.toLowerCase().includes(term))
      : items;
    return list.slice(0, 8);
  }, [items, q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        setQ("");
        setActive(0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (item?: Item) => {
    if (!item) return;
    setOpen(false);
    navigate({ to: item.to, params: item.params } as never);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-200 flex items-start justify-center bg-background/70 px-5 sm:px-6 pt-[18vh] backdrop-blur-md"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-hairline bg-glass-strong shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          autoFocus
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => (a + 1) % Math.max(1, results.length));
            }
            if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => (a - 1 + results.length) % Math.max(1, results.length));
            }
            if (e.key === "Enter") go(results[active]);
          }}
          placeholder="Search products, services, pages…"
          className="w-full border-b border-hairline bg-transparent px-5 py-4 text-sm outline-none placeholder:text-muted-foreground"
        />
        <ul className="max-h-80 overflow-y-auto p-2">
          {results.map((item, i) => (
            <li key={`${item.label}-${i}`}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => go(item)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition-colors ${
                  i === active ? "bg-glass text-foreground" : "text-muted-foreground"
                }`}
              >
                <span>{item.label}</span>
                <span className="text-[11px] tracking-wide uppercase opacity-60">
                  {item.hint}
                </span>
              </button>
            </li>
          ))}
          {results.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-muted-foreground">
              Nothing found.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
