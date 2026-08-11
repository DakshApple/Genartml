import { logos } from "@/lib/logos";

const branches = [
  { label: "Products", nodes: ["Cortiva", "Evoluter", "Extutor"] },
  { label: "Development", nodes: ["AI Apps", "Agents", "Automation", "Knowledge"] },
];

export function Ecosystem() {
  return (
    <div className="glass-panel relative overflow-hidden rounded-3xl p-5 sm:p-8 md:p-12">
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-3 rounded-full border border-hairline bg-glass-strong px-5 py-2.5 sm:px-6 sm:py-3">
          <img src={logos.genartml} alt="Genartml" className="logo-mono h-5 w-auto" />
        </div>
        <div className="h-8 w-px bg-hairline sm:h-10" />
        <div className="grid w-full grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
          {branches.map((b) => (
            <div key={b.label} className="flex flex-col items-center">
              <div className="rounded-full border border-hairline px-4 py-1.5 font-mono text-[10px] tracking-[0.22em] uppercase">
                {b.label}
              </div>
              <div className="h-8 w-px bg-hairline" />
              <div className="grid w-full grid-cols-2 gap-2">
                {b.nodes.map((n, i) => (
                  <div
                    key={n}
                    style={{ animationDelay: `${i * 90}ms` }}
                    className="animate-rise rounded-xl border border-hairline bg-glass px-3 py-3 text-center text-xs text-muted-foreground transition-colors hover:bg-glass-strong hover:text-foreground"
                  >
                    {n}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-md text-center text-xs text-muted-foreground">
          One company. Multiple products. One mission: build useful technology.
        </p>
      </div>
    </div>
  );
}
