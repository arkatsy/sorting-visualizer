import { useContext } from "react";
import { AppContext } from "./AppContext";

export function useArray() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("Hook `useArray` should be inside `GlobalContextProvider`");
  }

  return {
    array: context.array,
    newArray: context.newArray,
    setSize: context.setSize,
  } as const;
}
