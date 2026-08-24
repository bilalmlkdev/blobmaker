import { useState } from "react";
import { Pipette } from "lucide-react";

interface ColorPickerRowProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

export default function ColorPickerRow({
  label,
  color,
  onChange,
}: ColorPickerRowProps) {
  const [eyeDropperSupported] = useState(
    typeof window !== "undefined" && "EyeDropper" in window,
  );

  const handleEyeDropper = async () => {
    if (!eyeDropperSupported) return;
    try {
      const eyeDropper = new (window as any).EyeDropper();
      const result = await eyeDropper.open();
      onChange(result.sRGBHex);
    } catch (err) {
      // User canceled
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 mb-3">
      <span className="text-sm text-zinc-300">{label}</span>
      <div className="flex items-center gap-2">
        {/* Pill showing current color */}
        <div
          className="w-8 h-8 rounded-full border border-white/20"
          style={{ backgroundColor: color }}
        />
        {/* Native color picker */}
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 cursor-pointer bg-transparent border-0 p-0"
          title="Pick a color"
        />
        {/* Eye dropper button */}
        {eyeDropperSupported && (
          <button
            onClick={handleEyeDropper}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            title="Pick color from screen"
          >
            <Pipette className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
