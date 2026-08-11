import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Eyebrow } from "./primitives";

type Group = { key: string; label: string; options: string[] };

const groups: Group[] = [
  {
    key: "where",
    label: "Where it hurts",
    options: ["Customer support", "Sales & leads", "Operations", "Learning & assessment", "Internal knowledge"],
  },
  {
    key: "what",
    label: "What to build",
    options: ["Voice agent", "AI assistant", "Workflow automation", "Custom platform", "MVP from scratch"],
  },
  {
    key: "scale",
    label: "Scale",
    options: ["Founder / solo", "Small team", "Growing company", "Enterprise"],
  },
];

const phaseMap: Record<string, string[]> = {
  "Voice agent": ["Conversation design", "Telephony + CRM wiring", "Agent training", "Live pilot"],
  "AI assistant": ["Knowledge ingestion", "Retrieval layer", "Assistant interface", "Evaluation loop"],
  "Workflow automation": ["Workflow mapping", "Integration layer", "Automated pipeline", "Monitoring"],
  "Custom platform": ["Product architecture", "Interface design", "Build + AI integration", "Deployment"],
  "MVP from scratch": ["Product strategy", "UX / UI", "Build", "Launch + iterate"],
};

export function SystemBuilder() {
  const [picked, setPicked] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const toggle = (key: string, value: string) =>
    setPicked((p) => ({ ...p, [key]: p[key] === value ? "" : value }));

  const chosen = groups.filter((g) => picked[g.key]).length;
  const phases = useMemo(
    () => (picked['what'] ? (phaseMap[picked['what']] ?? []) : []),
    [picked['what']],
  );

  const brief = useMemo(() => {
    if (!chosen) return "";
    const where = picked['where'] ? `in ${picked['where'].toLowerCase()}` : "";
    const what = picked['what'] ? picked['what'].toLowerCase() : "an AI system";
    const scale = picked['scale'] ? ` for a ${picked['scale'].toLowerCase()} setup` : "";
    return `We want ${what} ${where}${scale}.`.replace(/\s+/g, " ").trim();
  }, [picked, chosen]);

  const send = () => {
    try {
      window.localStorage.setItem("genartml:brief", brief);
    } catch {
      /* storage unavailable — the form still works */
    }
    void navigate({ to: "/contact" });
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="glass-panel rounded-3xl p-8 md:p-10">
        <Eyebrow>Interactive</Eyebrow>
        <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">
          Build your system.
        </h3>
        <p className="mt-3 text-sm text-muted-foreground">
          Pick three things. We'll shape the build around them.
        </p>

        <div className="mt-8 space-y-7">
          {groups.map((g) => (
            <div key={g.key}>
              <span className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                {g.label}
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                {g.options.map((o) => {
                  const active = picked[g.key] === o;
                  return (
                    <button
                      key={o}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggle(g.key, o)}
                      className={`rounded-full border border-hairline px-4 py-2 text-xs transition-all duration-300 hover:-translate-y-0.5 ${
                        active
                          ? "bg-foreground text-background"
                          : "bg-glass text-muted-foreground hover:bg-glass-strong hover:text-foreground"
                      }`}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel relative flex flex-col justify-between overflow-hidden rounded-3xl p-8 md:p-10">
        <div className="hero-glow pointer-events-none absolute inset-0" />
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <Eyebrow>Your blueprint</Eyebrow>
            <span className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground">
              {chosen}/3
            </span>
          </div>

          <div className="mt-4 h-px w-full bg-hairline">
            <div
              className="h-px bg-foreground transition-all duration-700 ease-out"
              style={{ width: `${(chosen / 3) * 100}%` }}
            />
          </div>

          <p className="mt-8 min-h-20 font-display text-2xl leading-snug font-medium tracking-tight text-balance md:text-3xl">
            {brief || "Select what you're solving and the blueprint writes itself."}
          </p>

          <div className="mt-8 space-y-2">
            {(phases.length ? phases : ["Understand", "Design", "Build", "Deploy"]).map(
              (p, i) => (
                <div
                  key={p}
                  style={{ transitionDelay: `${i * 70}ms` }}
                  className={`flex items-center gap-4 rounded-xl border border-hairline bg-glass px-4 py-3 text-xs transition-all duration-500 ${
                    phases.length ? "opacity-100" : "opacity-45"
                  }`}
                >
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {p}
                </div>
              ),
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={send}
          disabled={!chosen}
          className="relative z-10 mt-9 w-full rounded-full bg-primary px-5 sm:px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-35"
        >
          Send this blueprint →
        </button>
      </div>
    </div>
  );
}