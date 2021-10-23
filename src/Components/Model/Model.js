import { memo } from "react";
import { useLoader } from "./useLoader";
import { useFalling } from "./useFalling";
import { useRunning } from "./useRunning";
import { useClick } from "./useClick";

export default memo(function Model({ modelRef }) {
  const fbx = useLoader(modelRef);
  useFalling();
  useRunning();
  useClick();

  return (
    <group ref={modelRef} position={[0, 21.5, 0]}>
      <primitive object={fbx} />;
    </group>
  );
});
