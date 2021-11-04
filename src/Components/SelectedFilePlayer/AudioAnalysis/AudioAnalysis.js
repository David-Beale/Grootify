import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useStore } from "../../Store/store";
import { AudioListener, Audio, AudioLoader, AudioAnalyser } from "three";
import Shader from "./Shader";

const audioLoader = new AudioLoader();
const listener = new AudioListener();

export default function AudioAnalysis() {
  const file = useStore((state) => state.file);
  const sound = useRef();
  const analyzer = useRef();
  const { camera } = useThree();

  useEffect(() => {
    camera.add(listener);
    sound.current = new Audio(listener);
    analyzer.current = new AudioAnalyser(sound.current, 256);
  }, [camera]);

  useEffect(() => {
    if (!file) return;
    audioLoader.load(file, function (buffer) {
      sound.current.setBuffer(buffer);
      sound.current.setLoop(true);
      sound.current.setVolume(1);
    });
    setTimeout(() => {
      sound.current.play();
    }, 3000);
  }, [file]);

  return <Shader analyzer={analyzer} />;
}
