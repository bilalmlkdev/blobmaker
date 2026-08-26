import { ReactNode } from "react";
import { Button } from "./Button";
import { cn } from "../lib/classNames";

interface ToggleOption<T extends string = string> {
  id: T;
  label: ReactNode;
}

interface ToggleGroupProps<T extends string = string> {
  options: ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  variant?: "default" | "pill";
}

/**
 * Reusable toggle group for switching between options
 */
export function ToggleGroup<T extends string = string>({
  options,
  value,
  onChange,
  variant = "default",
}: ToggleGroupProps<T>) {
  if (variant === "pill") {
    return (
      <div className="flex items-center gap-1 rounded-full border border-white/10 p-1">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-200 cursor-pointer",
              value === option.id
                ? "bg-white text-black"
                : "text-neutral-400 hover:text-white"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Button
          key={option.id}
          variant={value === option.id ? "primary" : "secondary"}
          size="sm"
          onClick={() => onChange(option.id)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
