import { Link } from "react-router-dom";
import { GithubIcon, ShareIcon, LayoutIcon } from "./icons";

interface HeaderProps {
  onShare: () => void;
}

export function Header({ onShare }: HeaderProps) {
  return (
    <header className="border-b border-white/10 bg-black">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white font-black text-black select-none">
            B
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-white">Blob Maker</p>
            <p className="text-xs text-neutral-500">
              Generate organic SVG blob shapes
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/templates"
            className="flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-sm font-medium text-white transition-colors duration-200 hover:border-white/40 cursor-pointer"
          >
            <LayoutIcon width={16} height={16} />
            <span className="hidden sm:inline">Templates</span>
          </Link>
          <button
            type="button"
            onClick={onShare}
            className="flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-sm font-medium text-white transition-colors duration-200 hover:border-white/40 cursor-pointer"
          >
            <ShareIcon width={16} height={16} />
            <span className="hidden sm:inline">Share</span>
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="View source on GitHub"
            className="text-neutral-500 transition-colors duration-200 hover:text-white"
          >
            <GithubIcon width={20} height={20} />
          </a>
        </div>
      </div>
    </header>
  );
}
