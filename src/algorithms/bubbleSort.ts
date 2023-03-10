import { ComparisonSwapAnimation } from "./shared";

export function* bubbleSort(array: Array<number>): Generator<ComparisonSwapAnimation> {
  const length = array.length;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      yield { type: "comparison", payload: [j, j + 1] };
      if (array[j] > array[j + 1]) {
        yield { type: "swap", payload: [j, j + 1] };
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
}
