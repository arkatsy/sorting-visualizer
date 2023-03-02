import { useEffect, useState } from "react";
import { Action, Actions, Algorithm, State } from "../lib/manager";
import { bubbleSort } from "../algorithms/bubbleSort";

const COLORS = {
  RED: "#ff3f43",
  GREEN: "#1f8045",
  GREY: "#5b616b",
};

export default function Visualizer({
  dispatch,
  state,
}: {
  dispatch: React.Dispatch<Actions>;
  state: State;
}) {
  const [animations, SetAnimations] = useState<ReturnType<typeof bubbleSort> | null>(null);

  const animationSpeed =
    state.array.length > 10 ? 250 / state.array.length : state.array.length >= 7 ? 110 : 200;

  useEffect(() => {
    if (state.status === "SORTING") {
      switch (state.algorithm) {
        case Algorithm.BUBBLE_SORT: {
          SetAnimations(bubbleSort(state.array));
          break;
        }
        case Algorithm.MERGE_SORT: {
          break;
        }
        default: {
          break;
        }
      }
    }
  }, [state.status]);

  useEffect(() => {
    if (animations) {
      let i = 0;
      for (const animation of animations) {
        const type = animation.type;
        const [idx1, idx2] = animation.payload;
        const arrayBars = document.getElementsByClassName(
          "arrayBars"
        ) as HTMLCollectionOf<HTMLElement>;
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
        SetAnimations(null);
      }, ++i * animationSpeed);
    }
  }, [animations]);

  return (
    <VisualizerLayout>
      <main className=" my-4 lg:my-10 flex items-end justify-center max-w-[1920px]">
        {state.array.map((value, index) => (
          <div
            className="arrayBars relative bg-[#5b616b] border border-[#292b2f] flex items-center justify-center text-white w-full rounded-md"
            style={{
              height: `${value}px`,
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
    <div className="bg-[#292b2f] w-full text-white flex justify-center">
      <div className="max-w-[1920px] w-full px-6 lg:px-8 xl:lg-10 absolute bottom-0">
        {children}
      </div>
    </div>
  );
}
