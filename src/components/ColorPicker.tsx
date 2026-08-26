import { useEffect, useState } from "react";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const HEX_PATTERN = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

/**
 * A hex text field paired with a native color swatch button. The text field
 * keeps its own draft value so users can type freely; it only propagates up
 * once the value is a valid hex color.
 */
export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [draft, setDraft] = useState(color);

  useEffect(() => {
    setDraft(color);
  }, [color]);

  const isValid = HEX_PATTERN.test(draft);

  function commit(value: string) {
    if (HEX_PATTERN.test(value)) {
      onChange(value.startsWith("#") ? value : `#${value}`);
    }
  }

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 py-1.5 pl-3.5 pr-1.5">
      <input
        type="text"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={(event) => commit(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") commit((event.target as HTMLInputElement).value);
        }}
        aria-label="Blob color hex value"
        spellCheck={false}
        maxLength={7}
        className={`w-20 bg-transparent text-sm font-semibold uppercase tracking-wide outline-none ${
          isValid ? "text-white" : "text-neutral-600"
        }`}
      />
      <label className="relative h-6 w-6 shrink-0 cursor-pointer rounded-full border border-white/20">
        <span
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: isValid ? draft : color }}
        />
        <input
          type="color"
          aria-label="Pick blob color"
          value={isValid ? draft : color}
          onChange={(event) => {
            setDraft(event.target.value);
            onChange(event.target.value);
          }}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </label>
    </div>
  );
}
