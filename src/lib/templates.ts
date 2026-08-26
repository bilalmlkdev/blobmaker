import type { AnimationType, BlobMakerState, FillType } from "../hooks/useBlobMaker";

export type TemplateDifficulty = "Light" | "Medium" | "Advanced";

export type BlobPreset = Pick<
  BlobMakerState,
  "edges" | "growth" | "seed" | "fillType" | "color" | "gradientColor" | "gradientAngle" | "animation"
>;

export interface BlobTemplate {
  id: string;
  name: string;
  description: string;
  category: "gradients" | "geometric" | "decorative" | "effects";
  difficulty: TemplateDifficulty;
  swatches: string[];
  preset: BlobPreset;
}

function preset(
  edges: number,
  growth: number,
  seed: number,
  fillType: FillType,
  color: string,
  gradientColor: string,
  gradientAngle: number,
  animation: AnimationType,
): BlobPreset {
  return { edges, growth, seed, fillType, color, gradientColor, gradientAngle, animation };
}

/**
 * Curated starting points for the blob generator. Each template is a real,
 * fully-specified generator preset — selecting one seeds the editor with
 * these exact values rather than just showing a decorative preview image.
 */
export const BLOB_TEMPLATES: BlobTemplate[] = [
  {
    id: "ocean-wave",
    name: "Ocean Wave",
    description:
      "Flowing blue gradient waves inspired by deep ocean currents. Perfect for hero sections and landing pages.",
    category: "gradients",
    difficulty: "Light",
    swatches: ["#0ea5e9", "#2563eb", "#1d4ed8"],
    preset: preset(6, 6, 482913, "gradient", "#0ea5e9", "#1d4ed8", 135, "none"),
  },
  {
    id: "sunset-glow",
    name: "Sunset Glow",
    description:
      "Warm orange and pink gradients that evoke golden hour. Ideal for creative portfolios and warm-themed sites.",
    category: "gradients",
    difficulty: "Light",
    swatches: ["#f97316", "#f4699a", "#ec4899"],
    preset: preset(5, 7, 129384, "gradient", "#f97316", "#ec4899", 90, "none"),
  },
  {
    id: "aurora-dream",
    name: "Aurora Dream",
    description:
      "Vibrant multicolor aurora borealis effect with flowing gradients. Great for creative and artistic projects.",
    category: "gradients",
    difficulty: "Medium",
    swatches: ["#10b981", "#8b5cf6", "#3b82f6"],
    preset: preset(8, 8, 774213, "gradient", "#10b981", "#8b5cf6", 60, "morph"),
  },
  {
    id: "mesh-gradient",
    name: "Mesh Gradient",
    description:
      "Modern mesh-style gradient with smooth purple and pink transitions. Perfect for SaaS and modern web apps.",
    category: "gradients",
    difficulty: "Light",
    swatches: ["#7c3aed", "#a855f7", "#db2777"],
    preset: preset(7, 5, 552011, "gradient", "#7c3aed", "#db2777", 45, "none"),
  },
  {
    id: "cosmic-dust",
    name: "Cosmic Dust",
    description:
      "Deep space-themed shader with dark purple and starlight accents. Ideal for dark-themed applications.",
    category: "decorative",
    difficulty: "Medium",
    swatches: ["#312e81", "#6d28d9", "#7e22ce"],
    preset: preset(9, 4, 991823, "gradient", "#312e81", "#7e22ce", 200, "pulse"),
  },
  {
    id: "neon-pulse",
    name: "Neon Pulse",
    description:
      "Glowing neon-inspired shader with pulsing cyan and magenta. Perfect for gaming sites and creative brands.",
    category: "effects",
    difficulty: "Medium",
    swatches: ["#06b6d4", "#e879f9", "#d946ef"],
    preset: preset(6, 9, 220481, "gradient", "#06b6d4", "#d946ef", 20, "pulse"),
  },
  {
    id: "particle-field",
    name: "Particle Field",
    description:
      "Floating particle-style gradient creating a sense of depth. Great for tech-focused landing pages.",
    category: "effects",
    difficulty: "Medium",
    swatches: ["#059669", "#10b981", "#22d3ee"],
    preset: preset(10, 3, 384710, "gradient", "#059669", "#22d3ee", 110, "rotate"),
  },
  {
    id: "geometric-pattern",
    name: "Geometric Pattern",
    description:
      "Structured geometric gradient with warm amber tones. Ideal for corporate and professional designs.",
    category: "geometric",
    difficulty: "Light",
    swatches: ["#d97706", "#f59e0b", "#fbbf24"],
    preset: preset(4, 2, 664521, "gradient", "#d97706", "#f59e0b", 45, "none"),
  },
  {
    id: "grid-morph",
    name: "Grid Morph",
    description:
      "Morphing grid-inspired gradient with cool indigo and slate tones. Perfect for developer tools and dashboards.",
    category: "geometric",
    difficulty: "Light",
    swatches: ["#4f46e5", "#818cf8", "#8b5cf6"],
    preset: preset(5, 4, 118372, "gradient", "#4f46e5", "#8b5cf6", 75, "morph"),
  },
  {
    id: "glitch-wave",
    name: "Glitch Wave",
    description:
      "Digital distortion-style shader with bold red and dark accents. Great for edgy, modern designs.",
    category: "effects",
    difficulty: "Medium",
    swatches: ["#7f1d1d", "#dc2626", "#ef4444"],
    preset: preset(7, 9, 837201, "gradient", "#7f1d1d", "#ef4444", 15, "pulse"),
  },
  {
    id: "undertones-1",
    name: "Undertones 1",
    description:
      "Vibrant dark-mode gradient with green and purple undertones. Excellent for modern, high-contrast dark UIs.",
    category: "gradients",
    difficulty: "Light",
    swatches: ["#10b981", "#8b5cf6", "#ec4899"],
    preset: preset(6, 6, 445982, "gradient", "#10b981", "#ec4899", 130, "none"),
  },
  {
    id: "undertones-2",
    name: "Undertones 2",
    description:
      "Minimalist dark gradient with warm orange streaks. Perfect for sleek, sophisticated dark-themed brands.",
    category: "gradients",
    difficulty: "Light",
    swatches: ["#fbbf24", "#fb923c", "#fdba74"],
    preset: preset(5, 5, 298104, "gradient", "#fbbf24", "#fdba74", 40, "none"),
  },
  {
    id: "undertones-3",
    name: "Undertones 3",
    description:
      "Clean, bright gradient with soft blue and silver tones. Ideal for light-mode hero sections and clean product UIs.",
    category: "gradients",
    difficulty: "Light",
    swatches: ["#f8fafc", "#cbd5e1", "#93c5fd"],
    preset: preset(6, 3, 671043, "gradient", "#e2e8f0", "#93c5fd", 100, "none"),
  },
];

export function getTemplateById(id: string): BlobTemplate | undefined {
  return BLOB_TEMPLATES.find((template) => template.id === id);
}
