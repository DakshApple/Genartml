import { useEffect, useState } from "react";
import { logos } from "@/lib/logos";

/** A one-per-session opening frame: the mark resolves, then the curtain lifts. */
export function IntroCurtain() {
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("genartml:intro") === "seen") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem("genartml:intro", "seen");
      return;
    }
    sessionStorage.setItem("genartml:intro", "seen");
    setMounted(true);
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setLeaving(true), 1200);
    const t2 = setTimeout(() => {
      setMounted(false);
      document.body.style.overflow = "";
    }, 2100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-200 flex items-center justify-center bg-background transition-[opacity,clip-path] duration-900 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        leaving ? "opacity-0 [clip-path:inset(0_0_100%_0)]" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <img
          src={logos.genartmlMark}
          alt=""
          className="logo-mono size-14 animate-[rise_0.9s_cubic-bezier(0.32,0.72,0,1)_both]"
        />
        <img
          src={logos.genartml}
          alt=""
          className="logo-mono h-6 w-auto animate-[rise_0.9s_cubic-bezier(0.32,0.72,0,1)_0.15s_both]"
        />
        <div className="h-px w-40 overflow-hidden bg-hairline">
          <div className="h-px w-full origin-left animate-[intro-line_1.2s_cubic-bezier(0.32,0.72,0,1)_both] bg-foreground" />
        </div>
      </div>
    </div>
  );
}
