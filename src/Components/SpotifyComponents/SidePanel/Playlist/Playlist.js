import { useStore } from "../../../Store/store";
import { PlaylistContainer } from "./PlaylistStyle";

export default function Playlist({ playlist, selected }) {
  const onSelectPlayList = useStore((state) => state.onSelectPlayList);

  const onClick = () => {
    onSelectPlayList(playlist.id);
  };
  return (
    <PlaylistContainer selected={selected} onClick={onClick}>
      {playlist.name}
    </PlaylistContainer>
  );
}
