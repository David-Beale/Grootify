import { spotifyApi } from "../Api/SpotifyApi";
import model from "../Model/classes/modelClass";
import { onCloseSearch } from "./searchSlice";

let clearPlaylistId = null;
let queryId = null;

export const playlistSlice = (set, get) => ({
  playlistTracksOpen: false,
  playlistTracks: [],
  selectedPlaylist: null,

  playlistRequestsFinised: false,
  playlistRequestsOffset: 0,
  playlistRequestsInProgress: false,

  onClosePlaylist: () => {
    onClosePlaylist(set);
  },
  onSelectPlayList: async (playlist) => {
    if (playlist === get().selectedPlaylist) {
      onClosePlaylist(set);
      return;
    }
    const id = Date.now();
    queryId = id;
    const tracks = await spotifyApi.getMyPlaylist(playlist);
    if (queryId !== id) return;
    clearPlaylistId = "abort";
    set(() => ({
      selectedPlaylist: playlist,
      playlistTracksOpen: true,
      playlistTracks: tracks,
      playlistRequestsOffset: 20,
      playlistRequestsFinised: tracks.length < 20,
    }));
    onCloseSearch(set);
  },

  setPlaylistSong: (song) => {
    onClosePlaylist(set);
    const playlistTracks = get().playlistTracks;
    const newPlaylist = buildPlaylist(playlistTracks, song);
    set(() => ({ songs: newPlaylist }));
    model.isPlaying = true;
  },

  playlistRequestsLoadNextPage: async () => {
    if (!get().playlistRequestsOffset || get().playlistRequestsInProgress)
      return;
    set(() => ({ playlistRequestsInProgress: true }));
    const tracks = await spotifyApi.getMyPlaylist(
      get().selectedPlaylist,
      get().playlistRequestsOffset
    );
    set((state) => ({
      playlistTracks: [...state.playlistTracks, ...tracks],
      playlistRequestsOffset: state.playlistRequestsOffset + 20,
      playlistRequestsFinised: tracks.length < 20,
      playlistRequestsInProgress: false,
    }));
  },
});

const buildPlaylist = (list, song) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === song) {
      return [...list.slice(i, list.length), ...list.slice(0, i)].map(
        (track) => "spotify:track:" + track.id
      );
    }
  }
};
export const onClosePlaylist = (set) => {
  set(() => ({
    selectedPlaylist: null,
    playlistTracksOpen: false,
    playlistRequestsFinised: false,
    playlistRequestsOffset: 0,
    playlistRequestsInProgress: false,
  }));
  let id = Date.now();
  clearPlaylistId = Date.now();
  setTimeout(() => {
    if (id !== clearPlaylistId) return;
    set(() => ({ playlistTracks: [] }));
  }, 500);
};
