import React from "react";
import { AlgorithmOptions } from "./AlgorithmOptions";
import { InputRange } from "./InputRange";
import { Action, Actions, State } from "../lib/manager";
import { ArrayBarsIcon, RandomizeIcon, StartIcon, StopIcon } from "./Icons";

export default function Settings({ state, dispatch }: { state: State; dispatch: React.Dispatch<Actions> }) {
  const shouldDisable = state.status === "SORTING";
  return (
    <HeaderLayout>
      <div className="flex gap-8 w-full justify-center">
        <div className="group relative">
          <Button
            label={
              <div className="flex gap-2">
                <span className="order-2">Randomize Array</span>
                <RandomizeIcon />
              </div>
            }
            onClick={() => {
              dispatch({ type: Action.NEW_ARRAY });
            }}
            disabled={shouldDisable}
          />
        </div>
        <InputRange
          label={
            <div className="flex gap-1">
              <ArrayBarsIcon />
              <span>Array Size: {state.array.length}</span>
            </div>
          }
          value={state.array.length}
          onChange={(e) => {
            dispatch({
              type: Action.SET_SIZE,
              payload: Number(e.target.value),
            });
          }}
          disabled={shouldDisable}
        />
        <AlgorithmOptions
          selectedOption={state.algorithm}
          onChange={(value) => {
            dispatch({
              type: Action.SET_ALGORITHM,
              payload: value,
            });
          }}
          disabled={shouldDisable}
        />
        <Button
          label={
            <div className="flex gap-2">
              <StartIcon />
              <span>Sort</span>
            </div>
          }
          onClick={() => {
            dispatch({
              type: Action.SET_STATUS,
              payload: "SORTING",
            });
          }}
          disabled={shouldDisable}
        />
      </div>
    </HeaderLayout>
  );
}

function HeaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-800 dark:bg-[#11111b] h-20 text-white flex justify-center">
      <div className="max-w-[1920px] w-full px-4 lg:px-8 xl:lg-10 flex items-center">{children}</div>
    </div>
  );
}

function Button({
  label = "",
  onClick = () => {},
  ...props
}: {
  label?: string | React.ReactNode;
  onClick?: React.MouseEventHandler;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="bg-[#313244] px-4 py-2 rounded-md hover:bg-[#45475a] select-none
    focus:ring-2 focus:ring-[#89b4fa]
    disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  );
}
