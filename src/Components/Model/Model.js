import { memo } from "react";
import { useLoader } from "./useLoader";
import { useFalling } from "./useFalling";
import { useRunning } from "./useRunning";
import { useClick } from "./useClick";
import { usePosition } from "./usePosition";
import { useStore } from "../Store/store";

export default memo(function Model({ modelRef }) {
  const onClick = useStore((state) => state.onClick);
  const fbx = useLoader(modelRef);
  useFalling();
  useRunning();
  useClick();
  usePosition();
  return (
    <group onClick={onClick} ref={modelRef} position={[0, 21.5, 0]}>
      <primitive object={fbx} />;
    </group>
  );
});
