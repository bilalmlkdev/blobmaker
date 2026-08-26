import { ReactNode } from "react";
import { cn } from "../lib/classNames";

interface CardProps {
  children: ReactNode;
  className?: string;
  sticky?: boolean;
}

/**
 * Reusable card component for panel sections
 */
export function Card({ children, className, sticky = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 p-5",
        "transition-shadow duration-300",
        sticky && "lg:sticky lg:top-6",
        className
      )}
    >
      {children}
    </div>
  );
}
