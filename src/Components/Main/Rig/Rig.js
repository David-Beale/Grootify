import { useFrame, useThree } from "@react-three/fiber";
import model from "../Model/classes/modelClass";

const mouseRangeX = 20;
const mouseRangeY = 20;
export default function Rig({ mouse }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x +=
      (mouse.current[0] * mouseRangeX - camera.position.x) * 0.025;
    camera.position.y +=
      (-mouse.current[1] * mouseRangeY - camera.position.y) * 0.025;
    camera.lookAt(0, 0, 0);

    model.mouseManager.setMouse(mouse.current);
  });
  return null;
}
