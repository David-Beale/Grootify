import { useStore } from "../Store/store";
import { SearchResultsContainer } from "./SearchStyle";
import TrackResult from "../TrackResult/TrackResult";

export default function SearchTracks() {
  const open = useStore((state) => state.searchTracksOpen);
  const searchTracks = useStore((state) => state.searchTracks);
  const setSearchSong = useStore((state) => state.setSearchSong);

  return (
    <SearchResultsContainer open={open}>
      {searchTracks
        ? searchTracks.map((track) => (
            <TrackResult
              key={track.id}
              track={track}
              selectSong={setSearchSong}
            />
          ))
        : "No Results Found"}
    </SearchResultsContainer>
  );
}
