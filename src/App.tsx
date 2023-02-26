import { useReducer } from "react";
import Settings from "./Settings";
import Visualizer from "./Visualizer";
import { INITIAL_STATE, settingsReducer } from "./settings_state";

export default function App() {
  const [state, dispatch] = useReducer(settingsReducer, INITIAL_STATE);
  return (
    <>
      <Settings dispatcher={dispatch} state={state} />
      <Visualizer array={state.array} />
    </>
  );
}
