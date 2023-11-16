import { useContext } from "react";
import { AppContext } from "@/lib/AppContext";

export default function useSpeed() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("Hook `useSpeed` should be inside `GlobalContextProvider`");
  }

  return [context.speed, context.setSpeed] as const;
}
