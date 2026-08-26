import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { BlobPreview } from "../components/BlobPreview";
import { ColorPicker } from "../components/ColorPicker";
import { Slider } from "../components/Slider";
import { DownloadMenu } from "../components/DownloadMenu";
import { CodeModal } from "../components/CodeModal";
import { CircleIcon, BlobShapeIcon, CodeIcon, DiceIcon } from "../components/icons";
import {
  useBlobMaker,
  MIN_EDGES,
  MAX_EDGES,
  MIN_GROWTH,
  MAX_GROWTH,
  MIN_GRADIENT_ANGLE,
  MAX_GRADIENT_ANGLE,
  ANIMATIONS,
} from "../hooks/useBlobMaker";
import { useToast } from "../hooks/useToast";
import { downloadPng, downloadSvg, copyToClipboard, type BlobFill } from "../lib/download";
import { BLOB_TEMPLATES } from "../lib/templates";

interface EditorLocationState {
  templateId?: string;
}

/**
 * Main blob generator screen: left panel for shape controls, a centered
 * live preview, and a right panel for fill/animation/export. Applies an
 * incoming template preset (via router state) on first mount, if present.
 */
export function AppEditor() {
  const {
    color,
    fillType,
    gradientColor,
    gradientAngle,
    edges,
    growth,
    animation,
    path,
    size,
    setColor,
    setFillType,
    setGradientColor,
    setGradientAngle,
    setEdges,
    setGrowth,
    setAnimation,
    applyPreset,
    randomize,
    reshuffle,
  } = useBlobMaker();

  const [codeOpen, setCodeOpen] = useState(false);
  const { message, showToast } = useToast();
  const location = useLocation();
  const hasAppliedTemplate = useRef(false);

  useEffect(() => {
    if (hasAppliedTemplate.current) return;
    const state = (location.state ?? {}) as EditorLocationState;
    if (!state.templateId) return;
    const template = BLOB_TEMPLATES.find((item) => item.id === state.templateId);
    if (!template) return;
    hasAppliedTemplate.current = true;
    applyPreset(template.preset);
    showToast(`Loaded "${template.name}"`);
  }, [location.state, applyPreset, showToast]);

  const fill: BlobFill =
    fillType === "gradient"
      ? { type: "gradient", from: color, to: gradientColor, angle: gradientAngle }
      : { type: "solid", color };

  async function handleShare() {
    try {
      await copyToClipboard(window.location.href);
      showToast("Link copied to clipboard");
    } catch {
      showToast("Couldn't copy link");
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Header onShare={handleShare} />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-49 lg:flex-row lg:items-start lg:gap-8">
        {/* Left panel: shape controls */}
        <aside className="w-full shrink-0 lg:w-72">
          <div className="flex flex-col gap-5 rounded-2xl border border-white/10 p-5 transition-shadow duration-300 lg:sticky lg:top-6">
            <h2 className="text-sm font-semibold text-white">Shape</h2>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-400">
                  <BlobShapeIcon width={18} height={18} />
                  Edges
                </label>
                <span className="w-6 text-right text-sm font-semibold tabular-nums text-white transition-all duration-300">
                  {edges}
                </span>
              </div>
              <Slider
                label="Number of edges"
                min={MIN_EDGES}
                max={MAX_EDGES}
                value={edges}
                onChange={setEdges}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-400">
                  <CircleIcon width={18} height={18} />
                  Growth
                </label>
                <span className="w-6 text-right text-sm font-semibold tabular-nums text-white transition-all duration-300">
                  {growth}
                </span>
              </div>
              <Slider
                label="Growth / irregularity"
                min={MIN_GROWTH}
                max={MAX_GROWTH}
                value={growth}
                onChange={setGrowth}
              />
            </div>

            <div className="flex items-center gap-2 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={randomize}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white px-3.5 py-2 text-xs font-semibold text-white transition-all duration-200 hover:bg-white hover:text-black active:scale-95 cursor-pointer"
              >
                <DiceIcon width={16} height={16} />
                Randomize
              </button>
              <button
                type="button"
                onClick={reshuffle}
                title="Reshuffle wobble (keep edges & growth)"
                className="flex-1 rounded-full border border-white/15 px-3.5 py-2 text-xs font-semibold text-neutral-400 transition-colors duration-200 hover:border-white hover:text-white cursor-pointer"
              >
                Reshuffle
              </button>
            </div>
          </div>
        </aside>

        {/* Center: live preview */}
        <div className="flex flex-1 items-center justify-center">
          <BlobPreview path={path} size={size} fill={fill} animation={animation} />
        </div>

        {/* Right panel: fill, animation, export */}
        <aside className="w-full shrink-0 lg:w-80">
          <div className="flex flex-col gap-5 rounded-2xl border border-white/10 p-5 transition-shadow duration-300 lg:sticky lg:top-6">
            {/* Fill section */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-white">Fill</h2>
                <div className="flex items-center gap-1 rounded-full border border-white/10 p-1">
                  {(["solid", "gradient"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setFillType(option)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize transition-colors duration-200 cursor-pointer ${
                        fillType === option
                          ? "bg-white text-black"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <ColorPicker color={color} onChange={setColor} />
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    fillType === "gradient"
                      ? "grid-cols-[1fr] opacity-100"
                      : "grid-cols-[0fr] opacity-0"
                  }`}
                  style={{ overflow: "hidden" }}
                >
                  <div className="min-w-0">
                    <ColorPicker color={gradientColor} onChange={setGradientColor} />
                  </div>
                </div>
              </div>

              {fillType === "gradient" && (
                <div className="flex flex-col gap-2 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-neutral-400">Angle</label>
                    <span className="w-10 text-right text-sm font-semibold tabular-nums text-white">
                      {gradientAngle}°
                    </span>
                  </div>
                  <Slider
                    label="Gradient angle"
                    min={MIN_GRADIENT_ANGLE}
                    max={MAX_GRADIENT_ANGLE}
                    value={gradientAngle}
                    onChange={setGradientAngle}
                  />
                </div>
              )}
            </div>

            {/* Animation section */}
            <div className="flex flex-col gap-3 border-t border-white/10 pt-4">
              <h2 className="text-sm font-semibold text-white">Animation</h2>
              <div className="flex flex-wrap gap-2">
                {ANIMATIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setAnimation(option.id)}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors duration-200 cursor-pointer ${
                      animation === option.id
                        ? "border-white bg-white text-black"
                        : "border-white/15 text-neutral-400 hover:border-white hover:text-white"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Export section */}
            <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4">
              <h2 className="text-sm font-semibold text-white">Export</h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCodeOpen(true)}
                  aria-label="View code"
                  title="Code"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white text-white transition-all duration-200 hover:bg-white hover:text-black active:scale-90 cursor-pointer"
                >
                  <CodeIcon />
                </button>
                <DownloadMenu
                  onDownloadSvg={() => downloadSvg({ path, size, fill })}
                  onDownloadPng={() => downloadPng({ path, size, fill })}
                />
              </div>
            </div>
          </div>
        </aside>
      </main>

      {codeOpen && (
        <CodeModal path={path} size={size} fill={fill} onClose={() => setCodeOpen(false)} />
      )}

      {message && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black shadow-lg animate-pop-in"
        >
          {message}
        </div>
      )}
    </div>
  );
}
