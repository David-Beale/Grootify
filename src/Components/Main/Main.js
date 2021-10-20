import { SpotLight } from "../SpotLight/SpotLight";
import { useCallback, useRef, useState } from "react";
import Floor from "../Floor/Floor";
import Logo from "../Logo/Logo";
import Model from "../Model/Model";
import Effects from "../Effects/Effects";
import NoEffects from "../NoEffects/NoEffects";
import Ring from "../Ring/Ring";
import Table from "../Table/Table";

export default function Main({ clicked, loggedIn }) {
  const lightRef = useRef(0);
  const [angle, setAngle] = useState(360);
  const bloomRef = useRef();
  const modelRef = useRef();

  const lightsOn = useCallback(() => {
    lightRef.current.intensity = 5;
    lightRef.current.angle = 0.8;
    bloomRef.current.strength = 4;
    setAngle(0.8);
  }, []);

  return (
    <>
      <NoEffects>
        <Model
          clicked={clicked}
          setLightOn={lightsOn}
          modelRef={modelRef}
          loggedIn={loggedIn}
        />
        <ambientLight intensity={0.3} />
        <SpotLight
          ref={lightRef}
          intensity={0}
          position={[0, 40, 0]}
          angle={angle}
          penumbra={1}
          distance={150}
          attenuation={75}
          anglePower={5}
          target={modelRef.current}
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
