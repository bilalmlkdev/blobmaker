import { useEffect, useState } from "react";
import {
  generateSnippet,
  SNIPPET_LANGUAGES,
  type SnippetLanguage,
} from "../lib/codeSnippets";
import { copyToClipboard, type BlobFill } from "../lib/download";
import { CheckIcon, CloseIcon, CopyIcon } from "./icons";

interface CodeModalProps {
  path: string;
  size: number;
  fill: BlobFill;
  onClose: () => void;
}

/** A modal dialog that lets users copy the blob as SVG, React, or CSS code. */
export function CodeModal({ path, size, fill, onClose }: CodeModalProps) {
  const [language, setLanguage] = useState<SnippetLanguage>("svg");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const snippet = generateSnippet(language, { path, size, fill });

  async function handleCopy() {
    await copyToClipboard(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Blob code export"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[80vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl animate-scale-in"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="text-sm font-semibold text-white">Copy blob code</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="text-neutral-500 transition-colors hover:text-white cursor-pointer"
          >
            <CloseIcon width={18} height={18} />
          </button>
        </div>

        <div className="flex gap-2 px-5 pt-4">
          {SNIPPET_LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              type="button"
              onClick={() => setLanguage(lang.id)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                language === lang.id
                  ? "bg-white text-black"
                  : "bg-white/5 text-neutral-400 hover:bg-white/10"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        <div className="relative m-5 mt-4 flex-1 overflow-auto rounded-xl border border-white/10 bg-black">
          <pre className="max-h-72 overflow-auto p-4 text-xs leading-relaxed text-neutral-300">
            <code>{snippet}</code>
          </pre>
        </div>

        <div className="flex justify-end border-t border-white/10 px-5 py-4">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-80 cursor-pointer"
          >
            {copied ? (
              <>
                <CheckIcon width={16} height={16} />
                Copied
              </>
            ) : (
              <>
                <CopyIcon width={16} height={16} />
                Copy code
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
