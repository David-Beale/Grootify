import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Stats } from "@react-three/drei";
import Floor from "./Floor/Floor";
import Text from "./Text/Text";
import Model from "./Model/Model";
import Effects from "./Effects/Effects";
import NoEffects from "./NoEffects/NoEffects";
import Ring from "./Ring/Ring";
import Table from "./Table/Table";
import Lighting from "./Lighting/Lighting";
import Rig from "./Rig/Rig";

export default function Main({ mouse }) {
  const bloomRef = useRef();
  const modelRef = useRef();

  return (
    <Canvas
      className="canvas canvasMain"
      camera={{
        position: [0, 0, 100],
        fov: 40,
        far: 100000,
      }}
      shadows
    >
      <NoEffects>
        <Model modelRef={modelRef} />
        <Lighting modelRef={modelRef} bloomRef={bloomRef} />
        <Floor />
        <Table />
      </NoEffects>
      <Effects bloomRef={bloomRef}>
        <Text />
        <Ring />
      </Effects>
      <Rig mouse={mouse} />
      {/* <Stats className="stats" /> */}
      {/* <OrbitControls /> */}
    </Canvas>
  );
}
