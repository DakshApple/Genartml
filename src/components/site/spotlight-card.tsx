import type { MouseEvent, ReactNode } from "react";

function track(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

/** Glass surface with a cursor-tracked highlight and a subtle lift. */
export function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      onMouseMove={track}
      className={`glass-panel spotlight transition-[transform,background-color] duration-500 ease-out hover:-translate-y-1 hover:bg-glass-strong ${className}`}
    >
      {children}
    </div>
  );
}

export { track as trackSpotlight };