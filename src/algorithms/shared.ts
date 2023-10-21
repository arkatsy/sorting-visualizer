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

// Util
export function swap(i: number, j: number, array: Array<number>) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
