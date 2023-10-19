import { RefObject, useEffect, useRef } from "react";
import { useClientRect } from "../lib/useClientRect";
import { useStatus } from "../lib/useStatus";
import { UIStatus } from "../lib/AppContext";
import { useRequestAnimationFrame } from "../lib/useAnimationFrame";

export function Visualizer() {
  const [status] = useStatus();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [parentRef, parentRect] = useClientRect<HTMLDivElement>();
  const shouldAnimate = status === UIStatus.SORTING;

  useEffect(() => {
    const [canvas] = getCanvas(canvasRef);
    if (!parentRect) return;
    canvas.width = parentRect.width;
    canvas.height = parentRect.height;
  }, [parentRect]);

  useRequestAnimationFrame((deltaTime) => {
    const [canvas, ctx] = getCanvas(canvasRef);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    console.log("animate");
  }, shouldAnimate);

  return (
    <div id="visualizer" className="relative z-10 h-full">
      <div className="bg-stone-800 h-full" ref={parentRef}>
        <canvas id="canvas-visualization" ref={canvasRef}></canvas>
      </div>
    </div>
  );
}

function getCanvas(canvasRef: RefObject<HTMLCanvasElement>) {
  if (!canvasRef.current) {
    throw new Error("Canvas Not Found. `canvasRef.current` is null");
  }
  const ctx = canvasRef.current.getContext("2d");
  if (!ctx) throw new Error("2d Context Not Found");
  return [canvasRef.current, ctx] as const;
}
