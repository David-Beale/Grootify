import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export const useFalling = (modelRef, velRef, setLightOn, setNextAnimation) => {
  const falling = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.code === "Space" && falling.current === null) {
        falling.current = true;
        setNextAnimation("falling", true);
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [setNextAnimation]);

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
