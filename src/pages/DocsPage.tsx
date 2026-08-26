import { SiteNav } from "../components/SiteNav";

interface DocSection {
  id: string;
  title: string;
  body: string[];
}

const SECTIONS: DocSection[] = [
  {
    id: "getting-started",
    title: "Getting started",
    body: [
      "Blob Maker generates organic SVG blob shapes from a small set of parameters: edges, growth and a random seed. Open the app and drag the Edges and Growth sliders to see the shape update live.",
      "Every shape is deterministic — the same edges, growth and seed always produce the same blob, which is what makes shareable links and templates work.",
    ],
  },
  {
    id: "controls",
    title: "Controls",
    body: [
      "Edges controls how many anchor points make up the blob's silhouette, from 3 (near-triangular) to 12 (more circular, more detail).",
      "Growth controls irregularity, from 1 (a near-perfect circle) to 10 (a very spiky, organic outline).",
      "Reshuffle keeps your edges and growth but rerolls the random seed, giving you a new variation of the same shape.",
      "Randomize picks new edges, growth and seed all at once.",
    ],
  },
  {
    id: "fill",
    title: "Fill & color",
    body: [
      "Choose a solid fill with the color picker, or switch to Gradient to blend two colors across the shape at any angle from 0–360°.",
      "Gradient state is saved in the URL and exported markup, so it carries over into SVG, PNG, React and CSS exports.",
    ],
  },
  {
    id: "animation",
    title: "Animation",
    body: [
      "Apply Rotate, Morph or Pulse to bring the blob to life with a pure CSS animation. Animations respect prefers-reduced-motion automatically.",
      "Animations are a live preview effect and are not baked into static exports (SVG/PNG), since those are single-frame snapshots.",
    ],
  },
  {
    id: "export",
    title: "Exporting",
    body: [
      "Use the download button to save your blob as an SVG or PNG (rendered at 4x resolution for crisp output).",
      "Use the code button to copy the shape as raw SVG markup, a React component, or a CSS background-image snippet.",
    ],
  },
  {
    id: "sharing",
    title: "Sharing",
    body: [
      "Every change updates the page URL, so copying the address bar link (or using the Share button) gives you a link that reproduces your exact blob for anyone who opens it.",
    ],
  },
];

/** Static documentation page covering how the blob generator works. */
export function DocsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />

      <div className="mx-auto flex max-w-6xl gap-12 px-6 py-14">
        <aside className="hidden w-48 shrink-0 md:block">
          <nav className="sticky top-24 flex flex-col gap-1">
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="rounded-md px-3 py-1.5 text-sm text-neutral-500 transition-colors duration-200 hover:bg-white/5 hover:text-white"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Documentation</h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-neutral-400">
            Everything you need to know to generate, style and export blob shapes.
          </p>

          <div className="mt-12 flex flex-col gap-12">
            {SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="text-lg font-semibold text-white">{section.title}</h2>
                <div className="mt-3 flex flex-col gap-3">
                  {section.body.map((paragraph, i) => (
                    <p key={i} className="text-sm leading-relaxed text-neutral-400">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
