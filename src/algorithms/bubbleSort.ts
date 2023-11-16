import { type SwapAnimationsGenerator, swap } from "@/lib/shared";

export default function* bubbleSort(array: Array<number>): SwapAnimationsGenerator {
  const length = array.length;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      yield { type: "comparison", payload: [j, j + 1] };
      if (array[j] > array[j + 1]) {
        yield { type: "swap", payload: [j, j + 1] };
        swap(j, j + 1, array);
      }
    }
  }
}
