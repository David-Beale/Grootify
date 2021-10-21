import {
  TrackResultContainer,
  Image,
  TextContainer,
  TrackTitle,
  Artist,
  Duration,
} from "./TrackResultStyle";

export default function TrackResult({ track }) {
  return (
    <TrackResultContainer>
      <Image src={track.albumUrl} alt={track.title} />
      <TextContainer>
        <TrackTitle>{track.title}</TrackTitle>
        <Artist>{track.artist}</Artist>
      </TextContainer>
      <Duration>{track.duration}</Duration>
    </TrackResultContainer>
  );
}
