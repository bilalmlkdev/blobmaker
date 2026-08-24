import { useEffect, useRef } from "react";
import type { BlobStyle, BlobShape, AnimationSettings } from "../hooks/useBlob";

interface Props {
  blobStyle: BlobStyle;
  shape: BlobShape;
  morphIntensity: number;
  animationSettings: AnimationSettings;
}

export default function BlobPreview({
  blobStyle,
  shape,
  morphIntensity,
  animationSettings,
}: Props) {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = blobRef.current;
    if (!element) return;

    const phases = Array.from({ length: 8 }, (_, i) => (i * Math.PI) / 4);
    const startTime = performance.now();
    let animationFrameId: number;

    const animate = (time: number) => {
      const elapsed = (time - startTime) / 1000; // seconds
      const speed = animationSettings.animationSpeed;
      const noise = animationSettings.noiseScale;

      const baseRadii = shape.radii.map((r) => {
        // Apply morph intensity
        const val = 50 + (r - 50) * morphIntensity;
        return Math.max(0, Math.min(100, val));
      });

      const animatedRadii = baseRadii.map((r, i) => {
        // Add sinusoidal noise
        const wave = Math.sin(elapsed * speed * 2 * Math.PI + phases[i]);
        const jitter = wave * noise * 10; // scale noise to reasonable percentage
        return Math.max(0, Math.min(100, r + jitter));
      });

      const [r1, r2, r3, r4, r5, r6, r7, r8] = animatedRadii;
      const borderRadius = `${r1}% ${100 - r1}% ${r2}% ${100 - r2}% / ${r3}% ${r4}% ${r5}% ${r6}%`;

      element.style.borderRadius = borderRadius;

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [shape, morphIntensity, animationSettings]);

  return (
    <main className="absolute inset-0 flex items-center justify-center">
      <div
        ref={blobRef}
        className="w-72 h-72 md:w-96 md:h-96 transition-all duration-300 ease-out"
        style={{
          borderRadius: blobStyle.borderRadius, // initial static value
          transform: blobStyle.transform,
          background: blobStyle.background,
          opacity: blobStyle.opacity,
        }}
      />
    </main>
  );
}
