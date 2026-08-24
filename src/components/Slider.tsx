interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}

export default function Slider({
  label,
  value,
  min,
  max,
  step = 0.01,
  onChange,
}: SliderProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <label className="text-xs font-medium text-zinc-300">{label}</label>
        <span className="text-xs text-zinc-500 tabular-nums">
          {value.toFixed(2)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onInput={(e) => onChange(parseFloat(e.currentTarget.value))}
        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-violet-500"
      />
    </div>
  );
}
