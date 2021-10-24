import { useFrame, useThree } from "@react-three/fiber";
import model from "../Model/modelClass";

const mouseRangeX = 55;
const mouseRangeY = 20;
export default function Rig({ mouse }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x +=
      (mouse.current[0] * mouseRangeX - camera.position.x) * 0.025;
    camera.position.y +=
      (-mouse.current[1] * mouseRangeY - camera.position.y) * 0.025;
    camera.lookAt(0, 0, 0);

    model.mouseX = mouse.current[0];
    model.mouseY = mouse.current[1];
  });
  return null;
}
