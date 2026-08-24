import  type { BlobStyle } from "../hooks/useBlob";

interface Props {
  blobStyle: BlobStyle;
}

export default function BlobPreview({ blobStyle }: Props) {
  return (
    <main className="flex-1 flex items-center justify-center p-10">
      <div
        className="w-64 h-64 transition-all duration-300 ease-out"
        style={{
          borderRadius: blobStyle.borderRadius,
          transform: blobStyle.transform,
          background: blobStyle.background,
        }}
      />
    </main>
  );
}
