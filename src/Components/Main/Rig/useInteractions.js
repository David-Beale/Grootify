import { useCallback, useRef } from "react";
import { useStore } from "../../Store/store";

export const useMouseInteraction = () => {
  const loggedIn = useStore((state) => state.loggedIn);
  const mouse = useRef([0, 0]);

  const onMouseMove = useCallback(
    (e) => {
      if (!loggedIn) return;
      mouse.current = [
        e.clientX / window.innerWidth - 0.5,
        e.clientY / window.innerHeight - 0.5,
      ];
    },
    [loggedIn]
  );

  return [mouse, onMouseMove];
};
