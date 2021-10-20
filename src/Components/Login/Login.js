import Dots from "./Dots";
import { LoginContainer, LoginButton, Status } from "./LoginStyle";
import { useLogin } from "./useLogin";
import { spotifyApi } from "../Api/SpotifyApi";
import { useEffect, useState } from "react";

export default function Login({ loggedIn, setLoggedIn, loaded }) {
  const [initiateSpotifyLogin, inProgress, error] = useLogin(setLoggedIn);

  const [loginBuffer, setLoginBuffer] = useState(null);

  useEffect(() => {
    //login buffer is used to prevent the animations from starting before the scene has loaded
    if (!loaded || loginBuffer === null) return;
    setLoggedIn(loginBuffer);
  }, [loginBuffer, loaded, setLoggedIn]);

  useEffect(() => {
    spotifyApi.logout = () => {
      setLoggedIn(false);
      localStorage.removeItem("sp-accessToken");
      localStorage.removeItem("sp-refreshToken");
    };
    (async () => {
      const isAuth = await spotifyApi.checkAuthentication();
      setLoginBuffer(isAuth);
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
