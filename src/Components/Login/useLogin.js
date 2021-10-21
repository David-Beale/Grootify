import { useState } from "react";

import { spotifyApi } from "../Api/SpotifyApi";

export const useLogin = (setLoggedIn) => {
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
        setLoggedIn(true);
      } else {
        setError(true);
      }
    };

    window.spotifyCallback = (payload) => {
      popup.close();
      onResponse(payload);
    };
  };

  return [initiateSpotifyLogin, inProgress, error];
};
