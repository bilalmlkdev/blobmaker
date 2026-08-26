import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { generateBlobPath } from "../lib/blob";
import { randomSeed } from "../lib/random";

export const MIN_EDGES = 3;
export const MAX_EDGES = 12;
export const MIN_GROWTH = 1;
export const MAX_GROWTH = 10;
export const CANVAS_SIZE = 400;

export const DEFAULT_COLOR = "#000000";
export const DEFAULT_GRADIENT_COLOR = "#6366f1";
export const DEFAULT_GRADIENT_ANGLE = 45;
export const MIN_GRADIENT_ANGLE = 0;
export const MAX_GRADIENT_ANGLE = 360;
export const DEFAULT_EDGES = 4;
export const DEFAULT_GROWTH = 5;

export type FillType = "solid" | "gradient";
export type AnimationType = "none" | "rotate" | "morph" | "pulse";

export const ANIMATIONS: { id: AnimationType; label: string }[] = [
  { id: "none", label: "None" },
  { id: "rotate", label: "Rotate" },
  { id: "morph", label: "Morph" },
  { id: "pulse", label: "Pulse" },
];

export interface BlobMakerState {
  color: string;
  fillType: FillType;
  gradientColor: string;
  gradientAngle: number;
  edges: number;
  growth: number;
  seed: number;
  animation: AnimationType;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

const HEX_PATTERN = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
const ANIMATION_IDS = ANIMATIONS.map((a) => a.id);

function readInitialState(params: URLSearchParams): BlobMakerState {
  const color = params.get("color");
  const gradientColor = params.get("gradientColor");
  const gradientAngle = Number(params.get("gradientAngle"));
  const fillType = params.get("fillType");
  const edges = Number(params.get("edges"));
  const growth = Number(params.get("growth"));
  const seed = Number(params.get("seed"));
  const animation = params.get("animation");

  const isValidHex = (value: string | null): value is string =>
    value != null && HEX_PATTERN.test(value);

  return {
    color: isValidHex(color) ? color : DEFAULT_COLOR,
    fillType: fillType === "gradient" ? "gradient" : "solid",
    gradientColor: isValidHex(gradientColor) ? gradientColor : DEFAULT_GRADIENT_COLOR,
    gradientAngle:
      Number.isFinite(gradientAngle) && gradientAngle >= 0
        ? clamp(gradientAngle, MIN_GRADIENT_ANGLE, MAX_GRADIENT_ANGLE)
        : DEFAULT_GRADIENT_ANGLE,
    edges: Number.isFinite(edges) && edges > 0 ? clamp(edges, MIN_EDGES, MAX_EDGES) : DEFAULT_EDGES,
    growth: Number.isFinite(growth) && growth > 0 ? clamp(growth, MIN_GROWTH, MAX_GROWTH) : DEFAULT_GROWTH,
    seed: Number.isFinite(seed) && seed > 0 ? seed : randomSeed(),
    animation: (ANIMATION_IDS as string[]).includes(animation ?? "")
      ? (animation as AnimationType)
      : "none",
  };
}

/**
 * Owns all blob generator state (fill, edge count, growth/irregularity,
 * animation and the random seed), keeps it synced to the URL query string
 * (via React Router's own history, so it never fights the router's
 * internal location) for shareable links, and derives the current SVG
 * path from that state.
 */
export function useBlobMaker() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState<BlobMakerState>(() => readInitialState(searchParams));
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const params = new URLSearchParams();
    params.set("color", state.color);
    params.set("fillType", state.fillType);
    params.set("gradientColor", state.gradientColor);
    params.set("gradientAngle", String(state.gradientAngle));
    params.set("edges", String(state.edges));
    params.set("growth", String(state.growth));
    params.set("seed", String(state.seed));
    params.set("animation", state.animation);
    setSearchParams(params, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const setColor = useCallback((color: string) => {
    setState((prev) => ({ ...prev, color }));
  }, []);

  const setFillType = useCallback((fillType: FillType) => {
    setState((prev) => ({ ...prev, fillType }));
  }, []);

  const setGradientColor = useCallback((gradientColor: string) => {
    setState((prev) => ({ ...prev, gradientColor }));
  }, []);

  const setGradientAngle = useCallback((gradientAngle: number) => {
    setState((prev) => ({
      ...prev,
      gradientAngle: clamp(gradientAngle, MIN_GRADIENT_ANGLE, MAX_GRADIENT_ANGLE),
    }));
  }, []);

  const setEdges = useCallback((edges: number) => {
    setState((prev) => ({ ...prev, edges: clamp(edges, MIN_EDGES, MAX_EDGES) }));
  }, []);

  const setGrowth = useCallback((growth: number) => {
    setState((prev) => ({ ...prev, growth: clamp(growth, MIN_GROWTH, MAX_GROWTH) }));
  }, []);

  const setAnimation = useCallback((animation: AnimationType) => {
    setState((prev) => ({ ...prev, animation }));
  }, []);

  const applyPreset = useCallback((preset: Partial<BlobMakerState>) => {
    setState((prev) => ({
      ...prev,
      ...preset,
      edges: preset.edges !== undefined ? clamp(preset.edges, MIN_EDGES, MAX_EDGES) : prev.edges,
      growth:
        preset.growth !== undefined ? clamp(preset.growth, MIN_GROWTH, MAX_GROWTH) : prev.growth,
      gradientAngle:
        preset.gradientAngle !== undefined
          ? clamp(preset.gradientAngle, MIN_GRADIENT_ANGLE, MAX_GRADIENT_ANGLE)
          : prev.gradientAngle,
    }));
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
    fillType: state.fillType,
    gradientColor: state.gradientColor,
    gradientAngle: state.gradientAngle,
    edges: state.edges,
    growth: state.growth,
    seed: state.seed,
    animation: state.animation,
    path: blob.path,
    size: blob.size,
    setColor,
    setFillType,
    setGradientColor,
    setGradientAngle,
    setEdges,
    setGrowth,
    setAnimation,
    applyPreset,
    randomize,
    reshuffle,
  };
}
