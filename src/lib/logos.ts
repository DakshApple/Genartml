// High-resolution SVG data URIs for Genartml & product logos
const genartmlSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg viewBox="0 0 160 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="36" height="36" rx="8" fill="currentColor" fill-opacity="0.08" />
  <rect x="0.5" y="0.5" width="35" height="35" rx="7.5" stroke="currentColor" stroke-opacity="0.2" />
  <path d="M18 6L28 18L18 30L8 18L18 6Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" />
  <path d="M18 12L23 18L18 24L13 18L18 12Z" fill="currentColor" />
  <text x="46" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="700" letter-spacing="-0.03em" fill="currentColor">genartml<tspan fill="#3b82f6">.</tspan></text>
</svg>
`)}`;

const genartmlMarkSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="40" rx="10" fill="currentColor" fill-opacity="0.08" />
  <rect x="0.5" y="0.5" width="39" height="39" rx="9.5" stroke="currentColor" stroke-opacity="0.2" />
  <path d="M20 7L31 20L20 33L9 20L20 7Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" />
  <path d="M20 13L26 20L20 27L14 20L20 13Z" fill="currentColor" />
</svg>
`)}`;

const evoluterSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="18" cy="18" r="16" stroke="currentColor" stroke-width="1.8" stroke-opacity="0.25" />
  <path d="M11 23L18 11L25 23" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M14 18H22" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  <text x="44" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="700" letter-spacing="-0.02em" fill="currentColor">Evoluter</text>
</svg>
`)}`;

const extutorSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="32" height="32" rx="8" stroke="currentColor" stroke-width="1.8" stroke-opacity="0.25" />
  <path d="M10 12H26M10 18H21M10 24H26" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
  <text x="44" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="700" letter-spacing="-0.02em" fill="currentColor">Extutor</text>
</svg>
`)}`;

export const logos = {
  genartml: genartmlSvg,
  genartmlMark: genartmlMarkSvg,
  evoluter: evoluterSvg,
  extutor: extutorSvg,
} as const;

export const productLogos: Record<string, string> = {
  evoluter: evoluterSvg,
  extutor: extutorSvg,
};
