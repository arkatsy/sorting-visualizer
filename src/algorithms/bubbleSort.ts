export function* bubbleSort(array: Array<number>): Generator<{
  type: "comparison" | "swap";
  payload: [number, number];
}> {
  const copyArray = [...array];
  const length = copyArray.length;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      yield { type: "comparison", payload: [j, j + 1] };
      if (copyArray[j] > copyArray[j + 1]) {
        yield { type: "swap", payload: [j, j + 1] };
        const temp = copyArray[j];
        copyArray[j] = copyArray[j + 1];
        copyArray[j + 1] = temp;
      }
    }
  }
}
