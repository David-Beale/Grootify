import { useCallback, useRef } from "react";

export const useMouseInteraction = (loggedIn) => {
  const mouse = useRef([0.5, 0.5]);

  const onMouseMove = useCallback(
    (e) => {
      if (!loggedIn) return;
      mouse.current = [
        2500 * (e.clientX / window.innerWidth - 0.5),
        1500 * (e.clientY / window.innerHeight - 0.5),
      ];
    },
    [loggedIn]
  );

  return [mouse, onMouseMove];
};
