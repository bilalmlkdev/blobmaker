import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { generateBlobPath } from "../lib/blob";
import { randomSeed } from "../lib/random";

export const MIN_EDGES = 3;
export const MAX_EDGES = 12;
export const MIN_GROWTH = 1;
export const MAX_GROWTH = 10;
export const CANVAS_SIZE = 400;

export const DEFAULT_COLOR = "#000000";
export const DEFAULT_EDGES = 4;
export const DEFAULT_GROWTH = 5;

export interface BlobMakerState {
  color: string;
  edges: number;
  growth: number;
  seed: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function readInitialState(): BlobMakerState {
  if (typeof window === "undefined") {
    return {
      color: DEFAULT_COLOR,
      edges: DEFAULT_EDGES,
      growth: DEFAULT_GROWTH,
      seed: randomSeed(),
    };
  }

  const params = new URLSearchParams(window.location.search);
  const color = params.get("color");
  const edges = Number(params.get("edges"));
  const growth = Number(params.get("growth"));
  const seed = Number(params.get("seed"));

  const isValidHex = color != null && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(color);

  return {
    color: isValidHex ? (color as string) : DEFAULT_COLOR,
    edges: Number.isFinite(edges) && edges > 0 ? clamp(edges, MIN_EDGES, MAX_EDGES) : DEFAULT_EDGES,
    growth: Number.isFinite(growth) && growth > 0 ? clamp(growth, MIN_GROWTH, MAX_GROWTH) : DEFAULT_GROWTH,
    seed: Number.isFinite(seed) && seed > 0 ? seed : randomSeed(),
  };
}

/**
 * Owns all blob generator state (color, edge count, growth/irregularity and
 * the random seed), keeps it synced to the URL query string for shareable
 * links, and derives the current SVG path from that state.
 */
export function useBlobMaker() {
  const [state, setState] = useState<BlobMakerState>(readInitialState);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const params = new URLSearchParams();
    params.set("color", state.color);
    params.set("edges", String(state.edges));
    params.set("growth", String(state.growth));
    params.set("seed", String(state.seed));
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [state]);

  const setColor = useCallback((color: string) => {
    setState((prev) => ({ ...prev, color }));
  }, []);

  const setEdges = useCallback((edges: number) => {
    setState((prev) => ({ ...prev, edges: clamp(edges, MIN_EDGES, MAX_EDGES) }));
  }, []);

  const setGrowth = useCallback((growth: number) => {
    setState((prev) => ({ ...prev, growth: clamp(growth, MIN_GROWTH, MAX_GROWTH) }));
  }, []);

  const randomize = useCallback(() => {
    setState((prev) => ({
      ...prev,
      edges: Math.round(clamp(MIN_EDGES + Math.random() * (MAX_EDGES - MIN_EDGES), MIN_EDGES, MAX_EDGES)),
      growth: Math.round(clamp(MIN_GROWTH + Math.random() * (MAX_GROWTH - MIN_GROWTH), MIN_GROWTH, MAX_GROWTH)),
      seed: randomSeed(),
    }));
  }, []);

  const reshuffle = useCallback(() => {
    setState((prev) => ({ ...prev, seed: randomSeed() }));
  }, []);

  const blob = useMemo(
    () =>
      generateBlobPath({
        edges: state.edges,
        // Normalize the 1-10 UI growth scale down to the 0-1 range the
        // generator algorithm expects.
        growth: (state.growth - MIN_GROWTH) / (MAX_GROWTH - MIN_GROWTH),
        seed: state.seed,
        size: CANVAS_SIZE,
      }),
    [state.edges, state.growth, state.seed],
  );

  return {
    color: state.color,
    edges: state.edges,
    growth: state.growth,
    seed: state.seed,
    path: blob.path,
    size: blob.size,
    setColor,
    setEdges,
    setGrowth,
    randomize,
    reshuffle,
  };
}
