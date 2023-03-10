import { useEffect, useState } from "react";
import { Action, Actions, Algorithm, State } from "../lib/manager";
import { bubbleSort, mergeSort, heapSort, quickSort, insertionSort, selectionSort } from "../algorithms/";
import { ComparisonOverrideAnimation, ComparisonSwapAnimation } from "../algorithms/shared";

const COLORS = {
  RED: "#f38ba8",
  GREEN: "#a6e3a1	",
  GREY: "#585b70",
};

type Animations = Generator<ComparisonSwapAnimation> | Generator<ComparisonOverrideAnimation> | null;

export default function Visualizer({ dispatch, state }: { dispatch: React.Dispatch<Actions>; state: State }) {
  const [animations, setAnimations] = useState<Animations | null>(null);

  const animationSpeed =
    state.array.length > 10 ? 250 / state.array.length : state.array.length >= 7 ? 110 : 200;

  useEffect(() => {
    if (state.status === "SORTING") {
      switch (state.algorithm) {
        case Algorithm.BUBBLE_SORT: {
          setAnimations(bubbleSort(state.array));
          break;
        }
        case Algorithm.HEAP_SORT: {
          setAnimations(heapSort(state.array));
          break;
        }
        case Algorithm.MERGE_SORT: {
          setAnimations(mergeSort(state.array));
          break;
        }
        case Algorithm.SELECTION_SORT: {
          setAnimations(selectionSort(state.array));
          break;
        }
        case Algorithm.INSERTION_SORT: {
          setAnimations(insertionSort(state.array));
          break;
        }
        case Algorithm.QUICK_SORT: {
          setAnimations(quickSort(state.array));
        }
        default: {
          break;
        }
      }
    }
  }, [state.status]);

  useEffect(() => {
    if (animations) {
      if (state.algorithm === Algorithm.MERGE_SORT) {
        let i = 0;
        for (const animation of animations) {
          const type = animation.type;
          const [val1, val2] = animation.payload;
          const arrayBars = document.getElementsByClassName("arrayBars") as HTMLCollectionOf<HTMLElement>;
          const bar1 = arrayBars[val1];
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
            bar1.style.backgroundColor = COLORS.GREY;
          }, ++i * animationSpeed);
        }
        setTimeout(() => {
          dispatch({
            type: Action.SET_STATUS,
            payload: "IDLE",
          });
          setAnimations(null);
        }, ++i * animationSpeed);
      } else {
        let i = 0;
        for (const animation of animations) {
          const type = animation.type;
          const [idx1, idx2] = animation.payload;
          const arrayBars = document.getElementsByClassName("arrayBars") as HTMLCollectionOf<HTMLElement>;
          const bar1 = arrayBars[idx1];
          const bar2 = arrayBars[idx2];

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
            bar1.style.backgroundColor = COLORS.GREY;
            bar2.style.backgroundColor = COLORS.GREY;
          }, ++i * animationSpeed);
        }
        setTimeout(() => {
          dispatch({
            type: Action.SET_STATUS,
            payload: "IDLE",
          });
          setAnimations(null);
        }, ++i * animationSpeed);
      }
    }
  }, [animations]);

  return (
    <VisualizerLayout>
      <main className=" my-4 lg:my-10 flex items-end justify-center">
        {state.array.map((value, index) => (
          <div
            className={`arrayBars relative mx-[2px] flex items-center justify-center w-full rounded-lg`}
            style={{
              height: `${value}px`,
              backgroundColor: COLORS.GREY,
            }}
            key={index}
          />
        ))}
      </main>
    </VisualizerLayout>
  );
}

function VisualizerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full text-white flex justify-center">
      <div className="max-w-[1920px] w-full px-6 lg:px-8 xl:lg-10 absolute bottom-0">{children}</div>
    </div>
  );
}
