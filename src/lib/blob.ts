import { createRng } from "./random";

export interface BlobOptions {
  /** Number of anchor points around the blob. Range 3–12 in the UI. */
  edges: number;
  /** How irregular the blob silhouette is, from 0 (near circle) to 1 (very spiky/organic). */
  growth: number;
  /** Deterministic seed driving the pseudo-random variation. */
  seed: number;
  /** Size of the square viewport the blob is generated within. */
  size?: number;
}

export interface GeneratedBlob {
  /** SVG path `d` attribute, normalized to fit within `size` x `size`. */
  path: string;
  /** The viewport size the path was generated for. */
  size: number;
}

const TAU = Math.PI * 2;

/**
 * Generates an organic, closed blob shape as an SVG path.
 *
 * The algorithm places `edges` points evenly around a circle, perturbs each
 * point's radius using a seeded RNG scaled by `growth`, then threads a smooth
 * closed Catmull-Rom spline through them and converts it to cubic bezier
 * segments for the final SVG path.
 */
export function generateBlobPath({
  edges,
  growth,
  seed,
  size = 400,
}: BlobOptions): GeneratedBlob {
  const clampedEdges = Math.max(3, Math.round(edges));
  const clampedGrowth = Math.min(1, Math.max(0, growth));
  const rng = createRng(seed);

  const center = size / 2;
  const baseRadius = size / 2.6;
  const variance = baseRadius * clampedGrowth * 0.6;

  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < clampedEdges; i++) {
    const angle = (i / clampedEdges) * TAU;
    // Randomize both the radius and the angular offset a little so shapes
    // don't look like a perfectly regular polygon with wobbly edges.
    const radiusOffset = (rng() - 0.5) * 2 * variance;
    const angleJitter = (rng() - 0.5) * (TAU / clampedEdges) * 0.3;
    const radius = Math.max(baseRadius * 0.25, baseRadius + radiusOffset);
    const finalAngle = angle + angleJitter;
    points.push({
      x: center + radius * Math.cos(finalAngle),
      y: center + radius * Math.sin(finalAngle),
    });
  }

  const path = catmullRomToBezierPath(points);
  return { path, size };
}

/**
 * Converts a closed sequence of points into a smooth cubic-bezier SVG path
 * using the Catmull-Rom to Bezier conversion formula.
 */
function catmullRomToBezierPath(points: { x: number; y: number }[]): string {
  const n = points.length;
  if (n < 3) return "";

  const get = (i: number) => points[((i % n) + n) % n];

  let d = `M ${format(get(0).x)} ${format(get(0).y)} `;

  const tension = 6; // Standard Catmull-Rom to Bezier tension divisor.

  for (let i = 0; i < n; i++) {
    const p0 = get(i - 1);
    const p1 = get(i);
    const p2 = get(i + 1);
    const p3 = get(i + 2);

    const cp1x = p1.x + (p2.x - p0.x) / tension;
    const cp1y = p1.y + (p2.y - p0.y) / tension;
    const cp2x = p2.x - (p3.x - p1.x) / tension;
    const cp2y = p2.y - (p3.y - p1.y) / tension;

    d += `C ${format(cp1x)} ${format(cp1y)}, ${format(cp2x)} ${format(cp2y)}, ${format(p2.x)} ${format(p2.y)} `;
  }

  return `${d.trim()} Z`;
}

function format(n: number): string {
  return Math.round(n * 1000) / 1000 + "";
}
