import { useState } from "react";

import { spotifyApi } from "../Api/SpotifyApi";
import { useAuthStore } from "../Store/authStore";

export const useLogin = () => {
  const login = useAuthStore((state) => state.login);

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
        if (loggedIn) return login();
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
