import { test, expect } from "vitest";
import { _sort, applyAlgorithm, generateSampleArray } from "./utils";
import { type AlgorithmType } from "../src/lib/shared";

const SAMPLE_SIZE = 100;

test.each<AlgorithmType>([
  "BUBBLE_SORT",
  "HEAP_SORT",
  "INSERTION_SORT",
  "MERGE_SORT",
  "QUICK_SORT",
  "SELECTION_SORT",
])("Test %s", async (algorithm) => {
  for (let i = 1; i <= SAMPLE_SIZE; i++) {
    const sampleArray = generateSampleArray();
    const expected = _sort([...sampleArray]);

    const res = await applyAlgorithm(sampleArray, algorithm);
    if (!res.ok) {
      throw new Error(res.message);
    }

    expect(res.array).toStrictEqual(expected);
  }
});
