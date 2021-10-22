import { PlaylistContainer } from "./PlaylistStyle";

export default function Playlist({ playlist, onSelectPlayList, selected }) {
  const onClick = () => {
    onSelectPlayList(playlist.id);
  };
  return (
    <PlaylistContainer selected={selected} onClick={onClick}>
      {playlist.name}
    </PlaylistContainer>
  );
}
