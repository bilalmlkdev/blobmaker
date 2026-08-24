interface Props {
  onRandomize: () => void;
}

export default function Sidebar({ onRandomize }: Props) {
  return (
    <aside className="w-80 border-r border-white/10 bg-white/5 backdrop-blur-xl p-6">
      <h2 className="text-lg font-semibold mb-6">Controls</h2>
      <button
        onClick={onRandomize}
        className="w-full py-2 px-4 rounded-lg bg-violet-600 hover:bg-violet-500 transition-colors"
      >
        Randomize Blob
      </button>
    </aside>
  );
}
