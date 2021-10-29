import React, { useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
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
  const sendSearchRequest = useStore((state) => state.sendSearchRequest);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setSearchText("");
  }, [clearSearchText]);

  const requestSearch = useMemo(
    () =>
      debounce(async (query) => {
        if (!query) return;
        sendSearchRequest(query);
      }, 300),
    [sendSearchRequest]
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
