import type { BlobStyle } from "../hooks/useBlob";

interface Props {
  blobStyle: BlobStyle;
}

export default function BlobPreview({ blobStyle }: Props) {
  return (
    <main className="absolute inset-0 flex items-center justify-center">
      <div
        className="w-72 h-72 md:w-96 md:h-96 transition-all duration-300 ease-out"
        style={{
          borderRadius: blobStyle.borderRadius,
          transform: blobStyle.transform,
          background: blobStyle.background,
          opacity: blobStyle.opacity,
        }}
      />
    </main>
  );
}
