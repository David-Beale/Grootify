import { SpotLight } from "@react-three/drei";
import { useCallback, useRef, useState } from "react";
import Floor from "../Floor/Floor";
import Logo from "../Logo/Logo";
import Model from "../Model/Model";
import Effects from "../Effects/Effects";
import NoEffects from "../NoEffects/NoEffects";
import Ring from "../Ring/Ring";
import Table from "../Table/Table";

export default function Main({ clicked }) {
  const lightRef = useRef(0);
  const [angle, setAngle] = useState(360);
  const bloomRef = useRef();

  const lightsOn = useCallback(() => {
    lightRef.current.intensity = 5;
    bloomRef.current.strength = 4;
    setAngle(3);
  }, []);

  return (
    <>
      <NoEffects>
        <Model clicked={clicked} setLightOn={lightsOn} />
        <ambientLight intensity={0.5} />
        <SpotLight
          ref={lightRef}
          intensity={0}
          position={[0, 40, 0]}
          distance={80}
          angle={angle}
          attenuation={75}
          anglePower={5}
          color="white"
          castShadow
        />
        <Floor />
        <Table />
      </NoEffects>
      <Effects bloomRef={bloomRef}>
        <Logo />
        <Ring />
      </Effects>
    </>
  );
}
