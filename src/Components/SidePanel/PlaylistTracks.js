import { useStore } from "../Store/store";
import TrackResult from "../TrackResult/TrackResult";
import { PlaylistTracksContainer } from "./SidePanelStyle";

export default function PlaylistTracks() {
  const playlistTracks = useStore((state) => state.playlistTracks);
  const open = useStore((state) => state.playlistTracksOpen);
  const setPlaylistSong = useStore((state) => state.setPlaylistSong);
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
