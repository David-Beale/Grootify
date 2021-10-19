import { useFrame, useThree } from "@react-three/fiber";

const mouseRangeX = 45;
const mouseRangeY = 75;
export default function Rig({ mouse }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x +=
      (mouse.current[0] / mouseRangeX - camera.position.x) * 0.025;
    camera.position.y +=
      (-mouse.current[1] / mouseRangeY - camera.position.y) * 0.025;
    camera.lookAt(0, 0, 0);
  });
  return null;
}
