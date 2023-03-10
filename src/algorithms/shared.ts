export type ComparisonSwapAnimation = Generator<{
  type: "comparison" | "swap";
  payload: [number, number];
}>;

export type ComparisonOverrideAnimation = Generator<{
  type: "comparison" | "override";
  payload: [number, number];
}>;

export function swap(i: number, j: number, array: Array<number>) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
