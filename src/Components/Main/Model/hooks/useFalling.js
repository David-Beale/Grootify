import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import { useStore } from "../../../Store/store";
import model from "../classes/modelClass";

export const useFalling = () => {
  const mode = useStore((state) => state.mode);
  const isLoaded = useStore((state) => state.isLoaded);
  const onInterfaceOpen = useStore((state) => state.onInterfaceOpen);
  const setLightsOn = useStore((state) => state.setLightsOn);

  useEffect(() => {
    if (!mode || !isLoaded) return;
    if (!model.started) {
      model.setChain("fallingChain");
    } else {
      onInterfaceOpen();
      setLightsOn();
    }
  }, [mode, isLoaded, onInterfaceOpen, setLightsOn]);

  useFrame(() => {
    model.fall();
  });
};
