import { useStore } from "../Store/store";
import Header from "./Header/Header";
import PlaylistTracks from "./PlaylistTracks/PlaylistTracks";
import SearchTracks from "./SearchTracks/SearchTracks";
import SidePanel from "./SidePanel/SidePanel";
import Player from "./Player/Player";

export default function SpotifyComponents() {
  const mode = useStore((state) => state.mode);

  return (
    <>
      {mode === "spotify" && (
        <>
          <Player />
          <Header />
          <SidePanel />
          <PlaylistTracks />
          <SearchTracks />
        </>
      )}
    </>
  );
}
