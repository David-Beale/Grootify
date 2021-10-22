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
  StyledCancelIcon,
} from "./SearchStyle";
import TrackResult from "./TrackResult/TrackResult";

export default function Search({ setSongs }) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [open, setOpen] = useState(false);
  const id = useRef();

  const requestSearch = useMemo(
    () =>
      debounce(async (query) => {
        const localId = Date.now();
        id.current = localId;
        const tracks = await spotifyApi.getTracks(query);
        if (id.current !== localId) return;
        setSearchResults(tracks);
        setOpen(true);
      }, 300),
    []
  );

  const onClose = useCallback(() => {
    setOpen(false);
    setSearchText("");
    setTimeout(() => {
      setSearchResults([]);
    }, 750);
  }, []);

  useEffect(() => {
    return () => {
      requestSearch.cancel();
    };
  }, [requestSearch]);

  const onSearchTextChange = useCallback(
    (e) => {
      if (e.target.value) {
        requestSearch(e.target.value);
        setSearchText(e.target.value);
      } else {
        onClose();
      }
    },
    [onClose, requestSearch]
  );

  const selectSong = useCallback(
    (song) => {
      setSongs(["spotify:track:" + song]);
      spotifyApi.getAudioFeaturesForTrack(song).then(
        function (data) {
          console.log(data.body);
        },
        function (err) {}
      );
      onClose();
    },
    [onClose, setSongs]
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
          {searchText && (
            <StyledCancelIcon onClick={onClose} fontSize="large" />
          )}
        </SearchBarContainer>
      </HeaderContainer>
      <SearchResultsContainer open={open}>
        {searchResults
          ? searchResults.map((track) => (
              <TrackResult
                key={track.id}
                track={track}
                selectSong={selectSong}
              />
            ))
          : "No Results Found"}
      </SearchResultsContainer>
    </>
  );
}
