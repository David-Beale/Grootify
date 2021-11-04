import Dots from "./Dots";
import { Status, AccessRequired } from "./LoginStyle";
import { useLogin } from "./useLogin";
import { spotifyApi } from "../../Api/SpotifyApi";
import { useEffect } from "react";
import { useStore } from "../../Store/store";
import { Button } from "../WelcomeButtonsStyle";

export default function Login() {
  const loggedIn = useStore((state) => state.loggedIn);
  const accessRequired = useStore((state) => state.accessRequired);
  const login = useStore((state) => state.login);
  const logout = useStore((state) => state.logout);
  const setMode = useStore((state) => state.setMode);

  const [initiateSpotifyLogin, inProgress, error] = useLogin();

  useEffect(() => {
    (async () => {
      const isAuth = await spotifyApi.checkAuthentication();
      if (isAuth) {
        login();
        setMode("spotify");
      } else logout();
    })();
  }, [login, logout, setMode]);

  return (
    <>
      {loggedIn === false && (
        <>
          <Button onClick={initiateSpotifyLogin}>Login</Button>
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
        </>
      )}
    </>
  );
}
