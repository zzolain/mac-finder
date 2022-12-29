import { RefObject, useCallback, useEffect, useState } from "react";

export const useDrag = (
  target: RefObject<HTMLElement>,
  onDragMove: (e: PointerEvent) => void
) => {
  const [isDragging, setIsDragging] = useState(false);
  const onPointerDown = useCallback(() => setIsDragging(true), []);
  const onPointerUp = useCallback(() => setIsDragging(false), []);
  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isDragging) return;
      onDragMove(e);
    },
    [isDragging, onDragMove]
  );

  const addListeners = useCallback(() => {
    if (!target.current) return;
    target.current.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  }, [onPointerMove, onPointerUp]);

  const cleanUpListeners = useCallback(() => {
    target.current?.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  }, [onPointerMove, onPointerUp]);

  useEffect(() => {
    addListeners();
    return cleanUpListeners;
  }, [isDragging, addListeners, cleanUpListeners]);

  return { isDragging };
};
