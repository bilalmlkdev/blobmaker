import { useEffect, useRef } from "react";
import type {
  BlobStyle,
  BlobShape,
  AnimationSettings,
  EffectSettings,
} from "../hooks/useBlob";

interface Props {
  blobStyle: BlobStyle;
  shape: BlobShape;
  morphIntensity: number;
  animationSettings: AnimationSettings;
  effectSettings: EffectSettings;
}

export default function BlobPreview({
  blobStyle,
  shape,
  morphIntensity,
  animationSettings,
  effectSettings,
}: Props) {
  const blobRef = useRef<HTMLDivElement>(null);

  // Animation loop: directly manipulate border-radius for smooth morphing
  useEffect(() => {
    const element = blobRef.current;
    if (!element) return;

    const phases = Array.from({ length: 8 }, (_, i) => (i * Math.PI) / 4);
    const startTime = performance.now();
    let animationFrameId: number;

    const animate = (time: number) => {
      const elapsed = (time - startTime) / 1000;
      const speed = animationSettings.animationSpeed;
      const noise = animationSettings.noiseScale;

      const baseRadii = shape.radii.map((r) => {
        const val = 50 + (r - 50) * morphIntensity;
        return Math.max(0, Math.min(100, val));
      });

      const animatedRadii = baseRadii.map((r, i) => {
        const wave = Math.sin(elapsed * speed * 2 * Math.PI + phases[i]);
        const jitter = wave * noise * 10;
        return Math.max(0, Math.min(100, r + jitter));
      });

      const [r1, r2, r3, r4, r5, r6, r7, r8] = animatedRadii;
      element.style.borderRadius = `${r1}% ${100 - r1}% ${r2}% ${100 - r2}% / ${r3}% ${r4}% ${r5}% ${r6}%`;

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [shape, morphIntensity, animationSettings]);

  // Apply effects via CSS
  const { emissiveColor, emissiveIntensity, reflectionStrength, roughness } =
    effectSettings;

  const boxShadow = `0 0 ${20 * emissiveIntensity}px ${
    5 * emissiveIntensity
  }px ${emissiveColor}`;

  const reflectionOverlay = `linear-gradient(135deg, rgba(255,255,255,${
    reflectionStrength * 0.6
  }) 0%, rgba(255,255,255,0) 60%)`;

  // Roughness simulated via filter contrast/saturate
  const filter = `contrast(${1 + (roughness - 0.5) * 0.3}) saturate(${
    1 + (roughness - 0.5) * 0.5
  })`;

  return (
    <main className="absolute inset-0 flex items-center justify-center">
      <div
        ref={blobRef}
        className="w-72 h-72 md:w-96 md:h-96"
        style={{
          borderRadius: blobStyle.borderRadius, // initial before animation takes over
          transform: blobStyle.transform,
          background: blobStyle.background,
          opacity: blobStyle.opacity,
          boxShadow,
          filter,
          // Reflection overlay using backgroundImage? We already have background, so we use a pseudo-element via overlay
        }}
      />
      {/* Reflection overlay (optional) */}
      {reflectionStrength > 0 && (
        <div
          className="absolute w-72 h-72 md:w-96 md:h-96 pointer-events-none"
          style={{
            background: reflectionOverlay,
            borderRadius: blobStyle.borderRadius,
            transform: blobStyle.transform,
            opacity: 0.7,
          }}
        />
      )}
    </main>
  );
}
