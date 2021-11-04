import Login from "./Login/Login";
import { useStore } from "../Store/store";
import { Or, WelcomeButtonsContainer } from "./WelcomeButtonsStyle";
import SelectSong from "./SelectSong/SelectSong";

export default function WelcomeButtons() {
  const mode = useStore((state) => state.mode);
  return (
    <>
      {mode === null && (
        <WelcomeButtonsContainer>
          <Login />
          <Or>Or</Or>
          <SelectSong />
        </WelcomeButtonsContainer>
      )}
    </>
  );
}
