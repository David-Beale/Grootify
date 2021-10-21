import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { debounce } from "lodash";
import { spotifyApi } from "../Api/SpotifyApi";
import {
  Input,
  HeaderContainer,
  SearchBarContainer,
  StyledSearchIcon,
  SearchResultsContainer,
} from "./SearchStyle";
import TrackResult from "./TrackResult/TrackResult";

export default function Search({ setSong }) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const id = useRef();

  const requestSearch = useMemo(
    () =>
      debounce(async (query) => {
        const localId = Date.now();
        id.current = localId;
        const tracks = await spotifyApi.getTracks(query);
        if (id.current !== localId) return;
        setSearchResults(tracks);
      }, 300),
    []
  );

  useEffect(() => {
    return () => {
      requestSearch.cancel();
    };
  }, [requestSearch]);

  const onSearchTextChange = (e) => {
    if (e.target.value) {
      requestSearch(e.target.value);
    }
    setSearchText(e.target.value);
  };

  const selectSong = useCallback(
    (song) => {
      setSong(song);
      setSearchText("");
      setSearchResults([]);
    },
    [setSong]
  );

  return (
    <>
      <HeaderContainer>
        <SearchBarContainer>
          <StyledSearchIcon fontSize="large" />
          <Input
            type="text"
            id="search"
            placeholder={"Search for songs..."}
            value={searchText}
            onChange={onSearchTextChange}
            autoComplete="off"
          />
        </SearchBarContainer>
      </HeaderContainer>
      <SearchResultsContainer>
        {searchResults
          ? searchResults.map((track) => (
              <TrackResult
                key={track.uri}
                track={track}
                selectSong={selectSong}
              />
            ))
          : "No Results Found"}
      </SearchResultsContainer>
    </>
  );
}
