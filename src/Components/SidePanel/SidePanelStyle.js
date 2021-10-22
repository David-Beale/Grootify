import styled from "styled-components";
import { colors } from "../../colors";

export const SidePanelContainer = styled.div`
  width: 350px;
  height: calc(100vh - 150px);
  background-color: ${colors.secondaryBackground};
  position: absolute;
  left: 0;
  top: 75px;
  z-index: 2;
  box-shadow: 0 11px 15px 0 ${colors.spotifyGreen};
  padding: 25px 0;
  overflow: auto;
`;

export const PlaylistTracksContainer = styled.div`
  z-index: 0;
  position: absolute;
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
  top: 75px;
  left: ${({ open }) => (open ? "25%" : "-50%")};
  transition: left 500ms ease-in-out;
`;
