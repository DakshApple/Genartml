import { useEffect, useRef } from "react";

/** A soft light that trails the pointer, giving the glass surfaces depth. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const tick = () => {
      cx += (x - cx) * 0.09;
      cy += (y - cy) * 0.09;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${cx - 320}px, ${cy - 320}px, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-0 hidden size-160 rounded-full opacity-70 blur-3xl md:block"
      style={{
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--foreground) 7%, transparent), transparent 65%)",
      }}
    />
  );
}