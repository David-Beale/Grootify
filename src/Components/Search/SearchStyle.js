import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { colors } from "../../colors";

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.primaryBackground};
  height: 75px;
  box-shadow: 0 0 15px 0 ${colors.spotifyGreen};
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
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
  color: ${colors.primary};
  box-shadow: inset 8px 8px 8px ${colors.topShadow},
    inset -8px -8px 8px ${colors.bottomShadow};
  font-weight: 700;
  font-size: 1rem;
  ::placeholder {
    color: ${colors.primary};
  }
`;

export const StyledSearchIcon = styled(SearchIcon)`
  color: ${colors.primary};
  position: absolute;
  left: 10px;
  top: 10px;
`;
export const StyledCancelIcon = styled(ClearIcon)`
  color: ${colors.primary};
  position: absolute;
  right: 15px;
  top: 10px;
  cursor: pointer;
`;

export const SearchResultsContainer = styled.div`
  z-index: 0;
  position: relative;
  height: calc(100vh - 100px);
  width: calc(100vw - 750px);
  max-width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: auto;
  padding-top: 25px;
  color: white;
  font-size: 1.5rem;
  top: ${({ open }) => (open ? "75px" : "-100%")};
  transition: top 500ms ease-in-out;
`;
