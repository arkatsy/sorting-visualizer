import { useEffect, useState } from "react";

export type WindowSize = { width: number; height: number };

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const resizeHandler = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", resizeHandler);
    () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return windowSize;
}