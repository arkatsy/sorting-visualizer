import { type RenderOptions, cleanup, render } from "@testing-library/react";
import { afterEach } from "vitest";
import type { ReactElement } from "react";
import {
  type AlgorithmType,
  type AnimationGenerators,
  toCamelCase,
  getRandomIntFromInterval,
  generateRandomArray,
  MIN_ARRAY_LEN,
  MAX_ARRAY_SIZE,
  MIN_ARRAY_SIZE,
  MAX_ARRAY_LEN,
} from "../src/lib/shared";
import { GlobalContext } from "@/lib/AppContext";

afterEach(() => {
  cleanup();
});

export function renderWithGlobalContext(ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) {
  return render(ui, {
    wrapper: ({ children }) => <GlobalContext>{children}</GlobalContext>,
    ...options,
  });
}

export function customRender(ui: ReactElement, options = {}) {
  return render(ui, {
    wrapper: ({ children }) => children,
    ...options,
  });
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";

export { customRender as render };

type SorterGenerator = (array: number[]) => AnimationGenerators;

export type ApplyAlgorithmRes = Promise<
  | {
      message: string;
      ok: false;
      array: null;
    }
  | {
      message: null;
      ok: true;
      array: number[];
    }
>;

// Everything is in-place
export async function applyAlgorithm(array: number[], algorithmName: AlgorithmType): ApplyAlgorithmRes {
  let generator: SorterGenerator | null = null;
  let error: string | null = null;
  try {
    generator = (await import(`../src/algorithms/${toCamelCase(algorithmName)}`)).default;
  } catch {
    error = "Couldn't import the algorithm. Make sure the algorithm name and the import path are correct";
  }

  if (!error) {
    // The generator sorts in-place & spits animation tuples.
    // To just sort the array we can iterate through it.
    const sorter = generator!(array);
    for (const _ of sorter) {
    }
  }

  return error
    ? {
        message: error,
        ok: false,
        array: null,
      }
    : {
        message: null,
        ok: true,
        array,
      };
}

export const _sort = (array: number[]) => array.sort((a, b) => a - b);

export function generateSampleArray() {
  const arraySize = getRandomIntFromInterval(MIN_ARRAY_LEN, MAX_ARRAY_LEN);
  return generateRandomArray(arraySize, MIN_ARRAY_SIZE, MAX_ARRAY_SIZE);
}
