import "./App.css";
import { Suspense } from "react";

import Main from "./Components/Main/Main";
import { useMouseInteraction } from "./Components/Main/Rig/useInteractions";
import Loader from "./Components/Loader/Loader";
import Logout from "./Components/Logout/Logout";
import WelcomeButtons from "./Components/WelcomeButtons/WelcomeButtons";
import SelectedFilePlayer from "./Components/SelectedFilePlayer/SelectedFilePlayer";
import SpotifyComponents from "./Components/SpotifyComponents/SpotifyComponents";
import { Background, Container } from "./AppStyle";
import { useStore } from "./Components/Store/store";

export default function App() {
  const mode = useStore((state) => state.mode);
  const [mouse, onMouseMove] = useMouseInteraction();
  return (
    <Container onPointerMove={onMouseMove}>
      <Background show={mode !== "file"} />
      <WelcomeButtons />
      <Logout />
      <SpotifyComponents />
      <Loader />
      <Suspense fallback={null}>
        <SelectedFilePlayer />
        <Main mouse={mouse} />
      </Suspense>
    </Container>
  );
}
