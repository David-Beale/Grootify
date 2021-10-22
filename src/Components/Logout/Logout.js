import { IconButton } from "@mui/material";

import { spotifyApi } from "../Api/SpotifyApi";
import { useStore } from "../Store/store";
import { Container, StyledLogoutIcon } from "./LogoutStyle";

export default function Logout() {
  const loggedIn = useStore((state) => state.loggedIn);
  const logout = useStore((state) => state.logout);

  const onLogout = () => {
    spotifyApi.logout();
    logout();
  };
  return (
    <>
      {loggedIn && (
        <Container>
          <IconButton color="success" onClick={onLogout}>
            <StyledLogoutIcon fontSize="large" />
          </IconButton>
        </Container>
      )}
    </>
  );
}
