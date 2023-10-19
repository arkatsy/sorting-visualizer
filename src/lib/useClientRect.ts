import { useLayoutEffect, useRef, useState } from "react";

export function useClientRect<TNode extends HTMLElement>() {
  const [rect, setRect] = useState<DOMRect>({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
    toJSON: () => {},
  });

  const ref = useRef<TNode>(null);

  const handleResize = () => {
    if (ref.current) setRect(ref.current.getBoundingClientRect());
  };

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }
    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, []);

  return [ref, rect] as const;
}
