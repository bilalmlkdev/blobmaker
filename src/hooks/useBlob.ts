import { useState } from "react";

export interface BlobStyle {
  borderRadius: string;
  transform: string;
  background: string;
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function generateRandomBlob(): BlobStyle {
  const r1 = Math.round(randomBetween(30, 70));
  const r2 = Math.round(randomBetween(30, 70));
  const r3 = Math.round(randomBetween(30, 70));
  const r4 = Math.round(randomBetween(30, 70));
  const r5 = Math.round(randomBetween(30, 70));
  const r6 = Math.round(randomBetween(30, 70));
  const r7 = Math.round(randomBetween(30, 70));
  const r8 = Math.round(randomBetween(30, 70));

  const borderRadius = `${r1}% ${100 - r1}% ${r2}% ${100 - r2}% / ${r3}% ${r4}% ${r5}% ${r6}%`;
  const rotate = Math.round(randomBetween(-10, 10));

  return {
    borderRadius,
    transform: `rotate(${rotate}deg)`,
    background: `linear-gradient(${randomBetween(0, 360)}deg, #8b5cf6, #d946ef)`,
  };
}

export function useBlob() {
  const [blobStyle, setBlobStyle] = useState<BlobStyle>(generateRandomBlob);

  const randomize = () => setBlobStyle(generateRandomBlob());

  return { blobStyle, randomize };
}
