export const SECTIONS = [
  "hero",
  "about",
  "services",
  "portfolio",
  "contact",
] as const;
export type SectionId = (typeof SECTIONS)[number];

export const COLORS = {
  void: "#0a0a12",
  dark: "#1a1a2e",
  navy: "#16213e",
  purple: "#0f0326",
  nebula: "#533483",
  accent: "#7b2cbf",
  star: "#e0e0ff",
  bright: "#ffffff",
  uv: "#1a1a2e",
  uvHover: "#6c63ff",
} as const;

export const STAR_CONFIG = {
  count: { desktop: 2000, mobile: 800 },
  sizeRange: [0.5, 2.0] as [number, number],
  spread: 50,
  parallaxStrength: 0.3,
  twinkleSpeedRange: [0.5, 3.0] as [number, number],
} as const;
