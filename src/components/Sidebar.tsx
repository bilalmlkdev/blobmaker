import { ChevronRight, Shuffle, RotateCcw } from "lucide-react";

interface Props {
  onClose: () => void;
  onRandomize: () => void;
  onReset: () => void;
}

export default function Sidebar({ onClose, onRandomize, onReset }: Props) {
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
      <div className="flex gap-3">
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
    </aside>
  );
}
