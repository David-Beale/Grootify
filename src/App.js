import "./App.css";
import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader, OrbitControls, Stats } from "@react-three/drei";
import Main from "./Components/Main/Main";
import { useMouseInteraction } from "./Components/Rig/useInteractions";
import Rig from "./Components/Rig/Rig";

export default function App() {
  const [clicked, setClicked] = useState(false);
  const onClick = () => {
    setClicked([]);
  };

  const [mouse, onMouseMove] = useMouseInteraction();
  return (
    <div className="container" onClick={onClick} onPointerMove={onMouseMove}>
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
          <Main clicked={clicked} />
          <OrbitControls />
          {/* <Rig mouse={mouse} /> */}
        </Canvas>
      </Suspense>
      <Loader />
    </div>
  );
}
