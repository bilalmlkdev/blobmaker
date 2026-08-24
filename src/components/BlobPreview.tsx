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
  is3D: boolean;
}

export default function BlobPreview({
  blobStyle,
  shape,
  morphIntensity,
  animationSettings,
  effectSettings,
  is3D,
}: Props) {
  const blobRef = useRef<HTMLDivElement>(null);

  // Animation loop: directly manipulate border-radius of the main blob
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

  const { emissiveColor, emissiveIntensity, reflectionStrength, roughness } =
    effectSettings;

  // Roughness simulated via filter contrast/saturate
  const filter = `contrast(${1 + (roughness - 0.5) * 0.3}) saturate(${
    1 + (roughness - 0.5) * 0.5
  })`;

  // Emissive overlay: radial glow inside the blob
  const emissiveBackground = `radial-gradient(circle at 50% 50%, ${emissiveColor}, transparent 70%)`;
  const emissiveOpacity = Math.min(emissiveIntensity * 0.8, 1);

  // Reflection overlay: diagonal sheen
  const reflectionOverlay = `linear-gradient(135deg, rgba(255,255,255,${
    reflectionStrength * 0.6
  }) 0%, rgba(255,255,255,0) 60%)`;

  // 3D shading overlay (only when is3D is true)
  const shadingOverlay = `
    radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(0,0,0,0.3) 0%, transparent 60%)
  `;

  // 3D box shadow for depth
  const boxShadow = is3D
    ? "inset 0 0 20px rgba(0,0,0,0.4), 0 20px 40px rgba(0,0,0,0.6)"
    : "none";

  return (
    <main className="absolute inset-0 flex items-center justify-center">
      <div id="blob-container" className="relative w-72 h-72 md:w-96 md:h-96">
        <div
          ref={blobRef}
          className="absolute inset-0"
          style={{
            borderRadius: blobStyle.borderRadius,
            transform: blobStyle.transform,
            background: blobStyle.background,
            opacity: blobStyle.opacity,
            filter,
            boxShadow,
          }}
        >
          {/* 3D shading overlay */}
          {is3D && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: "inherit",
                background: shadingOverlay,
                mixBlendMode: "overlay",
              }}
            />
          )}

          {/* Emissive overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: "inherit",
              background: emissiveBackground,
              opacity: emissiveOpacity,
              mixBlendMode: "screen",
            }}
          />

          {/* Reflection overlay */}
          {reflectionStrength > 0 && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: "inherit",
                background: reflectionOverlay,
                opacity: 0.7,
              }}
            />
          )}
        </div>
      </div>
    </main>
  );
}
