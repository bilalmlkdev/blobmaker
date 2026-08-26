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

    <svg {...base} {...props} fill="#ffffff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>burst-blob</title> <path d="M25.271 21.676c0 5.103-4.136 9.24-9.24 9.24s-9.24-4.136-9.24-9.24 4.136-9.24 9.24-9.24 9.24 4.137 9.24 9.24zM9.772 8.197c1.565 1.068 2.412 3.679 2.064 5.244 0.634-0.324 1.311-0.576 2.020-0.747-1.192-0.942-1.956-3.396-1.071-5.121 0.825-1.607-0.653-3.311-2.285-2.817-1.896 0.574-1.749 2.746-0.729 3.442zM17.546 12.56c1.062 0.175 2.062 0.531 2.969 1.035-0.735-2.185 0.277-5.937 2.843-7.472 1.5-0.898 1.842-4.123-0.843-4.935-2.31-0.7-4.373 1.698-3.235 3.988 1.361 2.74 0.214 6.171-1.733 7.384zM7.178 19.027c0.521-1.743 1.542-3.269 2.896-4.413-1.891-2.113-3.046-5.066-3.251-8.061-0.253-3.682-3.199-4.568-4.894-3.398-1.675 1.156-2.118 4.335 1.25 6.351 3.208 1.919 4.658 6.008 3.999 9.521zM29.503 7.588c-2.062-0.953-5.127 0.729-5.152 3.865-0.012 1.463-0.548 2.848-1.545 3.94 1.211 1.305 2.050 2.961 2.346 4.798-0.355-3.266 0.005-5.061 1.962-5.597 5.95-1.626 4.835-5.876 2.388-7.007z"></path> </g></svg>
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

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-4.35-4.35" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5v-17Z" />
      <path d="M4 19a2.5 2.5 0 0 1 2.5-2.5H20" />
    </svg>
  );
}

export function LayoutIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M3.5 9.5h17" />
      <path d="M9.5 9.5V21" />
    </svg>
  );
}

export function ExternalLinkIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}
