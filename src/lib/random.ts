/**
 * Deterministic pseudo-random number generator (mulberry32).
 * Given the same seed, it always produces the same sequence of numbers in
 * the [0, 1) range. This lets a blob shape be fully reproduced from a single
 * numeric seed, which is what makes shareable links and the "randomize"
 * button work predictably.
 */
export function createRng(seed: number): () => number {
  let a = seed >>> 0;
  return function rng(): number {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Produces a fresh random seed suitable for `createRng`. */
export function randomSeed(): number {
  return Math.floor(Math.random() * 2 ** 31);
}
