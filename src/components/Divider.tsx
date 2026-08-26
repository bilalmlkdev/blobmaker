interface DividerProps {
  className?: string;
}

/**
 * Consistent divider styling
 */
export function Divider({ className }: DividerProps) {
  return <div className={`border-t border-white/10 ${className || "pt-4"}`} />;
}
