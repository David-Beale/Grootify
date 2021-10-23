import { useEffect, useRef, useState } from "react";
import { useStore } from "../Store/store";
import { SpotLight } from "./SpotLight/SpotLight";

export default function Lighting({ modelRef, bloomRef }) {
  const lightsOn = useStore((state) => state.lightsOn);
  const lightRef = useRef(0);
  const [angle, setAngle] = useState(360);

  useEffect(() => {
    if (!lightsOn) return;
    lightRef.current.intensity = 5;
    lightRef.current.angle = 0.8;
    bloomRef.current.strength = 4;
    setAngle(0.8);
  }, [lightsOn, bloomRef]);

  return (
    <>
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
    </>
  );
}
