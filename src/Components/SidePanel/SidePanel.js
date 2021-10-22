import { useCallback, useEffect, useState } from "react";
import { spotifyApi } from "../Api/SpotifyApi";
import TrackResult from "../Search/TrackResult/TrackResult";
import Playlist from "./Playlist/Playlist";
import { PlaylistTracksContainer, SidePanelContainer } from "./SidePanelStyle";

const buildPlaylist = (list, song) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === song) {
      return [...list.slice(i, list.length), ...list.slice(0, i)].map(
        (track) => "spotify:track:" + track.id
      );
    }
  }
};
export default function SidePanel({ loggedIn, setSongs }) {
  const [playlists, setPlaylists] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!loggedIn) return;
    (async () => {
      const playlists = await spotifyApi.getPlaylists();
      setPlaylists(playlists);
    })();
  }, [loggedIn]);

  const onClose = useCallback(() => {
    setOpen(false);
    setSelectedPlaylist(null);
    setTimeout(() => {
      setPlaylistTracks([]);
    }, 750);
  }, []);

  const onSelectPlayList = useCallback(
    async (playlist) => {
      //request playist tracks
      if (playlist === selectedPlaylist) {
        onClose();
        return;
      }
      setSelectedPlaylist(playlist);
      setOpen(true);
      const tracks = await spotifyApi.getMyPlaylist(playlist);
      if (tracks) setPlaylistTracks(tracks);
    },
    [selectedPlaylist, onClose]
  );

  const selectSong = useCallback(
    (song) => {
      setSongs(buildPlaylist(playlistTracks, song));
      onClose();
      spotifyApi.getAudioFeaturesForTrack(song).then(
        function (data) {
          console.log(data.body);
        },
        function (err) {}
      );
    },
    [setSongs, playlistTracks, onClose]
  );

  return (
    <>
      <SidePanelContainer>
        {playlists.map((playlist) => (
          <Playlist
            key={playlist.id}
            playlist={playlist}
            onSelectPlayList={onSelectPlayList}
            selected={selectedPlaylist === playlist.id}
          />
        ))}
      </SidePanelContainer>
      <PlaylistTracksContainer open={open}>
        {playlistTracks.map((track) => (
          <TrackResult key={track.id} track={track} selectSong={selectSong} />
        ))}
      </PlaylistTracksContainer>
    </>
  );
}
