import { Visualizer } from "./components/Visualizer";
import { Settings } from "./components/Settings";
import { GlobalContext } from "./lib/AppContext";

export default function App() {
  return (
    <GlobalContext>
      <Settings />
      <Visualizer />
    </GlobalContext>
  );
}
