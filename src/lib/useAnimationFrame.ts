import { useLayoutEffect, useRef } from "react";

type AnimationId = ReturnType<AnimationFrameProvider["requestAnimationFrame"]>;

export function useRequestAnimationFrame(
    onFrame: (deltaTime: DOMHighResTimeStamp) => void,
    shouldAnimate?: boolean
  ) {
    shouldAnimate ??= true;
    const prevTime = useRef<DOMHighResTimeStamp>(0);
    const animationIdRef = useRef<AnimationId>();
  
    useLayoutEffect(() => {
      const loop = (timestamp: DOMHighResTimeStamp) => {
        const deltaTime = timestamp - prevTime.current;
        onFrame(deltaTime);
  
        prevTime.current = timestamp;
        animationIdRef.current = window.requestAnimationFrame(loop);
      };
  
      if (shouldAnimate) {
        animationIdRef.current = window.requestAnimationFrame(loop);
      }
  
      return () => {
        if (!animationIdRef.current) {
          return;
        }
        window.cancelAnimationFrame(animationIdRef.current);
      };
    }, []);
  }