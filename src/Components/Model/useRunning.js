import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useStore } from "../Store/store";
import model from "./modelClass";

export const useRunning = () => {
  const running = useStore((state) => state.running);
  const setRunning = useStore((state) => state.setRunning);

  const activeDirection = useRef(false);

  useEffect(() => {
    if (!running) return;
    activeDirection.current = running === "right" ? 1 : -1;
    model.vel = 0;
  }, [running]);

  useFrame(() => {
    if (!activeDirection.current) return;
    model.vel += 0.008;
    model.vel = Math.min(0.4, model.vel);

    model.ref.current.position.x += model.vel * activeDirection.current;
    if (activeDirection.current === 1) {
      if (model.ref.current.position.x >= 56) {
        activeDirection.current = false;
        setRunning(false);
        model.setNextAnimation({ override: true });
      }
    } else {
      if (model.ref.current.position.x <= 0) {
        activeDirection.current = false;
        setRunning(false);
        model.setNextAnimation({ override: true });
      }
    }
  });
};
