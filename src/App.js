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
import Player from "./Components/Player/Player";
import SidePanel from "./Components/SidePanel/SidePanel";
import SearchTracks from "./Components/Search/SearchTracks";
import PlaylistTracks from "./Components/SidePanel/PlaylistTracks";

export default function App() {
  const [clicked, setClicked] = useState(false);
  const onClick = () => {
    setClicked([]);
  };

  const [mouse, onMouseMove] = useMouseInteraction();
  return (
    <>
      <div className="app" onClick={onClick} onPointerMove={onMouseMove}>
        <Login />
        <Logout />
        <SidePanel />
        <PlaylistTracks />
        <Search />
        <SearchTracks />
        <Loader />
        <Player />
        <SpotifyLogo />
      </div>
      <div className="container">
        <Suspense fallback={null}>
          <Canvas
            className="canvas"
            camera={{
              position: [0, 0, 100],
              fov: 40,
              far: 100000,
            }}
            shadows
          >
            <Stats className="stats" />
            <Main clicked={clicked} />
            <Rig mouse={mouse} />
          </Canvas>
        </Suspense>
      </div>
      {/* <OrbitControls /> */}
    </>
  );
}
