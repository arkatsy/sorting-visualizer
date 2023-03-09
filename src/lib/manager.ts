import React from "react";

const MIN = 10;
const MAX = 640;
const INITIAL_SIZE = 20;

export function generateRandomArray(size: number, min: number, max: number) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1) + min));
}

export enum Algorithm {
  BUBBLE_SORT = "Bubble Sort",
  HEAP_SORT = "Heap Sort",
  MERGE_SORT = "Merge Sort",
}

export type Status = "IDLE" | "SORTING";

export type State = {
  status: Status;
  algorithm: Algorithm;
  array: Array<number>;
};

export const INITIAL_STATE: State = {
  status: "IDLE",
  algorithm: Algorithm.BUBBLE_SORT,
  array: generateRandomArray(INITIAL_SIZE, MIN, MAX),
};

export enum Action {
  SET_STATUS = "SET_STATUS",
  SET_ALGORITHM = "SET_ALGORITHM",
  NEW_ARRAY = "NEW_ARRAY",
  SET_SIZE = "SET_SIZE",
}

export type Actions =
  | {
      type: Action.SET_STATUS;
      payload: Status;
    }
  | {
      type: Action.SET_ALGORITHM;
      payload: Algorithm;
    }
  | {
      type: Action.NEW_ARRAY;
    }
  | {
      type: Action.SET_SIZE;
      payload: number;
    };

export const reducer: React.Reducer<State, Actions> = (state, action) => {
  switch (action.type) {
    case Action.SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case Action.SET_ALGORITHM:
      return {
        ...state,
        algorithm: action.payload,
      };
    case Action.NEW_ARRAY:
      return {
        ...state,
        array: generateRandomArray(state.array.length, MIN, MAX),
      };
    case Action.SET_SIZE:
      return {
        ...state,
        array: generateRandomArray(action.payload, MIN, MAX),
      };
    default:
      return state;
  }
};
