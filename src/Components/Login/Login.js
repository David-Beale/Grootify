import Dots from "./Dots";
import {
  LoginContainer,
  LoginButton,
  Status,
  AccessRequired,
} from "./LoginStyle";
import { useLogin } from "./useLogin";
import { spotifyApi } from "../Api/SpotifyApi";
import { useEffect } from "react";
import { useStore } from "../Store/store";

export default function Login() {
  const loggedIn = useStore((state) => state.loggedIn);
  const accessRequired = useStore((state) => state.accessRequired);
  const login = useStore((state) => state.login);
  const logout = useStore((state) => state.logout);

  const [initiateSpotifyLogin, inProgress, error] = useLogin();

  useEffect(() => {
    (async () => {
      const isAuth = await spotifyApi.checkAuthentication();
      if (isAuth) login();
      else logout();
    })();
  }, [login, logout]);

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
          {accessRequired && (
            <AccessRequired>
              Sorry, your account needs to be manually authorised. Please get in
              touch.
            </AccessRequired>
          )}
        </LoginContainer>
      )}
    </>
  );
}
