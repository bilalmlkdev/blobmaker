import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BlobShapeIcon } from "../components/icons";

interface LoadingState {
  templateId?: string;
}

/**
 * Brief branded transition shown between "Get started" / a template click
 * and the app finishing its initial mount. Forwards any template selection
 * through router state so the app can apply it once loaded.
 */
export function LoadingScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // No "already navigated" ref guard here: React StrictMode intentionally
    // mounts, runs this effect, cleans it up, then mounts again in
    // development. A ref-based guard survives that cycle and blocks the
    // *second* (real) run from ever scheduling its timer, since the first
    // run's timer was already cancelled by the synthetic cleanup — leaving
    // the screen stuck forever. A per-run `cancelled` flag scoped to this
    // effect call handles that correctly: each run gets its own timer, and
    // only the actual final unmount (not the StrictMode replay) prevents it.
    let cancelled = false;
    const state = (location.state ?? {}) as LoadingState;
    const timer = setTimeout(() => {
      if (cancelled) return;
      navigate("/app", { replace: true, state: { templateId: state.templateId } });
    }, 900);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [navigate, location.state]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black animate-blob-pulse">
        <BlobShapeIcon width={28} height={28} />
      </div>
      <p className="mt-6 text-sm font-medium text-neutral-500">Loading Blob Maker…</p>
      <div className="mt-4 h-1 w-40 overflow-hidden rounded-full bg-neutral-800">
        <div className="h-full w-full origin-left animate-loading-bar rounded-full bg-white" />
      </div>
    </div>
  );
}
