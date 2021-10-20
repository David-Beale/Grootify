import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export const useFalling = (
  modelRef,
  velRef,
  setLightOn,
  setNextAnimation,
  loggedIn
) => {
  const falling = useRef(null);

  useEffect(() => {
    if (!loggedIn) return;

    falling.current = true;
    setNextAnimation("falling", true);
  }, [setNextAnimation, loggedIn]);

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
