export function* bubbleSort(array: Array<number>) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      yield { type: "comparison", payload: [j, j + 1] };
      if (array[j] > array[j + 1]) {
        yield { type: "swap", payload: [j, j + 1] };
      }
    }
  }
}
