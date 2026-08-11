import type { ReactNode } from "react";
import { Nav } from "./nav";
import { Footer } from "./footer";
import { CursorGlow } from "./cursor-glow";
import { ScrollProgress } from "./scroll-progress";
import { IntroCurtain } from "./intro-curtain";
import { CommandPalette } from "./command-palette";
import { Toaster } from "@/components/ui/sonner";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <div className="grain-overlay fixed inset-0 z-100" />
      <CursorGlow />
      <IntroCurtain />
      <ScrollProgress />
      <CommandPalette />
      <Nav />
      <main>{children}</main>
      <Footer />
      <Toaster />
    </div>
  );
}