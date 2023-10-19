export const MIN = 10; // min size array
export const MAX = 200; // max size array
export const INITIAL_SIZE = 60;

export function generateRandomArray(size: number, min: number, max: number) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1) + min));
}
