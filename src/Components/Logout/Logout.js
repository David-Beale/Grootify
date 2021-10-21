import { IconButton } from "@mui/material";

import { spotifyApi } from "../Api/SpotifyApi";
import { Container, StyledLogoutIcon } from "./LogoutStyle";

export default function Logout({ loggedIn, setLoggedIn }) {
  const onLogout = () => {
    spotifyApi.logout();
    setLoggedIn(false);
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
