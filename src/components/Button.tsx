import { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "../lib/classNames";

type ButtonVariant = "primary" | "secondary" | "ghost" | "icon";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  isLoading?: boolean;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: "bg-white text-black hover:opacity-90 active:scale-95",
  secondary:
    "border border-white px-3.5 py-2 text-white hover:bg-white hover:text-black active:scale-95",
  ghost:
    "text-neutral-400 hover:text-white transition-colors duration-200",
  icon: "flex h-10 w-10 items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-black active:scale-90",
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "text-xs font-semibold px-3 py-1.5 rounded-full",
  md: "text-sm font-semibold px-4 py-2 rounded-lg",
  lg: "text-base font-semibold px-5 py-2.5 rounded-lg",
};

/**
 * Reusable button component with variants and sizes
 */
export function Button({
  variant = "primary",
  size = "md",
  className,
  disabled,
  isLoading,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        "transition-all duration-200 cursor-pointer",
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        (disabled || isLoading) && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {isLoading ? <span className="animate-pulse">Loading...</span> : children}
    </button>
  );
}
