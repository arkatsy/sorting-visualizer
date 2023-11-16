import { type SwapAnimationsGenerator, swap } from "@/lib/shared";

export default function* insertionSort(array: Array<number>): SwapAnimationsGenerator {
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
