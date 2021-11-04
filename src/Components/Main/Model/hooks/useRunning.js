import { useFrame } from "@react-three/fiber";
import model from "../classes/modelClass";

export const useRunning = () => {
  useFrame(() => {
    model.run();
  });
};
