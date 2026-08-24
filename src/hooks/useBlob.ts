import { useMemo, useState } from "react";

// ---------- Types ----------
export interface BlobShape {
  radii: [number, number, number, number, number, number, number, number];
  rotation: number;
  gradientAngle: number;
  colors: [string, string];
}

export interface DisplaySettings {
  scale: number;
  detailLevel: number; // currently stored, not used in generation
  morphIntensity: number;
  lightIntensity: number;
  opacity: number;
}

export interface BlobStyle {
  borderRadius: string;
  transform: string;
  background: string;
  opacity: number;
}

// ---------- Constants ----------
export const defaultDisplaySettings: DisplaySettings = {
  scale: 1,
  detailLevel: 26,
  morphIntensity: 1,
  lightIntensity: 1,
  opacity: 1,
};

// ---------- Helper ----------
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
    colors: ["#8b5cf6", "#d946ef"],
  };
}

export function generateBlob(
  shape: BlobShape,
  settings: DisplaySettings,
): BlobStyle {
  const { radii, rotation, gradientAngle, colors } = shape;
  const { scale, morphIntensity, lightIntensity, opacity } = settings;

  // Apply morph intensity: pull each radius away from 50% by the factor
  const adjustedRadii = radii.map((r) => {
    const newVal = 50 + (r - 50) * morphIntensity;
    return Math.max(0, Math.min(100, newVal));
  });

  const [r1, r2, r3, r4, r5, r6, r7, r8] = adjustedRadii;
  const borderRadius = `${r1}% ${100 - r1}% ${r2}% ${100 - r2}% / ${r3}% ${r4}% ${r5}% ${r6}%`;

  const transform = `scale(${scale}) rotate(${rotation}deg)`;

  // Light intensity affects gradient brightness (mix with white)
  const mixWithWhite = (color: string, intensity: number) => {
    // Simple approach: if intensity < 1, darken; if > 1, lighten (clamped)
    const hex = color.replace("#", "");
    const num = parseInt(hex, 16);
    let r = (num >> 16) & 255;
    let g = (num >> 8) & 255;
    let b = num & 255;

    r = Math.round(r * intensity);
    g = Math.round(g * intensity);
    b = Math.round(b * intensity);

    return `rgb(${r}, ${g}, ${b})`;
  };

  const color1 = mixWithWhite(colors[0], lightIntensity);
  const color2 = mixWithWhite(colors[1], lightIntensity);

  const background = `linear-gradient(${gradientAngle}deg, ${color1}, ${color2})`;

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

  const blobStyle = useMemo(
    () => generateBlob(shape, displaySettings),
    [shape, displaySettings],
  );

  const randomize = () => {
    setShape(generateRandomShape());
  };

  const reset = () => {
    setShape(generateRandomShape());
    setDisplaySettings(defaultDisplaySettings);
  };

  return {
    blobStyle,
    displaySettings,
    setDisplaySettings,
    randomize,
    reset,
  };
}
