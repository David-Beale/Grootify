import { memo } from "react";
import { useEffect, useRef } from "react";
import { useLoader } from "./useLoader";
import { useFalling } from "./useFalling";
import { useRunning } from "./useRunning";
import { useAnimations } from "./animations";

let toggle = true;

export default memo(function Model({ clicked, setLightOn }) {
  const posRef = useRef();
  const velRef = useRef(0);
  const running = useRef({ active: false, direction: null });

  useAnimations(posRef, running);

  const { fbx, setNextAnimation } = useLoader();

  useFalling(posRef, velRef, setLightOn, setNextAnimation);
  useRunning(posRef, velRef, running, setNextAnimation);

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
    <group ref={posRef} position={[0, 21.5, 0]}>
      <primitive object={fbx} />;
    </group>
  );
});
