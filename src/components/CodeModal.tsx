import { useEffect, useState } from "react";
import {
  generateSnippet,
  SNIPPET_LANGUAGES,
  type SnippetLanguage,
} from "../lib/codeSnippets";
import { copyToClipboard } from "../lib/download";
import { CheckIcon, CloseIcon, CopyIcon } from "./icons";

interface CodeModalProps {
  path: string;
  size: number;
  color: string;
  onClose: () => void;
}

/** A modal dialog that lets users copy the blob as SVG, React, or CSS code. */
export function CodeModal({ path, size, color, onClose }: CodeModalProps) {
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

  const snippet = generateSnippet(language, { path, size, color });

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[80vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
          <h2 className="text-sm font-semibold text-black">Copy blob code</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="text-neutral-500 transition-colors hover:text-black cursor-pointer"
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
                  ? "bg-black text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        <div className="relative m-5 mt-4 flex-1 overflow-auto rounded-xl bg-neutral-950">
          <pre className="max-h-72 overflow-auto p-4 text-xs leading-relaxed text-neutral-100">
            <code>{snippet}</code>
          </pre>
        </div>

        <div className="flex justify-end border-t border-neutral-200 px-5 py-4">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80 cursor-pointer"
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
