import { useRef, type ReactNode, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";

function useMagnet() {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * 0.25;
    const dy = (e.clientY - (r.top + r.height / 2)) * 0.35;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  return { ref, onMove, onLeave };
}

/** A link that leans toward the cursor — small, tactile, premium. */
export function MagneticLink({
  to,
  children,
  className = "",
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  const { ref, onMove, onLeave } = useMagnet();

  return (
    <Link
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      to={to as any}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-flex will-change-transform transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </Link>
  );
}