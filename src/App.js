import "./App.css";
import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader, OrbitControls, Stats } from "@react-three/drei";
import Main from "./Components/Main/Main";

export default function App() {
  const [dead, setDead] = useState(false);
  const onClick = () => {
    setDead([]);
  };
  return (
    <div className="container" onClick={onClick}>
      <Suspense fallback={null}>
        <Canvas
          camera={{
            position: [0, 0, 100],
            fov: 40,
            far: 100000,
          }}
          shadows
        >
          <Stats className="stats" />
          <ambientLight intensity={0.5} />
          <Main dead={dead} />
          <OrbitControls />
        </Canvas>
      </Suspense>
      <Loader />
    </div>
  );
}
