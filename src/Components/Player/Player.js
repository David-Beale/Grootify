import { useCallback, useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { spotifyApi } from "../Api/SpotifyApi";
import { PlayerContainer, styles } from "./PlayerStyles";

export default function Player({ loggedIn, song }) {
  const [play, setPlay] = useState(false);

  const playerCB = useCallback((state) => {
    if (!state.isPlaying) setPlay(false);
  }, []);

  useEffect(() => {
    if (song) setPlay(true);
  }, [song]);
  return (
    <>
      {loggedIn && (
        <PlayerContainer>
          <SpotifyPlayer
            token={spotifyApi.getAccessToken()}
            play={play}
            callback={playerCB}
            showSaveIcon
            syncExternalDevice
            uris={song ? [song] : []}
            styles={styles}
          />
        </PlayerContainer>
      )}
    </>
  );
}
