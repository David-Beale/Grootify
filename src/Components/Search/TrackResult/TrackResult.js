import {
  TrackResultContainer,
  Image,
  TextContainer,
  TrackTitle,
  Artist,
  Duration,
} from "./TrackResultStyle";

export default function TrackResult({ track, selectSong }) {
  const onClick = () => {
    selectSong(track.uri);
  };
  return (
    <TrackResultContainer onClick={onClick}>
      <Image src={track.albumUrl} alt={track.title} />
      <TextContainer>
        <TrackTitle>{track.title}</TrackTitle>
        <Artist>{track.artist}</Artist>
      </TextContainer>
      <Duration>{track.duration}</Duration>
    </TrackResultContainer>
  );
}
