import { useEffect, useState } from "react";
import { spotifyApi } from "../Api/SpotifyApi";
import { useAuthStore } from "../Store/authStore";
import { useSpotifyStore } from "../Store/spotifyStore";
import Playlist from "./Playlist/Playlist";
import { SidePanelContainer } from "./SidePanelStyle";

export default function SidePanel() {
  const loggedIn = useAuthStore((state) => state.loggedIn);

  const selectedPlaylist = useSpotifyStore((state) => state.selectedPlaylist);
  const onSelectPlayList = useSpotifyStore((state) => state.onSelectPlayList);

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
