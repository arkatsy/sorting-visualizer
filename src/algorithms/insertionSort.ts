import { type ComparisonSwapAnimation, swap } from "./shared";

export function* insertionSort(array: Array<number>): ComparisonSwapAnimation {
  for (let i = 0; i < array.length; i++) {
    let j = i;
    yield { type: "comparison", payload: [j, j - 1] };
    while (j > 0 && array[j] < array[j - 1]) {
      yield { type: "swap", payload: [j, j - 1] };
      swap(j, j - 1, array);
      j--;
    }
  }
}
