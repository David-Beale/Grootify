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
