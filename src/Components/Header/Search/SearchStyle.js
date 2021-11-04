import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { colors } from "../../../colors";

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
  color: ${colors.secondary};
  box-shadow: inset 8px 8px 8px ${colors.topShadow},
    inset -8px -8px 8px ${colors.bottomShadow};
  font-weight: 700;
  font-size: 1rem;
  ::placeholder {
    color: ${colors.secondary};
  }
`;

export const StyledSearchIcon = styled(SearchIcon)`
  color: ${colors.secondary};
  position: absolute;
  left: 10px;
  top: 10px;
`;
export const StyledCancelIcon = styled(ClearIcon)`
  color: ${colors.secondary};
  position: absolute;
  right: 15px;
  top: 10px;
  cursor: pointer;
`;
