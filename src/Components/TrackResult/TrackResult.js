import {
  TrackResultContainer,
  Image,
  TextContainer,
  TrackTitle,
  Artist,
  Duration,
} from "./TrackResultStyle";

export default function TrackResult({ track, selectSong, top }) {
  const onClick = () => {
    selectSong(track.id);
  };
  return (
    <TrackResultContainer onClick={onClick} top={top}>
      <Image src={track.albumUrl} alt={track.title} />
      <TextContainer>
        <TrackTitle>{track.title}</TrackTitle>
        <Artist>{track.artist}</Artist>
      </TextContainer>
      <Duration>{track.duration}</Duration>
    </TrackResultContainer>
  );
}
