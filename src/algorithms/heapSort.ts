import { type SwapAnimationsGenerator, swap } from "@/lib/shared";

export default function* heapSort(array: Array<number>): SwapAnimationsGenerator {
  yield* buildMaxHeap(array);
  for (let endIdx = array.length - 1; endIdx >= 1; endIdx--) {
    yield { type: "swap", payload: [0, endIdx] };
    swap(array, 0, endIdx);
    yield* siftDown(0, endIdx - 1, array);
  }
  return array;
}

function* buildMaxHeap(array: Array<number>): SwapAnimationsGenerator {
  let lastParentIdx = getParentIdx(array.length);
  for (let currentIdx = lastParentIdx; currentIdx >= 0; currentIdx--) {
    yield* siftDown(currentIdx, array.length - 1, array);
  }
}

function* siftDown(currentIdx: number, endIdx: number, array: Array<number>): SwapAnimationsGenerator {
  let childLeftIdx = getLeftChildIdx(currentIdx);
  while (childLeftIdx <= endIdx) {
    let childRightIdx = getRightChildIdx(currentIdx) <= endIdx ? getRightChildIdx(currentIdx) : null;
    let idxToSwap;
    if (childRightIdx && array[childRightIdx] > array[childLeftIdx]) {
      idxToSwap = childRightIdx;
    } else {
      idxToSwap = childLeftIdx;
    }

    yield { type: "comparison", payload: [currentIdx, idxToSwap] };
    if (array[idxToSwap] > array[currentIdx]) {
      yield { type: "swap", payload: [currentIdx, idxToSwap] };
      swap(array, idxToSwap, currentIdx);
      currentIdx = idxToSwap;
      childLeftIdx = getLeftChildIdx(currentIdx);
    } else {
      return;
    }
  }
}

function getParentIdx(i: number) {
  return Math.floor((i - 1) / 2);
}

function getLeftChildIdx(i: number) {
  return i * 2 + 1;
}

function getRightChildIdx(i: number) {
  return i * 2 + 2;
}
