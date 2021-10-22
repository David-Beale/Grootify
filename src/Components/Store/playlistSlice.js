import { spotifyApi } from "../Api/SpotifyApi";
import { onCloseSearch } from "./searchSlice";

let playlistId = null;

export const playlistSlice = (set, get) => ({
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
  }));
  let id = Date.now();
  playlistId = Date.now();
  setTimeout(() => {
    if (id !== playlistId) return;
    set(() => ({ playlistTracks: [] }));
  }, 500);
};
