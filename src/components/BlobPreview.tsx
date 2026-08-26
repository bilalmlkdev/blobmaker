import { resolveFillRef, type BlobFill } from "../lib/download";
import type { AnimationType } from "../hooks/useBlobMaker";

interface BlobPreviewProps {
  path: string;
  size: number;
  fill: BlobFill;
  animation: AnimationType;
}

const ANIMATION_CLASS: Record<AnimationType, string> = {
  none: "",
  rotate: "animate-blob-rotate",
  morph: "animate-blob-morph",
  pulse: "animate-blob-pulse",
};

const GRADIENT_ID = "blobGradient";

/** Angle in degrees to normalized x1/y1/x2/y2 gradient vector coordinates. */
function gradientVector(angle: number) {
  const radians = ((angle - 90) * Math.PI) / 180;
  const x2 = 50 + 50 * Math.cos(radians);
  const y2 = 50 + 50 * Math.sin(radians);
  const x1 = 50 - 50 * Math.cos(radians);
  const y1 = 50 - 50 * Math.sin(radians);
  return { x1: `${x1}%`, y1: `${y1}%`, x2: `${x2}%`, y2: `${y2}%` };
}

/** Renders the live blob shape inside a bordered, dashed square canvas area. */
export function BlobPreview({ path, size, fill, animation }: BlobPreviewProps) {
  const fillRef = resolveFillRef(fill);

  return (
    <div className="flex flex-1 items-center justify-center px-4 pb-6">
      <div className="flex h-[min(72vw,420px)] w-[min(72vw,420px)] items-center justify-center rounded-2xl border border-white/20  shadow-2xl transition-colors duration-300 sm:h-[420px] sm:w-[420px]">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width="82%"
          height="82%"
          role="img"
          aria-label="Generated blob shape preview"
          className={`origin-center ${ANIMATION_CLASS[animation]}`}
        >
          {fill.type === "gradient" && (
            <defs>
              <linearGradient id={GRADIENT_ID} {...gradientVector(fill.angle)}>
                <stop offset="0%" stopColor={fill.from} />
                <stop offset="100%" stopColor={fill.to} />
              </linearGradient>
            </defs>
          )}
          <path
            d={path}
            fill={fillRef}
            className="transition-[d,fill] duration-500 ease-out motion-reduce:transition-none"
          />
        </svg>
      </div>
    </div>
  );
}
