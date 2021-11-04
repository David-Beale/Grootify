import { useCallback, useRef } from "react";
import { useStore } from "../../Store/store";

export const useMouseInteraction = () => {
  const mode = useStore((state) => state.mode);
  const mouse = useRef([0, 0]);

  const onMouseMove = useCallback(
    (e) => {
      if (!mode) return;
      mouse.current = [
        e.clientX / window.innerWidth - 0.5,
        e.clientY / window.innerHeight - 0.5,
      ];
    },
    [mode]
  );

  return [mouse, onMouseMove];
};
