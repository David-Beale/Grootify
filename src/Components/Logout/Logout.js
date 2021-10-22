import { IconButton } from "@mui/material";

import { spotifyApi } from "../Api/SpotifyApi";
import { useAuthStore } from "../Store/authStore";
import { Container, StyledLogoutIcon } from "./LogoutStyle";

export default function Logout() {
  const loggedIn = useAuthStore((state) => state.loggedIn);
  const logout = useAuthStore((state) => state.logout);

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
