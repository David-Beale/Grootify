import styled from "styled-components";
import { colors } from "../../../../colors";

export const StyledMoodButton = styled.div`
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 4px 0;
  color: ${({ selected }) => (selected ? colors.spotifyGreen : colors.primary)};
  &:hover {
    color: ${({ selected }) => (selected ? colors.spotifyGreen : "white")};
  }
`;

export const Container = styled.div`
  height: 50px;
  width: 50px;
  position: fixed;
  top: 10px;
  right: 10px;
  color: white;
  z-index: 7;
`;
