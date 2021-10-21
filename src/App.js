import "./App.css";
import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import Main from "./Components/Main/Main";
import { useMouseInteraction } from "./Components/Rig/useInteractions";
import Rig from "./Components/Rig/Rig";
import Login from "./Components/Login/Login";
import Loader from "./Components/Loader/Loader";
import Logout from "./Components/Logout/Logout";
import SpotifyLogo from "./Components/SpotifyLogo/SpotifyLogo";
import Search from "./Components/Search/Search";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const onClick = () => {
    setClicked([]);
  };

  const [mouse, onMouseMove] = useMouseInteraction(loggedIn);
  return (
    <div className="container" onClick={onClick} onPointerMove={onMouseMove}>
      <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} loaded={loaded} />
      <Logout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Search />
      {/* <Suspense fallback={null}>
        <Canvas
          camera={{
            position: [0, 0, 100],
            fov: 40,
            far: 100000,
          }}
          shadows
        >
          <Stats className="stats" />
          <Main clicked={clicked} loggedIn={loggedIn} />
          <Rig mouse={mouse} />
        </Canvas>
      </Suspense> */}
      <Loader loaded={loaded} setLoaded={setLoaded} />
      <SpotifyLogo />
      {/* <OrbitControls /> */}
    </div>
  );
}
