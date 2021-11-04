import { Canvas } from "@react-three/fiber";
import AudioAnalysis from "./AudioAnalysis/AudioAnalysis";
import { useStore } from "../Store/store";

export default function SelectedFilePlayer() {
  const mode = useStore((state) => state.mode);
  return (
    <>
      {mode === "file" && (
        <Canvas
          key="audioPlayer"
          className="canvas"
          camera={{
            position: [0, 0, 100],
            fov: 40,
            far: 100000,
          }}
        >
          <AudioAnalysis />
        </Canvas>
      )}
    </>
  );
}
