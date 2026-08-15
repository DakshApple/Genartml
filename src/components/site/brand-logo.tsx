import React from "react";
import { logos } from "@/lib/logos";

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

/** Genartml Mark Icon */
export function GenartmlLogoMark({ className = "h-8 w-auto", ...props }: LogoProps) {
  return (
    <img
      src={logos.genartmlMark}
      alt="Genartml"
      className={`h-8 w-auto object-contain transition-opacity ${className}`}
      {...props}
    />
  );
}

/** Full Genartml Wordmark / Brand Logo */
export function GenartmlLogo({ className = "h-8 w-auto", ...props }: LogoProps) {
  return (
    <img
      src={logos.genartml}
      alt="Genartml"
      className={`h-8 w-auto object-contain transition-opacity ${className}`}
      {...props}
    />
  );
}

/** Evoluter Product Logo Icon */
export function EvoluterLogo({ className = "h-8 w-auto", ...props }: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight ${className}`}>
      <img src={logos.evoluter} alt="Evoluter" className="h-7 w-auto object-contain" {...props} />
      <span>Evoluter</span>
    </div>
  );
}

/** Extutor Product Logo Icon */
export function ExtutorLogo({ className = "h-8 w-auto", ...props }: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight ${className}`}>
      <img src={logos.extutor} alt="Extutor" className="h-7 w-auto object-contain" {...props} />
      <span>Extutor</span>
    </div>
  );
}
