import { useFrame } from "@react-three/fiber";
import model from "./modelClass";

export const useRunning = () => {
  useFrame(() => {
    if (!model.running) return;
    model.vel += 0.008;
    model.vel = Math.min(0.4, model.vel);

    model.ref.current.position.x += model.vel * model.running;
    if (model.running === 1) {
      if (model.ref.current.position.x >= 56) {
        model.running = false;
        model.setNextAnimation({ override: true });
      }
    } else {
      if (model.ref.current.position.x <= 0) {
        model.running = false;
        model.setNextAnimation({ override: true });
      }
    }
  });
};
