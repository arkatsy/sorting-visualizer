export const MIN_ARRAY_LEN = 10; // min size array
export const MAX_ARRAY_LEN = 250; // max size array
export const MIN_ARRAY_SIZE = 50;
export const MAX_ARRAY_SIZE = 750;
export const INITIAL_LEN = 60;

export function generateRandomArray(size: number, min: number, max: number) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1) + min));
}
