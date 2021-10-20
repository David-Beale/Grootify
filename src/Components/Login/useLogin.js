import axios from "axios";
import { useRef, useState } from "react";
import {
  makeid,
  getRandomInt,
  pkce_challenge_from_verifier,
  buildParams,
  popupWindow,
} from "./authHelpers";

export const useLogin = () => {
  const [inProgress, setInProgress] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const stateLocal = useRef(null);
  const codeVerifierLocal = useRef(null);

  const initiateSpotifyLogin = async () => {
    setInProgress(true);
    setError(false);
    // Generate the code verifier and its base 64 encoded hash
    codeVerifierLocal.current = makeid(getRandomInt(43, 128));

    const codeChallenge = await pkce_challenge_from_verifier(
      codeVerifierLocal.current
    );
    // const hash = sha256(codeVerifierLocal.current);
    // const codeChallenge = encode(hash, true);
    stateLocal.current = makeid(12);

    // construct the authentication url
    const parameters = {
      response_type: "code",
      client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
      redirect_uri: "http://localhost:3000/",
      scope: "user-follow-modify",
      state: stateLocal.current,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
    };

    const authURL =
      "https://accounts.spotify.com/authorize?" + buildParams(parameters);

    const popup = popupWindow(authURL, "Login With Spotify", window, 600, 800);

    const onResponse = (payload) => {
      const { state, code, error } = payload;
      // check state
      if (error || state !== stateLocal.current) {
        setError(true);
        setInProgress(false);
        return undefined;
      }

      const params = new URLSearchParams();

      params.append("client_id", process.env.REACT_APP_SPOTIFY_CLIENT_ID);
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append("redirect_uri", "http://localhost:3000/");
      params.append("code_verifier", codeVerifierLocal.current);

      axios
        .post("https://accounts.spotify.com/api/token", params, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;",
          },
        })
        .then((res) => {
          const { access_token, refresh_token, expires_in } = res.data;
          console.log(access_token, refresh_token, expires_in);
          localStorage.setItem("sp-accessToken", access_token);
          localStorage.setItem("sp-refreshToken", refresh_token);

          setSuccess(true);
          setInProgress(false);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
          setInProgress(false);
        });
    };

    window.spotifyCallback = (payload) => {
      popup.close();
      onResponse(payload);
    };
  };

  return [initiateSpotifyLogin, inProgress, error, success];
};
