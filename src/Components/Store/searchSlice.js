import { onClosePlaylist } from "./playlistSlice";

let searchId = null;

export const searchSlice = (set) => ({
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
});

export const onCloseSearch = (set) => {
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
