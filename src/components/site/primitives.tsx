import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[10px] tracking-[0.28em] text-muted-foreground uppercase">
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-3 font-display text-[1.75rem] leading-[1.1] font-semibold tracking-tight text-balance sm:text-3xl sm:leading-[1.05] md:text-5xl">
        {title}
      </h2>
      {lead ? (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">
          {lead}
        </p>
      ) : null}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`border-t border-hairline py-14 sm:py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6">{children}</div>
    </section>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-hairline bg-glass px-3 py-1 text-xs text-muted-foreground">
      {children}
    </span>
  );
}
