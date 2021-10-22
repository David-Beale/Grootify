import Dots from "./Dots";
import { LoginContainer, LoginButton, Status } from "./LoginStyle";
import { useLogin } from "./useLogin";
import { spotifyApi } from "../Api/SpotifyApi";
import { useEffect, useState } from "react";
import { useStore } from "../Store/store";

export default function Login({ loaded }) {
  const loggedIn = useStore((state) => state.loggedIn);
  const login = useStore((state) => state.login);
  const logout = useStore((state) => state.logout);

  const [initiateSpotifyLogin, inProgress, error] = useLogin();

  const [loginBuffer, setLoginBuffer] = useState(null);

  useEffect(() => {
    //login buffer is used to prevent the animations from starting before the scene has loaded
    if (!loaded || loginBuffer === null) return;
    if (loginBuffer) login();
    else logout();
  }, [loginBuffer, loaded, login, logout]);

  useEffect(() => {
    spotifyApi.logout = () => {
      logout();
      localStorage.removeItem("sp-accessToken");
      localStorage.removeItem("sp-refreshToken");
    };
    (async () => {
      const isAuth = await spotifyApi.checkAuthentication();
      setLoginBuffer(isAuth);
    })();
  }, [logout]);

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
