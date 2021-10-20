import Dots from "./Dots";
import { LoginContainer, LoginButton, Status } from "./LoginStyle";
import { useLogin } from "./useLogin";

export default function Login() {
  const [initiateSpotifyLogin, inProgress, error, success] = useLogin();

  return (
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
  );
}
