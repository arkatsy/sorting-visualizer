import { useReducer } from "react";
import Settings from "./components/Settings";
import Visualizer from "./components/Visualizer";
import { reducer, INITIAL_STATE } from "./lib/manager";

export default function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <>
      <Settings dispatch={dispatch} state={state} />
      <Visualizer dispatch={dispatch} state={state} />
    </>
  );
}
