import styled from "styled-components";
import { colors } from "../../../colors";

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.primaryBackground};
  height: 75px;
  box-shadow: 0 0 15px 0 ${colors.spotifyGreen};
  z-index: 2;
  position: fixed;
  left: 0;
  top: ${({ open }) => (open ? 0 : "-80px")};
  transition: top 1s ease-in-out;
`;
