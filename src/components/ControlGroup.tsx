import { ReactNode } from "react";
import { cn } from "../lib/classNames";

interface ControlGroupProps {
  label: string;
  icon?: ReactNode;
  value?: string | number;
  children: ReactNode;
  className?: string;
}

/**
 * Reusable control group for labeled form elements
 */
export function ControlGroup({
  label,
  icon,
  value,
  children,
  className,
}: ControlGroupProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-medium text-neutral-400">
          {icon}
          {label}
        </label>
        {value !== undefined && (
          <span className="w-6 text-right text-sm font-semibold tabular-nums text-white transition-all duration-300">
            {value}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
