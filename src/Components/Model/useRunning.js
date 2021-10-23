import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useStore } from "../Store/store";

export const useRunning = (modelRef, velRef, setNextAnimation) => {
  const running = useStore((state) => state.running);
  const setRunning = useStore((state) => state.setRunning);

  const activeDirection = useRef(false);

  useEffect(() => {
    if (!running) return;
    activeDirection.current = running === "right" ? 1 : -1;
  }, [running]);

  useFrame(() => {
    if (!activeDirection.current) return;
    velRef.current += 0.008;
    velRef.current = Math.min(0.4, velRef.current);

    modelRef.current.position.x += velRef.current * activeDirection.current;
    if (activeDirection.current === 1 && modelRef.current.position.x >= 56) {
      activeDirection.current = false;
      setRunning(false);
      setNextAnimation({ override: true });
    }
  });
};
