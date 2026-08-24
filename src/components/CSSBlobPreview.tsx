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

export default function CSSBlobPreview({
  blobStyle,
  shape,
  morphIntensity,
  animationSettings,
  effectSettings,
}: Props) {
  const blobRef = useRef<HTMLDivElement>(null);

  // Animation loop
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

  const filter = `contrast(${1 + (roughness - 0.5) * 0.3}) saturate(${
    1 + (roughness - 0.5) * 0.5
  })`;

  const emissiveBackground = `radial-gradient(circle at 50% 50%, ${emissiveColor}, transparent 70%)`;
  const emissiveOpacity = Math.min(emissiveIntensity * 0.8, 1);

  const reflectionOverlay = `linear-gradient(135deg, rgba(255,255,255,${
    reflectionStrength * 0.6
  }) 0%, rgba(255,255,255,0) 60%)`;

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
          }}
        >
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
