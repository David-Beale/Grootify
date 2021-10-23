import { memo } from "react";
import { useRef } from "react";
import { useLoader } from "./useLoader";
import { useFalling } from "./useFalling";
import { useRunning } from "./useRunning";
import { useClick } from "./useClick";

export default memo(function Model({ modelRef }) {
  const velRef = useRef(0);

  const { fbx, setNextAnimation } = useLoader();
  useFalling(modelRef, velRef, setNextAnimation);
  useRunning(modelRef, velRef, setNextAnimation);
  useClick(setNextAnimation);

  return (
    <group ref={modelRef} position={[0, 21.5, 0]}>
      <primitive object={fbx} />;
    </group>
  );
});
