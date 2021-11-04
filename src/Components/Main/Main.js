import { useRef } from "react";
import Floor from "../Floor/Floor";
import Text from "../Text/Text";
import Model from "../Model/Model";
import Effects from "../Effects/Effects";
import NoEffects from "../NoEffects/NoEffects";
import Ring from "../Ring/Ring";
import Table from "../Table/Table";
import Lighting from "../Lighting/Lighting";

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
      </NoEffects>
      <Effects bloomRef={bloomRef}>
        <Text />
        <Ring />
      </Effects>
    </>
  );
}
