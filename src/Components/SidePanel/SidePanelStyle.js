import styled from "styled-components";
import { colors } from "../../colors";

export const SidePanelContainer = styled.div`
  box-sizing: border-box;
  width: 350px;
  height: calc(100vh - 150px);
  background-color: ${colors.secondaryBackground};
  position: absolute;
  left: 0;
  top: 75px;
  z-index: 2;
  box-shadow: 0 11px 15px 0 ${colors.spotifyGreen};
  padding: 10px 0;
  overflow: auto;
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
  /* background-color: ${colors.secondaryBackground}; */
`;
