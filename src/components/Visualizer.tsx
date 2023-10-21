import { useEffect, useRef, useState } from "react";
import { useStatus } from "../lib/useStatus";
import { useArray } from "../lib/useArray";
import { useAlgorithm } from "../lib/useAlgorithm";
import { Algorithm, AlgorithmType, UIStatus } from "../lib/AppContext";
import { bubbleSort, heapSort, insertionSort, mergeSort, quickSort, selectionSort } from "../algorithms";
import { type OverrideAnimationsGenerator, type SwapAnimationsGenerator } from "../algorithms/shared";

type AnimationGenerators = SwapAnimationsGenerator | OverrideAnimationsGenerator;

export function Visualizer() {
  const [status, setStatus] = useStatus();
  const [algorithm] = useAlgorithm();
  const { array } = useArray();
  const [generator, setGenerator] = useState<AnimationGenerators | null>(null);
  const visualBarsContainerRef = useRef<HTMLDivElement>(null);

  const shouldAnimate = status === UIStatus.SORTING;
  const enableSettings = () => setStatus(UIStatus.IDLE);

  const animationSpeed = array.length > 20 ? 250 / array.length : array.length >= 10 ? 110 : 200;

  const COLORS = {
    DEFAULT: "#52525b", // bg-zinc-600
    GREEN: "#22c55e", // bg-green-500
    RED: "#ef4444", // bg-red-500
  };

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
          console.warn(`Unknown algorithm ${algorithm}`);
          break;
      }
    }
  }, [shouldAnimate]);

  useEffect(() => {
    if (generator) {
      if (!visualBarsContainerRef.current) {
        throw new Error(`Could not find the visual arrays container. Current array is ${array}`);
      }
      const visualBars = visualBarsContainerRef.current.children as HTMLCollectionOf<HTMLDivElement>;
      let i = 0;

      if (isOverrideAnimation(generator, algorithm)) {
        for (const animation of generator) {
          const type = animation.type;
          const [val1, val2] = animation.payload;
          const bar1 = visualBars[val1];

          if (type === "comparison") {
            setTimeout(() => {
              bar1.style.backgroundColor = COLORS.RED;
            }, ++i * animationSpeed);
          }
          if (type === "override") {
            setTimeout(() => {
              bar1.style.backgroundColor = COLORS.GREEN;
              bar1.style.height = `${val2}px`;
            }, ++i * animationSpeed);
          }
          setTimeout(() => {
            bar1.style.backgroundColor = COLORS.DEFAULT;
          }, ++i * animationSpeed);
        }
      } else {
        for (const animation of generator) {
          const type = animation.type;
          const [idx1, idx2] = animation.payload;
          const bar1 = visualBars[idx1];
          const bar2 = visualBars[idx2];

          if (type === "comparison") {
            setTimeout(() => {
              bar1.style.backgroundColor = COLORS.RED;
              bar2.style.backgroundColor = COLORS.RED;
            }, ++i * animationSpeed);
          }

          if (type === "swap") {
            setTimeout(() => {
              bar1.style.backgroundColor = COLORS.GREEN;
              bar2.style.backgroundColor = COLORS.GREEN;
              const temp = bar1.style.height;
              bar1.style.height = bar2.style.height;
              bar2.style.height = temp;
            }, ++i * animationSpeed);
          }
          setTimeout(() => {
            bar1.style.backgroundColor = COLORS.DEFAULT;
            bar2.style.backgroundColor = COLORS.DEFAULT;
          }, ++i * animationSpeed);
        }
      }

      setTimeout(() => {
        Object.values(visualBars).forEach((bar) => {
          bar.style.backgroundColor = COLORS.GREEN;
        });
      }, ++i * animationSpeed); // immediately after finishing sorting

      setTimeout(() => {
        Object.values(visualBars).forEach((bar) => {
          bar.style.backgroundColor = COLORS.DEFAULT;
        });
      }, ++i * animationSpeed + 600); // after .6s

      setTimeout(() => {
        enableSettings();
        setGenerator(null);
      }, ++i * animationSpeed + 700); // after .7s
    }
  }, [generator]);

  return (
    <div id="visualizer" className="relative z-10 h-full">
      <div className="bg-zinc-800 px-4 flex items-end gap-1 h-[88%]" ref={visualBarsContainerRef}>
        {array.map((value, index) => (
          <div
            className={`relative w-full rounded-lg bg-zinc-600`}
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

function isOverrideAnimation(
  animationGenerator: AnimationGenerators,
  algorithm: AlgorithmType
): animationGenerator is OverrideAnimationsGenerator {
  return algorithm === "MERGE_SORT";
}
