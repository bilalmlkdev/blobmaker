import { buildGradientDefs, buildSvgMarkup, resolveFillRef, type BlobFill } from "./download";

export interface SnippetOptions {
  path: string;
  size: number;
  fill: BlobFill;
}

export type SnippetLanguage = "svg" | "react" | "css";

export const SNIPPET_LANGUAGES: { id: SnippetLanguage; label: string }[] = [
  { id: "svg", label: "SVG" },
  { id: "react", label: "React" },
  { id: "css", label: "CSS" },
];

/** Generates the raw SVG markup snippet. */
function svgSnippet(options: SnippetOptions): string {
  return buildSvgMarkup(options);
}

/** Generates a copy-pasteable React functional component. */
function reactSnippet({ path, size, fill }: SnippetOptions): string {
  const fillRef = resolveFillRef(fill);
  const defsJsx =
    fill.type === "gradient"
      ? `
      <defs>
        <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(${fill.angle} 0.5 0.5)">
          <stop offset="0%" stopColor="${fill.from}" />
          <stop offset="100%" stopColor="${fill.to}" />
        </linearGradient>
      </defs>`
      : "";

  return `function Blob() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${size}"
      height="${size}"
      viewBox="0 0 ${size} ${size}"
    >${defsJsx}
      <path fill="${fillRef}" d="${path}" />
    </svg>
  );
}

export default Blob;`;
}

/** Generates a CSS `background-image` snippet using an inlined SVG data URI mask. */
function cssSnippet({ path, size, fill }: SnippetOptions): string {
  const defs = buildGradientDefs(fill);
  const fillRef = resolveFillRef(fill);
  const markup = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${defs}<path fill="${fillRef}" d="${path}"/></svg>`;
  const encoded = encodeURIComponent(markup)
    .replace(/'/g, "%27")
    .replace(/"/g, "%22");
  return `.blob {
  width: ${size}px;
  height: ${size}px;
  background-image: url("data:image/svg+xml,${encoded}");
  background-repeat: no-repeat;
  background-size: contain;
}`;
}

const generators: Record<SnippetLanguage, (options: SnippetOptions) => string> = {
  svg: svgSnippet,
  react: reactSnippet,
  css: cssSnippet,
};

/** Returns the requested code snippet for the current blob shape. */
export function generateSnippet(
  language: SnippetLanguage,
  options: SnippetOptions,
): string {
  return generators[language](options);
}
