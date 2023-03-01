import React from "react";
import { AlgorithmOptions } from "./AlgorithmOptions";
import { Button } from "./Button";
import { InputRange } from "./InputRange";
import { Action, Actions, Algorithm, State } from "../lib/manager";

export default function Settings({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<Actions>;
}) {
  const shouldDisable = state.status === "SORTING";
  return (
    <HeaderLayout>
      <div className="flex gap-8 w-full relative">
        <div className="group relative">
          <Button
            label="New Array"
            onClick={() => {
              dispatch({ type: Action.NEW_ARRAY });
            }}
            disabled={shouldDisable}
          />
        </div>
        <InputRange
          label={`Array Size: ${state.array.length}`}
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
          selectedOption={Algorithm.BUBBLE_SORT}
          onChange={(value) => {
            dispatch({
              type: Action.SET_ALGORITHM,
              payload: value,
            });
          }}
          disabled={shouldDisable}
        />

        <div className="absolute right-0 flex gap-4">
          <Button
            label="Start"
            onClick={() => {
              dispatch({
                type: Action.SET_STATUS,
                payload: "SORTING",
              });
            }}
            disabled={shouldDisable}
          />
        </div>
      </div>
    </HeaderLayout>
  );
}

function HeaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#202225] h-20 text-white flex justify-center">
      <div className="max-w-[1920px] w-full px-4 lg:px-8 xl:lg-10 flex items-center">
        {children}
      </div>
    </div>
  );
}
