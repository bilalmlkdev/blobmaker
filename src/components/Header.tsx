import { GithubIcon, ShareIcon } from "./icons";

interface HeaderProps {
  onShare: () => void;
}

export function Header({ onShare }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-5 py-4 sm:px-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black font-black text-white select-none">
          B
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-black">Blob Maker</p>
          <p className="text-xs text-neutral-500">
            Generate organic SVG blob shapes
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onShare}
          className="flex items-center gap-1.5 rounded-full border border-neutral-300 px-3.5 py-1.5 text-sm font-medium text-black transition-colors hover:border-black cursor-pointer"
        >
          <ShareIcon width={16} height={16} />
          Share
        </button>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="View source on GitHub"
          className="text-neutral-500 transition-colors hover:text-black"
        >
          <GithubIcon width={20} height={20} />
        </a>
      </div>
    </header>
  );
}
