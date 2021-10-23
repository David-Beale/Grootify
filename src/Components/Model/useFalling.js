import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useStore } from "../Store/store";

export const useFalling = (modelRef, velRef, setLightOn, setNextAnimation) => {
  const once = useRef(false);
  const falling = useRef(null);
  const loggedIn = useStore((state) => state.loggedIn);
  const isLoaded = useStore((state) => state.isLoaded);

  useEffect(() => {
    if (!loggedIn || !isLoaded || once.current) return;
    once.current = true;
    falling.current = true;
    setNextAnimation("falling", true);
  }, [setNextAnimation, loggedIn, isLoaded]);

  useFrame(() => {
    if (!falling.current) return;
    velRef.current += 0.01;
    modelRef.current.position.y -= velRef.current;

    if (modelRef.current.position.y <= -20) {
      setNextAnimation("land", true);
      modelRef.current.position.y = -20;
      falling.current = false;
      velRef.current = 0;
      setLightOn(true);
    }
  });
};
