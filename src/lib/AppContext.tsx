import { useReducer } from "react";
import { useMemo } from "react";
import { createContext, type ReactNode, type Reducer } from "react";
import { generateRandomArray, INITIAL_LEN, MAX_ARRAY_SIZE, MIN_ARRAY_SIZE } from "./shared";

export const UIStatus = {
  IDLE: "IDLE",
  SORTING: "SORTING",
} as const;

export const Algorithm = {
  BUBBLE_SORT: "BUBBLE_SORT",
  HEAP_SORT: "HEAP_SORT",
  MERGE_SORT: "MERGE_SORT",
  SELECTION_SORT: "SELECTION_SORT",
  INSERTION_SORT: "INSERTION_SORT",
  QUICK_SORT: "QUICK_SORT",
} as const;

export const Action = {
  SET_STATUS: "SET_STATUS",
  SET_ALGORITHM: "SET_ALGORITHM",
  NEW_ARRAY: "NEW_ARRAY",
  SET_SIZE: "SET_SIZE",
} as const;

export type UIStatusType = keyof typeof UIStatus;
export type AlgorithmType = keyof typeof Algorithm;
export type ActionType = keyof typeof Action;

export type State = {
  status: UIStatusType;
  algorithm: AlgorithmType;
  array: Array<number>;
};

export type Actions =
  | {
      type: typeof Action.SET_STATUS;
      payload: UIStatusType;
    }
  | {
      type: typeof Action.SET_ALGORITHM;
      payload: AlgorithmType;
    }
  | {
      type: typeof Action.NEW_ARRAY;
    }
  | {
      type: typeof Action.SET_SIZE;
      payload: number;
    };

export const INITIAL_STATE: State = {
  status: UIStatus.IDLE,
  algorithm: Algorithm.BUBBLE_SORT,
  array: generateRandomArray(INITIAL_LEN, MIN_ARRAY_SIZE, MAX_ARRAY_SIZE),
};

export type AppContextType = {
  status: UIStatusType;
  setStatus: (newStatus: UIStatusType) => void;

  algorithm: AlgorithmType;
  setAlgorithm: (newAlgo: AlgorithmType) => void;

  array: Array<number>;
  newArray: () => void;
  setSize: (newSize: number) => void;
};

const reducer: Reducer<State, Actions> = (state, action) => {
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
        array: generateRandomArray(state.array.length, MIN_ARRAY_SIZE, MAX_ARRAY_SIZE),
      };
    case Action.SET_SIZE:
      return {
        ...state,
        array: generateRandomArray(action.payload, MIN_ARRAY_SIZE, MAX_ARRAY_SIZE),
      };
    default:
      return state;
  }
};

export const AppContext = createContext<AppContextType | null>(null);

export function GlobalContext({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const value = useMemo(
    () => ({
      status: state.status,
      setStatus: (newStatus: UIStatusType) => dispatch({ type: Action.SET_STATUS, payload: newStatus }),
      algorithm: state.algorithm,
      setAlgorithm: (newAlgo: AlgorithmType) => dispatch({ type: Action.SET_ALGORITHM, payload: newAlgo }),
      array: state.array,
      newArray: () => dispatch({ type: Action.NEW_ARRAY }),
      setSize: (newSize: number) => dispatch({ type: Action.SET_SIZE, payload: newSize }),
    }),
    [state.status, state.array, state.algorithm]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
