import styled from "styled-components";
import { colors } from "../../colors";

export const SidePanelContainer = styled.div`
  box-sizing: border-box;
  width: 350px;
  height: calc(100vh - 157px);
  background-color: ${colors.primaryBackground};
  position: absolute;
  top: 75px;
  z-index: 2;
  box-shadow: 7.5px 0 8px -10px ${colors.spotifyGreen};
  padding: 10px 0;
  overflow: auto;
  left: ${({ open }) => (open ? 0 : "-360px")};
  transition: left 1s ease-in-out;
`;

export const PlaylistTracksContainer = styled.div`
  box-sizing: border-box;
  z-index: 0;
  position: absolute;
  height: calc(100vh - 150px);
  width: calc(100vw - 750px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: scroll;
  padding: 25px;
  color: white;
  font-size: 1.5rem;
  top: 75px;
  left: ${({ open }) => (open ? "350px" : "-100%")};
  transition: left 500ms ease-in-out;
`;
