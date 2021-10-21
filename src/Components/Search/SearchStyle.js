import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { colors } from "../../colors";

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(23, 23, 23);
  height: 75px;
  box-shadow: 0 0 15px 0 ${colors.spotifyGreen};
`;

export const SearchBarContainer = styled.div`
  width: 650px;
  height: 50px;
  max-width: calc(100vw - 95px);
  position: relative;
`;

export const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  border: none;
  outline: none;
  padding: 10px 10px 5px 70px;
  background-color: transparent;
  color: rgb(218, 218, 218);
  box-shadow: inset 8px 8px 8px ${colors.topShadow},
    inset -8px -8px 8px ${colors.bottomShadow};
  font-weight: 700;
  font-size: 1rem;
  ::placeholder {
    color: rgb(218, 218, 218);
  }
`;

export const StyledSearchIcon = styled(SearchIcon)`
  color: rgb(218, 218, 218);
  position: absolute;
  left: 10px;
  top: 10px;
`;

export const SearchResultsContainer = styled.div`
  height: calc(100vh - 100px);
  /* width: calc(100vw - 500px); */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: auto;
  padding-top: 25px;
  color: white;
  font-size: 1.5rem;
`;
