import { useNavigate } from "react-router-dom";
import { TemplateBlobThumb } from "./TemplateBlobThumb";
import type { BlobTemplate } from "../lib/templates";

interface TemplateCardProps {
  template: BlobTemplate;
}

const DIFFICULTY_STYLES: Record<string, string> = {
  Light: "bg-white/10 text-neutral-300",
  Medium: "bg-white/10 text-neutral-300",
};

/** A single template preview card. Clicking it routes through the loader into the app with this preset applied. */
export function TemplateCard({ template }: TemplateCardProps) {
  const navigate = useNavigate();

  function handleSelect() {
    navigate("/loading", { state: { templateId: template.id } });
  }

  return (
    <button
      type="button"
      onClick={handleSelect}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-2xl hover:shadow-black/40 cursor-pointer"
    >
      <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-black">
        <TemplateBlobThumb
          template={template}
          className="h-full w-full scale-110 transition-transform duration-500 group-hover:scale-125"
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-sm font-semibold text-white">{template.name}</h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-neutral-500">
          {template.description}
        </p>
        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {template.swatches.map((swatch, i) => (
              <span
                key={i}
                className="h-3.5 w-3.5 rounded-full border border-white/20"
                style={{ backgroundColor: swatch }}
              />
            ))}
          </div>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${DIFFICULTY_STYLES[template.difficulty]}`}
          >
            {template.difficulty}
          </span>
        </div>
      </div>
    </button>
  );
}
