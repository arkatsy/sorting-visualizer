export function* heapSort(array: Array<number>): Generator<{
  type: "comparison" | "swap";
  payload: [number, number];
}> {
  yield* buildMaxHeap(array);
  for (let endIdx = array.length - 1; endIdx >= 1; endIdx--) {
    yield { type: "swap", payload: [0, endIdx] };
    swap(0, endIdx, array);
    yield* siftDown(0, endIdx - 1, array);
  }
  return array;
}

function* buildMaxHeap(array: Array<number>): Generator<{
  type: "comparison" | "swap";
  payload: [number, number];
}> {
  let lastParentIdx = getParentIdx(array.length);
  for (let currentIdx = lastParentIdx; currentIdx >= 0; currentIdx--) {
    yield* siftDown(currentIdx, array.length - 1, array);
  }
}

function* siftDown(
  currentIdx: number,
  endIdx: number,
  array: Array<number>
): Generator<{
  type: "comparison" | "swap";
  payload: [number, number];
}> {
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
      swap(idxToSwap, currentIdx, array);
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

function swap(a: number, b: number, array: Array<number>) {
  const temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}
