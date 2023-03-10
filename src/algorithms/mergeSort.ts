import { ComparisonOverrideAnimation } from "./shared";

export function* mergeSort(array: Array<number>): ComparisonOverrideAnimation {
  if (array.length <= 1) return array;

  const auxiliaryArray = array.slice();
  yield* mergeSortHelper(array, 0, array.length - 1, auxiliaryArray);
}

function* mergeSortHelper(
  mainArray: Array<number>,
  startIdx: number,
  endIdx: number,
  auxiliaryArray: Array<number>
): ComparisonOverrideAnimation {
  if (startIdx === endIdx) return;

  const middleIdx = Math.floor((startIdx + endIdx) / 2);

  yield* mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray);
  yield* mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray);
  yield* doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray);
}

function* doMerge(
  mainArray: Array<number>,
  startIdx: number,
  middleIdx: number,
  endIdx: number,
  auxiliaryArray: Array<number>
): ComparisonOverrideAnimation {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    yield { type: "comparison", payload: [i, j] };
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      yield { type: "override", payload: [k, auxiliaryArray[i]] };
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      yield { type: "override", payload: [k, auxiliaryArray[j]] };
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    yield { type: "comparison", payload: [i, i] };
    yield { type: "override", payload: [k, auxiliaryArray[i]] };
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    yield { type: "comparison", payload: [j, j] };
    yield { type: "override", payload: [k, auxiliaryArray[j]] };
    mainArray[k++] = auxiliaryArray[j++];
  }
}
