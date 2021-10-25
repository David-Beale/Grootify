import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import { useStore } from "../Store/store";
import model from "./modelClass";

export const useFalling = () => {
  const loggedIn = useStore((state) => state.loggedIn);
  const isLoaded = useStore((state) => state.isLoaded);
  const onInterfaceOpen = useStore((state) => state.onInterfaceOpen);
  const setLightsOn = useStore((state) => state.setLightsOn);

  useEffect(() => {
    if (!loggedIn || !isLoaded) return;
    if (!model.started) {
      model.fallingChain();
    } else {
      onInterfaceOpen();
      setLightsOn();
    }
  }, [loggedIn, isLoaded, onInterfaceOpen, setLightsOn]);

  useFrame(() => {
    if (!model.falling) return;
    model.vel += 0.01;
    model.ref.current.position.y -= model.vel;

    if (model.ref.current.position.y <= -20) {
      model.setNextAnimation({ override: true });
    }
  });
};
