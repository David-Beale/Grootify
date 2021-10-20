import Dots from "./Dots";
import { LoginContainer, LoginButton, Status } from "./LoginStyle";
import { useLogin } from "./useLogin";
import { spotifyApi } from "../Api/SpotifyApi";
import { useEffect } from "react";

export default function Login({ loggedIn, setLoggedIn }) {
  const [initiateSpotifyLogin, inProgress, error] = useLogin(setLoggedIn);

  useEffect(() => {
    spotifyApi.logout = () => {
      setLoggedIn(false);
      localStorage.removeItem("sp-accessToken");
      localStorage.removeItem("sp-refreshToken");
    };
    spotifyApi.logout();
    (async () => {
      const isAuth = await spotifyApi.checkAuthentication();
      setLoggedIn(isAuth);
    })();
  }, [setLoggedIn]);

  return (
    <>
      {loggedIn === false && (
        <LoginContainer>
          <LoginButton onClick={initiateSpotifyLogin}>Login</LoginButton>
          <Status error={error}>
            {inProgress ? (
              <>
                Authenticating <Dots />
              </>
            ) : (
              error && <>Error Logging In</>
            )}
          </Status>
        </LoginContainer>
      )}
    </>
  );
}
