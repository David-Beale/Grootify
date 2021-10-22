import { useFrame } from "@react-three/fiber";
import { useStore } from "../Store/store";

export const useRunning = (modelRef, velRef, running, setNextAnimation) => {
  const onInterfaceOpen = useStore((state) => state.onInterfaceOpen);
  useFrame(() => {
    // console.log(running.current.active);
    if (!running.current.active) return;
    velRef.current += 0.008;
    velRef.current = Math.min(0.4, velRef.current);

    modelRef.current.position.x += velRef.current * running.current.direction;
    if (modelRef.current.position.x >= 56) {
      running.current.active = false;
      setNextAnimation("typing", true);
      setTimeout(() => {
        onInterfaceOpen();
      }, 4000);
    }
  });
};
