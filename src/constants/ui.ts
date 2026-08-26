/**
 * Centralized UI constants for consistent design system
 */

export const SPACING = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "2.5rem",
  "3xl": "3rem",
} as const;

export const BORDER_RADIUS = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "1rem",
  xl: "1.5rem",
  full: "9999px",
} as const;

export const Z_INDEX = {
  modal: 50,
  toast: 50,
  dropdown: 40,
} as const;

export const ANIMATIONS = {
  duration: {
    fast: "150ms",
    normal: "200ms",
    slow: "300ms",
  },
  easing: {
    ease_out: "ease-out",
    ease_in_out: "ease-in-out",
    cubic_smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
  },
} as const;

export const COLORS = {
  white: "#ffffff",
  black: "#000000",
  neutral: {
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
  },
} as const;
