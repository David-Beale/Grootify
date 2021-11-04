import { IconButton } from "@mui/material";
import model from "../Main/Model/classes/modelClass";
import { useStore } from "../Store/store";
import { Container, StyledLogoutIcon } from "./LogoutStyle";

export default function Logout() {
  const mode = useStore((state) => state.mode);
  const logout = useStore((state) => state.logout);
  const setMode = useStore((state) => state.setMode);
  const setFile = useStore((state) => state.setFile);

  const onClick = () => {
    logout();
    setMode(null);
    setFile(null);
    const pos = model.positionManager.pos;
    if (pos === "left" || pos === "transit") {
      model.setChain("rightIdleChain");
    } else model.setChain("idleChain");
  };

  return (
    <>
      {mode !== null && (
        <Container>
          <IconButton color="success" onClick={onClick}>
            <StyledLogoutIcon fontSize="large" />
          </IconButton>
        </Container>
      )}
    </>
  );
}
