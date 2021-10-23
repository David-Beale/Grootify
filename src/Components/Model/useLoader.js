import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { useStore } from "../Store/store";
import model from "./modelClass";

export const useLoader = (modelRef) => {
  const isLoaded = useStore((state) => state.isLoaded);
  const [fbx, setFbx] = useState({});

  useEffect(() => {
    setFbx(model.fbx);
    model.setRef(modelRef);
  }, [isLoaded, modelRef]);

  useFrame((state, delta) => {
    if (model.mixer) model.mixer.update(delta);
  });

  return fbx;
};
