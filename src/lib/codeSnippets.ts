import { buildSvgMarkup } from "./download";

export interface SnippetOptions {
  path: string;
  size: number;
  color: string;
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
function reactSnippet({ path, size, color }: SnippetOptions): string {
  return `function Blob() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${size}"
      height="${size}"
      viewBox="0 0 ${size} ${size}"
    >
      <path fill="${color}" d="${path}" />
    </svg>
  );
}

export default Blob;`;
}

/** Generates a CSS `clip-path` friendly snippet using an inlined SVG data URI mask. */
function cssSnippet({ path, size, color }: SnippetOptions): string {
  const markup = buildSvgMarkup({ path, size, color });
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
