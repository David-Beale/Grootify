import { useCallback, useEffect, useRef, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { spotifyApi } from "../../Api/SpotifyApi";
import { useStore } from "../../Store/store";
import { PlayerContainer, styles } from "./PlayerStyles";

export default function Player() {
  const interfaceOpen = useStore((state) => state.interfaceOpen);
  const loggedIn = useStore((state) => state.loggedIn);
  const songs = useStore((state) => state.songs);
  const setIsPlaying = useStore((state) => state.setIsPlaying);
  const setMood = useStore((state) => state.setMood);
  const prevTrack = useRef();

  const [play, setPlay] = useState(false);

  const updateMood = useCallback(
    (state) => {
      if (prevTrack.current !== state.track.id) {
        prevTrack.current = state.track.id;
        if (!state.track.id) return;
        const songName = state.track.name.toLowerCase();
        if (songName.includes("gangnam")) setMood(4);
        else if (songName.includes("thriller")) setMood("thriller");
        else {
          spotifyApi.getAudioFeaturesForTrack(state.track.id).then(
            function (data) {
              const { danceability, energy } = data.body;
              if (danceability > 0.7 || energy > 0.7) setMood(3);
              else if (danceability < 0.3 || energy < 0.3) setMood(1);
              else setMood(2);
            },
            function (err) {
              console.log(err);
            }
          );
        }
      }
    },
    [setMood]
  );

  const playerCB = useCallback(
    (state) => {
      setIsPlaying(state.isPlaying);
      if (!state.isPlaying) setPlay(false);
      updateMood(state);
    },
    [setIsPlaying, updateMood]
  );

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
            uris={songs.length ? songs : null}
            styles={styles}
          />
        </PlayerContainer>
      )}
    </>
  );
}
