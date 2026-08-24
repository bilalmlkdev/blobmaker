import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial } from "@react-three/drei";
import type {
  BlobShape,
  AnimationSettings,
  EffectSettings,
  DisplaySettings,
  ColorSettings,
} from "../hooks/useBlob";

interface Props {
  shape: BlobShape;
  displaySettings: DisplaySettings;
  animationSettings: AnimationSettings;
  effectSettings: EffectSettings;
  colorSettings: ColorSettings;
}

export default function ThreeBlobPreview({
  shape,
  displaySettings,
  animationSettings,
  effectSettings,
  colorSettings,
}: Props) {
  const { emissiveColor, emissiveIntensity, reflectionStrength, roughness } =
    effectSettings;
  const { scale, opacity, lightIntensity } = displaySettings;
  const { mode, solidColor, gradientColors } = colorSettings;

  // Determine base color
  const baseColor = mode === "solid" ? solidColor : gradientColors[0];

  // Map reflectionStrength (0.3-1) to metalness (0-1)
  const metalness = Math.max(0, Math.min(1, (reflectionStrength - 0.3) / 0.7));
  // Map noiseScale + morphIntensity to distort amplitude (0-1)
  const distort = Math.min(
    (animationSettings.noiseScale / 20) * displaySettings.morphIntensity,
    1,
  );
  const speed = animationSettings.animationSpeed;

  return (
    <main className="absolute inset-0">
      <div id="blob-container" className="w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 3], fov: 45 }}
          gl={{ preserveDrawingBuffer: true, antialias: true }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.3 * lightIntensity} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={1.2 * lightIntensity}
            />
            <directionalLight
              position={[-5, -5, -5]}
              intensity={0.5 * lightIntensity}
            />

            <mesh scale={scale}>
              <sphereGeometry args={[1, 64, 64]} />
              <MeshDistortMaterial
                color={baseColor}
                distort={distort}
                speed={speed}
                roughness={roughness}
                metalness={metalness}
                emissive={emissiveColor}
                emissiveIntensity={emissiveIntensity}
                transparent={opacity < 1}
                opacity={opacity}
              />
            </mesh>
          </Suspense>
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={1.5}
            maxDistance={6}
          />
        </Canvas>
      </div>
    </main>
  );
}
