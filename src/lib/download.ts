export interface SolidFill {
  type: "solid";
  color: string;
}

export interface GradientFill {
  type: "gradient";
  from: string;
  to: string;
  angle: number;
}

export type BlobFill = SolidFill | GradientFill;

export interface BlobSvgOptions {
  path: string;
  size: number;
  fill: BlobFill;
}

const GRADIENT_ID = "blobGradient";

/** Converts an angle in degrees to normalized x1/y1/x2/y2 gradient vector coordinates. */
function gradientVector(angle: number): { x1: string; y1: string; x2: string; y2: string } {
  const radians = ((angle - 90) * Math.PI) / 180;
  const x2 = 50 + 50 * Math.cos(radians);
  const y2 = 50 + 50 * Math.sin(radians);
  const x1 = 50 - 50 * Math.cos(radians);
  const y1 = 50 - 50 * Math.sin(radians);
  return {
    x1: `${x1}%`,
    y1: `${y1}%`,
    x2: `${x2}%`,
    y2: `${y2}%`,
  };
}

/** Builds the `<defs>` block for a gradient fill, or an empty string for solid fills. */
export function buildGradientDefs(fill: BlobFill): string {
  if (fill.type !== "gradient") return "";
  const { x1, y1, x2, y2 } = gradientVector(fill.angle);
  return `<defs><linearGradient id="${GRADIENT_ID}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"><stop offset="0%" stop-color="${fill.from}"/><stop offset="100%" stop-color="${fill.to}"/></linearGradient></defs>`;
}

/** Returns the `fill` attribute value referencing either a flat color or the gradient def. */
export function resolveFillRef(fill: BlobFill): string {
  return fill.type === "gradient" ? `url(#${GRADIENT_ID})` : fill.color;
}

/** Builds a standalone, valid SVG document string for the given blob. */
export function buildSvgMarkup({ path, size, fill }: BlobSvgOptions): string {
  const defs = buildGradientDefs(fill);
  const fillRef = resolveFillRef(fill);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${defs}<path fill="${fillRef}" d="${path}"/></svg>`;
}

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

/** Downloads the blob shape as an `.svg` file. */
export function downloadSvg(options: BlobSvgOptions, filename = "blob.svg"): void {
  const markup = buildSvgMarkup(options);
  const blob = new Blob([markup], { type: "image/svg+xml" });
  triggerDownload(blob, filename);
}

/**
 * Downloads the blob shape rasterized as a `.png` file at the requested
 * resolution (defaults to 4x the SVG viewBox size for crisp output).
 */
export function downloadPng(
  options: BlobSvgOptions,
  filename = "blob.png",
  scale = 4,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const markup = buildSvgMarkup(options);
    const svgBlob = new Blob([markup], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = options.size * scale;
      canvas.height = options.size * scale;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Canvas 2D context is not available"));
        return;
      }
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);

      canvas.toBlob((pngBlob) => {
        if (!pngBlob) {
          reject(new Error("Failed to encode PNG"));
          return;
        }
        triggerDownload(pngBlob, filename);
        resolve();
      }, "image/png");
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to render SVG for PNG export"));
    };

    image.src = url;
  });
}

/** Copies arbitrary text to the clipboard, with a fallback for older browsers. */
export async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand("copy");
  } finally {
    document.body.removeChild(textarea);
  }
}
