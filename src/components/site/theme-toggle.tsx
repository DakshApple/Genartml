import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("genml-theme");
    if (stored === "light") setLight(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
    window.localStorage.setItem("genml-theme", light ? "light" : "dark");
  }, [light]);

  return (
    <button
      type="button"
      onClick={() => setLight((v) => !v)}
      aria-label="Toggle colour theme"
      className="glass-panel flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-medium tracking-widest text-muted-foreground transition-colors hover:text-foreground"
    >
      {light ? "L" : "D"}
    </button>
  );
}