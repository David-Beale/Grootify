import { SpotLight } from "@react-three/drei";
import Floor from "../Floor/Floor";
import Model from "../Model/Model";

export default function Main({ clicked }) {
  return (
    <>
      <Model clicked={clicked} />
      <SpotLight
        intensity={5}
        position={[0, 40, 0]}
        distance={80}
        angle={3}
        attenuation={75}
        anglePower={5}
        color="white"
        castShadow
      />

      <Floor />
    </>
  );
}
