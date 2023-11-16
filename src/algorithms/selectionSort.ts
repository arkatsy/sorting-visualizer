import { type SwapAnimationsGenerator, swap } from "@/lib/shared";

export default function* selectionSort(array: Array<number>): SwapAnimationsGenerator {
  let currentIdx = 0;
  while (currentIdx < array.length - 1) {
    let smallestIdx = currentIdx;
    for (let i = currentIdx + 1; i < array.length; i++) {
      yield { type: "comparison", payload: [smallestIdx, i] };
      if (array[smallestIdx] > array[i]) {
        smallestIdx = i;
      }
    }
    yield { type: "swap", payload: [currentIdx, smallestIdx] };
    swap(currentIdx++, smallestIdx, array);
  }
  return array;
}
