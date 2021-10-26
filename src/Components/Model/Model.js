import { memo } from "react";
import { useLoader } from "./hooks/useLoader";
import { useFalling } from "./hooks/useFalling";
import { useRunning } from "./hooks/useRunning";
import { useClick } from "./hooks/useClick";
import { usePosition } from "./hooks/usePosition";
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
