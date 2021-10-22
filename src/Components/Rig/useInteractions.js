import { useCallback, useRef } from "react";
import { useAuthStore } from "../Store/authStore";

export const useMouseInteraction = () => {
  const loggedIn = useAuthStore((state) => state.loggedIn);
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
