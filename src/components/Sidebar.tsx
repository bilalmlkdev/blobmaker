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
} from "lucide-react";
import Slider from "./Slider";
import type { DisplaySettings } from "../hooks/useBlob";

interface Props {
  onClose: () => void;
  onRandomize: () => void;
  onReset: () => void;
  onGetCode: () => void;
  displaySettings: DisplaySettings;
  onDisplaySettingsChange: (settings: DisplaySettings) => void;
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
}: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("display");

  const updateDisplaySetting = (key: keyof DisplaySettings, value: number) => {
    onDisplaySettingsChange({
      ...displaySettings,
      [key]: value,
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
          <div className="text-sm text-zinc-400">
            <p className="text-center mt-8">Color controls coming soon</p>
          </div>
        )}
        {activeTab === "animate" && (
          <div className="text-sm text-zinc-400">
            <p className="text-center mt-8">Animation controls coming soon</p>
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
