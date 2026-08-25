import type { SVGProps } from "react";

/**
 * A small collection of hand-drawn, stroke-based icons used throughout the
 * UI. Kept as inline SVGs so the app has zero icon-library dependency and
 * every glyph inherits `currentColor` for the black & white theme.
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function EdgesIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4 L20 18 H4 Z" />
      <circle cx="12" cy="4" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="20" cy="18" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="4" cy="18" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GrowthIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 L15 9 L21 10.2 L16.6 14.6 L17.8 20.6 L12 17.6 L6.2 20.6 L7.4 14.6 L3 10.2 L9 9 Z" />
    </svg>
  );
}

export function CircleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
    </svg>
  );
}

export function BlobShapeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 4c3-1.5 7-1 9 2s2.5 6.5 0 9.5-8 4-11.5 1.5S2 10.5 4 7.5 6 4.7 8 4Z" />
    </svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v12" />
      <path d="M7 10l5 5 5-5" />
      <path d="M4 19.5h16" />
    </svg>
  );
}

export function CodeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 8 4 12l5 4" />
      <path d="M15 8l5 4-5 4" />
    </svg>
  );
}

export function DiceIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" />
      <circle cx="8.3" cy="8.3" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="15.7" cy="8.3" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="8.3" cy="15.7" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="15.7" cy="15.7" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="18" cy="5" r="2.4" />
      <circle cx="6" cy="12" r="2.4" />
      <circle cx="18" cy="19" r="2.4" />
      <path d="M8.2 10.8 15.8 6.2" />
      <path d="M8.2 13.2 15.8 17.8" />
    </svg>
  );
}

export function GithubIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
      <path d="M12 2C6.48 2 2 6.58 2 12.17c0 4.49 2.87 8.3 6.84 9.65.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.36-3.37-1.36-.46-1.19-1.11-1.51-1.11-1.51-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.55 2.34 1.1 2.91.84.09-.66.35-1.1.63-1.35-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.17C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" />
    </svg>
  );
}

export function ImageIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="M4.5 16.5 9.5 12l3 3 3.5-3.5 4 4" />
    </svg>
  );
}
