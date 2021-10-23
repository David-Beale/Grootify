import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { useStore } from "../Store/store";
import model from "./modelClass";

export const useFalling = () => {
  const loggedIn = useStore((state) => state.loggedIn);
  const isLoaded = useStore((state) => state.isLoaded);
  const setRunning = useStore((state) => state.setRunning);
  const onInterfaceOpen = useStore((state) => state.onInterfaceOpen);
  const setLightsOn = useStore((state) => state.setLightsOn);

  const landingChain = useMemo(
    () => [
      {
        animation: "falling",
        cb: () => {
          model.fall();
        },
      },
      {
        animation: "land",
        cb: () => {
          model.land();
          setLightsOn(true);
        },
      },
      { animation: "waving" },
      {
        animation: "runRight",
        cb: () => {
          setRunning("right");
        },
      },
      {
        animation: "typing",
        cb: () => {
          setTimeout(() => {
            onInterfaceOpen();
          }, 4000);
        },
      },
      {
        animation: "angry",
      },
    ],
    [onInterfaceOpen, setLightsOn, setRunning]
  );

  useEffect(() => {
    if (!loggedIn || !isLoaded || model.started) return;
    setTimeout(() => {
      model.setNextAnimation({ chain: landingChain, override: true });
    }, 2000);
  }, [loggedIn, isLoaded, landingChain]);

  useFrame(() => {
    if (!model.falling) return;
    model.vel += 0.01;
    model.ref.current.position.y -= model.vel;

    if (model.ref.current.position.y <= -20) {
      model.setNextAnimation({ override: true });
    }
  });
};
