/**
 * Utility for combining classNames conditionally
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Create a factory for component class names
 */
export function createComponentClasses<T extends Record<string, string>>(
  variants: T
): (variant: keyof T) => string {
  return (variant) => variants[variant] ?? "";
}
