import { useContext } from "react";
import { AppContext } from "./AppContext";

export function useAlgorithm() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("Hook `useAlgorithm` should be inside `GlobalContextProvider`");
  }

  return [context.algorithm, context.setAlgorithm] as const;
}
