interface Props {
  onRandomize: () => void;
}

export default function Sidebar({ onRandomize }: Props) {
  return (
    <aside className="absolute top-6 right-6 w-72 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
      <h2 className="text-lg font-semibold mb-4">Controls</h2>
      <button
        onClick={onRandomize}
        className="w-full py-2 px-4 rounded-lg bg-violet-600 hover:bg-violet-500 transition-colors"
      >
        Randomize Blob
      </button>
    </aside>
  );
}
