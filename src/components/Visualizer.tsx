import { RefObject, useEffect, useRef, useState } from "react";
// import { useClientRect } from "../lib/useClientRect";
import { useStatus } from "../lib/useStatus";
import { Algorithm, UIStatus } from "../lib/AppContext";
// import { useRequestAnimationFrame } from "../lib/useAnimationFrame";
import { useAlgorithm } from "../lib/useAlgorithm";
import type { ComparisonOverrideAnimation, ComparisonSwapAnimation } from "../algorithms/shared";
import { bubbleSort, heapSort, insertionSort, mergeSort, quickSort, selectionSort } from "../algorithms";
import { useArray } from "../lib/useArray";

type AnimationGenerator = ComparisonOverrideAnimation | ComparisonSwapAnimation;

export function Visualizer() {
  const [status, setStatus] = useStatus();
  const [algorithm] = useAlgorithm();
  const { array } = useArray();
  const [generator, setGenerator] = useState<AnimationGenerator | null>(null);

  const shouldAnimate = status === UIStatus.SORTING;
  const enableSettings = () => setStatus(UIStatus.IDLE);

  useEffect(() => {
    if (shouldAnimate) {
      switch (algorithm) {
        case Algorithm.BUBBLE_SORT:
          setGenerator(bubbleSort(array));
          break;
        case Algorithm.HEAP_SORT:
          setGenerator(heapSort(array));
          break;
        case Algorithm.MERGE_SORT:
          setGenerator(mergeSort(array));
          break;
        case Algorithm.INSERTION_SORT:
          setGenerator(insertionSort(array));
          break;
        case Algorithm.QUICK_SORT:
          setGenerator(quickSort(array));
          break;
        case Algorithm.SELECTION_SORT:
          setGenerator(selectionSort(array));
          break;
        default:
          console.warn("Unknown algorithm");
          break;
      }
    }
  }, [shouldAnimate]);


  return (
    <div id="visualizer" className="relative z-10 h-full">
      <div className="bg-stone-800 px-4 flex items-end gap-1 h-[84%]">
          {array.map((value, index) => (
            <div
              className={`relative w-full rounded-lg bg-stone-700`}
              style={{
                height: `${value}px`,
              }}
              key={index}
            />
          ))}
      </div>
    </div>
  );
}
