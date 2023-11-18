export const MIN_ARRAY_LEN = 40;
export const MAX_ARRAY_LEN = 250;
export const MIN_ARRAY_SIZE = 50;
export const MAX_ARRAY_SIZE = 700;
export const INITIAL_LEN = 200;

export const SORT_SLOW_SPEED_DELAY = 45;
export const SORT_NORMAL_SPEED_DELAY = 13;
export const SORT_FAST_SPEED_DELAY = 3;

export const SPEED_OPTIONS = {
  SLOW: SORT_SLOW_SPEED_DELAY,
  NORMAL: SORT_NORMAL_SPEED_DELAY,
  FAST: SORT_FAST_SPEED_DELAY,
};

export function generateRandomArray(size: number, min: number, max: number) {
  return Array.from({ length: size }, () => getRandomIntFromInterval(min, max));
}

export function getRandomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const Algorithm = {
  BUBBLE_SORT: "BUBBLE_SORT",
  HEAP_SORT: "HEAP_SORT",
  MERGE_SORT: "MERGE_SORT",
  SELECTION_SORT: "SELECTION_SORT",
  INSERTION_SORT: "INSERTION_SORT",
  QUICK_SORT: "QUICK_SORT",
} as const;

export type AlgorithmType = keyof typeof Algorithm;

export function toCamelCase(name: AlgorithmType) {
  const words = name.toLowerCase().split("_");

  return words
    .map((word, index) => {
      if (index === 0) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");
}

export function isOverrideAnimation(
  animationGenerator: AnimationGenerators,
  algorithm: AlgorithmType,
): animationGenerator is OverrideAnimationsGenerator {
  return algorithm === "MERGE_SORT";
}

// --- @/algorithm related utils

// Swap Animation Types
export type SwapAnimationType = "comparison" | "swap";
export type SwapAnimation = {
  type: SwapAnimationType;
  payload: [number, number];
};
export type SwapAnimationsGenerator = Generator<SwapAnimation>;

// Override Animation Types
export type OverrideAnimationType = "comparison" | "override";
export type OverrideAnimation = {
  type: OverrideAnimationType;
  payload: [number, number];
};
export type OverrideAnimationsGenerator = Generator<OverrideAnimation>;

export type AnimationGenerators = SwapAnimationsGenerator | OverrideAnimationsGenerator;

export function swap(array: Array<number>, i: number, j: number) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
