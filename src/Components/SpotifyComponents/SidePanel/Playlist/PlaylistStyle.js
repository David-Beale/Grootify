import styled from "styled-components";
import { colors } from "../../../../colors";

export const PlaylistContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 30px;
  color: ${({ selected }) => (selected ? colors.primary : colors.secondary)};
  font-weight: ${({ selected }) => (selected ? 600 : "")};
  cursor: pointer;
  padding: 3px 25px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${({ selected }) => (selected ? colors.spotifyGreen : "")};
  &:hover {
    color: ${colors.primary};
    background-color: ${({ selected }) =>
      selected ? colors.spotifyGreen : "rgb(60, 70, 60)"};
  }
`;
