interface BlobPreviewProps {
  path: string;
  size: number;
  color: string;
}

/** Renders the live blob shape inside a bordered, dashed square canvas area. */
export function BlobPreview({ path, size, color }: BlobPreviewProps) {
  return (
    <div className="flex flex-1 items-center justify-center px-4 pb-6">
      <div className="flex h-[min(72vw,420px)] w-[min(72vw,420px)] items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white sm:h-[420px] sm:w-[420px]">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width="82%"
          height="82%"
          role="img"
          aria-label="Generated blob shape preview"
        >
          <path d={path} fill={color} className="transition-[d] duration-300 ease-out" />
        </svg>
      </div>
    </div>
  );
}
