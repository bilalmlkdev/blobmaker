import { useState } from "react";
import { X, Copy, Check } from "lucide-react";
import type { BlobStyle } from "../hooks/useBlob";

interface Props {
  blobStyle: BlobStyle;
  onClose: () => void;
}

type Tab = "react" | "nextjs" | "html";

export default function CodeModal({ blobStyle, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("react");
  const [copied, setCopied] = useState(false);

  const getCode = (tab: Tab): string => {
    const styleString = `borderRadius: '${blobStyle.borderRadius}',
  transform: '${blobStyle.transform}',
  background: '${blobStyle.background}',
  opacity: ${blobStyle.opacity}`;

    switch (tab) {
      case "react":
        return `import React from 'react'

const Blob = () => {
  return (
    <div
      style={{
        width: '300px',
        height: '300px',
        ${styleString}
      }}
    />
  )
}

export default Blob`;
      case "nextjs":
        return `'use client'

import React from 'react'

const Blob = () => {
  return (
    <div
      style={{
        width: '300px',
        height: '300px',
        ${styleString}
      }}
    />
  )
}

export default Blob`;
      case "html":
        return `<!-- HTML -->
<div class="blob"></div>

<!-- CSS -->
.blob {
  width: 300px;
  height: 300px;
  border-radius: ${blobStyle.borderRadius};
  transform: ${blobStyle.transform};
  background: ${blobStyle.background};
  opacity: ${blobStyle.opacity};
}`;
      default:
        return "";
    }
  };

  const copyCode = async () => {
    const code = getCode(activeTab);
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3 className="text-lg font-semibold">Export Component Code</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-6 py-3 border-b border-white/10">
          {(["react", "nextjs", "html"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-violet-600 text-white"
                  : "bg-white/5 hover:bg-white/10 text-zinc-300"
              }`}
            >
              {tab === "react"
                ? "React"
                : tab === "nextjs"
                  ? "Next.js"
                  : "HTML/CSS"}
            </button>
          ))}
        </div>

        {/* Code block */}
        <div className="p-6">
          <div className="relative">
            <pre className="bg-zinc-950 border border-white/10 rounded-xl p-4 overflow-x-auto text-sm text-zinc-200">
              <code>{getCode(activeTab)}</code>
            </pre>
            <button
              onClick={copyCode}
              className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-xs font-medium"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
