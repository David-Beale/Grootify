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
  StyledCancelIcon,
} from "./SearchStyle";
import { useStore } from "../Store/store";

export default function Search() {
  const interfaceOpen = useStore((state) => state.interfaceOpen);
  const clearSearchText = useStore((state) => state.clearSearchText);
  const onCloseSearch = useStore((state) => state.onCloseSearch);
  const setSearchTracks = useStore((state) => state.setSearchTracks);

  const [searchText, setSearchText] = useState("");
  const id = useRef();

  useEffect(() => {
    setSearchText("");
  }, [clearSearchText]);

  const requestSearch = useMemo(
    () =>
      debounce(async (query) => {
        if (!query) return;
        const localId = Date.now();
        id.current = localId;
        const tracks = await spotifyApi.getTracks(query);
        if (id.current !== localId) return;
        setSearchTracks(tracks);
      }, 300),
    [setSearchTracks]
  );

  useEffect(() => {
    return () => {
      requestSearch.cancel();
    };
  }, [requestSearch]);

  const onSearchTextChange = useCallback(
    (e) => {
      requestSearch(e.target.value);
      setSearchText(e.target.value);
      if (!e.target.value) {
        onCloseSearch();
      }
    },
    [requestSearch, onCloseSearch]
  );

  return (
    <HeaderContainer open={interfaceOpen}>
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
        {searchText && (
          <StyledCancelIcon onClick={onCloseSearch} fontSize="large" />
        )}
      </SearchBarContainer>
    </HeaderContainer>
  );
}
