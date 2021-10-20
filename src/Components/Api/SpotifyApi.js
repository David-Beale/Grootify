import SpotifyWebApi from "spotify-web-api-node";

export const spotifyApi = new SpotifyWebApi();

spotifyApi.preFlightCheck = () => {
  const expiry = localStorage.getItem("sp-expiry");
  if (Date.now() > expiry) {
    //try to refresh token
    spotifyApi.refreshAccessToken().then(
      function (data) {
        const { access_token, expires_in } = data.body;
        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(access_token);
        localStorage.setItem("sp-accessToken", access_token);
        localStorage.setItem(
          "sp-expiry",
          Date.now() + (expires_in - 60) * 1000
        );
        return 2;
      },
      function (err) {
        console.log("Could not refresh access token", err);
        spotifyApi.logout();
        return false;
      }
    );
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
