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
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1) + min));
}
