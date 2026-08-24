import { useMemo, useState } from "react";

// ---------- Types ----------
export interface BlobShape {
  radii: [number, number, number, number, number, number, number, number];
  rotation: number;
  gradientAngle: number;
}

export interface DisplaySettings {
  scale: number;
  detailLevel: number;
  morphIntensity: number;
  lightIntensity: number;
  opacity: number;
}

export interface AnimationSettings {
  noiseScale: number;
  animationSpeed: number;
}

export type ColorMode = "solid" | "gradient";

export interface ColorSettings {
  mode: ColorMode;
  solidColor: string;
  gradientColors: [string, string, string, string];
  gradientMixes: [number, number, number, number];
}

export interface BlobStyle {
  borderRadius: string;
  transform: string;
  background: string;
  opacity: number;
}

// ---------- Defaults ----------
export const defaultDisplaySettings: DisplaySettings = {
  scale: 1,
  detailLevel: 26,
  morphIntensity: 1,
  lightIntensity: 1,
  opacity: 1,
};

export const defaultAnimationSettings: AnimationSettings = {
  noiseScale: 0.4,
  animationSpeed: 0.2,
};

export const defaultColorSettings: ColorSettings = {
  mode: "gradient",
  solidColor: "#8b5cf6",
  gradientColors: ["#8b5cf6", "#d946ef", "#f59e0b", "#3b82f6"],
  gradientMixes: [0.8, 0.6, 0.3, 0.15],
};

// ---------- Helpers ----------
const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export function generateRandomShape(): BlobShape {
  const radii = Array.from({ length: 8 }, () =>
    Math.round(randomBetween(30, 70)),
  ) as BlobShape["radii"];

  return {
    radii,
    rotation: Math.round(randomBetween(-10, 10)),
    gradientAngle: Math.round(randomBetween(0, 360)),
  };
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleanHex = hex.replace("#", "");
  const num = parseInt(cleanHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function applyLightIntensity(
  color: string,
  intensity: number,
): { r: number; g: number; b: number } {
  const { r, g, b } = hexToRgb(color);
  return {
    r: Math.round(r * intensity),
    g: Math.round(g * intensity),
    b: Math.round(b * intensity),
  };
}

export function generateBlob(
  shape: BlobShape,
  settings: DisplaySettings,
  colorSettings: ColorSettings,
): BlobStyle {
  const { radii, rotation, gradientAngle } = shape;
  const { scale, morphIntensity, lightIntensity, opacity } = settings;
  const { mode, solidColor, gradientColors, gradientMixes } = colorSettings;

  // Apply morph intensity
  const adjustedRadii = radii.map((r) => {
    const newVal = 50 + (r - 50) * morphIntensity;
    return Math.max(0, Math.min(100, newVal));
  });

  const [r1, r2, r3, r4, r5, r6, r7, r8] = adjustedRadii;
  const borderRadius = `${r1}% ${100 - r1}% ${r2}% ${100 - r2}% / ${r3}% ${r4}% ${r5}% ${r6}%`;
  const transform = `scale(${scale}) rotate(${rotation}deg)`;

  let background: string;

  if (mode === "solid") {
    const { r, g, b } = applyLightIntensity(solidColor, lightIntensity);
    background = `rgb(${r}, ${g}, ${b})`;
  } else {
    const c1 = applyLightIntensity(gradientColors[0], lightIntensity);
    const c2 = applyLightIntensity(gradientColors[1], lightIntensity);
    const c3 = applyLightIntensity(gradientColors[2], lightIntensity);
    const c4 = applyLightIntensity(gradientColors[3], lightIntensity);

    background = `linear-gradient(${gradientAngle}deg, rgba(${c1.r}, ${c1.g}, ${c1.b}, ${gradientMixes[0]}), rgba(${c2.r}, ${c2.g}, ${c2.b}, ${gradientMixes[1]}), rgba(${c3.r}, ${c3.g}, ${c3.b}, ${gradientMixes[2]}), rgba(${c4.r}, ${c4.g}, ${c4.b}, ${gradientMixes[3]}))`;
  }

  return {
    borderRadius,
    transform,
    background,
    opacity,
  };
}

export function useBlob() {
  const [shape, setShape] = useState<BlobShape>(generateRandomShape);
  const [displaySettings, setDisplaySettings] = useState<DisplaySettings>(
    defaultDisplaySettings,
  );
  const [animationSettings, setAnimationSettings] = useState<AnimationSettings>(
    defaultAnimationSettings,
  );
  const [colorSettings, setColorSettings] =
    useState<ColorSettings>(defaultColorSettings);

  const blobStyle = useMemo(
    () => generateBlob(shape, displaySettings, colorSettings),
    [shape, displaySettings, colorSettings],
  );

  const randomize = () => {
    setShape(generateRandomShape());
  };

  const reset = () => {
    setShape(generateRandomShape());
    setDisplaySettings(defaultDisplaySettings);
    setAnimationSettings(defaultAnimationSettings);
    setColorSettings(defaultColorSettings);
  };

  return {
    blobStyle,
    shape,
    displaySettings,
    setDisplaySettings,
    animationSettings,
    setAnimationSettings,
    colorSettings,
    setColorSettings,
    randomize,
    reset,
  };
}
