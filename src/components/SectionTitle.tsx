import { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
}

/**
 * Consistent section title styling
 */
export function SectionTitle({ children }: SectionTitleProps) {
  return <h2 className="text-sm font-semibold text-white">{children}</h2>;
}
