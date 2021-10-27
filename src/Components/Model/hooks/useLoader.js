import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { useStore } from "../../Store/store";
import model from "../classes/modelClass";

export const useLoader = (modelRef) => {
  const isPreLoaded = useStore((state) => state.isPreLoaded);
  const setLoaded = useStore((state) => state.setLoaded);
  const [fbx, setFbx] = useState({});

  useEffect(() => {
    if (!isPreLoaded) return;
    setFbx(model.animationManager.fbx);
    model.positionManager.setPosController(modelRef.current.position);
    setTimeout(() => {
      setLoaded();
    }, 2000);
  }, [isPreLoaded, modelRef, setLoaded]);

  useFrame((state, delta) => {
    if (model.animationManager.mixer) {
      model.animationManager.mixer.update(delta);
      model.moveJoints();
      model.fadeJoints();
      model.wave();
    }
  });

  return fbx;
};
