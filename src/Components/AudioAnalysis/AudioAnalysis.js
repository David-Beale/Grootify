import { PositionalAudio } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import Shader from "./Shader";

export default function AudioAnalysis() {
  const sound = useRef();

  useEffect(() => {
    const play = () => {
      sound.current.play();
    };

    console.log(sound.current);
    window.addEventListener("click", play);
    return () => {
      window.removeEventListener("click", play);
    };
  }, []);

  return (
    <>
      <PositionalAudio url="./sound2.mp3" distance={100} loop ref={sound} />
      <Shader sound={sound} />
    </>
  );
}
