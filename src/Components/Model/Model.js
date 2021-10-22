import { memo } from "react";
import { useEffect, useRef } from "react";
import { useLoader } from "./useLoader";
import { useFalling } from "./useFalling";
import { useRunning } from "./useRunning";
import { useAnimations } from "./animations";

let toggle = true;

export default memo(function Model({ clicked, setLightOn, modelRef }) {
  const velRef = useRef(0);
  const running = useRef({ active: false, direction: null });

  useAnimations(modelRef, running);

  const { fbx, setNextAnimation } = useLoader();
  useFalling(modelRef, velRef, setLightOn, setNextAnimation);
  useRunning(modelRef, velRef, running, setNextAnimation);

  useEffect(() => {
    if (!clicked) return;
    if (toggle) {
      setNextAnimation("stunned");
    } else {
      setNextAnimation("hipHop1");
    }
    toggle = !toggle;
  }, [clicked, setNextAnimation]);

  return (
    <group ref={modelRef} position={[0, 21.5, 0]}>
      <primitive object={fbx} />;
    </group>
  );
});
