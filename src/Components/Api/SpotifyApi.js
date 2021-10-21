import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import {
  makeid,
  getRandomInt,
  pkce_challenge_from_verifier,
  buildParams,
  popupWindow,
} from "./authHelpers";

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
      const { access_token, expires_in, refresh_token } = res.data;
      localStorage.setItem("sp-accessToken", access_token);
      localStorage.setItem("sp-refreshToken", refresh_token);
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
  console.log({ preFlight });
  if (!preFlight) return false;
  if (preFlight === 2) return true;

  spotifyApi.setAccessToken(accessToken);
  try {
    await spotifyApi.getMe();
    return true;
  } catch (error) {
    console.log("access token error");
    return false;
  }
};

let codeVerifierLocal;
let stateLocal;
spotifyApi.loginRedirect = async () => {
  codeVerifierLocal = makeid(getRandomInt(43, 128));

  const codeChallenge = await pkce_challenge_from_verifier(codeVerifierLocal);
  stateLocal = makeid(12);

  // construct the authentication url
  const parameters = {
    response_type: "code",
    client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    redirect_uri: "http://localhost:3000/",
    scope:
      "streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state user-library-read user-library-modify",
    state: stateLocal,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  };

  const authURL =
    "https://accounts.spotify.com/authorize?" + buildParams(parameters);

  const popup = popupWindow(authURL, "Login With Spotify", window, 600, 800);

  return popup;
};

spotifyApi.requestTokens = (payload) => {
  const { state, code, error } = payload;

  if (error || state !== stateLocal) return false;

  const params = new URLSearchParams();

  params.append("client_id", process.env.REACT_APP_SPOTIFY_CLIENT_ID);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:3000/");
  params.append("code_verifier", codeVerifierLocal);

  return axios
    .post("https://accounts.spotify.com/api/token", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;",
      },
    })
    .then((res) => {
      const { access_token, refresh_token, expires_in } = res.data;
      localStorage.setItem("sp-accessToken", access_token);
      localStorage.setItem("sp-refreshToken", refresh_token);
      localStorage.setItem("sp-expiry", Date.now() + (expires_in - 60) * 1000);
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

const formatDuration = (duration) => {
  let seconds = Math.round(duration / 1000);
  const minutes = ~~(seconds / 60);
  seconds -= minutes * 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
spotifyApi.getTracks = (query) => {
  return spotifyApi
    .searchTracks(query)
    .then((res) => {
      const tracks = res.body.tracks.items.map((track) => {
        const albumImage = track.album.images.reduce((smallest, image) => {
          if (image.height < smallest.height) return image;
          return smallest;
        }, track.album.images[0]);
        return {
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: albumImage.url,
          duration: formatDuration(track.duration_ms),
        };
      });
      return tracks;
    })
    .catch(() => false);
};
