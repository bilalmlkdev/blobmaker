import { Link, useLocation } from "react-router-dom";
import { BlobShapeIcon, GithubIcon } from "./icons";

const NAV_LINKS: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "Docs", to: "/docs" },
  { label: "Templates", to: "/templates" },
];

/** Dark, sticky top navigation shared by the landing, templates and docs pages. */
export function SiteNav() {
  const location = useLocation();

  return (
    <header className="sticky top-3 z-30  bg-black/50 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 bg-white/20 rounded-lg">
        <Link to="/" className="flex items-center gap-1 text-white">
          <span className="flex h-7 w-7 items-center justify-center">
            <BlobShapeIcon width={16} height={16} />
          </span>
          <span className="text-sm font-semibold tracking-tight">Blob Maker</span>
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-white" : "text-neutral-500 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="View source on GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-neutral-400 transition-colors duration-200 hover:border-white/40 hover:text-white"
          >
            <GithubIcon width={16} height={16} />
          </a>
        </div>
      </div>
    </header>
  );
}
