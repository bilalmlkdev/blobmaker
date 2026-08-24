import { useEffect, useRef, useState, useCallback } from "react";
import type {
  BlobStyle,
  BlobShape,
  AnimationSettings,
  EffectSettings,
  Rotation3D,
} from "../hooks/useBlob";

interface Props {
  blobStyle: BlobStyle;
  shape: BlobShape;
  morphIntensity: number;
  animationSettings: AnimationSettings;
  effectSettings: EffectSettings;
  is3D: boolean;
  rotation3D: Rotation3D;
  onRotation3DChange: (rotation: Rotation3D) => void;
}

export default function BlobPreview({
  blobStyle,
  shape,
  morphIntensity,
  animationSettings,
  effectSettings,
  is3D,
  rotation3D,
  onRotation3DChange,
}: Props) {
  const blobRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({
    x: 0,
    y: 0,
    rotX: rotation3D.x,
    rotY: rotation3D.y,
  });

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

  // Pointer drag handlers
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!is3D) return; // only allow rotation in 3D mode
      e.preventDefault();
      setIsDragging(true);
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        rotX: rotation3D.x,
        rotY: rotation3D.y,
      };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [is3D, rotation3D],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !is3D) return;
      const deltaX = e.clientX - dragStart.current.x;
      const deltaY = e.clientY - dragStart.current.y;

      // Convert pixel delta to degrees (sensitivity factor)
      const sensitivity = 0.3;
      const newRotY = dragStart.current.rotY + deltaX * sensitivity;
      const newRotX = dragStart.current.rotX - deltaY * sensitivity;

      // Clamp X rotation to avoid flipping too far
      const clampedRotX = Math.max(-80, Math.min(80, newRotX));

      onRotation3DChange({ x: clampedRotX, y: newRotY });
    },
    [isDragging, is3D, onRotation3DChange],
  );

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setIsDragging(false);
    if (e.target instanceof HTMLElement && e.target.hasPointerCapture) {
      e.target.releasePointerCapture(e.pointerId);
    }
  }, []);

  // Compute dynamic shading based on rotation
  const { emissiveColor, emissiveIntensity, reflectionStrength, roughness } =
    effectSettings;

  const filter = `contrast(${1 + (roughness - 0.5) * 0.3}) saturate(${
    1 + (roughness - 0.5) * 0.5
  })`;

  const emissiveBackground = `radial-gradient(circle at 50% 50%, ${emissiveColor}, transparent 70%)`;
  const emissiveOpacity = Math.min(emissiveIntensity * 0.8, 1);

  // Reflection overlay: position shifts with rotation
  const reflectionX = 30 + (rotation3D.y / 90) * 40;
  const reflectionY = 20 + (rotation3D.x / 90) * 40;
  const reflectionOverlay = `linear-gradient(${135 + rotation3D.y}deg, rgba(255,255,255,${
    reflectionStrength * 0.6
  }) 0%, rgba(255,255,255,0) 60%)`;

  // Shading overlay for 3D effect
  const shadingOverlay = `
    radial-gradient(circle at ${reflectionX}% ${reflectionY}%, rgba(255,255,255,0.5) 0%, transparent 50%),
    radial-gradient(circle at ${100 - reflectionX}% ${100 - reflectionY}%, rgba(0,0,0,0.3) 0%, transparent 60%)
  `;

  const boxShadow = is3D
    ? "inset 0 0 20px rgba(0,0,0,0.4), 0 20px 40px rgba(0,0,0,0.6)"
    : "none";

  return (
    <main className="absolute inset-0 flex items-center justify-center select-none">
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-72 h-72 md:w-96 md:h-96 cursor-grab active:cursor-grabbing"
        style={{
          perspective: "1000px",
          touchAction: "none",
        }}
      >
        {/* Rotation wrapper */}
        <div
          className="absolute inset-0"
          style={{
            transform: `rotateX(${rotation3D.x}deg) rotateY(${rotation3D.y}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Blob container (for download) */}
          <div id="blob-container" className="absolute inset-0">
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
        </div>
      </div>
      {/* Hint text */}
      {is3D && (
        <p className="absolute bottom-8 text-xs text-zinc-500 pointer-events-none">
          Drag to rotate
        </p>
      )}
    </main>
  );
}
