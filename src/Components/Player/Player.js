import { useCallback, useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { spotifyApi } from "../Api/SpotifyApi";
import { useStore } from "../Store/store";
import { PlayerContainer, styles } from "./PlayerStyles";

export default function Player() {
  const interfaceOpen = useStore((state) => state.interfaceOpen);
  const loggedIn = useStore((state) => state.loggedIn);
  const songs = useStore((state) => state.songs);

  const [play, setPlay] = useState(false);

  const playerCB = useCallback((state) => {
    if (!state.isPlaying) setPlay(false);
  }, []);

  useEffect(() => {
    if (!songs.length) return;

    setPlay(true);
  }, [songs]);
  return (
    <>
      {loggedIn && (
        <PlayerContainer open={interfaceOpen}>
          <SpotifyPlayer
            token={spotifyApi.getAccessToken()}
            play={play}
            callback={playerCB}
            showSaveIcon
            syncExternalDevice
            uris={songs}
            styles={styles}
          />
        </PlayerContainer>
      )}
    </>
  );
}
