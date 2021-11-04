import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import {
  makeid,
  getRandomInt,
  pkce_challenge_from_verifier,
  buildParams,
  popupWindow,
} from "./authHelpers";
import { useStore } from "../Store/store";

export const spotifyApi = new SpotifyWebApi();
let userId = null;

spotifyApi.refreshAccessToken = () => {
  const refreshToken = spotifyApi.getRefreshToken();
  const params = new URLSearchParams();

  params.append("client_id", process.env.REACT_APP_SPOTIFY_CLIENT_ID);
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refreshToken);

  return axios
    .post("https://accounts.spotify.com/api/token", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;",
      },
    })
    .then((res) => {
      const { access_token, expires_in, refresh_token } = res.data;
      localStorage.setItem("sp-accessToken", access_token);
      localStorage.setItem("sp-refreshToken", refresh_token);
      const adjustedExpiry = (expires_in - 60) * 1000;
      localStorage.setItem("sp-expiry", Date.now() + adjustedExpiry);
      spotifyApi.setRefreshToken(refresh_token);
      spotifyApi.setAccessToken(access_token);
      setTimeout(() => {
        spotifyApi.refreshAccessToken();
      }, adjustedExpiry);
      console.log("accessTokenRefreshed");
      return true;
    })
    .catch((err) => {
      console.log("Could not refresh access token", err);
      useStore.getState().logout();
      return false;
    });
};

spotifyApi.preFlightCheck = async (accessToken) => {
  const expiry = localStorage.getItem("sp-expiry");
  if (Date.now() > expiry) {
    //try to refresh token
    return await spotifyApi.refreshAccessToken();
  } else {
    setTimeout(() => {
      spotifyApi.refreshAccessToken();
    }, +expiry - Date.now());
  }
  spotifyApi.setAccessToken(accessToken);
  return "accessTokenValid";
};

spotifyApi.login = async () => {
  const accessToken = spotifyApi.getAccessToken();

  return axios
    .get("https://api.spotify.com/v1/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      userId = res.data.id;
      return true;
    })
    .catch((err) => {
      console.log("Could not access profile data", err);
      useStore.getState().setAccessRequired();
      useStore.getState().logout();
      return false;
    });
};

spotifyApi.checkAuthentication = async () => {
  const accessToken = localStorage.getItem("sp-accessToken");
  const refreshToken = localStorage.getItem("sp-refreshToken");

  if (!accessToken || !refreshToken) return false;

  spotifyApi.setRefreshToken(refreshToken);
  const preFlight = await spotifyApi.preFlightCheck(accessToken);
  if (!preFlight) return false;

  return await spotifyApi.login();
};

let codeVerifierLocal;
let stateLocal;
spotifyApi.loginRedirect = async () => {
  codeVerifierLocal = makeid(getRandomInt(43, 128));

  const codeChallenge = await pkce_challenge_from_verifier(codeVerifierLocal);
  stateLocal = makeid(12);

  // construct the authentication url
  const scopes = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-library-read",
    "user-library-modify",
    "playlist-read-private",
  ];
  const parameters = {
    response_type: "code",
    client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    redirect_uri: "http://localhost:3000/",
    scope: scopes.join(" "),
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
      const adjustedExpiry = (expires_in - 60) * 1000;
      localStorage.setItem("sp-expiry", Date.now() + adjustedExpiry);
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);
      setTimeout(() => {
        spotifyApi.refreshAccessToken();
      }, adjustedExpiry);

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
const formatTracks = (tracks, playlist = false) => {
  return tracks.map((track) => {
    if (playlist) track = track.track;
    const albumImage = track.album.images.reduce((smallest, image) => {
      if (image.height < smallest.height) return image;
      return smallest;
    }, track.album.images[0]);
    return {
      artist: track.artists[0].name,
      title: track.name,
      id: track.id,
      albumUrl: albumImage.url,
      duration: formatDuration(track.duration_ms),
    };
  });
};
spotifyApi.getTracks = (query, offset) => {
  return spotifyApi
    .searchTracks(query, { offset: offset })
    .then((res) => formatTracks(res.body.tracks.items))
    .catch(() => false);
};
spotifyApi.getMyPlaylist = (playlist, offset) => {
  if (playlist === "liked") {
    return spotifyApi
      .getMySavedTracks({ offset })
      .then((res) => formatTracks(res.body.items, true))
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
  return spotifyApi
    .getPlaylist(playlist, { offset })
    .then((res) => formatTracks(res.body.tracks.items, true))
    .catch((err) => {
      console.log(err);
      return false;
    });
};

spotifyApi.getTracks = (query) => {
  return spotifyApi
    .searchTracks(query)
    .then((res) => formatTracks(res.body.tracks.items))
    .catch(() => false);
};

spotifyApi.getPlaylists = () => {
  return spotifyApi
    .getUserPlaylists(userId, { limit: 50 })
    .then(
      function (data) {
        return data.body.items.map((playlist) => {
          return {
            name: playlist.name,
            id: playlist.id,
            image: playlist.images[1] || playlist.images[0],
          };
        });
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    )
    .catch((err) => console.log(err));
};
