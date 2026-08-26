import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SiteNav } from "../components/SiteNav";
import { TemplateCard } from "../components/TemplateCard";
import { BLOB_TEMPLATES, type TemplateDifficulty } from "../lib/templates";
import { ArrowRightIcon, SearchIcon, GithubIcon } from "../components/icons";
import { copyToClipboard } from "../lib/download";
import { useToast } from "../hooks/useToast";

const FILTERS: { id: "All" | TemplateDifficulty; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Light", label: "Light" },
  { id: "Medium", label: "Medium" },
];

const INSTALL_COMMAND = "npx create-blob-maker@latest";

export function LandingPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"All" | TemplateDifficulty>("All");
  const [query, setQuery] = useState("");
  const { message, showToast } = useToast();

  const filteredTemplates = useMemo(() => {
    return BLOB_TEMPLATES.filter((template) => {
      const matchesFilter = filter === "All" || template.difficulty === filter;
      const matchesQuery = template.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  async function handleCopyInstall() {
    try {
      await copyToClipboard(INSTALL_COMMAND);
      showToast("Copied to clipboard");
    } catch {
      showToast("Couldn't copy");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />

      {/* Hero */}
      <section className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 text-center py-49">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-neutral-400">
            Latest update <span className="text-neutral-600">·</span> 13 templates added
          </span>

          <h1 className="max-w-2xl text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl text-start">
            Beautiful organic blob shapes
          </h1>

          <p className="max-w-lg text-base leading-relaxed text-neutral-400 text-start">
            A production-ready <span className="font-medium text-white">blob generator</span> for
            your design workflow. Export SVG, PNG, React or CSS. Free and open source.
          </p>

          <div className="flex w-full max-w-md flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
            <div className="border-b border-white/10 px-4 py-2 text-left">
              <span className="text-xs font-medium text-neutral-500">Terminal</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <code className="truncate font-mono text-sm text-neutral-300">
                $ {INSTALL_COMMAND}
              </code>
              <button
                type="button"
                onClick={handleCopyInstall}
                aria-label="Copy install command"
                className="ml-3 shrink-0 rounded-md px-2 py-1 text-xs font-medium text-neutral-500 transition-colors duration-200 hover:bg-white/10 hover:text-white cursor-pointer"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/loading")}
              className="flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all duration-200 hover:opacity-90 active:scale-95 cursor-pointer"
            >
              Get Started
              <ArrowRightIcon width={16} height={16} />
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2 rounded-lg border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/30"
            >
              <GithubIcon width={16} height={16} />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Template gallery */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-4 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-1 rounded-full border border-white/10 p-1">
            {FILTERS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setFilter(option.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors duration-200 cursor-pointer ${
                  filter === option.id
                    ? "bg-white text-black"
                    : "text-neutral-500 hover:text-white"
                }`}
              >
                {option.label}
                {option.id === "All" && (
                  <span className="ml-1 text-neutral-600">{BLOB_TEMPLATES.length}</span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-2">
            <SearchIcon width={16} height={16} className="text-neutral-600" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search templates..."
              className="w-40 bg-transparent text-sm text-white placeholder:text-neutral-600 outline-none sm:w-56"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <p className="py-16 text-center text-sm text-neutral-600">
            No templates match "{query}".
          </p>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-neutral-500">Explore beautiful organic blob shapes.</p>
          <p className="text-xs text-neutral-600">Open Source · Built with Blob Maker</p>
        </div>
      </footer>

      {message && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black shadow-lg animate-pop-in"
        >
          {message}
        </div>
      )}
    </div>
  );
}
