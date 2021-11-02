import { useRef } from "react";
import Floor from "../Floor/Floor";
import Logo from "../Logo/Logo";
import Model from "../Model/Model";
import Effects from "../Effects/Effects";
import NoEffects from "../NoEffects/NoEffects";
import Ring from "../Ring/Ring";
import Table from "../Table/Table";
import Lighting from "../Lighting/Lighting";
import AudioAnalysis from "../AudioAnalysis/AudioAnalysis";

export default function Main() {
  const bloomRef = useRef();
  const modelRef = useRef();

  return (
    <>
      <NoEffects>
        <Model modelRef={modelRef} />
        <Lighting modelRef={modelRef} bloomRef={bloomRef} />
        <Floor />
        <Table />
        <AudioAnalysis />
      </NoEffects>
      <Effects bloomRef={bloomRef}>
        <Logo />
        <Ring />
      </Effects>
    </>
  );
}
