import React, { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { spotifyApi } from "../Api/SpotifyApi";
import {
  Input,
  HeaderContainer,
  SearchBarContainer,
  StyledSearchIcon,
  SearchResultsContainer,
  SearchResult,
} from "./SearchStyle";
import TrackResult from "./TrackResult/TrackResult";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [placeholder, setPlaceholder] = useState("Search for songs...");
  const [searchResults, setSearchResults] = useState([]);

  const requestSearch = useMemo(
    () =>
      debounce(async (query) => {
        const tracks = await spotifyApi.getTracks(query);
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
    if (!e.target.value) {
      setPlaceholder("Search for songs...");
    } else {
      requestSearch(e.target.value);
    }
    setSearchText(e.target.value);
  };

  return (
    <>
      <HeaderContainer>
        <SearchBarContainer>
          <StyledSearchIcon fontSize="large" />
          <Input
            type="text"
            id="search"
            placeholder={placeholder}
            value={searchText}
            onChange={onSearchTextChange}
            autoComplete="off"
          />
        </SearchBarContainer>
      </HeaderContainer>
      <SearchResultsContainer>
        {searchResults.map((track) => (
          <TrackResult key={track.uri} track={track} />
        ))}
      </SearchResultsContainer>
    </>
  );
}
