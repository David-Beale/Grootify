import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";

export const spotifyApi = new SpotifyWebApi();

spotifyApi.refreshAccessToken = () => {
  const refreshToken = spotifyApi.getRefreshToken();
  const params = new URLSearchParams();

  params.append("client_id", process.env.REACT_APP_SPOTIFY_CLIENT_ID);
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refreshToken);

  axios
    .post("https://accounts.spotify.com/api/token", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;",
      },
    })
    .then((res) => {
      const { access_token, expires_in } = res.data;
      localStorage.setItem("sp-accessToken", access_token);
      localStorage.setItem("sp-expiry", Date.now() + (expires_in - 60) * 1000);
      spotifyApi.setAccessToken(access_token);
      return 2;
    })
    .catch((err) => {
      console.log("Could not refresh access token", err);
      spotifyApi.logout();
      return false;
    });
};

spotifyApi.preFlightCheck = async () => {
  const expiry = localStorage.getItem("sp-expiry");
  if (Date.now() > expiry) {
    //try to refresh token
    return await spotifyApi.refreshAccessToken();
  }
  return 1;
};

spotifyApi.checkAuthentication = async () => {
  const accessToken = localStorage.getItem("sp-accessToken");
  const refreshToken = localStorage.getItem("sp-refreshToken");

  if (!accessToken || !refreshToken) return false;

  spotifyApi.setRefreshToken(refreshToken);
  const preFlight = await spotifyApi.preFlightCheck();
  if (!preFlight) return false;
  if (preFlight === 2) return true;

  spotifyApi.setAccessToken(accessToken);
  try {
    await spotifyApi.getMe();
    return true;
  } catch (error) {
    return false;
  }
};
