import { describe, expect, test } from "vitest";
import { toCamelCase, swap, Algorithm } from "../src/lib/shared";
import { ApplyAlgorithmRes, applyAlgorithm } from "./utils";

describe("Utils", () => {
  test("Test `toCamelCase()`", () => {
    const samples = new Map();
    samples.set("BUBBLE_SORT", "bubbleSort");
    samples.set("HEAP_SORT", "heapSort");
    samples.set("MERGE_SORT", "mergeSort");
    samples.set("SELECTION_SORT", "selectionSort");
    samples.set("INSERTION_SORT", "insertionSort");
    samples.set("QUICK_SORT", "quickSort");

    for (const [k, v] of samples) {
      expect(toCamelCase(k)).toBe(v);
    }
  });

  test("Test in-place `swap()`", () => {
    type Tuple = [number, number];
    type Sample = {
      idxToSwap: Tuple[];
      before: number[];
      expected: number[];
    };

    const samples = new Set<Sample>();
    samples.add({
      idxToSwap: [[1, 2]],
      before: [1, 2, 3],
      expected: [1, 3, 2],
    });
    samples.add({
      idxToSwap: [
        [1, 2],
        [4, 3],
        [3, 5],
      ],
      before: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      expected: [1, 3, 2, 6, 4, 5, 7, 8, 9],
    });
    samples.add({
      idxToSwap: [
        [3, 4],
        [5, 2],
        [8, 0],
      ],
      before: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      expected: [9, 2, 6, 5, 4, 3, 7, 8, 1],
    });

    for (const sample of samples) {
      sample.idxToSwap.forEach((idxTuple) => {
        swap(sample.before, ...idxTuple);
      });

      expect(sample.before).toStrictEqual(sample.expected);
    }
  });

  test("Test `applyAlgorithm()`", async () => {
    const sample = [2, 4, 55, 32, 42, 11, 41, 224];

    const algorithms = Object.values(Algorithm);

    const expectedRes: Omit<Awaited<ApplyAlgorithmRes>, "array"> = {
      message: null,
      ok: true,
    };

    for (const algorithm of algorithms) {
      const { message, ok } = await applyAlgorithm(sample, algorithm);
      // We don't care about algorithm correctness in this test.
      expect({ message, ok }).toStrictEqual(expectedRes);
    }
  });
});
