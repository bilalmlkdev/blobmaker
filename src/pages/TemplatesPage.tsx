import { useMemo, useState } from "react";
import { SiteNav } from "../components/SiteNav";
import { TemplateCard } from "../components/TemplateCard";
import { BLOB_TEMPLATES, type TemplateDifficulty } from "../lib/templates";
import { SearchIcon } from "../components/icons";

const FILTERS: { id: "All" | TemplateDifficulty; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Light", label: "Light" },
  { id: "Medium", label: "Medium" },
];

/** Standalone full-gallery page for browsing and picking a blob template/preset. */
export function TemplatesPage() {
  const [filter, setFilter] = useState<"All" | TemplateDifficulty>("All");
  const [query, setQuery] = useState("");

  const filteredTemplates = useMemo(() => {
    return BLOB_TEMPLATES.filter((template) => {
      const matchesFilter = filter === "All" || template.difficulty === filter;
      const matchesQuery = template.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-3 pb-10">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Templates</h1>
          <p className="max-w-lg text-sm leading-relaxed text-neutral-400">
            Pick a starting point. Every template is a real preset — choose one to jump straight
            into the editor with its shape, fill and animation already dialled in.
          </p>
        </div>

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
    </div>
  );
}
