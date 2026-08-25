interface SliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  label: string;
  className?: string;
}

/** A minimal black & white range slider with an accessible label. */
export function Slider({
  value,
  min,
  max,
  step = 1,
  onChange,
  label,
  className = "",
}: SliderProps) {
  return (
    <input
      type="range"
      aria-label={label}
      title={label}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      className={`slider h-1.5 w-full cursor-pointer appearance-none rounded-full bg-neutral-300 accent-black ${className}`}
    />
  );
}
