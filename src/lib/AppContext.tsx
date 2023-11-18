import { createContext, useReducer, type ReactNode, type Reducer } from "react";
import { Algorithm, type AlgorithmType, generateRandomArray, INITIAL_LEN, MAX_ARRAY_SIZE, MIN_ARRAY_SIZE, SPEED_OPTIONS } from "@/lib/shared";

export const UIStatus = {
  IDLE: "IDLE",
  SORTING: "SORTING",
} as const;

export const Action = {
  SET_STATUS: "SET_STATUS",
  SET_ALGORITHM: "SET_ALGORITHM",
  NEW_ARRAY: "NEW_ARRAY",
  SET_SIZE: "SET_SIZE",
  SET_SPEED: "SET_SPEED",
} as const;

export type UIStatusType = keyof typeof UIStatus;
export type ActionType = keyof typeof Action;

export type State = {
  status: UIStatusType;
  algorithm: AlgorithmType;
  array: Array<number>;
  speed: number;
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
    }
  | {
      type: typeof Action.SET_SPEED;
      payload: number;
    };

export const INITIAL_STATE: State = {
  status: UIStatus.IDLE,
  algorithm: Algorithm.MERGE_SORT,
  array: generateRandomArray(INITIAL_LEN, MIN_ARRAY_SIZE, MAX_ARRAY_SIZE),
  speed: SPEED_OPTIONS.FAST,
};

export type AppContextType = {
  status: UIStatusType;
  setStatus: (newStatus: UIStatusType) => void;

  algorithm: AlgorithmType;
  setAlgorithm: (newAlgo: AlgorithmType) => void;

  array: Array<number>;
  newArray: () => void;
  setSize: (newSize: number) => void;

  speed: number;
  setSpeed: (newSpeed: number) => void;
};

const globalStateReducer: Reducer<State, Actions> = (state, action) => {
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
    case Action.SET_SPEED:
      return {
        ...state,
        speed: action.payload,
      };
    default:
      return state;
  }
};

export const AppContext = createContext<AppContextType | null>(null);

export function GlobalContext({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer<typeof globalStateReducer>(globalStateReducer, INITIAL_STATE);

  return (
    <AppContext.Provider
      value={{
        status: state.status,
        setStatus: (newStatus: UIStatusType) => dispatch({ type: Action.SET_STATUS, payload: newStatus }),
        algorithm: state.algorithm,
        setAlgorithm: (newAlgo: AlgorithmType) => dispatch({ type: Action.SET_ALGORITHM, payload: newAlgo }),
        array: state.array,
        newArray: () => dispatch({ type: Action.NEW_ARRAY }),
        setSize: (newSize: number) => dispatch({ type: Action.SET_SIZE, payload: newSize }),
        speed: state.speed,
        setSpeed: (newSpeed: number) => dispatch({ type: Action.SET_SPEED, payload: newSpeed }),
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
