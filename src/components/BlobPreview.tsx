import { useBlob } from "../hooks/useBlob";

export default function BlobPreview() {
  const { blobStyle, randomize } = useBlob();

  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-8 p-10">
      <div
        className="w-64 h-64 transition-all duration-300 ease-out"
        style={{
          borderRadius: blobStyle.borderRadius,
          transform: blobStyle.transform,
          background: blobStyle.background,
        }}
      />
      <button
        onClick={randomize}
        className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
      >
        Randomize
      </button>
    </main>
  );
}
