import "./App.css";
import { Suspense } from "react";
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
import SearchTracks from "./Components/SearchTracks/SearchTracks";
import PlaylistTracks from "./Components/PlaylistTracks/PlaylistTracks";
import AudioAnalysis from "./Components/AudioAnalysis/AudioAnalysis";

export default function App() {
  const [mouse, onMouseMove] = useMouseInteraction();
  return (
    <>
      <div className="container" onPointerMove={onMouseMove}>
        <Login />
        <Logout />
        <SidePanel />
        <PlaylistTracks />
        <Search />
        <SearchTracks />
        <Loader />
        <Player />
        <SpotifyLogo />
        <Suspense fallback={null}>
          <Canvas
            className="canvas2"
            camera={{
              position: [0, 0, 100],
              fov: 40,
              far: 100000,
            }}
          >
            <AudioAnalysis />
          </Canvas>
          <Canvas
            className="canvas"
            camera={{
              position: [0, 0, 100],
              fov: 40,
              far: 100000,
            }}
            shadows
          >
            {/* <Stats className="stats" /> */}
            <Main />
            <Rig mouse={mouse} />
            {/* <OrbitControls /> */}
          </Canvas>
        </Suspense>
      </div>
    </>
  );
}
