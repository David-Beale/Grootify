import { spotifyApi } from "../Api/SpotifyApi";
import model from "../Model/classes/modelClass";
import { onClosePlaylist } from "./playlistSlice";

let clearTracksId = null;
let queryId = null;

export const searchSlice = (set, get) => ({
  clearSearchText: [],
  searchTracksOpen: false,
  searchTracks: [],
  searchFinised: false,
  searchQuery: null,
  searchOffset: 0,
  searchInProgress: false,

  sendSearchRequest: async (query) => {
    const id = Date.now();
    queryId = id;
    const tracks = await spotifyApi.getTracks(query, 0);
    if (queryId !== id) return;
    clearTracksId = "abort"; //cancels close timeout
    set(() => ({
      searchTracks: tracks,
      searchTracksOpen: true,
      searchQuery: query,
      searchOffset: 20,
      searchFinised: tracks.length < 20,
    }));
    onClosePlaylist(set);
  },

  onCloseSearch: () => onCloseSearch(set),

  setSearchSong: (song) => {
    onCloseSearch(set);
    set(() => ({ songs: ["spotify:track:" + song] }));
    model.isPlaying = true;
  },

  searchLoadNextPage: async () => {
    if (!get().searchOffset || get().searchInProgress) return;
    set(() => ({ searchInProgress: true }));
    const tracks = await spotifyApi.getTracks(
      get().searchQuery,
      get().searchOffset
    );
    set((state) => ({
      searchTracks: [...state.searchTracks, ...tracks],
      searchOffset: state.searchOffset + 20,
      searchFinised: tracks.length < 20,
      searchInProgress: false,
    }));
  },
});

export const onCloseSearch = (set) => {
  set(() => ({
    searchTracksOpen: false,
    clearSearchText: [],
    searchFinised: false,
    searchQuery: null,
    searchOffset: 0,
    inProgress: false,
  }));
  let id = Date.now();
  clearTracksId = Date.now();
  setTimeout(() => {
    if (id !== clearTracksId) return;
    set(() => ({ searchTracks: [] }));
  }, 500);
};
