import { useState } from "react";
import {
  ChevronRight,
  Shuffle,
  RotateCcw,
  Code2,
  Monitor,
  Palette,
  Wand2,
  Sparkles,
  Download,
  Check,
} from "lucide-react";
import Slider from "./Slider";
import ColorPickerRow from "./ColorPickerRow";
import type {
  DisplaySettings,
  AnimationSettings,
  ColorSettings,
  ColorMode,
} from "../hooks/useBlob";

interface Props {
  onClose: () => void;
  onRandomize: () => void;
  onReset: () => void;
  onGetCode: () => void;
  displaySettings: DisplaySettings;
  onDisplaySettingsChange: (settings: DisplaySettings) => void;
  animationSettings: AnimationSettings;
  onAnimationSettingsChange: (settings: AnimationSettings) => void;
  colorSettings: ColorSettings;
  onColorSettingsChange: (settings: ColorSettings) => void;
}

type TabId = "display" | "colors" | "animate" | "effects" | "download";

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "display", label: "Display", icon: Monitor },
  { id: "colors", label: "Colors", icon: Palette },
  { id: "animate", label: "Animate", icon: Wand2 },
  { id: "effects", label: "Effects", icon: Sparkles },
  { id: "download", label: "Download", icon: Download },
];

export default function Sidebar({
  onClose,
  onRandomize,
  onReset,
  onGetCode,
  displaySettings,
  onDisplaySettingsChange,
  animationSettings,
  onAnimationSettingsChange,
  colorSettings,
  onColorSettingsChange,
}: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("display");

  const updateDisplaySetting = (key: keyof DisplaySettings, value: number) => {
    onDisplaySettingsChange({
      ...displaySettings,
      [key]: value,
    });
  };

  const updateAnimationSetting = (
    key: keyof AnimationSettings,
    value: number,
  ) => {
    onAnimationSettingsChange({
      ...animationSettings,
      [key]: value,
    });
  };

  // Color settings update helpers
  const setColorMode = (mode: ColorMode) => {
    onColorSettingsChange({
      ...colorSettings,
      mode,
    });
  };

  const updateGradientColor = (index: number, color: string) => {
    const newColors = [...colorSettings.gradientColors] as [
      string,
      string,
      string,
      string,
    ];
    newColors[index] = color;
    onColorSettingsChange({
      ...colorSettings,
      gradientColors: newColors,
    });
  };

  const updateGradientMix = (index: number, value: number) => {
    const newMixes = [...colorSettings.gradientMixes] as [
      number,
      number,
      number,
      number,
    ];
    newMixes[index] = value;
    onColorSettingsChange({
      ...colorSettings,
      gradientMixes: newMixes,
    });
  };

  const updateSolidColor = (color: string) => {
    onColorSettingsChange({
      ...colorSettings,
      solidColor: color,
    });
  };

  return (
    <aside className="absolute top-6 right-6 w-80 max-w-[calc(100vw-3rem)] p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl z-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold leading-tight">Blob Maker</h1>
          <p className="text-sm text-zinc-400">by Bilal Malik</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Hide controls"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mb-3">
        <button
          onClick={onReset}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
        <button
          onClick={onRandomize}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-violet-600 hover:bg-violet-500 transition-colors text-sm font-medium"
        >
          <Shuffle className="w-4 h-4" />
          Random
        </button>
      </div>

      {/* Get code button */}
      <button
        onClick={onGetCode}
        className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium mb-6"
      >
        <Code2 className="w-4 h-4" />
        Get Component Code
      </button>

      {/* Tab buttons */}
      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-2 px-1 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-violet-600 text-white"
                  : "bg-white/5 hover:bg-white/10 text-zinc-300"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] font-medium leading-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab content area */}
      <div className="bg-black/20 rounded-xl p-4 min-h-[200px] border border-white/5">
        {activeTab === "display" && (
          <div>
            <Slider
              label="Scale (Size)"
              value={displaySettings.scale}
              min={0.6}
              max={1.5}
              step={0.01}
              onChange={(v) => updateDisplaySetting("scale", v)}
            />
            <Slider
              label="Detail Level"
              value={displaySettings.detailLevel}
              min={20}
              max={32}
              step={0.01}
              onChange={(v) => updateDisplaySetting("detailLevel", v)}
            />
            <Slider
              label="Morph Intensity"
              value={displaySettings.morphIntensity}
              min={0.5}
              max={1.5}
              step={0.01}
              onChange={(v) => updateDisplaySetting("morphIntensity", v)}
            />
            <Slider
              label="Light Intensity"
              value={displaySettings.lightIntensity}
              min={0.5}
              max={1}
              step={0.01}
              onChange={(v) => updateDisplaySetting("lightIntensity", v)}
            />
            <Slider
              label="Opacity"
              value={displaySettings.opacity}
              min={0}
              max={1}
              step={0.01}
              onChange={(v) => updateDisplaySetting("opacity", v)}
            />
          </div>
        )}

        {activeTab === "colors" && (
          <div>
            {/* Toggle: Solid Color */}
            <div className="mb-2">
              <button
                onClick={() => setColorMode("solid")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border transition-colors ${
                  colorSettings.mode === "solid"
                    ? "bg-violet-600/20 border-violet-500"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <span className="text-sm font-medium">Use Solid Color</span>
                {colorSettings.mode === "solid" && (
                  <Check className="w-4 h-4 text-violet-400" />
                )}
              </button>
              {colorSettings.mode === "solid" && (
                <div className="mt-2 p-3 bg-black/20 rounded-lg border border-white/5">
                  <ColorPickerRow
                    label="Solid Color"
                    color={colorSettings.solidColor}
                    onChange={updateSolidColor}
                  />
                </div>
              )}
            </div>

            {/* Toggle: Gradient */}
            <div>
              <button
                onClick={() => setColorMode("gradient")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border transition-colors ${
                  colorSettings.mode === "gradient"
                    ? "bg-violet-600/20 border-violet-500"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <span className="text-sm font-medium">Use Gradient</span>
                {colorSettings.mode === "gradient" && (
                  <Check className="w-4 h-4 text-violet-400" />
                )}
              </button>
              {colorSettings.mode === "gradient" && (
                <div className="mt-2 p-3 bg-black/20 rounded-lg border border-white/5">
                  <ColorPickerRow
                    label="Color 1"
                    color={colorSettings.gradientColors[0]}
                    onChange={(c) => updateGradientColor(0, c)}
                  />
                  <ColorPickerRow
                    label="Color 2"
                    color={colorSettings.gradientColors[1]}
                    onChange={(c) => updateGradientColor(1, c)}
                  />
                  <ColorPickerRow
                    label="Color 3"
                    color={colorSettings.gradientColors[2]}
                    onChange={(c) => updateGradientColor(2, c)}
                  />
                  <ColorPickerRow
                    label="Color 4"
                    color={colorSettings.gradientColors[3]}
                    onChange={(c) => updateGradientColor(3, c)}
                  />

                  <div className="mt-4">
                    <Slider
                      label="Color Mix 1"
                      value={colorSettings.gradientMixes[0]}
                      min={0}
                      max={1}
                      step={0.01}
                      onChange={(v) => updateGradientMix(0, v)}
                    />
                    <Slider
                      label="Color Mix 2"
                      value={colorSettings.gradientMixes[1]}
                      min={0}
                      max={1}
                      step={0.01}
                      onChange={(v) => updateGradientMix(1, v)}
                    />
                    <Slider
                      label="Color Mix 3"
                      value={colorSettings.gradientMixes[2]}
                      min={0}
                      max={1}
                      step={0.01}
                      onChange={(v) => updateGradientMix(2, v)}
                    />
                    <Slider
                      label="Color Mix 4"
                      value={colorSettings.gradientMixes[3]}
                      min={0}
                      max={1}
                      step={0.01}
                      onChange={(v) => updateGradientMix(3, v)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "animate" && (
          <div>
            <Slider
              label="Noise Scale"
              value={animationSettings.noiseScale}
              min={0}
              max={20}
              step={0.01}
              onChange={(v) => updateAnimationSetting("noiseScale", v)}
            />
            <Slider
              label="Animation Speed"
              value={animationSettings.animationSpeed}
              min={0}
              max={1}
              step={0.01}
              onChange={(v) => updateAnimationSetting("animationSpeed", v)}
            />
          </div>
        )}

        {activeTab === "effects" && (
          <div className="text-sm text-zinc-400">
            <p className="text-center mt-8">Effect controls coming soon</p>
          </div>
        )}
        {activeTab === "download" && (
          <div className="text-sm text-zinc-400">
            <p className="text-center mt-8">Download options coming soon</p>
          </div>
        )}
      </div>
    </aside>
  );
}
