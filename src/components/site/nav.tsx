import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { logos } from "@/lib/logos";

const links = [
  { to: "/products", label: "Products" },
  { to: "/solutions", label: "Solutions" },
  { to: "/about", label: "About" },
  { to: "/work", label: "Work" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-hairline bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2.5"
           aria-label="Genartml home"
         >
           <img
             src={logos.genartml}
             alt="Genartml"
             className="logo-mono h-7 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Open command palette"
            onClick={() =>
              window.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", metaKey: true }),
              )
            }
            className="hidden items-center gap-2 rounded-full border border-hairline bg-glass px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground lg:inline-flex"
          >
            <span>Search</span>
            <kbd className="rounded border border-hairline px-1 font-sans text-[10px]">
              ⌘K
            </kbd>
          </button>
          <ThemeToggle />
          <Link
            to="/contact"
            className="hidden rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Start a Project
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="glass-panel flex size-9 items-center justify-center rounded-full md:hidden"
          >
            <span className="text-xs">{open ? "\u2715" : "\u2261"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-hairline bg-background/95 px-5 pt-2 pb-6 backdrop-blur-xl sm:px-6 md:hidden">
          <div className="flex flex-col">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="border-b border-hairline py-3.5 text-base text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-5 flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
          >
            Start a Project
          </Link>
        </div>
      ) : null}
    </nav>
  );
}
