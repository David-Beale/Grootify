import { useEffect, useState } from "react";
import { spotifyApi } from "../Api/SpotifyApi";
import { useStore } from "../Store/store";
import Playlist from "./Playlist/Playlist";
import { SidePanelContainer } from "./SidePanelStyle";

export default function SidePanel() {
  const loggedIn = useStore((state) => state.loggedIn);

  const selectedPlaylist = useStore((state) => state.selectedPlaylist);
  const onSelectPlayList = useStore((state) => state.onSelectPlayList);

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (!loggedIn) return;
    (async () => {
      const playlists = await spotifyApi.getPlaylists();
      setPlaylists(playlists);
    })();
  }, [loggedIn]);

  return (
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
  );
}
