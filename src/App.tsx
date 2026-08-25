import { useState } from "react";
import { Header } from "./components/Header";
import { BlobPreview } from "./components/BlobPreview";
import { ColorPicker } from "./components/ColorPicker";
import { Slider } from "./components/Slider";
import { DownloadMenu } from "./components/DownloadMenu";
import { CodeModal } from "./components/CodeModal";
import { CircleIcon, BlobShapeIcon, CodeIcon, DiceIcon } from "./components/icons";
import {
  useBlobMaker,
  MIN_EDGES,
  MAX_EDGES,
  MIN_GROWTH,
  MAX_GROWTH,
} from "./hooks/useBlobMaker";
import { useToast } from "./hooks/useToast";
import { downloadPng, downloadSvg, copyToClipboard } from "./lib/download";

export default function App() {
  const {
    color,
    edges,
    growth,
    path,
    size,
    setColor,
    setEdges,
    setGrowth,
    randomize,
    reshuffle,
  } = useBlobMaker();

  const [codeOpen, setCodeOpen] = useState(false);
  const { message, showToast } = useToast();

  async function handleShare() {
    try {
      await copyToClipboard(window.location.href);
      showToast("Link copied to clipboard");
    } catch {
      showToast("Couldn't copy link");
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header onShare={handleShare} />

      <main className="flex flex-1 flex-col">
        <BlobPreview path={path} size={size} color={color} />

        <div className="mx-auto w-full max-w-md px-5 pb-8 sm:px-8">
          <div className="flex flex-col gap-5 rounded-2xl border border-neutral-200 p-5">
            <div className="flex items-center justify-between gap-4">
              <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                <BlobShapeIcon width={18} height={18} />
                Edges
              </label>
              <span className="w-6 text-right text-sm font-semibold tabular-nums text-black">
                {edges}
              </span>
              <Slider
                label="Number of edges"
                min={MIN_EDGES}
                max={MAX_EDGES}
                value={edges}
                onChange={setEdges}
                className="flex-1"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                <CircleIcon width={18} height={18} />
                Growth
              </label>
              <span className="w-6 text-right text-sm font-semibold tabular-nums text-black">
                {growth}
              </span>
              <Slider
                label="Growth / irregularity"
                min={MIN_GROWTH}
                max={MAX_GROWTH}
                value={growth}
                onChange={setGrowth}
                className="flex-1"
              />
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-neutral-100 pt-4">
              <ColorPicker color={color} onChange={setColor} />

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={randomize}
                  aria-label="Randomize shape"
                  title="Randomize"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black text-black transition-colors hover:bg-black hover:text-white cursor-pointer"
                >
                  <DiceIcon />
                </button>
                <button
                  type="button"
                  onClick={() => setCodeOpen(true)}
                  aria-label="View code"
                  title="Code"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black text-black transition-colors hover:bg-black hover:text-white cursor-pointer"
                >
                  <CodeIcon />
                </button>
                <DownloadMenu
                  onDownloadSvg={() => downloadSvg({ path, size, color })}
                  onDownloadPng={() => downloadPng({ path, size, color })}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={reshuffle}
              className="text-center text-xs font-medium text-neutral-400 transition-colors hover:text-black cursor-pointer"
            >
              Reshuffle wobble (keep edges &amp; growth)
            </button>
          </div>
        </div>
      </main>

      {codeOpen && (
        <CodeModal
          path={path}
          size={size}
          color={color}
          onClose={() => setCodeOpen(false)}
        />
      )}

      {message && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-black px-4 py-2 text-sm font-medium text-white shadow-lg"
        >
          {message}
        </div>
      )}
    </div>
  );
}
