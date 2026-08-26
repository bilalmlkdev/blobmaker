import { useEffect, useRef, useState } from "react";
import { DownloadIcon, ImageIcon } from "./icons";

interface DownloadMenuProps {
  onDownloadSvg: () => void;
  onDownloadPng: () => void;
}

/** A small popover menu offering SVG or PNG export, anchored to a trigger button. */
export function DownloadMenu({ onDownloadSvg, onDownloadPng }: DownloadMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Download blob"
        title="Download"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white text-white transition-colors hover:bg-white hover:text-black cursor-pointer"
      >
        <DownloadIcon />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute bottom-full right-0 z-20 mb-2 w-40 overflow-hidden rounded-xl border border-white/10 bg-neutral-950 shadow-lg animate-pop-in"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              onDownloadSvg();
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-medium text-white hover:bg-white/5 cursor-pointer"
          >
            <DownloadIcon width={16} height={16} />
            SVG
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              onDownloadPng();
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 border-t border-white/10 px-4 py-2.5 text-left text-sm font-medium text-white hover:bg-white/5 cursor-pointer"
          >
            <ImageIcon width={16} height={16} />
            PNG
          </button>
        </div>
      )}
    </div>
  );
}
