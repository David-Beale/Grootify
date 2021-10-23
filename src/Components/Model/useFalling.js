import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { useStore } from "../Store/store";

export const useFalling = (modelRef, velRef, setNextAnimation) => {
  const loggedIn = useStore((state) => state.loggedIn);
  const isLoaded = useStore((state) => state.isLoaded);
  const setRunning = useStore((state) => state.setRunning);
  const onInterfaceOpen = useStore((state) => state.onInterfaceOpen);
  const setLightsOn = useStore((state) => state.setLightsOn);

  const once = useRef(false);
  const falling = useRef(null);

  const landingChain = useMemo(
    () => [
      {
        animation: "falling",
        cb: () => {
          falling.current = true;
          once.current = true;
        },
      },
      {
        animation: "land",
        cb: () => {
          falling.current = false;
          once.current = true;
          modelRef.current.position.y = -20;
          velRef.current = 0;
          setLightsOn(true);
        },
      },
      {
        animation: "waving",
      },
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
    [modelRef, onInterfaceOpen, setLightsOn, setRunning, velRef]
  );

  useEffect(() => {
    if (!loggedIn || !isLoaded || once.current) return;
    setNextAnimation({ chain: landingChain, override: true });
  }, [setNextAnimation, loggedIn, isLoaded, landingChain]);

  useFrame(() => {
    if (!falling.current) return;
    velRef.current += 0.01;
    modelRef.current.position.y -= velRef.current;

    if (modelRef.current.position.y <= -20) {
      setNextAnimation({ override: true });
    }
  });
};
