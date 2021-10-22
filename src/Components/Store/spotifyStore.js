import create from "zustand";
import { spotifyApi } from "../Api/SpotifyApi";

let searchId = null;
let playlistId = null;

export const useSpotifyStore = create((set, get) => ({
  songs: [],
  setSongs: (songs) => set(() => ({ songs: songs })),
  //
  // ─── SEARCHING ──────────────────────────────────────────────────────────────────
  //
  clearSearchText: [],
  searchTracksOpen: false,
  searchTracks: [],

  setSearchTracks: (tracks) => {
    searchId = Date.now();
    set(() => ({ searchTracks: tracks, searchTracksOpen: true }));
    onClosePlaylist(set);
  },
  onCloseSearch: () => onCloseSearch(set),
  setSearchSong: (song) => {
    set(() => ({ songs: ["spotify:track:" + song] }));
    onCloseSearch(set);
  },

  //
  // ─── PLAYLISTS ──────────────────────────────────────────────────────────────────
  //
  playlistTracksOpen: false,
  playlistTracks: [],
  selectedPlaylist: null,
  onClosePlaylist: () => {
    onClosePlaylist(set);
  },
  onSelectPlayList: async (playlist) => {
    //request playist tracks
    if (playlist === get().selectedPlaylist) {
      onClosePlaylist(set);
      return;
    }
    onCloseSearch(set);
    playlistId = Date.now();
    set(() => ({ selectedPlaylist: playlist, playlistTracksOpen: true }));
    const tracks = await spotifyApi.getMyPlaylist(playlist);
    if (tracks) set(() => ({ playlistTracks: tracks }));
  },

  setPlaylistSong: (song) => {
    onClosePlaylist(set);
    const playlistTracks = get().playlistTracks;
    const newPlaylist = buildPlaylist(playlistTracks, song);
    set(() => ({ songs: newPlaylist }));
  },
}));

//
// ─── ACTIONS ────────────────────────────────────────────────────────────────────
//
const onCloseSearch = (set) => {
  set(() => ({
    searchTracksOpen: false,
    clearSearchText: [],
  }));
  let id = Date.now();
  searchId = Date.now();
  setTimeout(() => {
    if (id !== searchId) return;
    set(() => ({ searchTracks: [] }));
  }, 750);
};

const onClosePlaylist = (set) => {
  set(() => ({
    selectedPlaylist: null,
    playlistTracksOpen: false,
  }));
  let id = Date.now();
  playlistId = Date.now();
  setTimeout(() => {
    if (id !== playlistId) return;
    set(() => ({ playlistTracks: [] }));
  }, 750);
};

const buildPlaylist = (list, song) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === song) {
      return [...list.slice(i, list.length), ...list.slice(0, i)].map(
        (track) => "spotify:track:" + track.id
      );
    }
  }
};

// spotifyApi.getAudioFeaturesForTrack(song).then(
//   function (data) {
//     console.log(data.body);
//   },
//   function (err) {}
// );
