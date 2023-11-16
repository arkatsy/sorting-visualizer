import { useContext } from "react";
import { AppContext } from "@/lib/AppContext";

export default function useStatus() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("Hook `useStatus` should be inside `GlobalContextProvider`");
  }

  return [context.status, context.setStatus] as const
}
