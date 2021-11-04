import { useState } from "react";

import { spotifyApi } from "../../Api/SpotifyApi";
import { useStore } from "../../Store/store";

export const useLogin = () => {
  const login = useStore((state) => state.login);
  const setMode = useStore((state) => state.setMode);

  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState(false);

  const initiateSpotifyLogin = async () => {
    setInProgress(true);
    setError(false);

    const popup = await spotifyApi.loginRedirect();

    const onResponse = async (payload) => {
      // check state
      const success = await spotifyApi.requestTokens(payload);
      setInProgress(false);
      if (success) {
        const loggedIn = await spotifyApi.login();
        if (loggedIn) {
          login();
          setMode("spotify");
        }
      }
      setError(true);
    };

    window.spotifyCallback = (payload) => {
      popup.close();
      onResponse(payload);
    };
  };

  return [initiateSpotifyLogin, inProgress, error];
};
