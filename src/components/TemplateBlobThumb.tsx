import { generateBlobPath } from "../lib/blob";
import { resolveFillRef, type BlobFill } from "../lib/download";
import type { BlobTemplate } from "../lib/templates";

interface TemplateBlobThumbProps {
  template: BlobTemplate;
  className?: string;
}

const GRADIENT_ID_PREFIX = "tplGradient-";

function gradientVector(angle: number) {
  const radians = ((angle - 90) * Math.PI) / 180;
  const x2 = 50 + 50 * Math.cos(radians);
  const y2 = 50 + 50 * Math.sin(radians);
  const x1 = 50 - 50 * Math.cos(radians);
  const y1 = 50 - 50 * Math.sin(radians);
  return { x1: `${x1}%`, y1: `${y1}%`, x2: `${x2}%`, y2: `${y2}%` };
}

/** Renders a static, non-interactive preview of a blob template preset (used on cards). */
export function TemplateBlobThumb({ template, className = "" }: TemplateBlobThumbProps) {
  const { preset, id } = template;
  const blob = generateBlobPath({
    edges: preset.edges,
    growth: (preset.growth - 1) / 9,
    seed: preset.seed,
    size: 200,
  });

  const fill: BlobFill =
    preset.fillType === "gradient"
      ? { type: "gradient", from: preset.color, to: preset.gradientColor, angle: preset.gradientAngle }
      : { type: "solid", color: preset.color };

  const gradientId = `${GRADIENT_ID_PREFIX}${id}`;
  const fillRef = preset.fillType === "gradient" ? `url(#${gradientId})` : resolveFillRef(fill);

  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label={`${template.name} preview`}>
      {fill.type === "gradient" && (
        <defs>
          <linearGradient id={gradientId} {...gradientVector(fill.angle)}>
            <stop offset="0%" stopColor={fill.from} />
            <stop offset="100%" stopColor={fill.to} />
          </linearGradient>
        </defs>
      )}
      <path d={blob.path} fill={fillRef} />
    </svg>
  );
}
