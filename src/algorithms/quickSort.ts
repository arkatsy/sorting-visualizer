import { type SwapAnimationsGenerator, swap } from "./shared";

export function* quickSort(array: Array<number>): SwapAnimationsGenerator {
  yield* quickSortHelper(array, 0, array.length - 1);
  return array;
}

function* quickSortHelper(
  array: Array<number>,
  startIdx: number,
  endIdx: number
): Generator<{
  type: "swap" | "comparison";
  payload: [number, number];
}> {
  if (startIdx >= endIdx) return;
  let pivotIdx = startIdx;
  let leftIdx = startIdx + 1;
  let rightIdx = endIdx;
  while (rightIdx >= leftIdx) {
    yield { type: "comparison", payload: [leftIdx, rightIdx] };
    if (array[leftIdx] > array[pivotIdx] && array[rightIdx] < array[pivotIdx]) {
      yield { type: "swap", payload: [leftIdx, rightIdx] };
      swap(leftIdx, rightIdx, array);
    }
    yield { type: "comparison", payload: [leftIdx, pivotIdx] };
    if (array[leftIdx] <= array[pivotIdx]) {
      leftIdx++;
    }
    yield { type: "comparison", payload: [rightIdx, pivotIdx] };
    if (array[rightIdx] >= array[pivotIdx]) {
      rightIdx--;
    }
  }
  yield { type: "swap", payload: [pivotIdx, rightIdx] };
  swap(pivotIdx, rightIdx, array);
  const leftSubarrayIsSmaller = rightIdx - 1 - startIdx < endIdx - (rightIdx + 1);
  if (leftSubarrayIsSmaller) {
    yield* quickSortHelper(array, startIdx, rightIdx - 1);
    yield* quickSortHelper(array, rightIdx + 1, endIdx);
  } else {
    yield* quickSortHelper(array, rightIdx + 1, endIdx);
    yield* quickSortHelper(array, startIdx, rightIdx - 1);
  }
}
