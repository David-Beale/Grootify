import styled from "styled-components";
import { colors } from "../../colors";

export const PlayerContainer = styled.div`
  position: fixed;
  width: 100%;
  z-index: 1;
  box-shadow: 0 0 15px 0 ${colors.spotifyGreen};
  bottom: ${({ open }) => (open ? 0 : "-85px")};
  transition: bottom 1s ease-in-out;
`;

export const styles = {
  bgColor: colors.primaryBackground,
  height: "75px",
  color: colors.primary,
  sliderTrackColor: colors.secondary,
  sliderColor: colors.spotifyGreen,
  sliderHandleColor: colors.primary,
  trackNameColor: colors.primary,
  trackArtistColor: colors.secondary,
};
