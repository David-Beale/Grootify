import { useSpotifyStore } from "../Store/spotifyStore";
import TrackResult from "../TrackResult/TrackResult";
import { PlaylistTracksContainer } from "./SidePanelStyle";

export default function PlaylistTracks() {
  const playlistTracks = useSpotifyStore((state) => state.playlistTracks);
  const open = useSpotifyStore((state) => state.playlistTracksOpen);
  const setPlaylistSong = useSpotifyStore((state) => state.setPlaylistSong);
  return (
    <PlaylistTracksContainer open={open}>
      {playlistTracks.map((track) => (
        <TrackResult
          key={track.id}
          track={track}
          selectSong={setPlaylistSong}
        />
      ))}
    </PlaylistTracksContainer>
  );
}
