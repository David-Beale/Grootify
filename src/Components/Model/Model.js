import { memo } from "react";
import { useEffect, useRef } from "react";
import { useLoader } from "./useLoader";
import { useFalling } from "./useFalling";

let toggle = true;

export default memo(function Model({ clicked, setLightOn }) {
  const posRef = useRef();
  const velRef = useRef(0);

  const { fbx, setNextAnimation } = useLoader();

  useFalling(posRef, velRef, setLightOn, setNextAnimation);

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
