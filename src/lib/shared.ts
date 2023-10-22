export const MIN_ARRAY_LEN = 10;
export const MAX_ARRAY_LEN = 250;
export const MIN_ARRAY_SIZE = 50;
export const MAX_ARRAY_SIZE = 700;
export const INITIAL_LEN = 100;

export const SORT_FAST_SPEED_DELAY = 1;
export const INITIAL_SORT_SPEED_DELAY = 8;
export const SORT_SLOW_SPEED_DELAY = 45;

export function generateRandomArray(size: number, min: number, max: number) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1) + min));
}