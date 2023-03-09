export function* selectionSort(array: Array<number>): Generator<{
  type: "swap" | "comparison";
  payload: [number, number];
}> {
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
    swap(currentIdx, smallestIdx, array);
    currentIdx++;
  }
  return array;
}

function swap(i: number, j: number, array: Array<number>) {
  const temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}
