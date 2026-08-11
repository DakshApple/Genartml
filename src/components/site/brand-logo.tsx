import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  showText?: boolean;
}

/** Genartml Icon Mark (Neural Diamond / Intelligence Matrix) */
export function GenartmlLogoMark({ className = "size-8", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect width="40" height="40" rx="10" fill="currentColor" fillOpacity="0.06" />
      <rect x="0.5" y="0.5" width="39" height="39" rx="9.5" stroke="currentColor" strokeOpacity="0.15" />
      
      {/* Outer Diamond */}
      <path
        d="M20 7L31 20L20 33L9 20L20 7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Inner Node Lattice */}
      <path
        d="M20 13L26 20L20 27L14 20L20 13Z"
        fill="currentColor"
        fillOpacity="0.85"
      />
      <circle cx="20" cy="20" r="2.5" fill="var(--background, #000)" />
      <circle cx="20" cy="7" r="1.5" fill="currentColor" />
      <circle cx="31" cy="20" r="1.5" fill="currentColor" />
      <circle cx="20" cy="33" r="1.5" fill="currentColor" />
      <circle cx="9" cy="20" r="1.5" fill="currentColor" />
    </svg>
  );
}

/** Full Genartml Wordmark Logo */
export function GenartmlLogo({ className = "h-7 w-auto", showText = true, ...props }: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-foreground ${className}`}>
      <GenartmlLogoMark className="h-7 w-7 shrink-0 text-foreground" />
      {showText && (
        <span className="font-display font-semibold text-lg tracking-tight text-foreground">
          genartml<span className="text-primary font-bold">.</span>
        </span>
      )}
    </div>
  );
}

/** Evoluter Product Logo Icon */
export function EvoluterLogo({ className = "h-8 w-auto", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <div className={`inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight ${className}`}>
      <svg
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 text-foreground"
        {...props}
      >
        <circle cx="18" cy="18" r="17" stroke="currentColor" strokeWidth="1.8" strokeOpacity="0.2" />
        <path
          d="M11 23L18 11L25 23"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 18H22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span>Evoluter</span>
    </div>
  );
}

/** Extutor Product Logo Icon */
export function ExtutorLogo({ className = "h-8 w-auto", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <div className={`inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight ${className}`}>
      <svg
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 text-foreground"
        {...props}
      >
        <rect x="2" y="2" width="32" height="32" rx="8" stroke="currentColor" strokeWidth="1.8" strokeOpacity="0.2" />
        <path
          d="M11 12H25M11 18H21M11 24H25"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <span>Extutor</span>
    </div>
  );
}
