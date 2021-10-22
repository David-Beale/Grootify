import { useSpotifyStore } from "../Store/spotifyStore";
import { SearchResultsContainer } from "./SearchStyle";
import TrackResult from "../TrackResult/TrackResult";

export default function SearchTracks() {
  const open = useSpotifyStore((state) => state.searchTracksOpen);
  const searchTracks = useSpotifyStore((state) => state.searchTracks);
  const setSearchSong = useSpotifyStore((state) => state.setSearchSong);

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
